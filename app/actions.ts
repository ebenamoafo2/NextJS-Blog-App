"use server";

import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { prisma } from "./utils/db";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";

export async function handleSubmission(formData: FormData) {
  const { getUser } = getKindeServerSession();
  const user = await getUser();

  if (!user) {
    return redirect("/api/auth/register");
  }

  const title = formData.get("title");
  const content = formData.get("content");
  const url = formData.get("url");

  await prisma.blogPost.create({
    data: {
      title: title as string,
      content: content as string,
      imageUrl: url as string,
      authorId: user.id,
      authorImage: user.picture as string,
      authorName: user.given_name as string,
    },
  });

  revalidatePath("/"); // revalidate the home page to show the new post
  return redirect("/dashboard");
}

// Update Posts
export async function updatePost(formData: FormData) {
  const { getUser } = getKindeServerSession();
  const user = await getUser();

  if (!user) throw new Error("Unauthorized");

  const id = formData.get("id") as string;
  const title = formData.get("title") as string;
  const content = formData.get("content") as string;
  const imageUrl = formData.get("imageUrl") as string;

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
