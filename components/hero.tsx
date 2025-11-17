'use client';

import React from 'react';
import Image from 'next/image';
import { ArrowUpRight } from 'lucide-react';
import { motion, useReducedMotion } from 'framer-motion';
import ThemeToggle from '@/components/theme-toggle';
import TypingText from './ui/shadcn-io/typing-text';
import { useScrollAnimation } from '@/lib/hooks/use-scroll-animation';

type HeroProps = {
  onExploreClick?: (event: React.MouseEvent<HTMLAnchorElement>) => void;
  onContactClick?: (event: React.MouseEvent<HTMLAnchorElement>) => void;
};

const Hero = ({ onExploreClick, onContactClick }: HeroProps) => {
  const prefersReducedMotion = useReducedMotion();
  const heroScrollAnimation = useScrollAnimation<HTMLElement>({ offsetStart: 1, offsetEnd: 0.1 });
  const imageScrollAnimation = useScrollAnimation<HTMLDivElement>({ offsetStart: 1, offsetEnd: 0.15 });
  const contentScrollAnimation = useScrollAnimation<HTMLDivElement>({ offsetStart: 1, offsetEnd: 0.2 });

  return (
    <header className="relative">
      <motion.section
        ref={heroScrollAnimation.ref}
        style={{
          opacity: prefersReducedMotion ? 1 : heroScrollAnimation.opacity,
          y: prefersReducedMotion ? 0 : heroScrollAnimation.y,
        }}
        className="relative overflow-hidden pt-8 pb-4 sm:pt-14 sm:pb-14"
      >
        <ThemeToggle className="absolute right-0 top-0 z-30" />

        <div className="relative z-10 grid gap-8 md:grid-cols-[minmax(0,1.2fr)_minmax(0,0.8fr)] md:items-center">
          <motion.div
            ref={imageScrollAnimation.ref}
            style={{
              opacity: prefersReducedMotion ? 1 : imageScrollAnimation.opacity,
              y: prefersReducedMotion ? 0 : imageScrollAnimation.y,
            }}
            className="mx-auto flex w-44 flex-col items-center gap-4 sm:w-48 md:order-2"
          >
            <div className="relative flex items-center justify-center transition-colors duration-300 rounded-full border border-border/55 bg-background/90 p-2 shadow-[0_6px_12px_rgba(8,20,34,0.14)] backdrop-blur-2xl">
              <div className="relative h-40 w-40 overflow-hidden rounded-full border border-border/45 sm:h-48 sm:w-48">
                <Image
                  src="/profile_pic_cut.jpeg"
                  alt="Profile portrait of Timo Diepers"
                  width={320}
                  height={320}
                  priority
                  className="h-full w-full object-cover"
                />
              </div>
            </div>
          </motion.div>

          <motion.div
            ref={contentScrollAnimation.ref}
            style={{
              opacity: prefersReducedMotion ? 1 : contentScrollAnimation.opacity,
              y: prefersReducedMotion ? 0 : contentScrollAnimation.y,
            }}
            className="flex flex-col gap-6 md:order-1"
          >
            <h1 className="text-balance text-5xl font-semibold tracking-tight text-foreground sm:text-5xl lg:text-6xl">
              Timo Diepers
              <br />
              <span className="text-3xl sm:text-4xl lg:text-4xl font-mono">&gt; </span>
              <TypingText
                text={["researcher", "programmer", "engineer"]}
                typingSpeed={85}
                pauseDuration={1500}
                showCursor={true}
                cursorCharacter="_"
                className="text-3xl sm:text-4xl lg:text-4xl font-mono"
                textColors={['#006fd0ff', '#8b5cf6', '#06b6d4']}
                variableSpeed={{ min: 50, max: 120 }}
              />
            </h1>

            <p className="max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-lg">
              I&apos;m a Research Associate at RWTH Aachen University, exploring Methods for designing Sustainable Processes & Systems using Life Cycle Assessment and Mathematical Optimization. Most of my work is open-source, so feel free to explore my Publications and Projects below.
            </p>

            <div className="flex flex-row items-center gap-2 text-sm">
              <a
                href="#featured-publications"
                onClick={onExploreClick}
                className="inline-flex items-center gap-1 font-medium text-primary hover:text-primary/80 transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40 rounded-md px-1 py-0.5"
              >
                Explore work
                <ArrowUpRight className="h-3 w-3" />
              </a>
              <span className="text-muted-foreground">•</span>
              <a
                href="#contact"
                onClick={onContactClick}
                className="inline-flex items-center gap-1 font-medium text-muted-foreground hover:text-foreground transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40 rounded-md px-1 py-0.5"
              >
                Get in touch
              </a>
            </div>
          </motion.div>
        </div>
      </motion.section>
    </header>
  );
};

export default Hero;
