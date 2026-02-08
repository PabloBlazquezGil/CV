
import Image from 'next/image';
import { name, titles, summaries, heroImage } from '@/lib/data';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import type { Profile } from '@/app/page';

interface HeroSectionProps {
  profile: Profile;
}

export default function HeroSection({ profile }: HeroSectionProps) {
  return (
    <section id="hero" className="relative bg-background overflow-hidden">
      <div className="container relative z-10 grid md:grid-cols-2 gap-8 items-center min-h-[85vh] py-16 md:py-0">
        <div className="space-y-6">
          <div className="space-y-3">
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-headline font-bold text-foreground">
              {name}
            </h1>
            <p className="text-3xl md:text-4xl text-primary font-medium font-headline">
              {titles[profile]}
            </p>
          </div>
          <div className="text-xl text-foreground max-w-2xl">
            {summaries[profile]}
          </div>
          <div className="flex gap-4 flex-wrap">
            <Button asChild size="lg">
              <Link href="#contact">Contactar</Link>
            </Button>
          </div>
        </div>
      </div>
      <div className="absolute inset-0 z-0">
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
