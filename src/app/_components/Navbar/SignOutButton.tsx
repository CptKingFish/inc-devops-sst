"use client";

import React from "react";
import { signOut } from "next-auth/react";

import { Button } from "@/_components/ui/button";

const SignOutButton = () => {
  return (
    <Button
      onClick={() => {
        signOut().catch(console.error);
      }}
    >
      Sign out
    </Button>
  );
};

export default SignOutButton;
