import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  FaRegHeart,
  FaHeart,
  FaRegBookmark,
  FaShare,
  FaBookmark,
} from "react-icons/fa6";

import { api } from "@/api/posters";
import Markdown from "react-markdown";

import { BookPopup } from "./BookPopup";
import { AvatarPopup } from "./AvatarPopup";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { getRelativeTime } from "@/app/utils/datetime";
import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AiOutlinePlus } from "react-icons/ai";
import { ShareLink } from "@/components/ShareLink";

export function Idea({ idea, isMy }) {
  const [showFullContent, setShowFullContent] = useState(false);
  const content = showFullContent
    ? idea.content
    : idea.content.length > 400
    ? idea.content.slice(0, 400) + "..."
    : idea.content;

  console.log({ idea });
  return (
    <div className="flex flex-col p-4 border rounded">
      <div className="flex gap-2">
        <Avatar>
          <AvatarImage src={idea.creator.avatar?.url} />
          <AvatarFallback>{idea.creator.username.slice(0, 2)}</AvatarFallback>
        </Avatar>
        <AvatarPopup user={idea.creator} />
      </div>

      <div className="flex gap-2 ml-2">
        <div className="text-slate-400 text-sm flex justify-center items-center">
          {getRelativeTime(idea.createdAt)}
        </div>

        <div className="flex justify-center items-center">&middot;</div>

        <div className="text-sm">
          <BookPopup book={idea.book} />
        </div>
      </div>

      <Tabs defaultValue="bhc" className="h-full space-y-6">
        <div className="space-between flex items-center">
          <TabsList>
            <TabsTrigger value="bhc" className="relative">
              Behavior Changes
            </TabsTrigger>
            <TabsTrigger value="tasks">To-do&apos;s</TabsTrigger>
          </TabsList>
        </div>
        <TabsContent value="bhc" className="border-none p-0 outline-none">
          <div className="leading-7 mt-4">
            <Markdown>{content}</Markdown>
            {idea.content.length > 400 && !showFullContent && (
              <button
                className="text-blue-500 hover:underline"
                onClick={() => setShowFullContent(true)}
              >
                Show more
              </button>
            )}
          </div>
        </TabsContent>
        <TabsContent value="tasks" className="border-none p-0 outline-none">
          tasks
        </TabsContent>
      </Tabs>

      {!isMy && (
        <div className="w-full flex justify-start gap-4 mt-4">
          <Button
            variant={idea.liked ? "secondary" : "outline"}
            onClick={async () => {
              await api.likeIdea(idea.id, idea.book.id);
            }}
          >
            {idea.liked ? (
              <>
                <FaHeart /> <div className="ml-1">Unlike</div>
              </>
            ) : (
              <>
                <FaRegHeart /> <div className="ml-1">Like</div>
              </>
            )}
            <span className="ml-2">{idea.likesCount}</span>
          </Button>
          <Button
            variant={idea.saved ? "secondary" : "outline"}
            onClick={async () => {
              await api.saveIdea(idea.id, idea.book.id);
            }}
          >
            {idea.saved ? (
              <>
                <FaBookmark /> <div className="ml-1">Saved</div>
              </>
            ) : (
              <>
                <FaRegBookmark /> <div className="ml-1">Save</div>
              </>
            )}

            <span className="ml-2">{idea.savesCount}</span>
          </Button>

          <ShareLink id={idea.id} />

          {/* <Button variant="outline">
                      <FaRegFlag /> <div className="ml-1">Report</div>
                    </Button> */}
        </div>
      )}
    </div>
  );
}
