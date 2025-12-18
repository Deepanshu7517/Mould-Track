import {SidebarProvider } from "../../components/ui/sidebar";
import { AppSidebar } from "../../components/layout/sidebar";
import { AppHeader } from "../../components/layout/header";

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
        <AppSidebar />
        <div className="flex flex-col w-full">
            <AppHeader />
            <main className="flex-1 p-4 md:p-6">{children}</main>
        </div>
    </SidebarProvider>
  );
}
