"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

import { FaGoogle } from "react-icons/fa";
import { CgSpinner } from "react-icons/cg";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { useAuth } from "@/context/auth";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";

const formSchema = z.object({
  username: z.string().min(4, {
    message: "Username must be at least 4 characters.",
  }),
  password: z.string().min(6, {
    message: "Password must be at least 6 characters.",
  }),
  email: z.string().email({
    message: "Please enter a valid email.",
  }),
});

export function SignupForm() {
  const { signup, isAuthenticated } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
    },
  });

  async function onSubmit(values) {
    const { username, email, password } = values;
    setIsLoading(true);

    if (isAuthenticated) {
      setIsLoading(false);
      return;
    }

    await signup({
      username,
      email,
      password,
    });

    setIsLoading(false);
    router.push("/");
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem className="grid gap-2">
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input
                  id="email"
                  type="email"
                  placeholder="Email Address"
                  disabled={isLoading}
                  {...field}
                />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem className="grid gap-2">
              <FormLabel>Username</FormLabel>
              <FormControl>
                <Input
                  id="username"
                  type="string"
                  placeholder="First and Last Name"
                  disabled={isLoading}
                  {...field}
                />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem className="grid gap-2">
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input
                  id="password"
                  type="password"
                  placeholder="Password (8+ characters)"
                  disabled={isLoading}
                  {...field}
                />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <Button className="w-full" type="submit" disabled={isLoading}>
          {isLoading && <CgSpinner className="mr-2 h-4 w-4 animate-spin" />}
          Create Account
        </Button>
      </form>
    </Form>
  );
}

const SignupCard = () => {
  return (
    <Card className="min-w-3xl">
      <CardHeader className="space-y-1">
        <CardTitle className="text-2xl">Create an account</CardTitle>
        <CardDescription>
          Get started for free. No credit card required. Currently only
          available on desktop web
        </CardDescription>
      </CardHeader>
      <CardContent className="grid gap-4">
        <div className="grid grid-cols-1 gap-6">
          <Button variant="outline">
            <FaGoogle className="mr-2 h-4 w-4" />
            Google
          </Button>
        </div>
        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <span className="w-full border-t" />
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-background px-2 text-muted-foreground">
              Or continue with
            </span>
          </div>
        </div>
        <SignupForm />
      </CardContent>
      <CardFooter className="flex flex-col">
        <div className="text-muted-foreground text-sm text-center">
          By continuing, you agree to Bookraft&apos;s{" "}
          <Link href="/terms">Terms & Conditions</Link> and
          <Link href="/privacy"> Privacy Policy</Link>
        </div>
        <div className="text-center mt-4 text-sm">
          Already Have An Account? <Link href="/login">Login</Link>
        </div>
      </CardFooter>
    </Card>
  );
};

const Signup = () => {
  return (
    <div className="flex justify-center items-center mt-8">
      <SignupCard />
    </div>
  );
};
export default Signup;
