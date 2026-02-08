"use client";

import Image from 'next/image';
import { name, titles, summaries, heroImage } from '@/lib/data';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import type { Profile } from '@/app/page';
import { useEffect, useState } from 'react';
import { cn } from '@/lib/utils';

interface HeroSectionProps {
  profile: Profile;
}

export default function HeroSection({ profile }: HeroSectionProps) {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => setIsMounted(true), 200);
    return () => clearTimeout(timeout);
  }, []);

  return (
    <section id="hero" className="relative bg-background overflow-hidden">
      <div className="w-full max-w-[90vw] mx-auto relative z-10 grid md:grid-cols-2 gap-8 items-center min-h-[85vh] py-16 md:py-0">
        <div className="space-y-6">
          <div className={cn("space-y-3 transition-all duration-500 ease-out", isMounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4')}>
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-headline font-bold text-foreground">
              {name}
            </h1>
            <p className="text-3xl md:text-4xl text-primary font-medium font-headline">
              {titles[profile]}
            </p>
          </div>
          <p className={cn("text-lg xl:text-xl text-foreground max-w-2xl transition-all duration-500 ease-out delay-200", isMounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4')}>
            {summaries[profile]}
          </p>
          <div className={cn("flex gap-4 flex-wrap transition-all duration-500 ease-out delay-300", isMounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4')}>
            <Button asChild size="lg">
              <Link href="#contact">Contactar</Link>
            </Button>
          </div>
        </div>
      </div>
      <div className={cn("absolute inset-0 z-0 transition-opacity duration-1000 ease-out", isMounted ? 'opacity-100' : 'opacity-0')}>
        <div className="absolute right-0 top-0 bottom-0 w-full md:w-2/3">
          <Image
            src={heroImage.imageUrl}
            alt={`Portrait of ${name}`}
            fill
            priority
            className="object-contain object-center md:object-right"
            data-ai-hint={heroImage.imageHint}
          />
          <div className="absolute inset-0 bg-gradient-to-l from-transparent via-background/60 to-background"></div>
        </div>
      </div>
    </section>
  );
}
