"use client";
import { Input } from "@/components/ui/input";

import { useEffect, useState } from "react";
import { normalize } from "../../utils/functions";
import { useGetBooks, useGetCategory } from "@/api/fetchers";
import BookCard from "@/components/books/BookCard";

import { LoadingSpinner } from "@/components/LoadingSpinner";
import { useRouter } from "next/navigation";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/context/auth";
import { api } from "@/api/posters";

export default function CategoryPage({ params: { id: categoryId } }) {
  const router = useRouter();

  const { user } = useAuth();

  const {
    res: { data, meta },
    loading,
    error,
  } = useGetCategory(categoryId);

  const isFollowing = user?.interests.some((item) => item.id == categoryId);

  if (error) {
    router.push("/404");
  }

  if (loading) {
    console.log("loading");
    return <LoadingSpinner />;
  }

  const category = normalize(data);

  if (category) {
    return (
      <div className="flex flex-col mt-4 ml-4">
        <div className="flex w-full mt-4 ml-4">
          <Card className="w-80 flex flex-col items-start">
            <CardHeader>
              <CardTitle>{category.name}</CardTitle>
            </CardHeader>
            <CardContent className="flex justify-center">
              {isFollowing ? (
                <Button
                  onClick={() => {
                    api.followCategory(category.id);
                    router.reload();
                  }}
                >
                  Unfollow
                </Button>
              ) : (
                <Button
                  onClick={() => {
                    api.followCategory(category.id);
                    router.reload();
                  }}
                >
                  Follow
                </Button>
              )}
            </CardContent>
          </Card>
        </div>

        <div className="scroll-m-20 text-2xl font-semibold tracking-tight p4 mt-16 ml-4">
          Books in {category.name} ({category.books.length}):
        </div>

        <div className="flex">
          {category.books.map((book) => (
            <BookCard key={book.id} book={book} />
          ))}
        </div>
      </div>
    );
  }
}
