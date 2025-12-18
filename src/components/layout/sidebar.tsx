'use client';

import { Link, useLocation } from "react-router-dom";
import {
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarFooter,
} from "../../components/ui/sidebar";
import { Logo } from "../../components/logo";
import {
  LayoutDashboard,
  CheckCheck,
  Activity,
  HeartPulse,
  CircleOff,
  Settings,
  LogOut,
  CalendarCheck,
  Database,
  Package,
} from "lucide-preact";

const navItems = [
  { href: "/", icon: LayoutDashboard, label: "Dashboard" },
  { href: "/validation", icon: CheckCheck, label: "Validation" },
  { href: "/monitoring", icon: Activity, label: "Monitoring" },
  { href: "/health", icon: HeartPulse, label: "Tool Health" },
  { href: "/breakdowns", icon: CircleOff, label: "Breakdowns" },
  { href: "/preventive-maintenance", icon: CalendarCheck, label: "PM Planning" },
  { href: "/assets-management", icon: Package, label: "Assets Management" },
  { href: "/master-data", icon: Database, label: "Master Data" },
];

export function AppSidebar() {
  const location = useLocation();

  return (
    <Sidebar
      variant="sidebar"
      collapsible="offcanvas"
      className="border-r border-sidebar-border bg-sidebar pt-12 max-md:pb-24"
    >
      <SidebarHeader className="p-4">
        <Logo textClassName="text-sidebar-foreground group-data-[collapsible=icon]:hidden" />
      </SidebarHeader>

      <SidebarContent className="p-2">
        <SidebarMenu>
          {navItems.map((item) => {
            const isActive = location.pathname.startsWith(item.href);

            return (
              <SidebarMenuItem key={item.href}>
                <Link to={item.href}>
                  <SidebarMenuButton
                    data-active={isActive}
                    tooltip={item.label}
                    className="justify-start text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground data-[active=true]:bg-sidebar-accent data-[active=true]:text-sidebar-accent-foreground"
                    variant="ghost"
                  >
                    <item.icon className="h-5 w-5" />
                    <span>{item.label}</span>
                  </SidebarMenuButton>
                </Link>
              </SidebarMenuItem>
            );
          })}
        </SidebarMenu>
      </SidebarContent>

      <SidebarFooter className="p-2 pb-12">
        <SidebarMenu>
          <SidebarMenuItem>
            <Link to="/settings">
              <SidebarMenuButton
                data-active={location.pathname.startsWith("/settings")}
                tooltip="Settings"
                className="justify-start text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground data-[active=true]:bg-sidebar-accent data-[active=true]:text-sidebar-accent-foreground"
                variant="ghost"
              >
                <Settings className="h-5 w-5" />
                <span>Settings</span>
              </SidebarMenuButton>
            </Link>
          </SidebarMenuItem>

          <SidebarMenuItem>
            <Link to="/login">
              <SidebarMenuButton
                tooltip="Logout"
                className="justify-start text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
                variant="ghost"
              >
                <LogOut className="h-5 w-5" />
                <span>Logout</span>
              </SidebarMenuButton>
            </Link>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}
