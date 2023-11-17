"use client";
import { Button } from "@/components/ui/button";
import { ModeToggle } from "@/components/ui/themeButton";
import { useAuth } from "@/context/auth";
import Image from "next/image";

export default function Home() {
  const { signup, user, loading } = useAuth();

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      hello
      {user && <div>{user.username}</div>}
      {loading && <div>Loading....</div>}
      <div>
        <ModeToggle />
      </div>
    </main>
  );
}
