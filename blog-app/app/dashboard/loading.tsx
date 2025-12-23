import { Skeleton } from "@/components/ui/skeleton";
import prisma from "@/app/utils/db";

interface LoadingDashboardProps {
  userId: string;
}

export default async function LoadingDashboard({
  userId,
}: LoadingDashboardProps) {
  // Fetch the number of posts for this user
  let count = 3; // fallback minimum
  try {
    count = await prisma.blogPost.count({
      where: { authorId: userId },
    });
  } catch (e) {
    // Fallback if DB isn't available
    count = 3;
  }

  // Skeleton card component
  const BlogPostCardSkeleton = () => (
    <div className="group relative overflow-hidden rounded-lg border border-gray-200 bg-white shadow-md animate-pulse">
      {/* Image placeholder */}
      <div className="relative h-48 w-full overflow-hidden bg-gray-200" />

      <div className="p-4 space-y-2">
        {/* Title placeholder */}
        <Skeleton className="h-5 w-3/4" />

        {/* Content placeholder */}
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-5/6" />

        {/* Author & Date */}
        <div className="flex items-center justify-between mt-4">
          <div className="flex items-center space-x-2">
            {/* Author image placeholder */}
            <div className="relative h-8 w-8 rounded-full bg-gray-300" />

            {/* Author name placeholder */}
            <Skeleton className="h-4 w-16" />
          </div>

          {/* Date placeholder */}
          <Skeleton className="h-3 w-12" />
        </div>
      </div>
    </div>
  );

  // Render skeleton cards based on user post count
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {Array.from({ length: Math.max(1, count) }).map((_, idx) => (
        <BlogPostCardSkeleton key={idx} />
      ))}
    </div>
  );
}
