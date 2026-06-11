import { Linkedin } from "lucide-react";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer id="contact" className="px-6 py-12 border-t border-border/50">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="text-center md:text-left">
          <p className="text-sm text-foreground font-medium">
            © {year} Pedro Castro
          </p>
          <p className="mt-1 text-xs text-muted-foreground">Portfólio pessoal</p>
        </div>
        <a
          href="https://www.linkedin.com/in/pedro-castro-59681a330/"
          target="_blank"
          rel="noreferrer"
          aria-label="LinkedIn de Pedro Castro"
          className="h-10 w-10 grid place-items-center rounded-full glass hover:shadow-glow hover:text-primary transition-all"
        >
          <Linkedin className="h-4 w-4" />
        </a>
      </div>
    </footer>
  );
}
