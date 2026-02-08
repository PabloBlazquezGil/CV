
import { education, complementaryEducation } from "@/lib/data";
import { GraduationCap, Sparkles } from "lucide-react";
import type { Profile } from "@/app/page";
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

interface EducationSectionProps {
  profile: Profile;
}

export default function EducationSection({ profile }: EducationSectionProps) {
  const complementaryToShow = complementaryEducation[profile] || [];
  const isCommunicator = profile === 'comunicacion';

  return (
    <section id="education">
      <div className="text-center mb-12">
        <h2 className="text-4xl font-headline font-bold flex items-center justify-center gap-2">
          <GraduationCap className="w-8 h-8 text-primary" />
          Formación
        </h2>
      </div>

      <div className="space-y-12">
        {!isCommunicator && (
            <div className="relative space-y-8">
              <div className="absolute left-3.5 h-full w-0.5 bg-border -z-10" aria-hidden="true"></div>
              {education.map((item, index) => (
                <div key={index} className="relative pl-12">
                  <div className="absolute left-0 top-1.5 w-7 h-7 bg-secondary rounded-full flex items-center justify-center ring-8 ring-background">
                    <div className="w-3 h-3 bg-primary rounded-full"></div>
                  </div>
                  <Card className="shadow-lg h-full bg-card/50 border border-transparent hover:shadow-[0_0_15px_hsl(var(--primary)/0.4)] transition-all duration-300">
                    <CardHeader className="p-6">
                      <div className="flex justify-between items-baseline gap-4 flex-wrap">
                        <CardTitle className="text-xl font-bold">{item.degree}</CardTitle>
                        <p className="text-lg shrink-0">{item.period}</p>
                      </div>
                      <CardDescription className="font-semibold text-accent text-xl pt-2">
                        {item.institution}
                      </CardDescription>
                    </CardHeader>
                  </Card>
                </div>
              ))}
            </div>
        )}

        {complementaryToShow.length > 0 && (
          <div>
            {!isCommunicator && (
              <div className="text-center mb-12 mt-16">
                  <h3 className="text-3xl font-headline font-semibold flex items-center justify-center gap-2 text-accent">
                    <Sparkles className="w-7 h-7" />
                    Formación Complementaria
                  </h3>
              </div>
            )}
            <div className="relative space-y-8">
              <div className="absolute left-3.5 h-full w-0.5 bg-border -z-10" aria-hidden="true"></div>
              {complementaryToShow.map((item, index) => (
                <div key={index} className="relative pl-12">
                   <div className="absolute left-0 top-1.5 w-7 h-7 bg-secondary rounded-full flex items-center justify-center ring-8 ring-background">
                    <div className="w-3 h-3 bg-primary rounded-full"></div>
                  </div>
                  <Card className="shadow-lg h-full bg-card/50 border border-transparent hover:shadow-[0_0_15px_hsl(var(--primary)/0.4)] transition-all duration-300">
                     <CardHeader className="p-6">
                      <div className="flex justify-between items-baseline gap-4 flex-wrap">
                        <CardTitle className="text-xl font-bold">{item.title}</CardTitle>
                         <p className="text-lg shrink-0">{item.year}</p>
                      </div>
                       {(item.institution || item.hours) && (
                        <CardDescription className="font-semibold text-accent text-xl pt-2">
                          {item.institution}
                          {item.institution && item.hours ? " - " : ""}
                          {item.hours}
                        </CardDescription>
                      )}
                    </CardHeader>
                  </Card>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
