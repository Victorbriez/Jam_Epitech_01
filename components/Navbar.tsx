"use client";

import Link from "next/link";
import {
  Telescope,
  Menu,
  Home,
  Image as ImageIcon,
  Circle,
  Info,
} from "lucide-react";
import { ThemeToggle } from "./theme-toggle";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";
import { useState } from "react";

const navItems = [
  { href: "/", label: "Accueil", icon: Home },
  { href: "/planetes", label: "Planètes", icon: Circle },
  { href: "/picture-of-the-day", label: "Image du Jour", icon: ImageIcon },
  { href: "/about", label: "À propos", icon: Info },
];

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80 shadow-sm">
      <div className="container max-w-6xl mx-auto flex h-16 items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link
          href="/"
          className="flex items-center space-x-3 hover:opacity-80 transition-opacity duration-300"
        >
          <Telescope className="h-7 w-7 text-primary" />
          <span className="text-2xl font-black tracking-tight text-foreground">
            EpiSpace
          </span>
        </Link>

        <div className="hidden md:flex md:items-center md:space-x-6 lg:space-x-8">
          {navItems.map((item) => (
            <NavItem key={item.href} {...item} />
          ))}
          <div className="pl-2 border-l border-muted-foreground/30">
            <ThemeToggle />
          </div>
        </div>

        <div className="flex md:hidden">
          <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="hover:bg-accent">
                <Menu className="h-6 w-6" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              align="end"
              className="w-64 bg-background/95 backdrop-blur-md"
            >
              {navItems.map((item) => (
                <DropdownMenuItem
                  key={item.href}
                  asChild
                  className="focus:bg-accent/50"
                >
                  <Link
                    href={item.href}
                    className="flex w-full items-center space-x-3 py-2"
                    onClick={() => setIsOpen(false)}
                  >
                    <item.icon className="h-5 w-5 text-muted-foreground" />
                    <span>{item.label}</span>
                  </Link>
                </DropdownMenuItem>
              ))}
              <DropdownMenuItem className="focus:bg-accent/50">
                <div className="flex w-full items-center justify-between">
                  <span>Theme</span>
                  <ThemeToggle />
                </div>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </nav>
  );
}

function NavItem({
  href,
  label,
  icon: Icon,
}: {
  href: string;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
}) {
  return (
    <Link
      href={href}
      className={cn(
        "group flex items-center space-x-2 text-sm font-medium transition-all duration-300 hover:text-primary",
        href === "/"
          ? "text-foreground"
          : "text-muted-foreground hover:translate-x-1 hover:scale-105"
      )}
    >
      <Icon className="h-5 w-5 opacity-70 group-hover:opacity-100 transition-opacity" />
      <span>{label}</span>
    </Link>
  );
}

export default Navbar;
