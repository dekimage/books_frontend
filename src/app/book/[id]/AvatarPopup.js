import { CalendarDays } from "lucide-react";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";

import { Button } from "@/components/ui/button";

import Link from "next/link";
import { formatDateTime } from "@/app/utils/datetime";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export function AvatarPopup({ user }) {
  return (
    <HoverCard>
      <HoverCardTrigger asChild className="p-0 capitalize">
        <Button variant="link">{user.username}</Button>
      </HoverCardTrigger>
      <HoverCardContent className="w-80">
        <div className="flex justify-between space-x-4">
          <Avatar>
            <AvatarImage src={user.avatar?.url} />
            <AvatarFallback>{user.username.slice(0, 2)}</AvatarFallback>
          </Avatar>
          <div className="space-y-1 w-full">
            <h4 className="text-sm font-semibold">@{user.username}</h4>
            <p className="text-sm">
              {user.bio ||
                "User Bio... User Bio... User Bio... User Bio... User Bio... User Bio..."}
            </p>
            <div className="flex items-center pt-2">
              <CalendarDays className="mr-2 h-4 w-4 opacity-70" />{" "}
              <span className="text-xs text-muted-foreground">
                Joined {formatDateTime(user.createdAt)}
              </span>
            </div>
            <Link href={`/profile/${user.id}`}>
              <Button className="mt-4" variant="outline">
                View Profile
              </Button>
            </Link>
          </div>
        </div>
      </HoverCardContent>
    </HoverCard>
  );
}
