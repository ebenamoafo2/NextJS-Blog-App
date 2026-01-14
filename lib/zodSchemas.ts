import { z } from "zod";

export const postSchema = z.object({
  title: z
    .string()
    .min(3, "Title must be at least 3 characters long")
    .max(50, "Title cannot exceed 100 characters"),
  content: z
    .string()
    .min(10,  "Content must be at least 10 characters long" )
    .max(5000, "Content cannot exceed 5000 characters" ),
  imageUrl: z
    .string()
    .url( "Please provide a valid image URL" )
    .startsWith("https://", "Image URL must start with https://" ),
});

export type PostInput = z.infer<typeof postSchema>;

export type FormState =
  | {
      errors?: {
        title?: string[];
        content?: string[];
        imageUrl?: string[];
      };
      message?: string;
    }
  | undefined;
