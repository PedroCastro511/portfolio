import logoMundialito from "@/assets/logos/mundialito.png";
import logoDapigraf from "@/assets/logos/dapigraf.png";
import logoKairos from "@/assets/logos/kairos.png";

export type Project = {
  slug: string;
  company: string;
  url: string;
  logo: string;
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
    tagline: "Plataforma digital para organizar e acompanhar o torneio.",
    description: [
      "O Mundialito CESAZ é um torneio que precisava de um espaço online claro para quem participa e organiza o evento.",
      "A plataforma reúne calendário, equipas, resultados e informação útil num só sítio, com uma experiência simples de consultar e fácil de perceber.",
      "O objetivo foi dar ao torneio uma presença digital credível, alinhada com a identidade do evento e preparada para crescer com novas edições.",
    ],
  },
  {
    slug: "dapigraf",
    company: "Dapigraf",
    url: "https://www.dapigraf.com/",
    logo: logoDapigraf,
    logoClassName: "h-16 md:h-20 w-auto max-w-[95%] object-contain",
    tagline: "Site institucional para uma empresa de design e comunicação visual.",
    description: [
      "A Dapigraf trabalha design e comunicação visual e precisava de um site que refletisse a qualidade do trabalho que apresenta aos clientes.",
      "O site mostra serviços, portfólio e contactos de forma profissional, com uma apresentação cuidada e uma mensagem clara sobre o que a marca faz.",
      "A ideia foi criar uma presença digital sólida, capaz de transmitir confiança e destacar o impacto visual do trabalho da empresa.",
    ],
  },
  {
    slug: "kairos",
    company: "KAIROS",
    url: "https://kairos-ivory-psi.vercel.app/",
    logo: logoKairos,
    logoClassName: "h-14 md:h-16 w-auto max-w-[85%] object-contain",
    tagline: "Projeto académico de branding e comunicação para uma marca de velas aromáticas.",
    description: [
      "A KAIROS nasceu como projeto académico para uns amigos que tinham as cadeiras de Atelier de Comunicação Estratégica, Ética e Cidadania e Branding Organizacional.",
      "A marca propõe velas aromáticas pensadas para estudo e bem-estar, com uma identidade minimalista e uma narrativa focada em momentos de pausa e concentração.",
      "O trabalho passou por definir posicionamento, identidade visual e comunicação da marca, até chegar a um site que apresenta o produto e os valores da KAIROS de forma coerente.",
    ],
  },
];

export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}

export function hasLiveUrl(url: string): boolean {
  return url.startsWith("http://") || url.startsWith("https://");
}
