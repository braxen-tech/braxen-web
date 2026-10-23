export type LogoCarouselItem = {
  name: string;
  src: string;
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
      { name: "Serasa", src: "/serasa.png" },
      { name: "Bradesco", src: "/bradesco.png" },
      { name: "Sicredi", src: "/sicredi.png" },
    ],
  },
  {
    industry: "entertainment",
    logos: [
      { name: "Globo", src: "/globo.png" },
      { name: "Disney", src: "/disney.png", subBrands: ["Disney+", "ESPN", "Hulu"] },
    ],
  },
  {
    industry: "health",
    logos: [
      { name: "Prenuvo", src: "/prenuvo.png" },
    ],
  },
  {
    industry: "automotive",
    logos: [
      { name: "Rivian", src: "/rivian.png" },
    ],
  },
  {
    industry: "telecom",
    logos: [
      { name: "TIM", src: "/tim.png" },
      { name: "Grupo Lima", src: "/grupo-lima.png" },
    ],
  },
  {
    industry: "education",
    logos: [
      { name: "Immersion U", src: "/immersion-u.png" },
      { name: "Good Ventures", src: "/good-ventures.png" },
    ],
  },
];

export const clientLogoRow1: LogoCarouselItem[] = [
  { name: "Globo", src: "/globo.png" },
  { name: "TIM", src: "/tim.png" },
  { name: "Disney", src: "/disney.png" },
  { name: "Rivian", src: "/rivian.png" },
  { name: "Immersion U", src: "/immersion-u.png" },
];

export const clientLogoRow2: LogoCarouselItem[] = [
  { name: "Serasa", src: "/serasa.png" },
  { name: "Sicredi", src: "/sicredi.png" },
  { name: "Bradesco", src: "/bradesco.png" },
  { name: "Prenuvo", src: "/prenuvo.png" },
  { name: "Good Ventures", src: "/good-ventures.png" },
];
