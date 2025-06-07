import React from "react";
import AppHeader from "@/components/shared_components/AppHeader/AppHeader";
import AppFooter from "@/components/shared_components/AppFooter/AppFooter";


export default function ApplicationShopLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="min-h-screen flex flex-col">
      <AppHeader className="" />
      <main className="flex-1">
        {children}
      </main>
      <AppFooter className="" />
    </div>
  );
}
