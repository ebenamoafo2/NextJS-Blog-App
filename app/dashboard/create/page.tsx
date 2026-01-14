"use client";

import { handleSubmission } from "@/app/actions";
import { SubmitButton } from "@/components/general/Submitbutton";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useActionState } from "react";
import { FormState } from "@/lib/zodSchemas";

export default function CreateBlogroute() {
  const [state, action] = useActionState<FormState, FormData>(handleSubmission, undefined);

  return (
    <div>
      <Card className="max-w-lg mx-auto">
        <CardHeader>
          <CardTitle>Create Post</CardTitle>
          <CardDescription>
            Bring your ideas to life, write and publish your next blog post.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form className="flex flex-col gap-4" action={action}>
            <div className="flex flex-col gap-2">
              <Label>Title</Label>
              <Input name="title" required type="text" placeholder="Title" />
              {state?.errors?.title && (
                <p className="text-red-500 text-sm">{state.errors.title[0]}</p>
              )}
            </div>
            <div className="flex flex-col gap-2">
              <Label>Content</Label>
              <Textarea name="content" required placeholder="Content" />
              {state?.errors?.content && (
                <p className="text-red-500 text-sm">{state.errors.content[0]}</p>
              )}
            </div>

            <div className="flex flex-col gap-2">
              <Label>Image URL</Label>
              <Input
                name="imageUrl"
                required
                type="url"
                placeholder="Image url"
              />
              {state?.errors?.imageUrl && (
                <p className="text-red-500 text-sm">
                  {state.errors.imageUrl[0]}
                </p>
              )}
            </div>

            <SubmitButton />
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
