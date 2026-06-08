import logoMundialito from "@/assets/logos/mundialito.png";
import logoDapigraf from "@/assets/logos/dapigraf.png";

export type Project = {
  slug: string;
  company: string;
  url: string;
  logo: string;
  languages: string[];
  logoClassName?: string;
  tagline: string;
  description: string[];
};

export const projects: Project[] = [
  {
    slug: "mundialito-cesaz",
    company: "Mundialito CESAZ",
    url: "https://mundialitocesaz.vercel.app/",
    logo: logoMundialito,
    logoClassName: "h-20 md:h-24 w-auto max-w-[90%] object-contain",
    languages: ["Vue", "TypeScript", "JavaScript"],
    tagline: "Plataforma digital para organizar e acompanhar o torneio.",
    description: [
      "O Mundialito CESAZ é um projeto focado na experiência de quem participa e organiza o torneio: calendário, equipas, resultados e informação relevante num só lugar.",
      "Desenvolvi a interface com Vue e TypeScript, priorizando clareza na leitura de dados, navegação simples e um visual alinhado com a identidade do evento.",
      "A arquitetura do front-end foi pensada para evoluir com novas funcionalidades — gestão de jogos, classificações e páginas informativas — sem comprometer performance nem manutenção.",
    ],
  },
  {
    slug: "dapigraf",
    company: "Dapigraf",
    url: "https://www.dapigraf.com/",
    logo: logoDapigraf,
    logoClassName: "h-16 md:h-20 w-auto max-w-[95%] object-contain",
    languages: ["HTML", "CSS", "JavaScript"],
    tagline: "Site institucional para uma empresa de design e comunicação visual.",
    description: [
      "A Dapigraf pede presença digital forte: mostrar portfólio, serviços e contactos de forma profissional, com impacto visual e mensagem clara.",
      "Trabalhei o front-end em HTML, CSS e JavaScript, com atenção à hierarquia de conteúdos, animações subtis e responsividade em todos os dispositivos.",
      "A estrutura do site foi pensada para ser leve e fácil de manter, com código organizado para futuras atualizações de conteúdo.",
    ],
  },
];

export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}

export function hasLiveUrl(url: string): boolean {
  return url.startsWith("http://") || url.startsWith("https://");
}
