"use client";

import React from "react";
import { cn } from "@/lib/utils";
import { Bell } from "lucide-react";
import Link from "next/link";

import { Separator } from "@/components/ui/separator";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { Search } from "./site-search";
import { ThemeModeToggle } from "@/components/ThemeModeToggle";


export function SiteHeader({ children, className, ref, ...props }: {
  children?: React.ReactNode,
  className?: string
  ref?: React.Ref<HTMLElement>
}) {
  const [offset, setOffset] = React.useState(0);

  React.useEffect(() => {
    const onScroll = () => setOffset(document.body.scrollTop || document.documentElement.scrollTop);
    document.addEventListener('scroll', onScroll, { passive: true }); // Add scroll listener to the body
    return () => document.removeEventListener('scroll', onScroll);  // Clean up the event listener on unmount
  }, []);

  return (
    <header {...props} className={cn(`group-has-data-[collapsible=icon]/sidebar-wrapper:h-12 flex h-12 shrink-0 items-center 
      gap-2 border-b transition-[width,height] ease-linear`, className)}>
      {/* calc(.25rem*14) */}
      <div className="flex w-full h-[calc(.25rem*14)] items-center gap-1 px-4 lg:gap-2 lg:px-6">
        <SidebarTrigger className="-ml-1" />
        <Separator
          orientation="vertical"
          className="mx-2 data-[orientation=vertical]:h-4"
        />
        <h1 className="text-base font-medium">Documents</h1>
        <div className="ml-auto flex items-center gap-2 md:flex-1 md:justify-end">
          <Search />

          <Separator
            orientation="vertical"
            className="ml-2 data-[orientation=vertical]:h-4"
          />

          <NavigationMenu>
            <NavigationMenuList>
              <NavigationMenuItem>
                <Button variant={"ghost"} size={"icon"}> <Bell /> </Button>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <Button variant={"ghost"} size={"icon"}> <Bell /> </Button>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>

          <Separator
            orientation="vertical"
            className="mr-2 data-[orientation=vertical]:h-4"
          />

          <ThemeModeToggle />
        </div>
      </div>
    </header >
  )
}
