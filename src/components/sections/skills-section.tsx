"use client";

import { skills } from "@/lib/data";
import { Badge } from "@/components/ui/badge";
import { Code, User, Languages } from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

export default function SkillsSection() {

  return (
    <section id="skills" className="container py-12 md:py-24 animate-in fade-in slide-in-from-bottom-8 duration-1000">
      <h2 className="text-3xl font-headline font-bold text-center mb-12 flex items-center justify-center gap-2">
        <Code className="w-8 h-8 text-accent" />
        Competencias y Aptitudes
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-xl font-headline">
              <Code className="w-6 h-6 text-primary" />
              Técnicas
            </CardTitle>
          </CardHeader>
          <CardContent className="flex flex-wrap gap-2">
            {skills.technical.map((skill, index) => (
              <Badge key={index} variant="secondary" className="text-sm px-3 py-1">
                {skill}
              </Badge>
            ))}
          </CardContent>
        </Card>
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-xl font-headline">
              <User className="w-6 h-6 text-primary" />
              Personales
            </CardTitle>
          </CardHeader>
          <CardContent className="flex flex-wrap gap-2">
            {skills.personal.map((skill, index) => (
              <Badge key={index} variant="secondary" className="text-sm px-3 py-1">
                {skill}
              </Badge>
            ))}
          </CardContent>
        </Card>
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-xl font-headline">
              <Languages className="w-6 h-6 text-primary" />
              Idiomas
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {skills.languages.map((lang, index) => (
              <div key={index} className="flex justify-between items-baseline gap-4">
                <span className="font-medium shrink-0">{lang.lang}</span>
                <span className="text-muted-foreground text-right">{lang.level}</span>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
