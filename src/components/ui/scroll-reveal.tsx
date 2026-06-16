"use client";

import {
  motion,
  useReducedMotion,
  type HTMLMotionProps,
} from "framer-motion";
import { Children, type ReactNode } from "react";
import {
  getFadeUpVariants,
  getScrollTransition,
  scrollViewport,
} from "@/lib/motion-presets";
import { cn } from "@/lib/utils";

type ScrollRevealProps = HTMLMotionProps<"div"> & {
  delay?: number;
};

export function ScrollReveal({
  className,
  delay = 0,
  children,
  ...props
}: ScrollRevealProps) {
  const reducedMotion = useReducedMotion();
  const variants = getFadeUpVariants(reducedMotion);

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={scrollViewport}
      variants={variants}
      transition={getScrollTransition(reducedMotion, delay)}
      className={className}
      {...props}
    >
      {children}
    </motion.div>
  );
}

type SectionHeaderProps = {
  title: ReactNode;
  description?: ReactNode;
  align?: "left" | "center";
  className?: string;
  titleClassName?: string;
  descriptionClassName?: string;
};

export function SectionHeader({
  title,
  description,
  align = "left",
  className,
  titleClassName,
  descriptionClassName,
}: SectionHeaderProps) {
  const reducedMotion = useReducedMotion();
  const variants = getFadeUpVariants(reducedMotion);
  const alignClass = align === "center" ? "text-center mx-auto" : "text-left";

  return (
    <div className={cn(className)}>
      <motion.h2
        initial="hidden"
        whileInView="visible"
        viewport={scrollViewport}
        variants={variants}
        transition={getScrollTransition(reducedMotion)}
        className={cn(alignClass, titleClassName)}
      >
        {title}
      </motion.h2>
      {description ? (
        <motion.p
          initial="hidden"
          whileInView="visible"
          viewport={scrollViewport}
          variants={variants}
          transition={getScrollTransition(reducedMotion, 0.1)}
          className={cn(
            alignClass,
            "mt-4 max-w-md text-sm leading-relaxed text-muted-foreground md:text-base",
            descriptionClassName,
          )}
        >
          {description}
        </motion.p>
      ) : null}
    </div>
  );
}

type StaggerChildrenProps = {
  className?: string;
  stagger?: number;
  children: ReactNode;
};

export function StaggerChildren({
  className,
  stagger = 0.07,
  children,
}: StaggerChildrenProps) {
  const reducedMotion = useReducedMotion();
  const itemVariants = getFadeUpVariants(reducedMotion);
  const containerVariants = reducedMotion
    ? { hidden: {}, visible: {} }
    : {
        hidden: {},
        visible: {
          transition: {
            staggerChildren: stagger,
          },
        },
      };

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={scrollViewport}
      variants={containerVariants}
      className={className}
    >
      {Children.map(children, (child) =>
        child ? (
          <motion.div
            variants={itemVariants}
            transition={getScrollTransition(reducedMotion)}
          >
            {child}
          </motion.div>
        ) : null,
      )}
    </motion.div>
  );
}

export function StaggerItem({
  className,
  children,
  ...props
}: HTMLMotionProps<"div">) {
  const reducedMotion = useReducedMotion();
  const variants = getFadeUpVariants(reducedMotion);

  return (
    <motion.div
      variants={variants}
      transition={getScrollTransition(reducedMotion)}
      className={className}
      {...props}
    >
      {children}
    </motion.div>
  );
}
