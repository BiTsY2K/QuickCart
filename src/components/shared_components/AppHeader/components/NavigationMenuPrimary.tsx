"use client"

import * as React from "react"
import Link from "next/link"

import { cn } from "@/lib/utils"
import {
  NavigationMenu, NavigationMenuContent, NavigationMenuItem, NavigationMenuLink, NavigationMenuList, NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu"
import { Ri24HoursFill } from "react-icons/ri"
import { Menu, X } from "lucide-react"
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"

import { Button } from "@/components/ui/button"
import BrandLogo from "../../BrandLogo/BrandLogo"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger, accordionMenuTriggerStyle } from "@/components/ui/accordion"
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area"

const gettingStarted: { title: string; href: string; description: string }[] = [
  {
    title: "Introduction", href: "/docs/primitives/alert-dialog",
    description: "Re-usable components built using Radix UI and Tailwind CSS.",
  },
  {
    title: "Installation", href: "/docs/primitives/alert-dialog",
    description: "How to install dependencies and structure your app.",
  },
  {
    title: "Typography", href: "/docs/primitives/alert-dialog",
    description: "Styles for headings, paragraphs, lists...etc",
  }
];

const components: { title: string; href: string; description: string }[] = [
  {
    title: "Alert Dialog", href: "/docs/primitives/alert-dialog",
    description: "A modal dialog that interrupts the user with important content and expects a response.",
  },
  {
    title: "Hover Card", href: "/docs/primitives/hover-card",
    description: "For sighted users to preview content available behind a link.",
  },
  {
    title: "Progress", href: "/docs/primitives/progress",
    description: "Displays an indicator showing the completion progress of a task, typically displayed as a progress bar.",
  },
  {
    title: "Scroll-area", href: "/docs/primitives/scroll-area",
    description: "Visually or semantically separates content.",
  },
  {
    title: "Tabs", href: "/docs/primitives/tabs",
    description: "A set of layered sections of content—known as tab panels—that are displayed one at a time.",
  },
  {
    title: "Tooltip", href: "/docs/primitives/tooltip",
    description: "A popup that displays information related to an element when the element receives keyboard focus or the mouse hovers over it.",
  },
];

const accordMenuTriggerStyle = accordionMenuTriggerStyle().concat(" ", `w-full flex-none px-3 rounded-none`);
const navMenuTriggerStyle = navigationMenuTriggerStyle().concat(" ", `px-3 bg-transparent`);

const ListItem = React.forwardRef<
  React.ComponentRef<"a">,
  React.ComponentPropsWithoutRef<"a">
>(({ className, title, children, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <a ref={ref} {...props}
          className={cn(
            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors",
            "hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
            className
          )}
        >
          <div className="text-sm font-medium leading-none">{title}</div>
          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
            {children}
          </p>
        </a>
      </NavigationMenuLink>
    </li>
  )
});
ListItem.displayName = "ListItem";

const ListItemMobile = React.forwardRef<
  HTMLAnchorElement,
  { href: string; title?: string } & React.HTMLAttributes<HTMLAnchorElement>
>(({ href, title, children, className, ...props }, ref) => {
  return (
    <Link href={href} {...props} ref={ref}
      className={cn(`block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors
          hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground`,
        className
      )}
    >
      {title && <div className="text-sm font-medium leading-none">{title}</div>}
      {children && (<p className="text-xs leading-snug text-muted-foreground line-clamp-2">{children}</p>)}
    </Link>
  )
});
ListItemMobile.displayName = "ListItemMobile";


export default function PrimaryNavigationMenu({ className }: {
  className?: string
}) {
  return (
    <div className={`relative ${className}`}>
      {/* Desktop Navigation */}
      <div className="hidden md:block">
        <NavigationMenu>
          <NavigationMenuList>
            {/* Link - Hot Deals */}
            <NavigationMenuItem>
              <Link href="/docs" legacyBehavior passHref>
                <NavigationMenuLink className={navMenuTriggerStyle}>Hot Deals</NavigationMenuLink>
              </Link>
            </NavigationMenuItem>

            {/*  */}
            <NavigationMenuItem>
              <NavigationMenuTrigger className={navMenuTriggerStyle}>Getting started</NavigationMenuTrigger>
              <NavigationMenuContent>
                <ul className="grid gap-3 p-4 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
                  <li className="row-span-3">
                    <NavigationMenuLink asChild>
                      <a
                        className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-muted/50 to-muted p-6 no-underline outline-none focus:shadow-md"
                        href="/"
                      >
                        <Ri24HoursFill className="h-6 w-6" />
                        <div className="mb-2 mt-4 text-lg font-medium">shadcn/ui</div>
                        <p className="text-sm leading-tight text-muted-foreground">Beautifully designed components built with Radix UI and Tailwind CSS.</p>
                      </a>
                    </NavigationMenuLink>
                  </li>

                  {gettingStarted.map((getStart) => (
                    <ListItem key={getStart.title} href={getStart.href} title={getStart.title}>{getStart.description}</ListItem>
                  ))}

                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem>

            {/*  */}
            <NavigationMenuItem>
              <NavigationMenuTrigger className={navMenuTriggerStyle}>Components</NavigationMenuTrigger>
              <NavigationMenuContent>
                <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px] ">
                  {components.map((component) => (
                    <ListItem key={component.title} title={component.title} href={component.href}>{component.description}</ListItem>
                  ))}
                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem>

            {/* Link - About Us */}
            <NavigationMenuItem>
              <Link href="/docs" legacyBehavior passHref>
                <NavigationMenuLink className={navMenuTriggerStyle}>About Us</NavigationMenuLink>
              </Link>
            </NavigationMenuItem>

            {/* Link - Contact Us */}
            <NavigationMenuItem>
              <Link href="/docs" legacyBehavior passHref>
                <NavigationMenuLink className={navMenuTriggerStyle}>Contact Us</NavigationMenuLink>
              </Link>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
      </div>

      {/* Mobile Navigation */}
      <div className="md:hidden w-full h-full">
        <Sheet>
          <SheetTrigger asChild className="flex items-center justify-center">
            <Button variant={"ghost"} size={"icon"} title="Hamburger_Menu" aria-expanded="false">
              <Menu className="min-h-7 min-w-7" />
              <span className="sr-only">Toggle menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-full h-full max-w-xs gap-0">

            <SheetHeader className="shadow-xs">
              <SheetTitle>
                <BrandLogo brandImgClasses="" brandNameClasses="" />
              </SheetTitle>
              <SheetDescription></SheetDescription>
            </SheetHeader>

            <ScrollArea className="h-[calc(100dvh-4.625rem)] overflow-hidden">
              <div className="px-1.5 divide-y overflow-hidden">
                <Link href="#" legacyBehavior passHref>
                  <div className={accordMenuTriggerStyle}>
                    <h3 className={`text-base font-medium`}>Hot Deals</h3>
                  </div>
                </Link>

                <Accordion type={"multiple"} className="w-full">
                  <AccordionItem value="item-1">
                    <AccordionTrigger className={accordMenuTriggerStyle}>
                      <h3 className="text-base font-medium">Getting started</h3>
                    </AccordionTrigger>
                    <AccordionContent>
                      <div className="pl-3 flex flex-col space-y-2">
                        <ListItemMobile href="/docs" title="Shadcn/UI">Beautifully designed components built with Radix UI and Tailwind CSS.</ListItemMobile>
                        <ListItemMobile href="/docs" title="Introduction">Re-usable components built using Radix UI and Tailwind CSS.</ListItemMobile>
                        <ListItemMobile href="/docs/installation" title="Installation">How to install dependencies and structure your app.</ListItemMobile>
                        <ListItemMobile href="/docs/primitives/typography" title="Typography">Styles for headings, paragraphs, lists...etc</ListItemMobile>
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="item-2">
                    <AccordionTrigger className={accordMenuTriggerStyle}>
                      <h3 className="text-base font-medium">Components</h3>
                    </AccordionTrigger>
                    <AccordionContent>
                      <div className="pl-3 flex flex-col space-y-2">
                        {components.map((component) => (
                          <ListItemMobile key={component.title} href={component.href} title={component.title}>
                            {component.description}
                          </ListItemMobile>
                        ))}
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>

                <div className="divide-y">
                  <Link href="#" legacyBehavior passHref>
                    <div className={accordMenuTriggerStyle}>
                      <h3 className={`text-base font-medium`}>About Us</h3>
                    </div>
                  </Link>
                  <Link href="#" legacyBehavior passHref>
                    <div className={accordMenuTriggerStyle}>
                      <h3 className={`text-base font-medium`}>Contact Us</h3>
                    </div>
                  </Link>

                  <Link href="#" legacyBehavior passHref>
                    <div className={accordMenuTriggerStyle}>
                      <h3 className="text-base font-medium">Documentation</h3>
                    </div>
                  </Link>
                </div>
              </div>
            </ScrollArea>

          </SheetContent>
        </Sheet>
      </div>
    </div>
  )
}