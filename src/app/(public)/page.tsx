"use client";

import React from "react";
import { MailCheck } from "lucide-react";
import { toast } from "sonner";
import { signIn } from "next-auth/react";

import { Button } from "@/_components/ui/button";
import { Input } from "@/_components/ui/input";

const Home = () => {
  const [email, setEmail] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const [signedIn, setSignedIn] = React.useState(false);
  return (
    <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
      {signedIn && (
        <div data-testid="notify-email-sent" className="rounded-md bg-green-50 p-4">
          <div className="flex">
            <div className="flex-shrink-0">
              <MailCheck
                className="h-5 w-5 text-green-400"
                aria-hidden="true"
              />
            </div>
            <div className="ml-3">
              <p className="text-sm font-medium text-green-800">
                Check your inbox for the magic link
              </p>
            </div>
          </div>
        </div>
      )}
      <div className="h-2" />
      <h1 className="text-xl font-medium">Welcome to IMCS</h1>
      <p className="text-sm text-gray-600">
        You can can only login if you have been invited by an admin
      </p>
      <div className="h-2" />
      <form
        onSubmit={(e) => {
          e.preventDefault();
          setLoading(true);
          signIn("email", {
            email,
            redirect: false,
          })
            .then((data) => {
              if (data?.status === 200) {
                setSignedIn(true);
                setEmail("");
              }
              if (data?.error === "AccessDenied") {
                setSignedIn(false);
                toast.error(
                  "Please contact your system administrator to get access to the system.",
                );
              }
              console.log(data);
            })
            .catch(console.error)
            .finally(() => setLoading(false));
        }}
      >
        <Input
          data-testid="login-email-input"
          placeholder="Enter your email here..."
          type="email"
          required
          value={email}
          autoComplete="email"
          onChange={(e) => setEmail(e.target.value)}
        />
        <div className="h-2" />
        <Button data-testid="sign-in-button" isLoading={loading} type="submit">
          Sign In
        </Button>
      </form>
    </div>
  );
};

export default Home;
