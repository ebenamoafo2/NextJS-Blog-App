"use server";

import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { prisma } from "./utils/db";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import {postSchema, type FormState, PostInput} from "@/lib/zodSchemas";

export async function handleSubmission(values: PostInput) {
  const { getUser } = getKindeServerSession();
  const user = await getUser();

  if (!user) {
    return redirect("/api/auth/register");
  }

  // const rawData = {
  //   // title: formData.get("title"),
  //   // content: formData.get("content"),
  //   // imageUrl: formData.get("imageUrl"),
  // };
//validate the data
  const validatedData = postSchema.safeParse(values);

  // If any form fields are invalid, return early
  if (!validatedData.success) {
    return {
      status: "error",
      message: validatedData.error.message,
    }
  }
// If validation succeeds, proceed with your logic
  const { title, content, imageUrl } = validatedData.data;



  await prisma.blogPost.create({
    data: {
      title,
      content,
      imageUrl,
      authorId: user.id,
      authorImage: user.picture as string,
      authorName: user.given_name as string,
    },
  });

  revalidatePath("/"); // revalidate the home page to show the new post
  return redirect("/dashboard");
}

// Update Posts
export async function updatePost(prevState: FormState, formData: FormData) {
  const { getUser } = getKindeServerSession();
  const user = await getUser();

  if (!user) throw new Error("Unauthorized");

  const id = formData.get("id") as string;
  
  const rawData = {
    title: formData.get("title"),
    content: formData.get("content"),
    imageUrl: formData.get("imageUrl"),
  };

  const validatedData = postSchema.safeParse(rawData);

  if (!validatedData.success) {
    return {
      errors: validatedData.error.flatten().fieldErrors,
    };
  }

  const { title, content, imageUrl } = validatedData.data;

  const post = await prisma.blogPost.findUnique({
    where: { id },
  });

  if (!post || post.authorId !== user.id) {
    throw new Error("Forbidden");
  }

  await prisma.blogPost.update({
    where: { id },
    data: { title, content, imageUrl },
  });

  redirect("/dashboard");
}

// Delete Post
export async function deletePost(formData: FormData) {
  const { getUser } = getKindeServerSession();
  const user = await getUser();

  if (!user) throw new Error("Unauthorized");

  const id = formData.get("id") as string;

  const post = await prisma.blogPost.findUnique({
    where: { id },
  });

  if (!post || post.authorId !== user.id) {
    throw new Error("Forbidden");
  }

  await prisma.blogPost.delete({
    where: { id },
  });
  // Without this, the deleted post would still appear until you refresh the page
  revalidatePath("/dashboard");
  revalidatePath("/"); // removes it from the home page
  redirect("/dashboard");
}
