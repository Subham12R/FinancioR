"use client";

import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useMedia } from "react-use";
import { Menu } from "lucide-react";

import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetHeader,
  SheetFooter,
  SheetTitle,
} from "./ui/sheet";
import { Button } from "./ui/button";
import { HeaderLogo } from "./header-logo";
import { NavButton } from "./ui/nav-button";
import Image from "next/image";

const routes = [
  { href: "/", label: "Overview" },
  { href: "/transactions", label: "Transactions" },
  { href: "/accounts", label: "Accounts" },
  { href: "/categories", label: "Categories" },
  { href: "/settings", label: "Settings" },
];

export const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();
  const [isMobile, setIsMobile] = useState(false);

  // Hydration-safe media detection
  const mediaQuery = useMedia("(max-width: 1024px)", false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setIsMobile(mediaQuery);
    }
  }, [mediaQuery]);

  const onClick = (href: string) => {
    router.push(href);
    setIsOpen(false);
  };

  if (isMobile) {
    return (
      <Sheet open={isOpen} onOpenChange={setIsOpen}>
        <SheetTrigger asChild>
          <Button
            variant="ghost"
            size="sm"
            className="absolute left-5 top-10 z-50 flex items-center gap-2 rounded-xl px-3 py-2 backdrop-blur-md bg-white/10 
                       border border-white/20 text-white shadow-md transition-all duration-300 ease-linear 
                       hover:bg-white/20 hover:backdrop-blur-lg hover:shadow-lg hover:text-amber-50 
                       focus:outline-none focus:ring-0 focus-visible:ring-0"
          >
            <Menu className="size-4" />
          </Button>
        </SheetTrigger>

        <SheetContent side="left" className="bg-white/10 backdrop-blur-xl text-white border-white/20 border">
          {/* Visually Hidden Title for accessibility */}
          <SheetTitle className="sr-only">Mobile Navigation</SheetTitle>

          {/* Logo/Header */}
          <SheetHeader className="flex items-center justify-center py-6">
            <Image src="/logo.svg" alt="logo" width={150} height={150} />
          </SheetHeader>

          {/* Navigation Links */}
          <nav className="flex flex-col items-center w-full gap-y-2">
            {routes.map((route) => (
              <Button
                key={route.href}
                variant={route.href === pathname ? "outline" : "ghost"}
                onClick={() => onClick(route.href)}
                className="w-full justify-start px-5 py-2 font-semibold text-zinc-800"
              >
                {route.label}
              </Button>
            ))}
          </nav>

          {/* Footer */}
          <SheetFooter className="absolute bottom-0 mt-10 flex justify-center items-center text-center">
            <p className="text-xs text-white/70">© 2025 Financio|Subham Karmakar</p>
          </SheetFooter>
        </SheetContent>
      </Sheet>
    );
  }

  // Desktop navigation
  return (
    <nav className="hidden lg:flex items-center gap-x-2 overflow-x-auto">
      {routes.map((route) => (
        <NavButton
          key={route.href}
          href={route.href}
          label={route.label}
          isActive={pathname === route.href}
        />
      ))}
    </nav>
  );
};
