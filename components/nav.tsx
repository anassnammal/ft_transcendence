import Link from "next/link";
import { LogOut, LucideIcon, UserRoundCog } from "lucide-react";
import { Archive, ArchiveX, File, Inbox, Send, Trash2 } from "lucide-react";

import { cn } from "@/lib/utils";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./ui/tooltip";
import { buttonVariants } from "./ui/button";
import { useEffect, useState } from "react";
import useMediaQuery from "@/lib/hooks/useMediaQuery";

interface linksProps {
  title: string;
  icon: LucideIcon;
  variant: "default" | "ghost";
}

export function Nav() {
  const links: linksProps[] = [
    {
      title: "home",
      icon: Inbox,
      variant: "ghost",
    },
    {
      title: "login",
      icon: File,
      variant: "ghost",
    },
    {
      title: "Sent",
      icon: Send,
      variant: "ghost",
    },
    {
      title: "Junk",
      icon: ArchiveX,
      variant: "ghost",
    },
    {
      title: "Trash",
      icon: Trash2,
      variant: "ghost",
    },
    {
      title: "Archive",
      icon: Archive,
      variant: "ghost",
    },
  ];
  const isCollapsed = useMediaQuery("(max-width: 822px)");
  return (
    <div
      data-collapsed={isCollapsed}
      className="group flex flex-col gap-4 py-2 h-screen shadow-lg "
    >
      <nav className="flex flex-col gap-1 px-2 h-full ">
        {links.map((link, index) =>
          isCollapsed ? (
            <TooltipProvider key={index} delayDuration={0}>
              <Tooltip key={index} delayDuration={0}>
                <TooltipTrigger asChild>
                  <Link
                    href={link.title}
                    className={cn(
                      buttonVariants({ variant: link.variant, size: "icon" }),
                      "h-9 w-9 ",
                      link.variant === "default" &&
                        "dark:bg-muted dark:text-muted-foreground dark:hover:bg-muted dark:hover:text-white"
                    )}
                  >
                    <link.icon className="h-4 w-4" />
                    <span className="sr-only">{link.title}</span>
                  </Link>
                </TooltipTrigger>
                <TooltipContent
                  side="right"
                  className="flex items-center gap-4"
                >
                  {link.title}
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          ) : (
            <Link
              key={index}
              href="#"
              className={cn(
                buttonVariants({ variant: link.variant, size: "sm" }),
                link.variant === "default" &&
                  "dark:bg-muted dark:text-white dark:hover:bg-muted dark:hover:text-white",
                "justify-start"
              )}
            >
              <link.icon className="mr-2 h-4 w-4 " />
              {link.title}
            </Link>
          )
        )}
      </nav>
      {isCollapsed ? (
        <>
          <TooltipProvider delayDuration={0}>
            <Tooltip delayDuration={0}>
              <TooltipTrigger asChild>
                <Link
                  href="#"
                  className={cn(
                    buttonVariants({ variant: "ghost", size: "icon" }),
                    "h-9 w-9"
                  )}
                >
                  <UserRoundCog className="h-4 w-4" />
                  <span className="sr-only">Sittings</span>
                </Link>
              </TooltipTrigger>
              <TooltipContent side="right" className="flex items-center gap-4">
                Sittings
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
          <TooltipProvider delayDuration={0}>
            <Tooltip delayDuration={0}>
              <TooltipTrigger asChild>
                <Link
                  href="#"
                  className={cn(
                    buttonVariants({ variant: "ghost", size: "icon" }),
                    "h-9 w-9"
                  )}
                >
                  <LogOut className="h-4 w-4" />
                  <span className="sr-only">Logout</span>
                </Link>
              </TooltipTrigger>
              <TooltipContent side="right" className="flex items-center gap-4">
                Logout
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </>
      ) : (
        <div className="flex flex-col">
          <Link
            href="#"
            className={cn(
              buttonVariants({ variant: "ghost", size: "sm" }),

              "dark:bg-muted dark:text-white dark:hover:bg-muted dark:hover:text-white",
              "justify-start"
            )}
          >
            <UserRoundCog className="mr-2 h-4 w-4 " />
            Sittings
          </Link>
          <Link
            href="#"
            className={cn(
              buttonVariants({ variant: "ghost", size: "sm" }),

              "dark:bg-muted dark:text-white dark:hover:bg-muted dark:hover:text-white",
              "justify-start"
            )}
          >
            <LogOut className="mr-2 h-4 w-4 " />
            logout
          </Link>
        </div>
      )}
    </div>
  );
}
