"use client";

import { SidebarNav } from "@/components/SideBarNav";
import isAuth from "../hoc/isAuth";
import { Separator } from "@/components/ui/separator";

const sidebarNavItems = [
  {
    title: "Books",
    href: "/collection",
  },
  {
    title: "Categories",
    href: "/collection/categories",
  },
  {
    title: "Ideas",
    href: "/collection/ideas",
  },
  {
    title: "Tasks",
    href: "/collection/tasks",
  },
  {
    title: "Routines",
    href: "/collection/routines",
  },
  {
    title: "Questions",
    href: "/collection/questions",
  },
];

const SettingsLayout = ({ children }) => {
  return (
    <div className=" space-y-6 p-10 pb-16">
      <div className="space-y-0.5">
        <h2 className="text-2xl font-bold tracking-tight">My Collection</h2>
        <p className="text-muted-foreground">
          Manage your entire collection of content.
        </p>
      </div>
      <Separator className="my-6" />
      <div className="flex flex-col space-y-8 lg:flex-row lg:space-x-12 lg:space-y-0">
        <aside className="-mx-4 lg:w-1/5">
          <SidebarNav items={sidebarNavItems} />
        </aside>
        <div className="flex-1 lg:max-w-2xl">{children}</div>
      </div>
    </div>
  );
};

export default isAuth(SettingsLayout);
