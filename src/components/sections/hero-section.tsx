import Image from 'next/image';
import { name, title, summary, heroImage } from '@/lib/data';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { ArrowDown } from 'lucide-react';

export default function HeroSection() {
  return (
    <section id="hero" className="relative py-12 md:py-24 overflow-hidden">
      <div className="absolute inset-0 z-0">
        <Image
          src={heroImage.imageUrl}
          alt={`Portrait of ${name}`}
          fill
          priority
          className="object-cover object-center"
          data-ai-hint={heroImage.imageHint}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-background via-background/80 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />
      </div>
      <div className="container relative z-10">
        <div className="md:w-3/5 lg:w-1/2 space-y-6 animate-in fade-in slide-in-from-left-8 duration-1000">
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
      </div>
    </section>
  );
}
