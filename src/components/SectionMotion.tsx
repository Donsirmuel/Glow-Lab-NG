import type { ReactNode } from 'react';
import { motion, useReducedMotion, type Variants } from 'motion/react';

export const EASE_EDITORIAL = [0.22, 1, 0.36, 1] as const;

export const SECTION_VIEWPORT = {
  once: true,
  amount: 0.14,
} as const;

export const STAGGER_CONTAINER: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.04,
    },
  },
};

export const STAGGER_ITEM: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: EASE_EDITORIAL },
  },
};

interface RevealBlockProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  y?: number;
}

export function RevealBlock({
  children,
  className,
  delay = 0,
  y = 22,
}: RevealBlockProps) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <motion.div
      initial={shouldReduceMotion ? false : { opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={SECTION_VIEWPORT}
      transition={{ duration: 0.58, delay, ease: EASE_EDITORIAL }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
