"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { useTheme } from "next-themes";
import { useSession, signOut } from "next-auth/react";
import { Moon, SignOut, Sun } from "@phosphor-icons/react";

export default function DropdownProfile() {
  const { theme, setTheme } = useTheme();
  const { data: session, status } = useSession();

  if (!status || !session) return null;

  const handleSignOut = () => {
    signOut(
      {callbackUrl: "/"}
    );
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <div className="flex items-center space-x-2 cursor-pointer">
          <Avatar>
            <AvatarImage
              src={session.user?.image || ""}
              alt="@shadcn"
              className="rounded-full border shadow-md"
            />
            <AvatarFallback className="uppercase">{session.user?.name?.charAt(0)}</AvatarFallback>
          </Avatar>
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="end">
        <DropdownMenuLabel className="flex flex-col">
          <span className="font-bold">{session.user?.name}</span>
          <span className="font-normal">{session.user?.email}</span>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        {theme === "dark" ? (
          <DropdownMenuItem onClick={() => setTheme("light")}>
            <Sun className="h-4 w-4 mr-2" />
            <span>Light Mode</span>
          </DropdownMenuItem>
        ) : (
          <DropdownMenuItem onClick={() => setTheme("dark")}>
            <Moon className="h-4 w-4 mr-2" />
            <span>Dark Mode</span>
          </DropdownMenuItem>
        )}
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={handleSignOut}>
          <SignOut className="h-4 w-4 mr-2" />
          <span>Log out</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
