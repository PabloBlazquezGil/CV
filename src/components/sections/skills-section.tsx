"use client";

import { skills } from "@/lib/data";
import { Badge } from "@/components/ui/badge";
import { Code, User, Languages } from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import type { Profile } from "@/app/page";
import { useRef, useEffect, useState } from "react";
import { cn } from "@/lib/utils";

interface SkillsSectionProps {
  profile: Profile;
}

export default function SkillsSection({ profile }: SkillsSectionProps) {
  const skillsToShow = skills[profile];

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
      id="skills" 
      ref={ref}
      className={cn(
        "container py-10 md:py-20 transition-all duration-700 ease-out",
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
      )}
    >
      <h2 className="text-4xl font-headline font-bold text-center mb-12 flex items-center justify-center gap-2">
        <Code className="w-8 h-8 text-primary" />
        Competencias y Aptitudes
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
        <Card className="shadow-lg bg-card/50 border border-transparent hover:border-primary/20 hover:shadow-[0_0_15px_hsl(var(--primary)/0.4)] transition-all duration-300">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-2xl font-headline">
              <Code className="w-6 h-6 text-accent" />
              Técnicas
            </CardTitle>
          </CardHeader>
          <CardContent className="flex flex-wrap gap-2">
            {skillsToShow.technical.map((skill, index) => (
              <Badge key={index} variant="secondary" className="text-base px-3 py-1">
                {skill}
              </Badge>
            ))}
          </CardContent>
        </Card>
        <Card className="shadow-lg bg-card/50 border border-transparent hover:border-primary/20 hover:shadow-[0_0_15px_hsl(var(--primary)/0.4)] transition-all duration-300">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-2xl font-headline">
              <User className="w-6 h-6 text-accent" />
              Personales
            </CardTitle>
          </CardHeader>
          <CardContent className="flex flex-wrap gap-2">
            {skills.personal.map((skill, index) => (
              <Badge key={index} variant="secondary" className="text-base px-3 py-1">
                {skill}
              </Badge>
            ))}
          </CardContent>
        </Card>
        <Card className="shadow-lg bg-card/50 border border-transparent hover:border-primary/20 hover:shadow-[0_0_15px_hsl(var(--primary)/0.4)] transition-all duration-300">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-2xl font-headline">
              <Languages className="w-6 h-6 text-accent" />
              Idiomas
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {skills.languages.map((lang, index) => (
              <div key={index} className="flex justify-between items-baseline gap-4">
                <span className="font-medium shrink-0 text-lg">{lang.lang}</span>
                <span className="text-foreground text-right text-lg">{lang.level}</span>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
