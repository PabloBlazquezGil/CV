import { education } from "@/lib/data";
import { GraduationCap } from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card";

export default function EducationSection() {
  return (
    <section id="education" className="container py-12 md:py-24 animate-in fade-in slide-in-from-bottom-8 duration-1000">
      <h2 className="text-3xl font-headline font-bold text-center mb-12 flex items-center justify-center gap-2">
        <GraduationCap className="w-8 h-8 text-accent" />
        Education
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
        {education.map((item, index) => (
          <Card key={index} className="shadow-lg hover:shadow-xl transition-shadow">
            <CardHeader>
              <CardTitle>{item.institution}</CardTitle>
              <CardDescription className="text-primary font-semibold">{item.degree}</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">{item.period}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
}
