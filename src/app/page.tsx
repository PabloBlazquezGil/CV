import Header from "@/components/header";
import ContactSection from "@/components/sections/contact-section";
import EducationSection from "@/components/sections/education-section";
import ExperienceSection from "@/components/sections/experience-section";
import HeroSection from "@/components/sections/hero-section";
import SkillsSection from "@/components/sections/skills-section";
import { Separator } from "@/components/ui/separator";

export default function Home() {
  return (
    <div className="flex min-h-dvh flex-col">
      <Header />
      <main className="flex-1">
        <HeroSection />
        <ExperienceSection />
        <Separator className="my-8 md:my-12" />
        <EducationSection />
        <Separator className="my-8 md:my-12" />
        <SkillsSection />
        <Separator className="my-8 md:my-12" />
        <ContactSection />
      </main>
    </div>
  );
}
