
"use client";

import { useState } from "react";
import Header from "@/components/header";
import ContactSection from "@/components/sections/contact-section";
import EducationSection from "@/components/sections/education-section";
import ExperienceSection from "@/components/sections/experience-section";
import HeroSection from "@/components/sections/hero-section";
import SkillsSection from "@/components/sections/skills-section";
import { Separator } from "@/components/ui/separator";
import { experience } from "@/lib/data";

export type Profile = "comunicacion" | "investigacion";

export default function Home() {
  const [activeProfile, setActiveProfile] = useState<Profile>("comunicacion");

  const activeCategory = experience[activeProfile][0].category;

  return (
    <div className="flex min-h-dvh flex-col">
      <Header
        activeProfile={activeProfile}
        setActiveProfile={setActiveProfile}
        activeCategory={activeCategory}
      />
      <main className="flex-1">
        <HeroSection profile={activeProfile} />
        
        <div className="container grid grid-cols-1 md:grid-cols-2 gap-x-16 items-start py-10 md:py-20">
            <ExperienceSection profile={activeProfile} />
            <EducationSection profile={activeProfile} />
        </div>
        
        <Separator className="my-8 md:my-12" />
        <SkillsSection profile={activeProfile} />
        <Separator className="my-8 md:my-12" />
        <ContactSection />
      </main>
    </div>
  );
}
