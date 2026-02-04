import { contact } from "@/lib/data";
import { Button } from "@/components/ui/button";
import { Download, Github, Linkedin, Mail } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

export default function ContactSection() {
  return (
    <footer id="contact" className="py-12 md:py-24 bg-secondary/50 mt-12 md:mt-24">
      <div className="container text-center animate-in fade-in slide-in-from-bottom-8 duration-1000">
        <h2 className="text-3xl font-headline font-bold mb-4">Get In Touch</h2>
        <p className="text-muted-foreground max-w-xl mx-auto mb-8">
          I'm always open to discussing new projects, creative ideas, or opportunities to be part of an amazing team. Feel free to reach out.
        </p>
        <Card className="max-w-sm mx-auto shadow-lg">
            <CardContent className="p-6">
                <div className="flex justify-center space-x-4">
                    <Button asChild variant="outline" size="icon">
                        <a href={`mailto:${contact.email}`} aria-label="Email">
                            <Mail className="h-5 w-5" />
                        </a>
                    </Button>
                    <Button asChild variant="outline" size="icon">
                        <a href={contact.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
                            <Linkedin className="h-5 w-5" />
                        </a>
                    </Button>
                    <Button asChild variant="outline" size="icon">
                        <a href={contact.github} target="_blank" rel="noopener noreferrer" aria-label="GitHub">
                            <Github className="h-5 w-5" />
                        </a>
                    </Button>
                </div>
                <div className="mt-6">
                     <Button asChild size="lg" className="w-full">
                        <a href={contact.cvUrl} download>
                            <Download className="mr-2 h-4 w-4" />
                            Download CV
                        </a>
                    </Button>
                </div>
            </CardContent>
        </Card>
      </div>
    </footer>
  );
}
