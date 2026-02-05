import Image from 'next/image';
import { name, title, summary, heroImage } from '@/lib/data';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { ArrowDown } from 'lucide-react';

export default function HeroSection() {
  return (
    <section id="hero" className="bg-background">
      <div className="container grid md:grid-cols-2 gap-12 items-center min-h-[80vh]">
        <div className="space-y-6">
          <div className="space-y-3">
            <h1 className="text-4xl md:text-5xl lg:text-7xl font-headline font-bold text-foreground">
              {name}
            </h1>
            <p className="text-2xl md:text-3xl text-primary font-medium font-headline">
              {title}
            </p>
          </div>
          <div className="text-lg text-muted-foreground max-w-xl">
            {summary}
          </div>
          <div className="flex gap-4 flex-wrap">
              <Button asChild size="lg">
                  <Link href="#contact">Contactar</Link>
              </Button>
              <Button asChild variant="secondary" size="lg">
                  <Link href="#portfolio">Ver Proyectos <ArrowDown className="ml-2 h-4 w-4" /></Link>
              </Button>
          </div>
        </div>

        <div className="relative h-96 w-96 justify-self-center hidden md:block">
          <Image
            src={heroImage.imageUrl}
            alt={`Portrait of ${name}`}
            fill
            priority
            className="object-cover rounded-full shadow-2xl"
            data-ai-hint={heroImage.imageHint}
          />
        </div>
      </div>
    </section>
  );
}
