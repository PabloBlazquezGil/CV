import Image from 'next/image';
import { name, title, summary, heroImage } from '@/lib/data';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { ArrowDown } from 'lucide-react';

export default function HeroSection() {
  return (
    <section id="hero" className="container grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12 items-center min-h-[calc(100vh-4rem)] py-12 md:py-24">
      <div className="md:col-span-2 space-y-6 animate-in fade-in slide-in-from-left-8 duration-1000">
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
      <div className="relative flex justify-center items-center animate-in fade-in zoom-in-90 duration-1000">
        <div className="absolute -inset-2 bg-gradient-to-br from-primary to-accent rounded-full blur-xl opacity-30"></div>
        <Image
          src={heroImage.imageUrl}
          alt={`Portrait of ${name}`}
          width={400}
          height={400}
          priority
          className="rounded-full aspect-square object-cover object-top border-4 border-card shadow-2xl z-10"
          data-ai-hint={heroImage.imageHint}
        />
      </div>
    </section>
  );
}
