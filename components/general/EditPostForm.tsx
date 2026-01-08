"use client";

import { useState } from "react";
import { useFormStatus } from "react-dom";
import { BlogPost } from "../../prisma/generated";
import { updatePost } from "@/app/actions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import Image from "next/image";

type EditPostFormProps = {
  post: BlogPost;
};

function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <Button type="submit" disabled={pending}>
      {pending ? "Updating..." : "Update Post"}
    </Button>
  );
}

export default function EditPostForm({ post }: EditPostFormProps) {
  const [title, setTitle] = useState(post.title);
  const [content, setContent] = useState(post.content);
  const [imageUrl, setImageUrl] = useState(post.imageUrl);

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Edit Post</h1>

      <form action={updatePost} className="space-y-6">
        <input type="hidden" name="id" value={post.id} />

        <div className="space-y-2">
          <Label htmlFor="title">Title</Label>
          <Input
            id="title"
            name="title"
            value={title}
            onChange={e => setTitle(e.target.value)}
            placeholder="Enter your post title"
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="content">Content</Label>
          <Textarea
            id="content"
            name="content"
            value={content}
            onChange={e => setContent(e.target.value)}
            placeholder="Write your post content..."
            rows={10}
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="imageUrl">Image URL</Label>
          <Input
            id="imageUrl"
            name="imageUrl"
            value={imageUrl}
            onChange={e => setImageUrl(e.target.value)}
            placeholder="https://example.com/image.jpg"
            type="url"
            required
          />
          {imageUrl && (
            <Image
              src={imageUrl}
              alt="Preview"
              width={800}
              height={400}
              className="mt-2 h-48 w-full object-cover rounded-lg"
            />
          )}
        </div>

        <div className="flex gap-4">
          <SubmitButton />
          <Link href="/dashboard">
            <Button type="button" variant="outline">
              Cancel
            </Button>
          </Link>
        </div>
      </form>
    </div>
  );
}
