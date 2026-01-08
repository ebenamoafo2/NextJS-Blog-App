import { buttonVariants } from "@/components/ui/button";
import Link from "next/link";
import { prisma } from "../utils/db";
import { redirect } from "next/navigation";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { BlogPostCard } from "@/components/general/BlogPostCard";
import { SquarePen, FileText } from "lucide-react";

async function getData(userId: string) {
  await new Promise(resolve => setTimeout(resolve, 2000));
  const data = await prisma.blogPost.findMany({
    where: {
      authorId: userId,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return data;
}

export default async function Dashboard() {
  const { getUser } = getKindeServerSession();
  const user = await getUser();

  if (!user) {
    redirect("/api/auth/login");
  }

  const data = await getData(user.id);

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-medium">Featured</h2>

        <Link
          href="/dashboard/create"
          className={buttonVariants({ variant: "secondary" })}
        >
          <SquarePen className="mr-2 h-4 w-4" />
          Write
        </Link>
      </div>

      {data.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-16 px-4 text-center">
          <div className="rounded-full bg-gray-100 p-6 mb-4">
            <FileText className="h-12 w-12 text-gray-400" />
          </div>
          <h3 className="text-xl font-semibold mb-2">No posts yet</h3>
          <p className="text-gray-600 mb-6 max-w-md">
            Get started by creating your first blog post. Share your thoughts,
            stories, and ideas with the world.
          </p>
          <Link
            href="/dashboard/create"
            className={buttonVariants({ variant: "default" })}
          >
            <SquarePen className="mr-2 h-4 w-4" />
            Create Your First Post
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {data.map(item => (
            <BlogPostCard data={item} key={item.id} showEdit={true} />
          ))}
        </div>
      )}
    </div>
  );
}
