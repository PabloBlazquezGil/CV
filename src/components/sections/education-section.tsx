
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
          <div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {education.map((item, index) => (
                <Card key={index} className="shadow-lg h-full bg-card/50 border border-transparent hover:shadow-[0_0_15px_hsl(var(--primary)/0.4)] transition-all duration-300">
                  <CardHeader className="p-6">
                    <div className="flex justify-between items-baseline gap-4 flex-wrap">
                      <CardTitle className="text-lg font-bold">{item.degree}</CardTitle>
                      <p className="text-base shrink-0 bg-primary/20 text-primary px-2 py-0.5 rounded-full">{item.period}</p>
                    </div>
                    <CardDescription className="font-semibold text-accent text-base pt-2">
                      {item.institution}
                    </CardDescription>
                  </CardHeader>
                </Card>
              ))}
            </div>
             <div className="text-center my-12">
              <h3 className="text-3xl font-headline font-semibold flex items-center justify-center gap-2 text-accent">
                <Sparkles className="w-7 h-7" />
                Formación Complementaria
              </h3>
            </div>
          </div>
        )}

        {complementaryToShow.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {complementaryToShow.map((item, index) => (
              <Card key={index} className="shadow-lg h-full bg-card/50 border border-transparent hover:shadow-[0_0_15px_hsl(var(--primary)/0.4)] transition-all duration-300">
                 <CardHeader className="p-6">
                  <div className="flex justify-between items-baseline gap-4 flex-wrap">
                    <CardTitle className="text-lg font-bold">{item.title}</CardTitle>
                     <p className="text-base shrink-0 bg-primary/20 text-primary px-2 py-0.5 rounded-full">{item.year}</p>
                  </div>
                   {(item.institution || item.hours) && (
                    <CardDescription className="font-semibold text-accent text-base pt-2">
                      {item.institution}
                      {item.institution && item.hours ? " - " : ""}
                      {item.hours}
                    </CardDescription>
                  )}
                </CardHeader>
              </Card>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
