import { useEffect } from "react";
import { Link, Navigate, useParams } from "react-router-dom";
import { motion } from "motion/react";
import { ArrowLeft, ExternalLink } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Footer } from "@/components/portfolio/Footer";
import { cn } from "@/lib/utils";
import { getProjectBySlug, hasLiveUrl } from "@/data/projects";

/** Só opacidade — transform no motion.div quebra position: sticky nos filhos. */
const fadeIn = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  transition: { duration: 0.5 },
};

export function ProjectDetailPage() {
  const { slug } = useParams<{ slug: string }>();
  const project = slug ? getProjectBySlug(slug) : undefined;

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  if (!project) {
    return <Navigate to="/" replace />;
  }

  const showVisitLink = hasLiveUrl(project.url);

  return (
    <>
      <article className="relative px-6 pt-28 pb-16 md:pt-32 md:pb-24">
        <div className="max-w-6xl mx-auto">
          <motion.div {...fadeIn}>
            <Link
              to="/#explore"
              className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mb-10"
            >
              <ArrowLeft className="h-4 w-4" />
              Voltar aos projetos
            </Link>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-14 items-start">
            <div>
              <p className="text-sm text-primary font-medium tracking-widest uppercase mb-3">
                Projeto
              </p>
              <h1 className="text-4xl md:text-5xl font-bold mb-4">{project.company}</h1>
              <p className="text-lg text-muted-foreground leading-relaxed mb-8">
                {project.tagline}
              </p>

              <motion.div
                {...fadeIn}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="flex flex-wrap gap-2 mb-8"
              >
                {project.languages.map((lang) => (
                  <Badge key={lang} variant="outline" className="glass border-border/50">
                    {lang}
                  </Badge>
                ))}
              </motion.div>

              <motion.div
                {...fadeIn}
                transition={{ duration: 0.5, delay: 0.15 }}
                className="space-y-5 text-muted-foreground leading-relaxed"
              >
                {project.description.map((paragraph) => (
                  <p key={paragraph.slice(0, 40)}>{paragraph}</p>
                ))}
              </motion.div>

              <motion.div
                {...fadeIn}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="mt-10 pt-8 border-t border-border/50"
              >
                {showVisitLink ? (
                  <Button
                    asChild
                    size="lg"
                    className="w-full sm:w-auto shadow-none border border-border/70 bg-neutral-200 text-neutral-800 hover:bg-neutral-300 hover:text-neutral-900"
                  >
                    <a href={project.url} target="_blank" rel="noopener noreferrer">
                      Visitar {project.company}
                      <ExternalLink className="h-4 w-4" />
                    </a>
                  </Button>
                ) : (
                  <p className="text-sm text-muted-foreground">
                    O link público deste projeto estará disponível em breve.
                  </p>
                )}
              </motion.div>
            </div>

            {/* div simples: sticky não funciona dentro de motion com transform (y) */}
            <div className="w-full md:sticky md:top-[calc(50vh-10rem)] md:self-start">
              <motion.div
                {...fadeIn}
                transition={{ duration: 0.5, delay: 0.08 }}
                className="glass rounded-2xl p-8 md:p-12 shadow-card flex items-center justify-center min-h-[240px] md:min-h-[280px] w-full"
              >
                <img
                  src={project.logo}
                  alt={`Logo ${project.company}`}
                  className={cn(
                    "opacity-95 w-full max-h-48 md:max-h-64 object-contain",
                    project.logoClassName ?? "h-12 md:h-14 w-auto",
                  )}
                />
              </motion.div>
            </div>
          </div>
        </div>
      </article>
      <Footer />
    </>
  );
}
