import { Github, Linkedin, Mail } from "lucide-react";

import { CONTACT_EMAIL } from "@/data/contact";

export function Footer() {
  return (
    <footer id="contact" className="px-6 py-12 border-t border-border/50">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        <p className="text-sm text-muted-foreground">
          © {new Date().getFullYear()} dev.folio — construído com cuidado.
        </p>
        <div className="flex items-center gap-2">
          <a href="https://github.com" target="_blank" rel="noreferrer" aria-label="GitHub" className="h-10 w-10 grid place-items-center rounded-full glass hover:shadow-glow hover:text-primary transition-all">
            <Github className="h-4 w-4" />
          </a>
          <a href="https://linkedin.com" target="_blank" rel="noreferrer" aria-label="LinkedIn" className="h-10 w-10 grid place-items-center rounded-full glass hover:shadow-glow hover:text-primary transition-all">
            <Linkedin className="h-4 w-4" />
          </a>
          <a href={`mailto:${CONTACT_EMAIL}`} aria-label="Email" className="h-10 w-10 grid place-items-center rounded-full glass hover:shadow-glow hover:text-primary transition-all">
            <Mail className="h-4 w-4" />
          </a>
        </div>
      </div>
    </footer>
  );
}
