"use client";

import { useState } from "react";

import { useToast } from "@/components/ui/use-toast";

import { Button } from "@/components/ui/button";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useForm, Controller } from "react-hook-form";

import { api } from "@/api/posters";
import Image from "next/image";
import { CardDescription, CardHeader, CardTitle } from "../ui/card";
import { baseUrl } from "@/app/utils/url";
import { HelperButton } from "../HelperButton";

export function IdeaBuilder({ book, idea }) {
  const [open, setOpen] = useState(false);
  const { toast } = useToast();
  const {
    handleSubmit,
    control,
    formState: { errors },
    trigger,
  } = useForm();

  const onSubmit = async (data) => {
    const payload = {
      data: {
        title: data.name,
        content: data.content,
        book: book.id,
      },
    };

    await api.createIdea(payload, book.id);
    toast({
      title: "Idea created successfully",
    });
  };

  const handleOnSave = async () => {
    const isValid = await trigger();

    if (isValid) {
      setOpen(false);
    }
  };

  console.log({ idea });

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>
          {idea ? "Edit Your Reflection" : "+ Create New Reflection"}
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Create New Reflection</DialogTitle>
          <DialogDescription>{book.title}</DialogDescription>
        </DialogHeader>
        <div className="flex justify-center items-center pb-0">
          <Image
            src={`${baseUrl}${book.image.url}`}
            alt={book.title}
            height={100}
            width={100}
          />
        </div>

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="grid gap-4 py-4">
            {/* <div>
              <Label htmlFor="name" className="text-right">
                What specific changes did you make in your life based on this
                book?
              </Label>
              <Controller
                name="name"
                control={control}
                defaultValue=""
                rules={{
                  required: "Name is required",
                  maxLength: {
                    value: 20,
                    message: "Name must not exceed 20 characters",
                  },
                }}
                render={({ field }) => (
                  <Input
                    {...field}
                    id="name"
                    placeholder="Habit Cues"
                    className="col-span-3 mt-2"
                  />
                )}
              />
              {errors.name && (
                <span className="text-red-500">{errors.name.message}</span>
              )}
            </div> */}
            <div>
              <Label htmlFor="content">
                <span className="mr-2 text-xl">
                  What specific changes did you make in your life based on this
                  book?
                </span>
                <HelperButton
                  title="Behavior Change"
                  content="When we read a book we often just feel good but rearly do we take the time to intentionally think how we're going to use that information and apply it to the real world. The Behavior Changes question is designed to force your mind to come up with clear and specific answers about how you actually implemented the book. This will help you to be radically honest with yourself and help you to think clearly for any future books."
                  buttonText="Understood!"
                />
              </Label>
              <Controller
                name="content"
                control={control}
                defaultValue={idea?.content || ""}
                rules={{
                  required: "Content is required",
                  maxLength: {
                    value: 500,
                    message: "Content must not exceed 500 characters",
                  },
                }}
                render={({ field }) => (
                  <Textarea
                    className="mt-2 min-h-[300px]"
                    {...field}
                    placeholder="Add content here..."
                  />
                )}
              />
              {errors.content && (
                <span className="text-red-500">{errors.content.message}</span>
              )}
            </div>
          </div>
          <DialogFooter>
            <Button type="submit" onClick={() => handleOnSave()}>
              {idea ? "Save" : "Create Reflection"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
