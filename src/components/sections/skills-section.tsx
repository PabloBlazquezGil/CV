"use client";

import { skills } from "@/lib/data";
import { Badge } from "@/components/ui/badge";
import { Code, User, Languages } from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

export default function SkillsSection() {

  return (
    <section id="skills" className="container py-10 md:py-20">
      <h2 className="text-4xl font-headline font-bold text-center mb-12 flex items-center justify-center gap-2">
        <Code className="w-8 h-8 text-primary" />
        Competencias y Aptitudes
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
        <Card className="shadow-lg bg-card/50 group hover:bg-primary transition-all duration-300 cursor-pointer">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-2xl font-headline group-hover:text-primary-foreground">
              <Code className="w-6 h-6 text-accent group-hover:text-primary-foreground" />
              Técnicas
            </CardTitle>
          </CardHeader>
          <CardContent className="flex flex-wrap gap-2">
            {skills.technical.map((skill, index) => (
              <Badge key={index} variant="secondary" className="text-base px-3 py-1 group-hover:bg-primary-foreground group-hover:text-primary group-hover:hover:bg-primary-foreground/90">
                {skill}
              </Badge>
            ))}
          </CardContent>
        </Card>
        <Card className="shadow-lg bg-card/50 group hover:bg-primary transition-all duration-300 cursor-pointer">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-2xl font-headline group-hover:text-primary-foreground">
              <User className="w-6 h-6 text-accent group-hover:text-primary-foreground" />
              Personales
            </CardTitle>
          </CardHeader>
          <CardContent className="flex flex-wrap gap-2">
            {skills.personal.map((skill, index) => (
              <Badge key={index} variant="secondary" className="text-base px-3 py-1 group-hover:bg-primary-foreground group-hover:text-primary group-hover:hover:bg-primary-foreground/90">
                {skill}
              </Badge>
            ))}
          </CardContent>
        </Card>
        <Card className="shadow-lg bg-card/50 group hover:bg-primary transition-all duration-300 cursor-pointer">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-2xl font-headline group-hover:text-primary-foreground">
              <Languages className="w-6 h-6 text-accent group-hover:text-primary-foreground" />
              Idiomas
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {skills.languages.map((lang, index) => (
              <div key={index} className="flex justify-between items-baseline gap-4 group-hover:text-primary-foreground">
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
