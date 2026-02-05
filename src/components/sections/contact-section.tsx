import { contact } from "@/lib/data";
import { Button } from "@/components/ui/button";
import { Linkedin, Mail, Phone } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

export default function ContactSection() {
  return (
    <footer id="contact" className="py-10 md:py-20 bg-secondary/30 mt-10 md:mt-20">
      <div className="container text-center">
        <h2 className="text-3xl font-headline font-bold mb-4">Contacto</h2>
        <p className="text-muted-foreground max-w-xl mx-auto mb-8">
          Siempre estoy abierto a discutir nuevos proyectos, ideas creativas u oportunidades para formar parte de un equipo increíble. No dudes en contactarme.
        </p>
        <Card className="max-w-md mx-auto shadow-lg bg-card/50 border-0">
            <CardContent className="p-6">
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
                </div>
            </CardContent>
        </Card>
      </div>
    </footer>
  );
}
