"use client";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useEffect, useState } from "react";
import { ToastAction } from "@/components/ui/toast";
import { useToast } from "@/components/ui/use-toast";
import Image from "next/image";
import { normalize } from "@/app/utils/functions";
import { Button } from "@/components/ui/button";
import { FaBookmark, FaRegBookmark } from "react-icons/fa6";
import { IoIosArrowBack } from "react-icons/io";
import { useGetBookDetails, useGetMyBookIdeas } from "@/api/fetchers";
import { useAuth } from "@/context/auth";
import { bookApi } from "@/api/book";
import { useRouter } from "next/navigation";
import { baseUrl } from "@/app/utils/url";
import { IdeaBuilder } from "@/components/builders/IdeaBuilder";
import IdeasTabContent from "./IdeasTabContent";
import { Badge } from "@/components/ui/badge";
import { Idea } from "./Idea";

export default function BookView({ params: { id: bookId } }) {
  const router = useRouter();
  const [book, setBook] = useState();
  const [activeTab, setActiveTab] = useState("Ideas");
  const [myTab, setMyTab] = useState("All");
  const { user, isAuthenticated } = useAuth();
  const { toast } = useToast();

  const {
    res: { data, meta },
    loading,
    error,
  } = useGetBookDetails(bookId);

  const {
    data: myIdea,
    loading: myIdeasLoading,
    error: myIdeasError,
  } = useGetMyBookIdeas(bookId);

  useEffect(() => {
    if (data && user?.saved_books) {
      const normalizedBook = normalize(data);
      const isSaved = user?.saved_books.some(
        (item) => item.id == normalizedBook.id
      );
      setBook({ ...normalizedBook, isSaved });
    }
  }, [data, user?.saved_books]);

  const {
    title,
    author,
    description,
    image,
    category,
    ideas,

    isSaved,
  } = book || {};

  const handleFavoriteBook = async () => {
    if (isAuthenticated) {
      await bookApi.favoriteBook(book.id);
      setBook({ ...book, isSaved: !isSaved });
      toast({
        title: isSaved
          ? "Book removed from favorites"
          : "Book added to favorites ",
        // description: "Friday, February 10, 2023 at 5:57 PM",
        action: (
          <ToastAction
            onClick={() => router.push("/collection")}
            altText="Goto schedule to undo"
          >
            See All
          </ToastAction>
        ),
      });
    } else {
      router.push("/login");
    }
  };

  return (
    <div className="flex">
      {book && (
        <div className="flex flex-col pt-6 l:pt-16 relative  flex w-full max-w-[64rem] mx-auto m:px-12 px-4  ">
          <div className="w-full flex justify-between">
            <Button variant="outline" onClick={() => router.back()}>
              <IoIosArrowBack />
            </Button>

            <Button variant="outline" onClick={handleFavoriteBook}>
              {isSaved ? <FaBookmark /> : <FaRegBookmark />}
            </Button>
          </div>
          <Image
            className="border rounded mt-4"
            src={`${baseUrl}${image.url}`}
            alt={title}
            height={200}
            width={200}
          />
          <div className="flex flex-col py-4">
            <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
              {title}
            </h1>
            <p className="mt-6 text-xl text-muted-foreground">{author}</p>
            <p className="mt-2 text-m text-muted-foreground">{description}</p>
          </div>

          <h1 className="scroll-m-20 text-2xl font-extrabold tracking-tight lg:text-3xl mt-12">
            Your Reflection
          </h1>

          <div className="my-4">
            {myIdea ? (
              <div>
                <Idea idea={{ ...myIdea }} isMy />
              </div>
            ) : (
              <div>You dont have a reflection yet.</div>
            )}
          </div>

          <IdeaBuilder book={book} idea={myIdea} />

          <h1 className="scroll-m-20 text-2xl font-extrabold tracking-tight lg:text-3xl mt-12">
            Community Reflections
          </h1>

          <IdeasTabContent
            bookId={bookId}
            ideas={ideas}
            myTab={myTab}
            setMyTab={setMyTab}
          />
        </div>
      )}
    </div>
  );
}
