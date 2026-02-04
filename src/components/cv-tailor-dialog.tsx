"use client";

import { useState } from "react";
import { useForm, type SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Loader2, Wand2, Sparkles } from "lucide-react";
import { cvText } from "@/lib/data";
import { getCvFeedback } from "@/app/actions";
import { useToast } from "@/hooks/use-toast";
import { ScrollArea } from "./ui/scroll-area";

const formSchema = z.object({
  cvText: z.string().min(100, "CV text must be at least 100 characters."),
  jobDescription: z.string().min(50, "Job description must be at least 50 characters."),
});

type FormValues = z.infer<typeof formSchema>;

type CvTailorDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

export default function CvTailorDialog({ open, onOpenChange }: CvTailorDialogProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [feedback, setFeedback] = useState<string | null>(null);
  const { toast } = useToast();

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      cvText,
      jobDescription: "",
    },
  });

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    setIsLoading(true);
    setFeedback(null);
    const formData = new FormData();
    formData.append("cvText", data.cvText);
    formData.append("jobDescription", data.jobDescription);

    const result = await getCvFeedback(formData);

    if (result.success && result.feedback) {
      setFeedback(result.feedback);
    } else {
      toast({
        variant: "destructive",
        title: "Analysis Failed",
        description: result.error || "Could not analyze the CV. Please try again.",
      });
    }

    setIsLoading(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-4xl max-h-[90vh] flex flex-col">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-2xl">
            <Wand2 className="h-6 w-6 text-accent" />
            AI-Powered CV Tailor
          </DialogTitle>
          <DialogDescription>
            Paste your CV and a job description to get AI-powered feedback on how to tailor it.
          </DialogDescription>
        </DialogHeader>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 overflow-hidden flex-1">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 flex flex-col">
                <div className="grid grid-cols-1 gap-4 flex-1">
                    <FormField
                        control={form.control}
                        name="cvText"
                        render={({ field }) => (
                            <FormItem className="flex flex-col">
                            <FormLabel>Your CV</FormLabel>
                            <FormControl>
                                <Textarea placeholder="Paste your CV text here..." className="resize-none flex-1" {...field} />
                            </FormControl>
                            <FormMessage />
                            </FormItem>
                        )}
                        />
                    <FormField
                        control={form.control}
                        name="jobDescription"
                        render={({ field }) => (
                            <FormItem className="flex flex-col">
                            <FormLabel>Target Job Description</FormLabel>
                            <FormControl>
                                <Textarea placeholder="Paste the job description here..." className="resize-none flex-1" {...field} />
                            </FormControl>
                            <FormMessage />
                            </FormItem>
                        )}
                        />
                </div>
                 <DialogFooter className="!mt-auto pt-4">
                    <Button type="submit" disabled={isLoading} className="w-full sm:w-auto">
                        {isLoading ? (
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        ) : (
                        <Sparkles className="mr-2 h-4 w-4" />
                        )}
                        Analyze & Get Feedback
                    </Button>
                </DialogFooter>
            </form>
          </Form>

          <Card className="flex flex-col">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Sparkles className="h-5 w-5 text-primary" />
                Feedback
              </CardTitle>
            </CardHeader>
            <CardContent className="flex-1 overflow-hidden">
                <ScrollArea className="h-full">
                    <div className="prose prose-sm dark:prose-invert max-w-none">
                        {isLoading && (
                            <div className="flex flex-col items-center justify-center h-full gap-4 text-center">
                                <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
                                <p className="text-muted-foreground">AI is analyzing your documents... <br/>This might take a moment.</p>
                            </div>
                        )}
                        {!isLoading && !feedback && (
                            <div className="flex flex-col items-center justify-center h-full gap-4 text-center p-8 border-dashed border-2 rounded-lg">
                                <Wand2 className="h-10 w-10 text-muted-foreground" />
                                <p className="text-muted-foreground">Your feedback will appear here once the analysis is complete.</p>
                            </div>
                        )}
                        {feedback && <div dangerouslySetInnerHTML={{ __html: feedback.replace(/\n/g, '<br />') }} />}
                    </div>
                </ScrollArea>
            </CardContent>
          </Card>
        </div>
      </DialogContent>
    </Dialog>
  );
}
