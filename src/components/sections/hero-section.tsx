import Image from 'next/image';
import { name, title, summary, heroImage } from '@/lib/data';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function HeroSection() {
  return (
    <section id="hero" className="relative bg-background overflow-hidden">
      <div className="container relative z-10 grid md:grid-cols-2 gap-8 items-center min-h-[85vh] py-16 md:py-0">
        <div className="space-y-6">
          <div className="space-y-3">
            <h1 className="text-4xl md:text-5xl lg:text-7xl font-headline font-bold text-foreground">
              {name}
            </h1>
            <p className="text-2xl md:text-3xl text-primary font-medium font-headline">
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
            className="object-cover object-center"
            data-ai-hint={heroImage.imageHint}
          />
          <div className="absolute inset-0 bg-gradient-to-l from-transparent via-background/60 to-background"></div>
        </div>
      </div>
    </section>
  );
}
