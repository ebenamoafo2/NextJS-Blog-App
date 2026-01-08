import { prisma } from "@/app/utils/db";
import { redirect, notFound } from "next/navigation";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import EditPostForm from "../../../../components/general/EditPostForm";

export default async function EditPostPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  // Await the params
  const { id } = await params;

  const { getUser } = getKindeServerSession();
  const user = await getUser();

  if (!user) redirect("/api/auth/login");

  const post = await prisma.blogPost.findUnique({
    where: { id },
  });

  if (!post) notFound();

  // Ownership check
  if (post.authorId !== user.id) redirect("/dashboard");

  return <EditPostForm post={post} />;
}
