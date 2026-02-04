"use client";

import * as React from "react";
import Link from "next/link";
import { Menu, Wand2, X, BotMessageSquare } from "lucide-react";
import { name } from "@/lib/data";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import CvTailorDialog from "./cv-tailor-dialog";

const navLinks = [
  { href: "#experience", label: "Experience" },
  { href: "#education", label: "Education" },
  { href: "#skills", label: "Skills" },
  { href: "#portfolio", label: "Portfolio" },
  { href: "#contact", label: "Contact" },
];

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);
  const [isScrolled, setIsScrolled] = React.useState(false);
  const [isTailorDialogOpen, setIsTailorDialogOpen] = React.useState(false);

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
          <Link href="#" className="mr-6 flex items-center space-x-2">
            <BotMessageSquare className="h-6 w-6 text-accent" />
            <span className="font-bold font-headline">{name}</span>
          </Link>
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
            <Button
              variant="outline"
              size="sm"
              onClick={() => setIsTailorDialogOpen(true)}
              className="hidden sm:inline-flex"
            >
              <Wand2 className="mr-2 h-4 w-4" />
              AI CV Tailor
            </Button>
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
                       <BotMessageSquare className="h-6 w-6 text-accent" />
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
                  <div className="mt-auto border-t pt-6">
                     <Button
                        variant="outline"
                        size="lg"
                        className="w-full"
                        onClick={() => {
                          closeMobileMenu();
                          setIsTailorDialogOpen(true);
                        }}
                      >
                        <Wand2 className="mr-2 h-4 w-4" />
                        AI CV Tailor
                    </Button>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </header>
      <CvTailorDialog open={isTailorDialogOpen} onOpenChange={setIsTailorDialogOpen} />
    </>
  );
}
