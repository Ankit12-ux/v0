"use client";

import Image from "next/image";
import Link from "next/link";

import {
  ClerkLoaded,
  ClerkLoading,
  Show,
  SignInButton,
  SignUpButton,
  UserButton,
} from "@clerk/nextjs";

import { Button } from "@/components/ui/button";

const Navbar = () => {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 border-b border-transparent bg-transparent p-4">
      <div className="mx-auto flex max-w-5xl items-center justify-between">

        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <Image
            src="/v.svg"
            alt="v0"
            width={32}
            height={32}
          />

          
        </Link>

 <ClerkLoading>
  <div className="flex items-center gap-2">
    
    <div className="h-9 w-20 animate-pulse rounded-md border border-gray-300 bg-gray-200" />

    <div className="h-9 w-20 animate-pulse rounded-md bg-gray-300" />

  </div>
</ClerkLoading>

        <ClerkLoaded>

          {/* Signed Out */}
          <Show when="signed-out">
            <div className="flex items-center gap-2">

              <SignInButton mode="modal">
                <Button variant="outline" size="sm">
                  Sign In
                </Button>
              </SignInButton>

              <SignUpButton mode="modal">
                <Button size="sm">
                  Sign Up
                </Button>
              </SignUpButton>

            </div>
          </Show>

          {/* Signed In */}
          <Show when="signed-in">
            <UserButton />
          </Show>

        </ClerkLoaded>

      </div>
    </nav>
  );
};

export default Navbar;