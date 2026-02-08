import { experience } from "@/lib/data";
import { Briefcase } from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card";

export default function ExperienceSection() {
  return (
    <section id="experience" className="container py-10 md:py-20">
      <h2 className="text-4xl font-headline font-bold text-center mb-12 flex items-center justify-center gap-2">
        <Briefcase className="w-8 h-8 text-primary" />
        Experiencia Profesional
      </h2>
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-x-12 gap-y-12">
        {experience.map((expCategory) => (
          <div key={expCategory.category}>
            <h3 className="text-3xl font-headline font-semibold text-accent mb-6">{expCategory.category}</h3>
            <div className="relative space-y-8">
              <div className="absolute left-3.5 h-full w-0.5 bg-border -z-10" aria-hidden="true"></div>
              {expCategory.items.map((item, index) => (
                <div key={index} className="relative pl-12">
                   <div className="absolute left-0 top-1.5 w-7 h-7 bg-secondary rounded-full flex items-center justify-center ring-8 ring-background">
                    <div className="w-3 h-3 bg-primary rounded-full"></div>
                  </div>
                  <Card className="shadow-lg hover:shadow-xl transition-all duration-300 bg-card/50 group hover:bg-primary cursor-pointer">
                    <CardHeader>
                      <CardTitle className="group-hover:text-primary-foreground">{item.role}</CardTitle>
                      <p className="text-lg text-foreground/70 group-hover:text-primary-foreground/80">{item.period}</p>
                    </CardHeader>
                    <CardContent>
                      <CardDescription className="font-semibold text-accent group-hover:text-primary-foreground/80 text-xl mb-2">
                        {item.company}
                        {(item as any).details && (
                          <span className="font-normal text-lg"> - {(item as any).details}</span>
                        )}
                      </CardDescription>
                      <p className="text-lg text-foreground/80 group-hover:text-primary-foreground/90">{item.description}</p>
                    </CardContent>
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
