"use client";

import { contact } from "@/lib/data";
import { Button } from "@/components/ui/button";
import { Linkedin, Mail, Phone, ArrowRight, Download } from "lucide-react";
import { Card, CardContent, CardTitle, CardDescription } from "@/components/ui/card";
import { useRef, useEffect, useState } from "react";
import { cn } from "@/lib/utils";

export default function ContactSection() {
  const ref = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(element);
        }
      },
      { threshold: 0.1 }
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  return (
    <footer 
      id="contact" 
      ref={ref}
      className={cn(
        "py-16 md:py-24 bg-background/50 mt-10 md:mt-20 transition-all duration-700 ease-out",
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
      )}
    >
      <div className="w-full max-w-[90vw] lg:max-w-7xl mx-auto">
        <Card className="max-w-3xl mx-auto shadow-2xl bg-card/80 border-primary/20 border hover:shadow-primary/20 transition-shadow duration-500 backdrop-blur-sm">
            <CardContent className="p-8 md:p-12 text-center">
                <div className="flex flex-col items-center gap-8">
                    <div className="space-y-2">
                        <CardTitle className="text-5xl md:text-6xl font-bold font-headline text-primary">¿Hablamos?</CardTitle>
                        <CardDescription className="text-xl xl:text-2xl text-muted-foreground max-w-xl mx-auto">
                            Si tienes un proyecto en mente, una oportunidad de colaboración o simplemente quieres conectar, estaré encantado de escucharte.
                        </CardDescription>
                    </div>
                    
                    <div className="flex flex-col items-center gap-4 w-full max-w-sm">
                      <Button asChild size="lg" className="w-full group">
                          <a href={`mailto:${contact.email}`}>
                              <Mail className="mr-2" /> Envíame un email
                              <ArrowRight className="ml-auto opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                          </a>
                      </Button>
                      
                      <Button asChild size="lg" variant="secondary" className="w-full group">
                        <a href="/cv.html" target="_blank" rel="noopener noreferrer">
                            <Download className="mr-2" /> Ver CV para descargar
                        </a>
                      </Button>

                      <div className="flex items-center gap-4 pt-4">
                          <Button asChild variant="ghost" className="text-base">
                              <a href={`tel:${contact.phone}`}>
                                  <Phone className="mr-2" /> Llamar
                              </a>
                          </Button>
                           <div className="w-px h-6 bg-border" />
                          <Button asChild variant="ghost" className="text-base">
                              <a href={contact.linkedin} target="_blank" rel="noopener noreferrer">
                                  <Linkedin className="mr-2" /> LinkedIn
                              </a>
                          </Button>
                      </div>
                    </div>
                </div>
            </CardContent>
        </Card>
      </div>
    </footer>
  );
}
