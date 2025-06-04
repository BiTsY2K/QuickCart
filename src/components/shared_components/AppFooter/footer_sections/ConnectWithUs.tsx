"use client";

import Link from "next/link";

import { socialLinks } from "@/data/content";

export function ConnectWithUs({
  className,
}: {
  className?: string,
}) {
  return (
    <div className="px-2.5 row-start-2 row-span-1 col-span-2 lg:row-start-2 lg:col-start-1 lg:row-span-1 lg:col-span-3">
      <h4 className="mb-2 font-semibold">Connect with Us</h4>
      <ul className="flex gap-4 mt-1">
        {socialLinks.map((listItem) => (
          <li key={listItem.href}>
            <Link className="text-lg" href="/">{listItem.Icon}</Link>
          </li>
        ))}
      </ul>
    </div>
  )
}