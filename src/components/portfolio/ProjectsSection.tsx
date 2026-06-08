import { ProjectsGrid } from "./ProjectsGrid";

export function ProjectsSection() {
  return (
    <section id="explore" className="px-6 py-24">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <p className="text-sm text-primary font-medium tracking-widest uppercase mb-3">Explorar</p>
          <h2 className="text-4xl md:text-5xl font-bold">Projetos</h2>
        </div>
        <ProjectsGrid />
      </div>
    </section>
  );
}
