import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const INTRO_TEXT =
  "Olá chamo-me Pedro Castro e sou um programador full stack independente focado em código limpo, arquiteturas sólidas e entregas que funcionam de verdade.";

function buildSegments(text: string) {
  const words = text.split(" ");
  const segments: { text: string; gradient?: boolean }[] = [];

  for (let i = 0; i < words.length; i++) {
    if (words[i] === "Pedro" && words[i + 1] === "Castro") {
      segments.push({ text: "Pedro Castro", gradient: true });
      i += 1;
    } else {
      segments.push({ text: words[i] });
    }
  }

  return segments;
}

const SEGMENTS = buildSegments(INTRO_TEXT);

export function AboutIntroHeading() {
  const headingRef = useRef<HTMLHeadingElement>(null);
  const wordRefs = useRef<(HTMLSpanElement | null)[]>([]);

  useEffect(() => {
    const heading = headingRef.current;
    if (!heading) return;

    const words = wordRefs.current.filter(Boolean) as HTMLSpanElement[];
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    if (prefersReducedMotion) {
      gsap.set(words, { opacity: 1 });
      return;
    }

    gsap.set(words, { opacity: 0.12 });

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: heading,
          start: "top 78%",
          end: "+=520",
          scrub: 0.45,
        },
      });

      words.forEach((word, index) => {
        tl.to(
          word,
          { opacity: 1, ease: "none", duration: 1 },
          index * 0.07,
        );
      });
    }, heading);

    return () => ctx.revert();
  }, []);

  return (
    <h2 ref={headingRef} className="text-4xl md:text-5xl font-bold mb-6">
      {SEGMENTS.map((segment, index) => (
        <span
          key={index}
          ref={(el) => {
            wordRefs.current[index] = el;
          }}
          className={segment.gradient ? "text-gradient" : undefined}
        >
          {segment.text}{" "}
        </span>
      ))}
    </h2>
  );
}
