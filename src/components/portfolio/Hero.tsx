import { useEffect, useRef } from "react";
import gsap from "gsap";
import { Button } from "@/components/ui/button";
import { ArrowDown } from "lucide-react";
import { scrollToSection } from "@/lib/utils";

export function Hero() {
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      tl.from(
          ".hero-word",
          { y: 60, autoAlpha: 0, rotateX: -40, duration: 0.9, stagger: 0.08 },
        )
        .from(".hero-sub", { y: 20, autoAlpha: 0, duration: 0.7 }, "-=0.5")
        .from(".hero-cta", { y: 16, autoAlpha: 0, duration: 0.6, stagger: 0.1 }, "-=0.4");

      gsap.to(".hero-title", {
        y: -6,
        duration: 3.5,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });
    }, rootRef);

    return () => ctx.revert();
  }, []);

  const line1 = "Construo interfaces".split(" ");
  const line2 = ["rápidaseprecisas."];

  return (
    <section id="home" ref={rootRef} className="relative pt-24 pb-24 px-6 md:pt-32">
      <div className="max-w-5xl mx-auto text-center">
        <h1 className="hero-title text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight [perspective:1000px]">
          <span className="block">
            {line1.map((w, i) => (
              <span key={i} className="hero-word inline-block mr-3">
                {w}
              </span>
            ))}
          </span>
          <span className="block text-gradient">
            {line2.map((w, i) => (
              <span key={i} className="hero-word inline-block mr-3">
                {w}
              </span>
            ))}
          </span>
        </h1>

        <p className="hero-sub mt-8 max-w-2xl mx-auto text-lg text-muted-foreground leading-relaxed">
          Desenvolvedor web focado em performance, arquitetura limpa e experiências que se sentem
          inevitáveis. React, TypeScript e tudo o que move pixels.
        </p>

        <div className="mt-10 flex items-center justify-center">
          <Button
            asChild
            size="lg"
            className="hero-cta bg-gradient-bar text-primary-foreground hover:opacity-90 shadow-glow group"
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
