import { contact } from "@/lib/data";
import { Button } from "@/components/ui/button";
import { Download, Github, Linkedin, Mail, Phone } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

export default function ContactSection() {
  return (
    <footer id="contact" className="py-12 md:py-24 bg-secondary/50 mt-12 md:mt-24">
      <div className="container text-center animate-in fade-in slide-in-from-bottom-8 duration-1000">
        <h2 className="text-3xl font-headline font-bold mb-4">Contacto</h2>
        <p className="text-muted-foreground max-w-xl mx-auto mb-8">
          Siempre estoy abierto a discutir nuevos proyectos, ideas creativas u oportunidades para formar parte de un equipo increíble. No dudes en contactarme.
        </p>
        <Card className="max-w-md mx-auto shadow-lg">
            <CardContent className="p-6 space-y-4">
                <div className="flex flex-wrap justify-center gap-4">
                    <Button asChild variant="outline" className="flex-1 min-w-[120px]">
                        <a href={`mailto:${contact.email}`}>
                            <Mail className="mr-2" /> Email
                        </a>
                    </Button>
                     <Button asChild variant="outline" className="flex-1 min-w-[120px]">
                        <a href={`tel:${contact.phone}`}>
                            <Phone className="mr-2" /> Teléfono
                        </a>
                    </Button>
                    <Button asChild variant="outline" className="flex-1 min-w-[120px]">
                        <a href={contact.linkedin} target="_blank" rel="noopener noreferrer">
                            <Linkedin className="mr-2" /> LinkedIn
                        </a>
                    </Button>
                    <Button asChild variant="outline" className="flex-1 min-w-[120px]">
                        <a href={contact.github} target="_blank" rel="noopener noreferrer">
                            <Github className="mr-2" /> GitHub
                        </a>
                    </Button>
                </div>
                <div className="pt-2">
                     <Button asChild size="lg" className="w-full">
                        <a href={contact.cvUrl} download>
                            <Download className="mr-2" />
                            Descargar CV
                        </a>
                    </Button>
                </div>
            </CardContent>
        </Card>
      </div>
    </footer>
  );
}
