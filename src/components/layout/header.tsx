import { Bell, CircleUser, PanelLeft } from "lucide-preact";
import { useLocation } from "react-router-dom"; // Change 1: Import useLocation

import { Button } from "../../components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../../components/ui/dropdown-menu";
import { useSidebar } from "../../components/ui/sidebar";
import { PlaceHolderImages } from "../../lib/placeholder-images";

export function AppHeader() {
  const { toggleSidebar } = useSidebar();
  const { pathname } = useLocation(); // Change 2: Use pathname from useLocation

  const getTitleFromPathname = (path: string) => {
    const segment = path.split("/").filter(Boolean).pop(); // filter(Boolean) handles trailing slashes
    if (!segment || segment === "app") return "Dashboard";
    return segment.charAt(0).toUpperCase() + segment.slice(1).replace(/-/g, " ");
  };

  const userAvatar = PlaceHolderImages.find(img => img.id === 'user-avatar');

  return (
    <header className="sticky top-0 z-30 flex h-14 shrink-0 items-center gap-4 border-b bg-card sm:static sm:h-auto sm:border-0 sm:bg-transparent sm:px-6 mt-16 bg-[#FFF4CE]">
      {/* Mobile Toggle */}
      <Button
        size="icon"
        variant="outline"
        onClick={(e) => {
          e.stopPropagation();
          toggleSidebar();
        }}
        className="md:hidden"
      >
        <PanelLeft className="h-5 w-5" />
        <span className="sr-only">Toggle Menu</span>
      </Button>

      {/* Desktop Toggle */}
      <Button
        size="icon"
        variant="outline"
        onClick={(e) => {
          e.stopPropagation();
          toggleSidebar();
        }}
        className="hidden md:flex"
      >
        <PanelLeft className="h-5 w-5" />
        <span className="sr-only">Toggle Menu</span>
      </Button>

      <div className="w-full flex-1">
        <h1 className="font-headline text-xl font-semibold md:text-2xl">
          {getTitleFromPathname(pathname)}
        </h1>
      </div>

      <div className="flex items-center gap-2">
        <Button variant="ghost" size="icon" className="text-muted-foreground">
          <Bell className="h-5 w-5" />
          <span className="sr-only">Toggle notifications</span>
        </Button>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="icon" className="overflow-hidden rounded-full">
              {userAvatar ? (
                // Change 3: Use standard img tag instead of Next.js Image
                <img
                  src={userAvatar.imageUrl}
                  alt="User Avatar"
                  className="h-10 w-10 object-cover rounded-full"
                />
              ) : (
                <CircleUser className="h-5 w-5" />
              )}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Settings</DropdownMenuItem>
            <DropdownMenuItem>Support</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Logout</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}