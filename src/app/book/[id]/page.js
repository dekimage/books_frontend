"use client";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useEffect, useState } from "react";
import { ToastAction } from "@/components/ui/toast";
import { useToast } from "@/components/ui/use-toast";
import Image from "next/image";
import { normalize } from "@/app/utils/functions";
import { Button } from "@/components/ui/button";
import { FaBookmark, FaRegBookmark } from "react-icons/fa6";
import { IoIosArrowBack } from "react-icons/io";
import { useGetBookDetails } from "@/api/fetchers";
import { useAuth } from "@/context/auth";
import { bookApi } from "@/api/book";
import { useRouter } from "next/navigation";
import { baseUrl } from "@/app/utils/url";
import { IdeaBuilder } from "@/components/builders/IdeaBuilder";
import IdeasTabContent from "./IdeasTabContent";

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
    tasks,
    routines,
    questions,
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
        <div className="flex items-start justify-start w-full flex-col m-4">
          <div className="w-full flex justify-between">
            <Button variant="outline" onClick={() => router.back()}>
              <IoIosArrowBack />
            </Button>

            <Button variant="outline" onClick={handleFavoriteBook}>
              {isSaved ? <FaBookmark /> : <FaRegBookmark />}
            </Button>
          </div>
          <Image
            className="border rounded mt-4 ml-4"
            src={`${baseUrl}${image.url}`}
            alt={title}
            height={200}
            width={200}
          />
          <div className="flex flex-col p-4">
            <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
              {title}
            </h1>
            <p className="mt-6 text-xl text-muted-foreground">{author}</p>
            <p className="mt-2 text-m text-muted-foreground">{description}</p>
          </div>

          <Tabs defaultValue="ideas" className="w-full">
            <TabsList className="w-full my-6">
              <TabsTrigger
                className="w-full"
                value="ideas"
                onClick={() => setActiveTab("Ideas")}
              >
                Ideas ({ideas.length})
              </TabsTrigger>
              <TabsTrigger
                className="w-full"
                value="tasks"
                onClick={() => setActiveTab("Tasks")}
              >
                Tasks ({tasks.length})
              </TabsTrigger>
              <TabsTrigger
                className="w-full"
                value="routines"
                onClick={() => setActiveTab("Routines")}
              >
                Routines ({routines.length})
              </TabsTrigger>
              <TabsTrigger
                className="w-full"
                value="questions"
                onClick={() => setActiveTab("Questions")}
              >
                Questions ({questions.length})
              </TabsTrigger>
            </TabsList>

            <div className="flex justify-between m-4">
              <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
                {myTab} {activeTab}
              </h1>
              <IdeaBuilder id={bookId} />
            </div>

            <IdeasTabContent
              bookId={bookId}
              ideas={ideas}
              myTab={myTab}
              setMyTab={setMyTab}
            />

            {/* <TabsContent value="tasks">
              {tasks.map((task, i) => (
                <div key={i} className="flex flex-col p-4 m-4 border rounded">
                  <p className="scroll-m-20 text-2xl font-semibold tracking-tight">
                    {task.content}
                  </p>
                  <p className="mt-2 text-xl">
                    {task.subtasks.map((subtask, i) => (
                      <p key={i} className="text-sm">
                        {i + 1}. {subtask.content}
                      </p>
                    ))}
                  </p>
                </div>
              ))}
            </TabsContent>
            <TabsContent value="routines">
              {routines.map((routine, i) => {
                const formattedContent = formatRoutineContent(routine.content);
                return (
                  <div key={i} className="flex flex-col p-4 m-4 border rounded">
                    <div className="flex justify-between">
                      <p className="scroll-m-20 text-2xl font-semibold tracking-tight">
                        {routine.name}
                      </p>
                      <Badge variant="outline">{routine.duration} min</Badge>
                    </div>

                    <div className="mt-2">{formattedContent}</div>
                  </div>
                );
              })}
            </TabsContent>
            <TabsContent value="questions">
              {questions.map((question, i) => {
                return (
                  <div key={i} className="flex flex-col p-4 m-4 border rounded">
                    <p className="scroll-m-20 text-2xl font-semibold tracking-tight">
                      {question.content}
                    </p>

                    <div className="mt-2 text-sm">{question.prompt}</div>
                  </div>
                );
              })}
            </TabsContent> */}
          </Tabs>
        </div>
      )}
    </div>
  );
}
