import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "./components/app-sidebar";
import { SiteHeader } from "./components/site-header";
import { SearchProvider } from "@/contexts/search-context-provider";
import PageDashboard from "./features/dashboard/page";


export default function ApplicationAdminPage() {
  return (
    <SearchProvider>
      <SidebarProvider style={
        {
          "--sidebar-width": "calc(var(--spacing) * 72)",
          "--header-height": "calc(var(--spacing) * 12)",
        } as React.CSSProperties
      }>
        <AppSidebar />
        <SidebarInset>
          <SiteHeader />
          <PageDashboard />
        </SidebarInset>
      </SidebarProvider>
    </SearchProvider>
  );
}