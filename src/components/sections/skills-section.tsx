"use client";

import { useState } from "react";
import { skills } from "@/lib/data";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Code, Sparkles, Loader2 } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import Image from "next/image";
import { generateSkillsImage } from "@/app/actions";
import { useToast } from "@/hooks/use-toast";

export default function SkillsSection() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [visualization, setVisualization] = useState<string | null>(null);
  const { toast } = useToast();

  const handleGenerateVisualization = async () => {
    setIsLoading(true);
    setVisualization(null);

    const formData = new FormData();
    formData.append("skills", skills.join(", "));

    const result = await generateSkillsImage(formData);

    if (result.success && result.dataUri) {
      setVisualization(result.dataUri);
      setIsDialogOpen(true);
    } else {
      toast({
        variant: "destructive",
        title: "Visualization Failed",
        description: result.error || "Could not generate the skills visualization. Please try again.",
      });
    }

    setIsLoading(false);
  };

  return (
    <section id="skills" className="container py-12 md:py-24 animate-in fade-in slide-in-from-bottom-8 duration-1000">
      <h2 className="text-3xl font-headline font-bold text-center mb-12 flex items-center justify-center gap-2">
        <Code className="w-8 h-8 text-accent" />
        Skills & Expertise
      </h2>
      <div className="flex flex-wrap justify-center gap-3 max-w-3xl mx-auto">
        {skills.map((skill, index) => (
          <Badge key={index} variant="secondary" className="text-base px-4 py-2 font-medium shadow-sm">
            {skill}
          </Badge>
        ))}
      </div>
      <div className="text-center mt-12">
        <Button onClick={handleGenerateVisualization} disabled={isLoading}>
          {isLoading ? (
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          ) : (
            <Sparkles className="mr-2 h-4 w-4" />
          )}
          Generate AI Skills Visualization
        </Button>
      </div>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-2xl">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2 text-2xl">
              <Sparkles className="h-6 w-6 text-primary" />
              Skills Visualization
            </DialogTitle>
            <DialogDescription>
              An AI-generated visual representation of my skills.
            </DialogDescription>
          </DialogHeader>
          <div className="mt-4 flex justify-center">
            {visualization && (
              <Image
                src={visualization}
                alt="AI-generated skills visualization"
                width={800}
                height={600}
                className="rounded-lg border shadow-lg"
              />
            )}
          </div>
        </DialogContent>
      </Dialog>
    </section>
  );
}
