"use client";

import { education, complementaryEducation } from "@/lib/data";
import { GraduationCap, Sparkles } from "lucide-react";
import type { Profile } from "@/app/page";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useRef, useEffect, useState } from "react";
import { cn } from "@/lib/utils";

interface EducationSectionProps {
  profile: Profile;
}

export default function EducationSection({ profile }: EducationSectionProps) {
  const complementaryToShow = complementaryEducation[profile] || [];
  const isCommunicator = profile === 'comunicacion';

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
    <section 
      id="education"
      ref={ref}
      className={cn(
        "transition-all duration-700 ease-out",
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
      )}
    >
      <div className="text-center mb-12">
        <h2 className="text-4xl font-headline font-bold flex items-center justify-center gap-2">
          <GraduationCap className="w-8 h-8 text-primary" />
          Formación
        </h2>
      </div>

      <div className="space-y-12">
        {!isCommunicator && (
          <div>
            <div className="space-y-4">
              {education.map((item, index) => (
                <Card key={index} className="shadow-lg bg-card/50 border border-transparent hover:shadow-[0_0_15px_hsl(var(--primary)/0.4)] transition-all duration-300">
                  <CardContent className="p-6 flex items-center justify-between gap-4">
                    <div>
                      <p className="font-bold text-lg">{item.degree}</p>
                      <p className="text-accent">{item.institution}</p>
                    </div>
                    <Badge variant="secondary" className="text-sm px-3 py-1 shrink-0">{item.year}</Badge>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}

        {complementaryToShow.length > 0 && (
          <div>
            <h3 className="text-2xl font-headline font-semibold my-6 flex items-center justify-center gap-2 text-accent">
              <Sparkles className="w-6 h-6" />
              Formación Complementaria
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {complementaryToShow.map((item, index) => (
                <Card key={index} className="h-full shadow-lg bg-card/50 border border-transparent hover:shadow-[0_0_15px_hsl(var(--primary)/0.4)] transition-all duration-300 flex flex-col">
                  <CardContent className="p-4 flex flex-col flex-grow">
                    <p className="font-semibold flex-grow text-base">{item.title}</p>
                    <div className="flex justify-between items-center mt-2 pt-2 border-t border-border/20">
                      <p className="text-accent text-sm">{item.institution || ' '}</p>
                      <Badge variant="secondary" className="text-xs px-2 py-0.5 shrink-0">{item.year}</Badge>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
