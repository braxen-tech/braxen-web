import chapterProblem from "@/assets/chapter-problem.jpg";
import chapterSolution from "@/assets/chapter-solution.jpg";
import type { ImageSrc } from "@/lib/utils";

export const painFeatureAssets: { id: string; image: ImageSrc; itemsCount: number } = {
  id: "problema",
  image: chapterProblem,
  itemsCount: 4,
};

export const solutionFeatureAssets: { id: string; image: ImageSrc; itemsCount: number } = {
  id: "como-fazemos",
  image: chapterSolution,
  itemsCount: 4,
};
