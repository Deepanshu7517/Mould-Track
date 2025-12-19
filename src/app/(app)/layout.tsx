
'use client';
import { AppSidebar } from "../../components/layout/sidebar";
import { AppHeader } from "../../components/layout/header";
import { SidebarProvider, useSidebar } from "../../components/ui/sidebar";
import { cn } from "../../lib/utils";

function AppLayoutContent({ children }: { children: React.ReactNode }) {
    const { isOpen, setIsOpen } = useSidebar();
  return (
      <>
        <AppSidebar />
        <div 
            onClick={() => {
                if(isOpen) setIsOpen(false);
            }}
            className={cn("flex flex-1 flex-col transition-all duration-300", isOpen && "md:ml-64")}>
            <main className={cn("flex flex-1 flex-col p-4 md:p-6 transition-all duration-300", isOpen && "md:blur-sm")}>
                <AppHeader />
                <div className="flex-1">{children}</div>
            </main>
        </div>
      </>
  );
}


export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
      <AppLayoutContent>{children}</AppLayoutContent>
    </SidebarProvider>
  );
}
