
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
    <section id="experience">
      <div className="text-center mb-12">
        <h2 className="text-4xl font-headline font-bold flex items-center justify-center gap-2">
          <Briefcase className="w-8 h-8 text-primary" />
          Experiencia Profesional
        </h2>
      </div>
      <div className="flex flex-col items-center gap-y-12">
        {experiencesToShow.map((expCategory) => (
          <div key={expCategory.category} className="w-full">
            <div className="relative space-y-8">
              <div className="absolute left-3.5 h-full w-0.5 bg-border -z-10" aria-hidden="true"></div>
              {expCategory.items.map((item, index) => (
                <div key={index} className="relative pl-12">
                   <div className="absolute left-0 top-1.5 w-7 h-7 bg-secondary rounded-full flex items-center justify-center ring-8 ring-background">
                    <div className="w-3 h-3 bg-primary rounded-full"></div>
                  </div>
                  <Card className="shadow-lg h-full bg-card/50 border border-transparent hover:shadow-[0_0_15px_hsl(var(--primary)/0.4)] transition-all duration-300">
                     <CardHeader className="p-6">
                      <div className="flex justify-between items-baseline gap-4 flex-wrap">
                        <CardTitle className="text-xl font-bold">{item.role}</CardTitle>
                        <p className="text-lg shrink-0">{item.period}</p>
                      </div>
                      <CardDescription className="font-semibold text-accent text-xl pt-2">
                        {item.company}
                        {item.details && (
                          <span className="font-normal text-lg italic"> - {item.details}</span>
                        )}
                      </CardDescription>
                      <p className="text-lg pt-2">{item.description}</p>
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
