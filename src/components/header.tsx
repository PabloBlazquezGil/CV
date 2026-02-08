
"use client";

import * as React from "react";
import Link from "next/link";
import { Camera, Menu, X, Dna } from "lucide-react";
import { name } from "@/lib/data";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import type { Profile } from "@/app/page";
import { cn } from "@/lib/utils";

const navLinks = [
  { href: "#experience", label: "Experiencia" },
  { href: "#education", label: "Formación" },
  { href: "#skills", label: "Competencias" },
  { href: "#contact", label: "Contacto" },
];

interface HeaderProps {
  activeProfile: Profile;
  setActiveProfile: (profile: Profile) => void;
}

export default function Header({ activeProfile, setActiveProfile }: HeaderProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);
  const [isScrolled, setIsScrolled] = React.useState(false);

  React.useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const closeMobileMenu = () => setIsMobileMenuOpen(false);

  return (
    <>
      <header
        className={`sticky top-0 z-50 w-full transition-all duration-300 ${
          isScrolled
            ? "border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60"
            : "bg-background"
        }`}
      >
        <div className="container flex h-16 items-center">
          <div className="mr-6 flex items-center space-x-2">
            <div className="flex items-center gap-2">
              <button onClick={() => setActiveProfile("investigacion")} className={cn("p-2 rounded-full transition-colors", activeProfile === 'investigacion' && 'bg-primary/20 text-primary')}>
                <Dna className="w-6 h-6" />
              </button>
              <div className="w-px h-6 bg-border/80" />
              <button onClick={() => setActiveProfile("comunicacion")} className={cn("p-2 rounded-full transition-colors", activeProfile === 'comunicacion' && 'bg-primary/20 text-primary')}>
                <Camera className="w-6 h-6" />
              </button>
            </div>
          </div>
          <div className="flex flex-1 items-center justify-end space-x-2">
            <nav className="hidden md:flex md:items-center md:space-x-4 lg:space-x-6">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
                >
                  {link.label}
                </Link>
              ))}
            </nav>
            <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" className="md:hidden">
                  <Menu className="h-6 w-6" />
                  <span className="sr-only">Open menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-full">
                <div className="flex h-full flex-col">
                  <div className="flex items-center justify-between border-b pb-4">
                    <Link href="#" className="flex items-center space-x-2" onClick={closeMobileMenu}>
                      <span className="font-bold">{name}</span>
                    </Link>
                    <SheetTrigger asChild>
                      <Button variant="ghost" size="icon">
                        <X className="h-6 w-6" />
                      </Button>
                    </SheetTrigger>
                  </div>
                  <nav className="mt-8 flex flex-col space-y-4">
                    {navLinks.map((link) => (
                      <Link
                        key={link.href}
                        href={link.href}
                        className="text-lg font-medium"
                        onClick={closeMobileMenu}
                      >
                        {link.label}
                      </Link>
                    ))}
                  </nav>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </header>
    </>
  );
}
