"use client";
import { Button } from "@/components/ui/button";
import { useFormStatus } from "react-dom";
import { Loader } from "lucide-react";

export function SubmitButton() {
  const { pending } = useFormStatus(); // tracks if the form is submitting

  return (
    <Button className="w-fit" type="submit" disabled={pending}>
      {pending ? (
        <>
          <Loader className="animate-spin h-5 w-5 mr-2" />
          Submitting...
        </>
      ) : (
        "Submit"
      )}
    </Button>
  );
}
