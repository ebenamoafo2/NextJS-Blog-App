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
import { Textarea } from "@/components/ui/textarea";
import {Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form";
import { PostInput, postSchema} from "@/lib/zodSchemas";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";

export default function CreateBlogroute() {
const form = useForm <PostInput>({
  resolver: zodResolver(postSchema), //To validate all of the data against the Zod schema
  defaultValues: {
    title: "",
    content: "",
    imageUrl: ""
  }
})

  async function onSubmit(values: PostInput) {
  await handleSubmission(values)
}

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
          <Form {...form}>
            <form className="flex flex-col gap-4" onSubmit={form.handleSubmit(onSubmit)} >

              <FormField
                  control={form.control}
                  name="title"
                  render={({ field }) => (
                      <FormItem>
                        <FormLabel>Title</FormLabel>
                        <FormControl>
                          <Input placeholder="Enter your Title" {...field} />
                        </FormControl>
                        <FormDescription>Please enter your title</FormDescription>
                        <FormMessage />
                      </FormItem>
                  )}
              />

              <FormField
                  control={form.control}
                  name="content"
                  render={({ field }) => (
                      <FormItem>
                        <FormLabel>Content</FormLabel>
                        <FormControl>
                          <Textarea placeholder="Content" {...field} />
                        </FormControl>
                        <FormDescription>Please enter your description</FormDescription>
                        <FormMessage />
                      </FormItem>
                  )}
              />

              <FormField
                  control={form.control}
                  name="imageUrl"
                  render={({ field }) => (
                      <FormItem>
                        <FormLabel>Image URL</FormLabel>
                        <FormControl>
                          <Input placeholder="Image Url" {...field} />
                        </FormControl>
                        <FormDescription>Enter the image url</FormDescription>
                        <FormMessage />
                      </FormItem>
                  )}
              />

              <SubmitButton />
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
