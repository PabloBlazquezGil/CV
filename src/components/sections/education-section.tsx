import { education, complementaryEducation } from "@/lib/data";
import { GraduationCap, Sparkles } from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card";

export default function EducationSection() {
  return (
    <section id="education" className="container py-12 md:py-24 animate-in fade-in slide-in-from-bottom-8 duration-1000">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-headline font-bold flex items-center justify-center gap-2">
          <GraduationCap className="w-8 h-8 text-accent" />
          Formación
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto mb-16">
        {education.map((item, index) => (
          <Card key={index} className="shadow-lg hover:shadow-xl transition-shadow h-full">
            <CardHeader>
              <CardTitle>{item.degree}</CardTitle>
              <CardDescription className="font-semibold text-primary">{item.institution}</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">{item.period}</p>
            </CardContent>
          </Card>
        ))}
      </div>
      
      <div className="text-center mb-12">
          <h3 className="text-2xl font-headline font-semibold flex items-center justify-center gap-2 text-primary">
            <Sparkles className="w-7 h-7" />
            Formación Complementaria
          </h3>
      </div>

       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
        {complementaryEducation.map((item, index) => (
          <Card key={index} className="text-center shadow-md hover:shadow-lg transition-shadow">
            <CardContent className="p-6">
                <h4 className="font-bold font-headline text-lg mb-2">{item.title}</h4>
                <p className="text-sm text-muted-foreground">{item.details}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
}
