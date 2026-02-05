import { education, complementaryEducation } from "@/lib/data";
import { GraduationCap, Sparkles } from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card";

export default function EducationSection() {
  return (
    <section id="education" className="container py-10 md:py-20">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-headline font-bold flex items-center justify-center gap-2">
          <GraduationCap className="w-8 h-8 text-primary" />
          Formación
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto mb-16">
        {education.map((item, index) => (
          <Card key={index} className="shadow-lg hover:shadow-xl transition-all duration-300 h-full bg-card/50 group hover:bg-primary cursor-pointer">
            <CardHeader>
              <CardTitle className="group-hover:text-primary-foreground">{item.degree}</CardTitle>
              <CardDescription className="font-semibold text-accent group-hover:text-primary-foreground/80">{item.institution}</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-foreground/70 group-hover:text-primary-foreground/80">{item.period}</p>
            </CardContent>
          </Card>
        ))}
      </div>
      
      <div className="text-center mb-12">
          <h3 className="text-2xl font-headline font-semibold flex items-center justify-center gap-2 text-accent">
            <Sparkles className="w-7 h-7" />
            Formación Complementaria
          </h3>
      </div>

       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
        {complementaryEducation.map((item, index) => (
          <Card key={index} className="text-center shadow-md hover:shadow-lg transition-all duration-300 bg-card/50 group hover:bg-primary cursor-pointer h-full">
            <CardContent className="p-6 flex flex-col items-center justify-center h-full">
                <h4 className="font-bold font-headline text-lg mb-2 group-hover:text-primary-foreground">{item.title}</h4>
                <p className="text-base text-foreground/80 group-hover:text-primary-foreground/90">{item.details}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
}
