
import { experience } from "@/lib/data";
import { Briefcase } from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card";
import type { Profile } from "@/app/page";

interface ExperienceSectionProps {
  profile: Profile;
}

export default function ExperienceSection({ profile }: ExperienceSectionProps) {
  const experiencesToShow = experience[profile];

  return (
    <section id="experience" className="container py-10 md:py-20">
      <h2 className="text-4xl font-headline font-bold text-center mb-12 flex items-center justify-center gap-2">
        <Briefcase className="w-8 h-8 text-primary" />
        Experiencia Profesional
      </h2>
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-x-12 gap-y-12">
        {experiencesToShow.map((expCategory) => (
          <div key={expCategory.category}>
            <h3 className="text-3xl font-headline font-semibold text-accent mb-6">{expCategory.category}</h3>
            <div className="relative space-y-8">
              <div className="absolute left-3.5 h-full w-0.5 bg-border -z-10" aria-hidden="true"></div>
              {expCategory.items.map((item, index) => (
                <div key={index} className="relative pl-12">
                   <div className="absolute left-0 top-1.5 w-7 h-7 bg-secondary rounded-full flex items-center justify-center ring-8 ring-background">
                    <div className="w-3 h-3 bg-primary rounded-full"></div>
                  </div>
                  <Card className="shadow-lg bg-card/50 border border-transparent hover:border-primary/20 hover:shadow-[0_0_15px_hsl(var(--primary)/0.4)] transition-all duration-300">
                     <CardHeader>
                      <div className="flex justify-between items-baseline gap-4">
                        <CardTitle>{item.role}</CardTitle>
                        <p className="text-lg text-foreground shrink-0">{item.period}</p>
                      </div>
                      <CardDescription className="font-semibold text-accent text-xl">
                        {item.company}
                        {item.details && (
                          <span className="font-normal text-lg italic"> - {item.details}</span>
                        )}
                      </CardDescription>
                      <p className="text-lg text-foreground">{item.description}</p>
                    </CardHeader>
                  </Card>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
