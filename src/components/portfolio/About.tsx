import { motion } from "motion/react";
import {
  Code2,
  Database,
  Server,
  Braces,
  Layers,
  Route,
  Mail,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { CONTACT_EMAIL } from "@/data/contact";

type Category = "Frontend" | "Backend";

const languages: { name: string; icon: typeof Code2; category: Category }[] = [
  { name: "Vue", icon: Layers, category: "Frontend" },
  { name: "TypeScript", icon: Code2, category: "Frontend" },
  { name: "JavaScript & CSS", icon: Braces, category: "Frontend" },
  { name: "Node.js", icon: Server, category: "Backend" },
  { name: "Express", icon: Route, category: "Backend" },
  { name: "SQL", icon: Database, category: "Backend" },
];

const groups: { key: Category; label: string }[] = [
  { key: "Frontend", label: "Frontend" },
  { key: "Backend", label: "Backend" },
];

export function About() {
  return (
    <section id="about" className="px-6 py-24">
      <div className="max-w-5xl mx-auto">
        <div className="grid md:grid-cols-2 gap-12 items-start">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <p className="text-sm text-primary font-medium tracking-widest uppercase mb-3">
              Sobre mim
            </p>
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Olá chamo-me <span className="text-gradient">Pedro Castro</span> e
              sou um programador full stack independente focado em código limpo,
              arquiteturas sólidas e entregas que funcionam de verdade.
            </h2>

            <Button
              asChild
              variant="secondary"
              size="lg"
              className="mt-8 shadow-none border border-sky-200 bg-sky-100 text-sky-900 hover:bg-sky-200 hover:text-sky-950"
            >
              <a href={`mailto:${CONTACT_EMAIL}`}>
                <Mail className="h-4 w-4" />
                Envia-me um email
              </a>
            </Button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="glass rounded-2xl p-6 md:p-8 shadow-card space-y-6"
          >
            {groups.map((g, gi) => {
              const items = languages.filter((l) => l.category === g.key);
              return (
                <div key={g.key}>
                  <div className="flex items-center gap-3 mb-4">
                    <span className="h-2 w-2 rounded-full bg-primary shadow-glow" />
                    <h3 className="text-xs font-medium tracking-widest uppercase text-muted-foreground">
                      {g.label}
                    </h3>
                    <span className="flex-1 h-px bg-border/40" />
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    {items.map((lang, i) => (
                      <motion.div
                        key={lang.name}
                        initial={{ opacity: 0, x: -10 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{
                          duration: 0.4,
                          delay: gi * 0.1 + i * 0.05,
                        }}
                        className="flex items-center gap-3 px-4 py-3 rounded-xl bg-secondary/40 border border-border/40 hover:border-primary/60 hover:shadow-glow transition-all"
                      >
                        <lang.icon className="h-4 w-4 text-primary" />
                        <span className="text-sm font-medium">{lang.name}</span>
                      </motion.div>
                    ))}
                  </div>
                </div>
              );
            })}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
