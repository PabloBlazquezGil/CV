"use server";

import { analyzeCvAndProvideFeedback } from "@/ai/flows/cv-analysis-and-feedback";
import { skillsVisualizationFromText } from "@/ai/flows/skills-visualization-from-text";
import { z } from "zod";

const cvAnalysisSchema = z.object({
  cvText: z.string(),
  jobDescription: z.string(),
});

export async function getCvFeedback(formData: FormData) {
  try {
    const validatedData = cvAnalysisSchema.parse({
      cvText: formData.get("cvText"),
      jobDescription: formData.get("jobDescription"),
    });

    const result = await analyzeCvAndProvideFeedback(validatedData);
    return { success: true, feedback: result.feedback };
  } catch (error) {
    console.error(error);
    const errorMessage = error instanceof Error ? error.message : "An unknown error occurred.";
    return { success: false, error: errorMessage };
  }
}

const skillsSchema = z.object({
  skills: z.string(),
});

export async function generateSkillsImage(formData: FormData) {
    try {
        const validatedData = skillsSchema.parse({
            skills: formData.get("skills")
        });

        const result = await skillsVisualizationFromText({ text: validatedData.skills });
        return { success: true, dataUri: result.visualizationDataUri };

    } catch (error) {
        console.error(error);
        const errorMessage = error instanceof Error ? error.message : "An unknown error occurred.";
        return { success: false, error: errorMessage };
    }
}
