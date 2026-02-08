
import { education, complementaryEducation } from "@/lib/data";
import { GraduationCap, Sparkles } from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card";
import type { Profile } from "@/app/page";

interface EducationSectionProps {
  profile: Profile;
}

export default function EducationSection({ profile }: EducationSectionProps) {
  const complementaryToShow = complementaryEducation[profile] || [];
  const isCommunicator = profile === 'comunicacion';

  return (
    <section id="education" className="container py-10 md:py-20">
      <div className="text-center mb-12">
        <h2 className="text-4xl font-headline font-bold flex items-center justify-center gap-2">
          <GraduationCap className="w-8 h-8 text-primary" />
          Formación
        </h2>
      </div>

      {isCommunicator ? (
        // For Comunicador, show complementary as main formation
        <div className="flex flex-wrap justify-center gap-6 max-w-6xl mx-auto">
          {complementaryToShow.map((item, index) => (
            <Card key={index} className="text-center shadow-lg bg-card/50 border border-transparent h-full transition-all duration-300 hover:shadow-[0_0_15px_hsl(var(--primary)/0.4)] w-full max-w-sm">
              <CardContent className="p-6 flex flex-col items-center justify-center h-full">
                  <h4 className="font-bold font-headline text-xl mb-2">{item.title}</h4>
                  <p className="text-lg text-foreground">{item.details}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        // For Investigador, show main + complementary
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto mb-16">
            {education.map((item, index) => (
              <Card key={index} className="shadow-lg h-full bg-card/50 border border-transparent hover:shadow-[0_0_15px_hsl(var(--primary)/0.4)] transition-all duration-300">
                <CardHeader className="p-6">
                  <div className="flex justify-between items-baseline gap-4">
                    <CardTitle>{item.degree}</CardTitle>
                    <p className="text-lg text-foreground shrink-0">{item.period}</p>
                  </div>
                  <CardDescription className="font-semibold text-accent text-lg">{item.institution}</CardDescription>
                </CardHeader>
              </Card>
            ))}
          </div>
          
          {complementaryToShow.length > 0 && (
            <>
              <div className="text-center mb-12">
                  <h3 className="text-3xl font-headline font-semibold flex items-center justify-center gap-2 text-accent">
                    <Sparkles className="w-7 h-7" />
                    Formación Complementaria
                  </h3>
              </div>
    
               <div className="flex flex-wrap justify-center gap-6 max-w-6xl mx-auto">
                {complementaryToShow.map((item, index) => (
                  <Card key={index} className="text-center shadow-lg bg-card/50 border border-transparent h-full transition-all duration-300 hover:shadow-[0_0_15px_hsl(var(--primary)/0.4)] w-full max-w-xs">
                    <CardContent className="p-6 flex flex-col items-center justify-center h-full">
                        <h4 className="font-bold font-headline text-xl mb-2">{item.title}</h4>
                        <p className="text-lg text-foreground">{item.details}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </>
          )}
        </>
      )}
    </section>
  );
}
