"use client";

import { BadgeCheck, Bell, LockIcon, LogOut } from "lucide-react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { CaretSortIcon } from "@radix-ui/react-icons";

import { useAuth } from "../hooks/useAuth";
import { useUserStore } from "../hooks/use-current-user";
import Link from "next/link";
import { Button } from "./ui/button";
import logoutFunc from "@/actions/logout";

export function NavUser() {
  const { user, setUser, setToken, token } = useAuth();
  const { logout } = useUserStore((state) => state);

  const handleLogout = async () => {
    try {
      if (token) {
        await logoutFunc();
      } else {
        console.error("Token is undefined");
      }
      setUser(null);
      setToken(null);
      logout();
    } catch (error) {
      console.error("Logout failed", error);
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <div className="flex gap-2  w-full items-center cursor-pointer  justify-center data-[state=open]:text-sidebar-accent-foreground">
          <Avatar className="h-8 w-8 rounded-lg">
            {user?.profile_image ? (
              <AvatarImage
                src={`/api${user?.profile_image}`}
                alt={user?.firstName}
              />
            ) : (
              <AvatarImage
                src={`${user?.google_picture}`}
                alt={user?.firstName}
              />
            )}
            <AvatarFallback className="rounded-lg">CN</AvatarFallback>
          </Avatar>
          <div className="sm:flex flex-col text-left text-sm leading-tight hidden">
            <span className="truncate font-semibold">{user?.firstName}</span>
            <span className="truncate text-xs">{user?.lastName}</span>
          </div>
          <CaretSortIcon className="ml-auto size-4 hidden sm:flex" />
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg"
        side={"bottom"}
        align="end"
        sideOffset={4}
      >
        <DropdownMenuLabel className="p-0 font-normal">
          <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm ">
            <Avatar className="h-8 w-8 rounded-lg">
              {user?.profile_image ? (
                <AvatarImage
                  src={`/api${user?.profile_image}`}
                  alt={user?.firstName}
                />
              ) : (
                <AvatarImage
                  src={`${user?.google_picture}`}
                  alt={user?.firstName}
                />
              )}
              <AvatarFallback className="rounded-lg">CN</AvatarFallback>
            </Avatar>
            <div className="grid flex-1 text-left text-sm leading-tight">
              <span className="truncate font-semibold">
                {user?.firstName} {user?.lastName}
              </span>
              <span className="truncate text-xs">{user?.email}</span>
            </div>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem>
            <Link
              href="/change-password"
              className="flex w-full items-center gap-1"
            >
              <LockIcon className="w-4 h-4" />
              Change password
            </Link>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem>
            <Link href="/profile" className="flex w-full items-center gap-1">
              <BadgeCheck className="w-4 h-4" />
              Profile
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Bell />
            Notifications
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <Button
            onClick={handleLogout}
            variant="link"
            className="justify-start text-destructive p-0 w-full"
          >
            <LogOut className="w-4 h-4" />
            Log out
          </Button>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
