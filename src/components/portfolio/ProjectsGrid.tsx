import { Link } from "react-router-dom";
import { motion } from "motion/react";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { projects } from "@/data/projects";

export function ProjectsGrid() {
  return (
    <motion.div
      className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 items-stretch gap-5 md:gap-6 max-w-4xl mx-auto"
      initial="hidden"
      animate="visible"
      variants={{
        visible: { transition: { staggerChildren: 0.08 } },
      }}
    >
      {projects.map((project) => (
        <motion.div
          key={project.slug}
          variants={{
            hidden: { opacity: 0, y: 16 },
            visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
          }}
        >
          <Link
            to={`/projetos/${project.slug}`}
            aria-label={`Ver detalhes do projeto ${project.company}`}
            className="group relative flex h-full min-h-[220px] flex-col rounded-2xl glass shadow-card p-6 md:p-8 hover:shadow-glow hover:border-primary/40 border border-transparent transition-all duration-300"
          >
            <div className="flex flex-1 flex-col items-center justify-center gap-3">
              <div className="flex h-28 w-full items-center justify-center md:h-32">
                <img
                  src={project.logo}
                  alt={`Logo ${project.company}`}
                  className={cn(
                    "opacity-90 group-hover:opacity-100 group-hover:scale-105 transition-all duration-300",
                    project.logoClassName ?? "h-10 md:h-12 w-auto max-w-full object-contain",
                  )}
                />
              </div>
              <span className="min-h-[1.25rem] text-sm font-medium text-muted-foreground group-hover:text-foreground text-center transition-colors">
                {project.company}
              </span>
            </div>
            <ArrowRight
              className="absolute top-4 right-4 h-4 w-4 text-muted-foreground opacity-0 group-hover:opacity-100 group-hover:text-primary transition-all"
              aria-hidden
            />
          </Link>
        </motion.div>
      ))}
    </motion.div>
  );
}
