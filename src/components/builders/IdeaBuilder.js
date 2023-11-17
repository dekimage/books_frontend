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

export function IdeaBuilder({ id }) {
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
        book: id,
      },
    };

    await api.createIdea(payload, id);
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

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>+ Create New Idea</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Create New Idea</DialogTitle>
          <DialogDescription>
            Got a fancy idea? Write it down to remember it but also help the
            community by sharing it.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="grid gap-4 py-4">
            <div>
              <Label htmlFor="name" className="text-right">
                Name
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
                    className="col-span-3"
                  />
                )}
              />
              {errors.name && (
                <span className="text-red-500">{errors.name.message}</span>
              )}
            </div>
            <div>
              <Label htmlFor="content">Content</Label>
              <Controller
                name="content"
                control={control}
                defaultValue=""
                rules={{
                  required: "Content is required",
                  maxLength: {
                    value: 500,
                    message: "Content must not exceed 500 characters",
                  },
                }}
                render={({ field }) => (
                  <Textarea {...field} placeholder="Add content here..." />
                )}
              />
              {errors.content && (
                <span className="text-red-500">{errors.content.message}</span>
              )}
            </div>
          </div>
          <DialogFooter>
            <Button type="submit" onClick={() => handleOnSave()}>
              Create Idea
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
