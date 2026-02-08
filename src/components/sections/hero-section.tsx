"use client";

import Image from 'next/image';
import { name, titles, summaries, heroImage } from '@/lib/data';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import type { Profile } from '@/app/page';
import { useEffect, useState } from 'react';
import { cn } from '@/lib/utils';
import { Download, Loader2 } from 'lucide-react';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';


interface HeroSectionProps {
  profile: Profile;
}

export default function HeroSection({ profile }: HeroSectionProps) {
  const [isMounted, setIsMounted] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => setIsMounted(true), 200);
    return () => clearTimeout(timeout);
  }, []);

  const handleDownload = async () => {
    setIsDownloading(true);

    const cvElement = document.getElementById(`cv-template-${profile}`);

    if (cvElement) {
        try {
            const canvas = await html2canvas(cvElement, {
                scale: 3, // Higher scale for better quality
                useCORS: true,
                logging: false,
                backgroundColor: '#1d201d',
            });

            const imgData = canvas.toDataURL('image/png');
            
            const pdf = new jsPDF({
                orientation: 'portrait',
                unit: 'mm',
                format: 'a4',
            });

            const imgProps = pdf.getImageProperties(imgData);
            const pdfWidth = pdf.internal.pageSize.getWidth();
            const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
            
            let heightLeft = pdfHeight;
            let position = 0;
            const pageHeight = pdf.internal.pageSize.getHeight();

            pdf.addImage(imgData, 'PNG', 0, position, pdfWidth, pdfHeight);
            heightLeft -= pageHeight;

            while (heightLeft >= 0) {
              position = heightLeft - pdfHeight;
              pdf.addPage();
              pdf.addImage(imgData, 'PNG', 0, position, pdfWidth, pdfHeight);
              heightLeft -= pageHeight;
            }

            pdf.save(`CV_Pablo_Blazquez_Gil_${profile}.pdf`);

        } catch (error) {
            console.error("Error generating PDF:", error);
            // Consider adding a user-facing error notification (e.g., a toast)
        }
    }
    setIsDownloading(false);
  };


  return (
    <section id="hero" className="relative bg-background overflow-hidden">
      <div className="container relative z-10 grid md:grid-cols-2 gap-8 items-center min-h-[85vh] py-16 md:py-0">
        <div className="space-y-6">
          <div className={cn("space-y-3 transition-all duration-500 ease-out", isMounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4')}>
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-headline font-bold text-foreground">
              {name}
            </h1>
            <p className="text-3xl md:text-4xl text-primary font-medium font-headline">
              {titles[profile]}
            </p>
          </div>
          <div className={cn("text-xl text-foreground max-w-2xl transition-all duration-500 ease-out delay-200", isMounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4')}>
            {summaries[profile]}
          </div>
          <div className={cn("flex gap-4 flex-wrap transition-all duration-500 ease-out delay-300", isMounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4')}>
            <Button asChild size="lg">
              <Link href="#contact">Contactar</Link>
            </Button>
            <Button onClick={handleDownload} disabled={isDownloading} variant="outline" size="lg">
                {isDownloading ? (
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                ) : (
                    <Download className="mr-2 h-4 w-4" />
                )}
                Descargar CV
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
