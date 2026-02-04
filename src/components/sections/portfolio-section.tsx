"use client";

import { useState } from "react";
import Image from "next/image";
import { portfolioProjects, type Project } from "@/lib/data";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
  CardDescription
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { GalleryVertical, ExternalLink } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";

export default function PortfolioSection() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  return (
    <section id="portfolio" className="container py-12 md:py-24 animate-in fade-in slide-in-from-bottom-8 duration-1000">
      <h2 className="text-3xl font-headline font-bold text-center mb-12 flex items-center justify-center gap-2">
        <GalleryVertical className="w-8 h-8 text-accent" />
        Portfolio
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {portfolioProjects.map((project, index) => (
          <Card key={index} className="flex flex-col overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300">
            <CardHeader>
              <CardTitle className="font-headline">{project.title}</CardTitle>
              <CardDescription>{project.description}</CardDescription>
            </CardHeader>
            <CardContent className="flex-1 space-y-4">
              <div className="relative aspect-video">
                <Image
                  src={project.image.imageUrl}
                  alt={project.title}
                  fill
                  className="object-cover rounded-md border"
                  data-ai-hint={project.image.imageHint}
                />
              </div>
              <div className="flex flex-wrap gap-2">
                {project.technologies.slice(0, 4).map(tech => (
                  <Badge key={tech} variant="secondary">{tech}</Badge>
                ))}
              </div>
            </CardContent>
            <CardFooter>
              <Button onClick={() => setSelectedProject(project)} className="w-full">
                Ver Detalles
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>

      <Dialog open={!!selectedProject} onOpenChange={(isOpen) => !isOpen && setSelectedProject(null)}>
        <DialogContent className="sm:max-w-3xl">
          {selectedProject && (
            <>
              <DialogHeader>
                <DialogTitle className="text-3xl font-headline">{selectedProject.title}</DialogTitle>
              </DialogHeader>
              <div className="grid gap-6 py-4 prose dark:prose-invert max-w-none">
                <div className="relative aspect-video">
                  <Image
                    src={selectedProject.image.imageUrl}
                    alt={selectedProject.title}
                    fill
                    className="object-cover rounded-md border"
                    data-ai-hint={selectedProject.image.imageHint}
                  />
                </div>
                <p>{selectedProject.longDescription}</p>
                <div>
                  <h3 className="font-semibold mb-2 text-foreground not-prose">Tecnologías Usadas:</h3>
                  <div className="flex flex-wrap gap-2">
                    {selectedProject.technologies.map(tech => (
                      <Badge key={tech} variant="secondary">{tech}</Badge>
                    ))}
                  </div>
                </div>
              </div>
              <Button asChild>
                <a href={selectedProject.link} target="_blank" rel="noopener noreferrer">
                  Visitar Proyecto <ExternalLink className="ml-2 h-4 w-4" />
                </a>
              </Button>
            </>
          )}
        </DialogContent>
      </Dialog>
    </section>
  );
}
