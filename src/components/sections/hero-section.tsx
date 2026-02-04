import Image from 'next/image';
import { name, title, summary, heroImage } from '@/lib/data';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { ArrowDown } from 'lucide-react';

export default function HeroSection() {
  return (
    <section id="hero" className="relative bg-background">
      <div className="container grid md:grid-cols-2 min-h-screen items-center">
        <div className="space-y-6 py-12 animate-in fade-in slide-in-from-left-8 duration-1000">
          <div className="space-y-2">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-headline font-bold text-foreground">
              {name}
            </h1>
            <p className="text-xl md:text-2xl text-accent font-medium font-headline">
              {title}
            </p>
          </div>
          <div className="text-lg text-muted-foreground max-w-2xl">
            {summary}
          </div>
          <div className="flex gap-4 flex-wrap">
              <Button asChild size="lg">
                  <Link href="#contact">Contactar</Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                  <Link href="#portfolio">Ver Proyectos <ArrowDown className="ml-2 h-4 w-4" /></Link>
              </Button>
          </div>
        </div>

        <div className="relative h-full w-full hidden md:block">
          <div className="absolute inset-0 bg-gradient-to-l from-transparent via-background/50 to-background" />
           <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent" />
          <Image
            src={heroImage.imageUrl}
            alt={`Portrait of ${name}`}
            fill
            priority
            className="object-contain object-bottom"
            data-ai-hint={heroImage.imageHint}
          />
        </div>
      </div>
    </section>
  );
}
