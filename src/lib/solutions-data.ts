import { type ImageSrc } from "@/lib/utils";

export type SolutionAsset = {
  id: number;
  image: ImageSrc;
};

const gradients = [
  ["#6366f1", "#8b5cf6"],
  ["#0ea5e9", "#6366f1"],
  ["#10b981", "#0ea5e9"],
  ["#f59e0b", "#ef4444"],
  ["#8b5cf6", "#ec4899"],
  ["#14b8a6", "#3b82f6"],
];

function gradientSvg(from: string, to: string): string {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="800" height="600"><defs><linearGradient id="g" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="${from}"/><stop offset="100%" stop-color="${to}"/></linearGradient></defs><rect width="800" height="600" fill="url(#g)"/></svg>`;
  return `data:image/svg+xml,${encodeURIComponent(svg)}`;
}

export const solutionAssets: SolutionAsset[] = gradients.map((g, i) => ({
  id: i + 1,
  image: gradientSvg(g[0], g[1]),
}));

export function solutionImageSrc(asset: SolutionAsset): string {
  return typeof asset.image === "string" ? asset.image : asset.image.src;
}
