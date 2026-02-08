"use client";

import { useState, useEffect } from "react";
import Header from "@/components/header";
import ContactSection from "@/components/sections/contact-section";
import EducationSection from "@/components/sections/education-section";
import ExperienceSection from "@/components/sections/experience-section";
import HeroSection from "@/components/sections/hero-section";
import SkillsSection from "@/components/sections/skills-section";
import { Separator } from "@/components/ui/separator";
import { experience } from "@/lib/data";
import CVTemplate from "@/components/cv-template";

export type Profile = "comunicacion" | "investigacion";

export default function Home() {
  const [activeProfile, setActiveProfile] = useState<Profile>("comunicacion");

  useEffect(() => {
    const setFavicon = (svg: string) => {
      const faviconUrl = `data:image/svg+xml,${encodeURIComponent(svg)}`;
      let link = document.querySelector<HTMLLinkElement>("link[rel~='icon']");
      if (!link) {
        link = document.createElement("link");
        link.rel = "icon";
        document.head.appendChild(link);
      }
      link.href = faviconUrl;
    };

    // Icons from lucide-react, with stroke color for dark theme primary
    const dnaIconSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="hsl(110 35% 60%)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M2 15c6.667-6 13.333 0 20-6"/><path d="M9 22c1.798-1.998 2.518-3.995 2-6-1-4-4-4-4-6-1.798-1.998-2.518-3.995-2-6"/><path d="M15 2c-1.798 1.998-2.518 3.995-2 6 1 4 4 4 4 6 1.798 1.998 2.518 3.995 2 6"/></svg>`;
    const cameraIconSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="hsl(110 35% 60%)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14.5 4h-5L7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3l-2.5-3z"/><circle cx="12" cy="13" r="3"/></svg>`;

    if (activeProfile === "investigacion") {
      setFavicon(dnaIconSvg);
    } else {
      setFavicon(cameraIconSvg);
    }
  }, [activeProfile]);


  const activeCategory = experience[activeProfile][0].category;

  return (
    <div className="flex min-h-dvh flex-col">
       {/* Templates are positioned off-screen by their own CSS for PDF generation */}
       <CVTemplate profile="comunicacion" />
       <CVTemplate profile="investigacion" />

      <Header
        activeProfile={activeProfile}
        setActiveProfile={setActiveProfile}
        activeCategory={activeCategory}
      />
      <main className="flex-1">
        <HeroSection profile={activeProfile} />
        
        <div className="w-full max-w-[90vw] mx-auto grid grid-cols-1 md:grid-cols-2 gap-x-16 items-start py-10 md:py-20">
            <ExperienceSection profile={activeProfile} />
            <EducationSection profile={activeProfile} />
        </div>
        
        <Separator className="my-8 md:my-12" />
        <SkillsSection profile={activeProfile} />
        <Separator className="my-8 md:my-12" />
        <ContactSection profile={activeProfile} />
      </main>
    </div>
  );
}
