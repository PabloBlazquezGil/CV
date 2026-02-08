
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
  activeCategory: string;
}

export default function Header({ activeProfile, setActiveProfile, activeCategory }: HeaderProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);
  const [isScrolled, setIsScrolled] = React.useState(false);
  const [showProfileTip, setShowProfileTip] = React.useState(false);

  React.useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  React.useEffect(() => {
    let showTimer: NodeJS.Timeout;
    let hideTimer: NodeJS.Timeout;

    const tipShown = localStorage.getItem('profileTipShown');

    const hideNow = () => {
      setShowProfileTip(false);
      localStorage.setItem('profileTipShown', 'true');
      window.removeEventListener('scroll', hideNow);
      window.removeEventListener('click', hideNow);
      clearTimeout(showTimer);
      clearTimeout(hideTimer);
    };

    if (!tipShown) {
      showTimer = setTimeout(() => setShowProfileTip(true), 1500);
      hideTimer = setTimeout(hideNow, 8000);
      window.addEventListener('scroll', hideNow, { once: true });
      window.addEventListener('click', hideNow, { once: true });
    }

    return () => {
      clearTimeout(showTimer);
      clearTimeout(hideTimer);
      window.removeEventListener('scroll', hideNow);
      window.removeEventListener('click', hideNow);
    };
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
          <div className="relative mr-6 flex items-center space-x-4">
            {showProfileTip && (
              <div className="absolute -top-14 left-1/2 -translate-x-1/2 w-max animate-fade-in-up">
                <div className="relative rounded-full bg-primary/90 px-4 py-1.5 text-sm text-primary-foreground shadow-lg">
                  <p>Pulsa los iconos para cambiar de perfil</p>
                  <div className="absolute bottom-[-7px] left-1/2 -translate-x-1/2 w-0 h-0 border-l-[8px] border-l-transparent border-t-[8px] border-t-primary/90 border-r-[8px] border-r-transparent"></div>
                </div>
              </div>
            )}
            <div className="flex items-center gap-2">
              <button onClick={() => setActiveProfile("investigacion")} className={cn("p-2 rounded-full transition-colors", activeProfile === 'investigacion' && 'bg-primary/20 text-primary')}>
                <Dna className="w-6 h-6" />
              </button>
              <div className="w-px h-6 bg-border/80" />
              <button onClick={() => setActiveProfile("comunicacion")} className={cn("p-2 rounded-full transition-colors", activeProfile === 'comunicacion' && 'bg-primary/20 text-primary')}>
                <Camera className="w-6 h-6" />
              </button>
            </div>
            <div className="hidden md:block">
              <span className="font-semibold text-accent text-lg">{activeCategory}</span>
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
