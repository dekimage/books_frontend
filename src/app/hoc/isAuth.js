"use client";

import { useEffect } from "react";
import { redirect } from "next/navigation";
import { useAuth } from "@/context/auth";
import { LoadingSpinner } from "@/components/LoadingSpinner";

export default function isAuth(Component) {
  return function IsAuth(props) {
    const { isAuthenticated, authLoading } = useAuth();

    useEffect(() => {
      if (authLoading) {
        return;
      }

      if (!isAuthenticated) {
        return redirect("/");
      }
    }, [isAuthenticated, authLoading]);

    if (authLoading) {
      return <LoadingSpinner />;
    }

    if (!isAuthenticated) {
      return null;
    }

    return <Component {...props} />;
  };
}
