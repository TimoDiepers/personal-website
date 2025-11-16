import { useRef } from 'react';
import { useScroll, useTransform, type MotionValue } from 'framer-motion';

export type ScrollAnimationConfig = {
  /**
   * Offset from top of viewport where animation starts (0-1)
   * Default: 0.8 (starts when element is 80% down the viewport)
   */
  offsetStart?: number;
  
  /**
   * Offset from top of viewport where animation completes (0-1)
   * Default: 0.2 (completes when element is 20% down the viewport)
   */
  offsetEnd?: number;
};

export type ScrollAnimationResult = {
  ref: React.RefObject<HTMLElement>;
  opacity: MotionValue<number>;
  y: MotionValue<number>;
};

/**
 * Custom hook for creating gradual scroll-based animations.
 * Uses framer-motion's useScroll to track scroll position and transform values
 * for opacity and y-position that respond to scrolling both up and down.
 */
export const useScrollAnimation = (
  config: ScrollAnimationConfig = {}
): ScrollAnimationResult => {
  const { offsetStart = 0.8, offsetEnd = 0.2 } = config;
  const ref = useRef<HTMLElement>(null);

  // Track scroll progress of the element
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: [`start ${offsetStart}`, `start ${offsetEnd}`],
  });

  // Transform scroll progress to opacity (0 to 1)
  const opacity = useTransform(scrollYProgress, [0, 1], [0, 1]);

  // Transform scroll progress to y position (24px to 0px)
  const y = useTransform(scrollYProgress, [0, 1], [24, 0]);

  return { ref, opacity, y };
};
