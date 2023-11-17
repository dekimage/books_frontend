"use client";
import React from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";

import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { ModeToggle } from "./ui/themeButton";
import { UserNav } from "./UserNav";
import { useAuth } from "@/context/auth";
import { Button } from "./ui/button";
import Image from "next/image";

const components = [
  {
    title: "Books",
    href: "/collection",
    description:
      "A place to view the books you're reading or those that interest you.",
  },
  {
    title: "Categories",
    href: "/collection/categories",
    description: "Follow categories that interest you.",
  },
  {
    title: "Ideas",
    href: "/collection/ideas",
    description: "Create and find the key ideas from books.",
  },
  {
    title: "Tasks",
    href: "/collection/tasks",
    description: "Curate a todo list to apply the wisdom of the books.",
  },
  {
    title: "Routines",
    href: "/collection/routines",
    description: "Build daily habits based on the books you read.",
  },
  {
    title: "Questions",
    href: "/collection/questions",
    description:
      "Prompt your thinking and creativity with intriquing questions.",
  },
];

const baseUrl = "http://localhost:1337";

function NavBar() {
  const { isAuthenticated } = useAuth();

  return (
    <NavigationMenu className="border-b w-full max-w-full py-2 px-4 justify-between">
      <NavigationMenuList>
        <Link href="/">
          <NavigationMenuItem className="cursor-pointer">
            <Image
              src={`${baseUrl}/logo.png`}
              alt="logo"
              height={40}
              width={40}
            />
          </NavigationMenuItem>
        </Link>
        <NavigationMenuItem>
          <NavigationMenuTrigger>Explore</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid gap-3 p-6 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
              <li className="row-span-3">
                <NavigationMenuLink asChild>
                  <a
                    className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-muted/50 to-muted p-6 no-underline outline-none focus:shadow-md"
                    href="/"
                  >
                    <Image
                      src={`${baseUrl}/logo.png`}
                      alt="logo"
                      height={100}
                      width={100}
                    />
                    <div className="mb-2 mt-4 text-lg font-medium">
                      Bookraft
                    </div>
                    <p className="text-sm leading-tight text-muted-foreground">
                      Create your own book summaries
                    </p>
                  </a>
                </NavigationMenuLink>
              </li>

              <ListItem href="/explore" title="Books">
                Discover popular books from the community
              </ListItem>

              <ListItem href="/categories" title="Categories">
                Explore books by category
              </ListItem>
              <ListItem href="/collections" title="Collections">
                Find curated collections made by others
              </ListItem>
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>

        {isAuthenticated && (
          <NavigationMenuItem>
            <NavigationMenuTrigger>My Collection</NavigationMenuTrigger>
            <NavigationMenuContent>
              <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px] ">
                {components.map((component) => (
                  <ListItem
                    key={component.title}
                    title={component.title}
                    href={component.href}
                  >
                    {component.description}
                  </ListItem>
                ))}
              </ul>
            </NavigationMenuContent>
          </NavigationMenuItem>
        )}

        <NavigationMenuItem>
          <NavigationMenuLink asChild className={navigationMenuTriggerStyle()}>
            <Link href="/pricing" passHref>
              Pricing
            </Link>
          </NavigationMenuLink>
        </NavigationMenuItem>
      </NavigationMenuList>

      <NavigationMenuList>
        {isAuthenticated ? (
          <>
            <NavigationMenuItem className="mr-4">
              <ModeToggle />
            </NavigationMenuItem>
            <NavigationMenuItem>
              <UserNav />
            </NavigationMenuItem>
          </>
        ) : (
          <>
            <NavigationMenuItem className="mr-4">
              <Link href="/login">
                <Button variant="outline">Log In</Button>
              </Link>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <Link href="/signup">
                <Button>Sign Up</Button>
              </Link>
            </NavigationMenuItem>
          </>
        )}
      </NavigationMenuList>
    </NavigationMenu>
  );
}

const ListItem = React.forwardRef(
  ({ className, title, children, ...props }, ref) => {
    return (
      <li>
        <NavigationMenuLink asChild>
          <a
            ref={ref}
            className={cn(
              "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
              className
            )}
            {...props}
          >
            <div className="text-sm font-medium leading-none">{title}</div>
            <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
              {children}
            </p>
          </a>
        </NavigationMenuLink>
      </li>
    );
  }
);
ListItem.displayName = "ListItem";

export default NavBar;
