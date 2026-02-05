import { contact } from "@/lib/data";
import { Button } from "@/components/ui/button";
import { Linkedin, Mail, Phone, ArrowRight } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

export default function ContactSection() {
  return (
    <footer id="contact" className="py-16 md:py-24 bg-background/50 mt-10 md:mt-20">
      <div className="container">
        <Card className="max-w-3xl mx-auto shadow-2xl bg-card/80 border-primary/20 border hover:shadow-primary/20 transition-shadow duration-500 backdrop-blur-sm">
            <CardHeader className="text-center p-8 md:p-12">
                <CardTitle className="text-4xl md:text-5xl font-bold font-headline text-primary">¿Hablamos?</CardTitle>
                <CardDescription className="text-lg text-muted-foreground max-w-xl mx-auto pt-4">
                    Si tienes un proyecto en mente, una oportunidad de colaboración o simplemente quieres conectar, estaré encantado de escucharte.
                </CardDescription>
            </CardHeader>
            <CardContent className="p-8 md:p-12 pt-0">
                <div className="flex flex-col items-center gap-6">
                    <Button asChild size="lg" className="w-full max-w-sm group">
                        <a href={`mailto:${contact.email}`}>
                            <Mail className="mr-2" /> Envíame un email
                            <ArrowRight className="ml-auto opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                        </a>
                    </Button>
                    <div className="flex items-center gap-4">
                        <Button asChild variant="ghost">
                            <a href={`tel:${contact.phone}`}>
                                <Phone className="mr-2" /> Llamar
                            </a>
                        </Button>
                         <div className="w-px h-6 bg-border" />
                        <Button asChild variant="ghost">
                            <a href={contact.linkedin} target="_blank" rel="noopener noreferrer">
                                <Linkedin className="mr-2" /> LinkedIn
                            </a>
                        </Button>
                    </div>
                </div>
            </CardContent>
        </Card>
      </div>
    </footer>
  );
}