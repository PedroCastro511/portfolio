import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { Hero } from "@/components/portfolio/Hero";
import { About } from "@/components/portfolio/About";
import { ProjectsSection } from "@/components/portfolio/ProjectsSection";
import { Footer } from "@/components/portfolio/Footer";
import { scrollToSection } from "@/lib/utils";

export function HomePage() {
  const { hash } = useLocation();

  useEffect(() => {
    if (!hash) return;
    scrollToSection(hash.replace("#", ""));
  }, [hash]);

  return (
    <>
      <Hero />
      <About />
      <ProjectsSection />
      <Footer />
    </>
  );
}
