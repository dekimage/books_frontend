import { CalendarDays } from "lucide-react";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";

import Image from "next/image";

import { Button } from "@/components/ui/button";

import Link from "next/link";
import { formatDateTime } from "@/app/utils/datetime";
import { baseUrl } from "@/app/utils/url";

export function BookPopup({ book }) {
  return (
    <HoverCard>
      <HoverCardTrigger asChild className="p-0">
        <Button variant="link">{book.title}</Button>
      </HoverCardTrigger>
      <HoverCardContent className="w-80">
        <div className="flex justify-between space-x-4">
          <Image
            src={`${baseUrl}${book.image?.url}`}
            alt={book.title}
            height="40"
            width="100"
          />
          {/* <Avatar>
            <AvatarImage src={`${baseUrl}${book.image?.url}`} />
            <AvatarFallback>{book.title.slice(0, 2)}</AvatarFallback>
          </Avatar> */}
          <div className="space-y-1 w-full">
            <h4 className="text-sm font-semibold">{book.title}</h4>
            <p className="text-sm">{book.description}</p>
            <div className="flex items-center pt-2">
              <CalendarDays className="mr-2 h-4 w-4 opacity-70" />{" "}
              <span className="text-xs text-muted-foreground">
                Added {formatDateTime(book.createdAt)}
              </span>
            </div>
            <Link href={`/book/${book.id}`}>
              <Button className="mt-4" variant="outline">
                View Book
              </Button>
            </Link>
          </div>
        </div>
      </HoverCardContent>
    </HoverCard>
  );
}
