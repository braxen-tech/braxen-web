import type { Transition, Variant, ViewportOptions } from "framer-motion";

export const scrollViewport: ViewportOptions = {
  once: true,
  amount: 0.15,
};

export const scrollTransition: Transition = {
  duration: 0.8,
  ease: [0.16, 1, 0.3, 1],
};

export const fadeUpHidden: Variant = {
  opacity: 0,
  y: 28,
};

export const fadeUpVisible: Variant = {
  opacity: 1,
  y: 0,
};

export const staggerContainerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.07,
    },
  },
};

export function getFadeUpVariants(reducedMotion: boolean | null) {
  if (reducedMotion) {
    return {
      hidden: { opacity: 1, y: 0 },
      visible: { opacity: 1, y: 0 },
    };
  }

  return {
    hidden: fadeUpHidden,
    visible: fadeUpVisible,
  };
}

export function getScrollTransition(
  reducedMotion: boolean | null,
  delay = 0,
): Transition {
  if (reducedMotion) {
    return { duration: 0 };
  }

  return {
    ...scrollTransition,
    delay,
  };
}
