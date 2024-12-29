"use client";

import { Button } from "@/components/ui/button";
import { GithubLogo, GoogleLogo } from "@phosphor-icons/react/dist/ssr";
import { signIn } from "next-auth/react";
import Image from "next/image";

export default function LoginPage() {
  return (
    <div className="min-h-screen flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="flex items-center mb-8">
        <div className="size-10 rounded-md bg-secondary/20 outline outline-1 outline-primary/5 flex items-center justify-center">
          <Image
            src="/escrita.svg"
            alt="Logo"
            width={28}
            height={28}
            className="rotate-12 invert dark:invert-0"
          />
        </div>
        <div className="ml-4 font-medium text-lg">Speechnotes</div>
      </div>

      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="text-3xl font-medium">
          Bem-vindo!
          <br />{" "}
          <span className="text-muted-foreground">Por favor, faça login.</span>
        </h2>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div>
          <div className="space-y-4">
            <div>
              <Button
                onClick={() => signIn("github", { callbackUrl: "/dashboard" })}
                variant="outline"
                size={"lg"}
                className="w-full"
              >
                <GithubLogo className="mr-2 h-5 w-5" />
                Sign in with GitHub
              </Button>
            </div>
            <div>
              <Button
                onClick={() => signIn("google", { callbackUrl: "/dashboard" })}
                variant="outline"
                size={"lg"}
                className="w-full"
              >
                <GoogleLogo className="mr-2 h-5 w-5" />
                Sign in with Google
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
