import { education, complementaryEducation } from "@/lib/data";
import { GraduationCap, Sparkles } from "lucide-react";
import type { Profile } from "@/app/page";

interface EducationSectionProps {
  profile: Profile;
}

export default function EducationSection({ profile }: EducationSectionProps) {
  const complementaryToShow = complementaryEducation[profile] || [];
  const isCommunicator = profile === 'comunicacion';

  const complementaryList = (
    <div className="space-y-6">
      {complementaryToShow.map((item, index) => (
        <div key={index} className="flex items-start gap-4">
          <div className="flex h-10 w-16 flex-shrink-0 items-center justify-center rounded-md bg-accent/20 text-sm font-bold text-accent">
            {item.year}
          </div>
          <div className="flex-grow">
            <h4 className="font-bold leading-tight">{item.title}</h4>
            {(item.institution || item.hours) && (
              <p className="text-sm text-muted-foreground">
                {item.institution}
                {item.institution && item.hours ? " - " : ""}
                {item.hours}
              </p>
            )}
          </div>
        </div>
      ))}
    </div>
  );

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
          <div className="space-y-8">
            {education.map((item, index) => (
              <div key={index} className="flex items-start gap-4">
                <div className="flex h-10 w-24 flex-shrink-0 items-center justify-center rounded-md bg-primary/10 text-center text-sm font-bold leading-tight text-primary">
                  {item.period}
                </div>
                <div className="flex-grow">
                  <h3 className="text-lg font-bold leading-tight">{item.degree}</h3>
                  <p className="text-muted-foreground">{item.institution}</p>
                </div>
              </div>
            ))}
          </div>
        )}

        {complementaryToShow.length > 0 && (
          <div>
            {isCommunicator ? (
              complementaryList
            ) : (
              <>
                <div className="text-center mb-12 mt-16">
                  <h3 className="text-3xl font-headline font-semibold flex items-center justify-center gap-2 text-accent">
                    <Sparkles className="w-7 h-7" />
                    Formación Complementaria
                  </h3>
                </div>
                {complementaryList}
              </>
            )}
          </div>
        )}
      </div>
    </section>
  );
}