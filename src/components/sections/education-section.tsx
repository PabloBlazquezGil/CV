
import { education, complementaryEducation } from "@/lib/data";
import { GraduationCap, Sparkles } from "lucide-react";
import type { Profile } from "@/app/page";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

interface EducationSectionProps {
  profile: Profile;
}

export default function EducationSection({ profile }: EducationSectionProps) {
  const complementaryToShow = complementaryEducation[profile] || [];
  const isCommunicator = profile === 'comunicacion';

  const groupedComplementary = complementaryToShow.reduce((acc, item) => {
    const year = item.year;
    if (!acc[year]) {
      acc[year] = [];
    }
    acc[year].push(item);
    return acc;
  }, {} as Record<string, typeof complementaryToShow>);

  const groupedEducation = education.reduce((acc, item) => {
    const year = item.year;
    if (!acc[year]) {
      acc[year] = [];
    }
    acc[year].push(item);
    return acc;
  }, {} as Record<string, typeof education>);


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
              {Object.entries(groupedEducation).reverse().map(([year, items]) => (
                <Card key={year} className="shadow-lg h-full bg-card/50 border border-transparent hover:shadow-[0_0_15px_hsl(var(--primary)/0.4)] transition-all duration-300 flex flex-col">
                  <CardHeader>
                    <CardTitle className="text-xl font-bold">{year}</CardTitle>
                  </CardHeader>
                  <CardContent className="flex-grow space-y-4">
                    {items.map((item, index) => (
                       <div key={index}>
                        <p className="font-bold">{item.degree}</p>
                        <p className="text-accent">{item.institution}</p>
                       </div>
                    ))}
                  </CardContent>
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
             {Object.entries(groupedComplementary).reverse().map(([year, items]) => (
              <Card key={year} className="shadow-lg h-full bg-card/50 border border-transparent hover:shadow-[0_0_15px_hsl(var(--primary)/0.4)] transition-all duration-300 flex flex-col">
                <CardHeader>
                  <CardTitle className="text-xl font-bold">{year}</CardTitle>
                </CardHeader>
                <CardContent className="flex-grow space-y-4">
                  {items.map((item, index) => (
                    <div key={index}>
                      <p className="font-semibold">{item.title}</p>
                      {item.institution && <p className="text-accent text-sm">{item.institution}</p>}
                    </div>
                  ))}
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
