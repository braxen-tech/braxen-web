export type LogoCarouselItem = {
  name: string;
  src: string;
  href?: string;
  subBrands?: string[];
};

export type IndustryGroup = {
  industry: string;
  logos: LogoCarouselItem[];
};

export const clientLogosByIndustry: IndustryGroup[] = [
  {
    industry: "finance",
    logos: [
      { name: "Serasa", src: "/serasa.png", href: "https://www.serasaexperian.com.br" },
      { name: "Bradesco", src: "/bradesco.png", href: "https://www.bradesco.com.br" },
      { name: "Sicredi", src: "/sicredi.png", href: "https://www.sicredi.com.br" },
    ],
  },
  {
    industry: "entertainment",
    logos: [
      { name: "Globo", src: "/globo.png", href: "https://www.globo.com" },
      { name: "Disney", src: "/disney.png", href: "https://www.disneyplus.com", subBrands: ["Disney+", "ESPN", "Hulu"] },
    ],
  },
  {
    industry: "health",
    logos: [
      { name: "Prenuvo", src: "/prenuvo.png", href: "https://www.prenuvo.com" },
    ],
  },
  {
    industry: "automotive",
    logos: [
      { name: "Rivian", src: "/rivian.png", href: "https://www.rivian.com" },
    ],
  },
  {
    industry: "telecom",
    logos: [
      { name: "TIM", src: "/tim.png", href: "https://www.tim.com.br" },
      { name: "Grupo Lima", src: "/grupo-lima.png", href: "https://www.grupolima.com.br" },
    ],
  },
  {
    industry: "education",
    logos: [
      { name: "Immersion U", src: "/immersion-u.png", href: "https://www.immersionu.com" },
      { name: "Good Ventures", src: "/good-ventures.png", href: "https://www.goodventuresteam.com" },
    ],
  },
];

export const clientLogoRow1: LogoCarouselItem[] = [
  { name: "Globo", src: "/globo.png", href: "https://www.globo.com" },
  { name: "TIM", src: "/tim.png", href: "https://www.tim.com.br" },
  { name: "Disney", src: "/disney.png", href: "https://www.disneyplus.com" },
  { name: "Rivian", src: "/rivian.png", href: "https://www.rivian.com" },
  { name: "Immersion U", src: "/immersion-u.png", href: "https://www.immersionu.com" },
];

export const clientLogoRow2: LogoCarouselItem[] = [
  { name: "Serasa", src: "/serasa.png", href: "https://www.serasaexperian.com.br" },
  { name: "Sicredi", src: "/sicredi.png", href: "https://www.sicredi.com.br" },
  { name: "Bradesco", src: "/bradesco.png", href: "https://www.bradesco.com.br" },
  { name: "Prenuvo", src: "/prenuvo.png", href: "https://www.prenuvo.com" },
  { name: "Good Ventures", src: "/good-ventures.png", href: "https://www.goodventuresteam.com" },
];
