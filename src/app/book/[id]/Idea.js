import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { FaRegHeart, FaHeart, FaRegBookmark, FaShare } from "react-icons/fa6";

import { api } from "@/api/posters";
import Markdown from "react-markdown";

import { BookPopup } from "./BookPopup";
import { AvatarPopup } from "./AvatarPopup";

export function Idea({ idea, i }) {
  return (
    <div className="flex flex-col p-4 m-4 border rounded max-w-sm shadow-lg">
      <p className="scroll-m-20 text-2xl font-semibold tracking-tight capitalize                                                                                                                                                                                    ">
        {i + 1}. {idea.title}
      </p>

      <div className="flex justify-start items-center">
        <Badge style={{ maxWidth: "max-content" }}>Idea</Badge>
        <div className="text-sm ml-2">
          By <AvatarPopup user={idea.creator} />
        </div>
        <div className="text-sm ml-2">
          <BookPopup book={idea.book} />
        </div>
      </div>
      <Accordion type="single" collapsible>
        <AccordionItem value="item-1 border-none">
          <AccordionTrigger>View Idea</AccordionTrigger>
          <AccordionContent>
            <div className="leading-7 mt-4">
              <Markdown>{idea.content}</Markdown>
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
      <div className="w-full flex justify-start gap-4 mt-4">
        <Button
          variant={idea.liked ? "secondary" : "outline"}
          onClick={async () => {
            await api.favoriteIdea(idea.id, idea.book.id);
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
        </Button>
        <Button variant="outline">
          <FaRegBookmark /> <div className="ml-1">Save</div>
        </Button>
        <Button variant="outline">
          <FaShare /> <div className="ml-1">Share</div>
        </Button>
        {/* <Button variant="outline">
                      <FaRegFlag /> <div className="ml-1">Report</div>
                    </Button> */}
      </div>
    </div>
  );
}
