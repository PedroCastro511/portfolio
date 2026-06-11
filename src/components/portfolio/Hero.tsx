import { useEffect, useRef } from "react";
import gsap from "gsap";
import { Button } from "@/components/ui/button";
import { ArrowDown } from "lucide-react";
import { scrollToSection } from "@/lib/utils";
import { HeroComputer } from "@/components/portfolio/HeroComputer";

export function Hero() {
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".hero-cta", { y: 16, autoAlpha: 0, duration: 0.6, ease: "power3.out" });
    }, rootRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="home" ref={rootRef} className="relative overflow-hidden pt-24 pb-24 px-6 md:pt-32 min-h-[480px] md:min-h-[520px]">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[100%] md:top-[56%] -translate-y-1/2 right-[-6%] sm:right-[0%] md:right-[4%] lg:right-[10%] w-full max-w-xl h-[320px] md:h-[420px]">
          <HeroComputer />
        </div>
      </div>

      <div className="relative z-10 max-w-5xl mx-auto text-center">
        <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight">
          <span className="block">
            Construo <span className="text-gradient">projetos</span>
          </span>
          <span className="block">
            com <span className="text-gradient">valor</span>
          </span>
        </h1>

        <div className="mt-10 flex items-center justify-center">
          <Button
            asChild
            size="lg"
            className="hero-cta bg-gradient-bar text-white hover:opacity-90 shadow-glow group"
          >
            <a
              href="#explore"
              onClick={(e) => {
                e.preventDefault();
                scrollToSection("explore");
              }}
            >
              Ver trabalho
              <ArrowDown className="ml-2 h-4 w-4 group-hover:translate-y-1 transition-transform" />
            </a>
          </Button>
        </div>
      </div>
    </section>
  );
}
