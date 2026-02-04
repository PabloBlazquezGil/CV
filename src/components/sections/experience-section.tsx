import { experience } from "@/lib/data";
import { Briefcase } from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card";

export default function ExperienceSection() {
  return (
    <section id="experience" className="container py-12 md:py-24 animate-in fade-in slide-in-from-bottom-8 duration-1000">
      <h2 className="text-3xl font-headline font-bold text-center mb-12 flex items-center justify-center gap-2">
        <Briefcase className="w-8 h-8 text-accent" />
        Work Experience
      </h2>
      <div className="relative max-w-3xl mx-auto">
        <div className="absolute left-1/2 -translate-x-1/2 h-full w-0.5 bg-border" aria-hidden="true"></div>
        <div className="space-y-12">
          {experience.map((item, index) => (
            <div key={index} className="relative flex items-center">
              <div className={`w-1/2 ${index % 2 === 0 ? 'pr-8 text-right' : 'pl-8 text-left'}`}>
                <Card className={`shadow-lg text-left ${index % 2 === 0 ? '' : 'ml-auto'}`}>
                  <CardHeader>
                    <CardTitle>{item.role}</CardTitle>
                    <CardDescription className="text-accent font-semibold">{item.company}</CardDescription>
                    <p className="text-sm text-muted-foreground">{item.period}</p>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm">{item.description}</p>
                  </CardContent>
                </Card>
              </div>
              <div className="absolute left-1/2 -translate-x-1/2 w-4 h-4 bg-primary rounded-full border-4 border-background"></div>
              <div className={`w-1/2 ${index % 2 === 0 ? 'pl-8' : 'pr-8'}`}></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
