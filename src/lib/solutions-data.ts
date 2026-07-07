import portfolioAiAgent from "@/assets/portfolio-ai-agent.jpg";
import portfolioCrm from "@/assets/portfolio-crm.jpg";
import portfolioDashboard from "@/assets/portfolio-dashboard.jpg";
import portfolioLeadScoring from "@/assets/portfolio-lead-scoring.jpg";
import portfolioErp from "@/assets/portfolio-erp.jpg";
import portfolioWhatsappAutomation from "@/assets/portfolio-whatsapp-automation.jpg";
import { imageSrc, type ImageSrc } from "@/lib/utils";

export type SolutionAsset = {
  id: number;
  image: ImageSrc;
};

export const solutionAssets: SolutionAsset[] = [
  { id: 1, image: portfolioAiAgent },
  { id: 2, image: portfolioLeadScoring },
  { id: 3, image: portfolioCrm },
  { id: 4, image: portfolioDashboard },
  { id: 5, image: portfolioErp },
  { id: 6, image: portfolioWhatsappAutomation },
];

export function solutionImageSrc(asset: SolutionAsset): string {
  return imageSrc(asset.image);
}
