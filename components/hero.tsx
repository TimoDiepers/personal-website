'use client';

import React from 'react';
import Image from 'next/image';
import { ArrowUpRight } from 'lucide-react';
import { motion } from 'framer-motion';
import ThemeToggle from '@/components/theme-toggle';
import TypingText from './ui/shadcn-io/typing-text';

type HeroProps = {
  onReady?: () => void;
  onExploreClick?: (event: React.MouseEvent<HTMLAnchorElement>) => void;
  onContactClick?: (event: React.MouseEvent<HTMLAnchorElement>) => void;
};

const MotionHeroSection = motion.create('section');
const MotionHeroContent = motion.create('div');
const MotionHeroHeading = motion.create('h1');
const MotionHeroSubcopy = motion.create('p');
const MotionHeroImageShell = motion.create('div');
const MotionHeroFrame = motion.create('div');
const MotionHeroActions = motion.create('div');
const MotionHeroThemeToggle = motion.create('div');


const Hero = ({ onReady, onExploreClick, onContactClick }: HeroProps) => {
  React.useEffect(() => {
    const timer = window.setTimeout(() => {
      onReady?.();
    }, 450);
    return () => window.clearTimeout(timer);
  }, [onReady]);

  return (
    <header className="relative">
      <MotionHeroSection
        initial={{ opacity: 0, y: 28 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.55, ease: 'easeOut' }}
        className="relative overflow-hidden pt-8 pb-4 sm:pt-14 sm:pb-14"
      >

        {/* <MotionBackground
          aria-hidden
          className="pointer-events-none absolute inset-0 -z-10 overflow-hidden bg-gradient-to-br from-primary/1 via-chart-1/13 to-background/15"
        >
          <MotionBlob
            aria-hidden
            initial={{ opacity: 0.38, x: 0 }}
            animate={{ x: ['-4rem', '4rem', '-4rem'] }}
            transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
            className="absolute left-[70%] top-1/2 -translate-y-1/2 h-52 w-52 rounded-full bg-[radial-gradient(circle_at_50%_50%,rgba(56,189,248,0.7),transparent_50%)] blur-3xl"
          />
        </MotionBackground> */}

        <MotionHeroThemeToggle
          initial={{ opacity: 0, scale: 0.9, y: -6 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.4, ease: 'easeOut', delay: 0.15 }}
          className="absolute right-0 top-0 z-30"
        >
          <ThemeToggle />
        </MotionHeroThemeToggle>

        <div className="relative z-10 grid gap-8 md:grid-cols-[minmax(0,1.2fr)_minmax(0,0.8fr)] md:items-center">
          <MotionHeroImageShell
            initial={{ opacity: 0, scale: 0.94, y: 12 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.55, ease: 'easeOut', delay: 0.16 }}
            className="mx-auto flex w-44 flex-col items-center gap-4 sm:w-48 md:order-2"
          >
            <MotionHeroFrame
              className="relative flex items-center justify-center transition-colors duration-300 rounded-full border border-border/55 bg-background/90 p-2 shadow-[0_6px_12px_rgba(8,20,34,0.14)] backdrop-blur-2xl"
            >
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
            </MotionHeroFrame>
          </MotionHeroImageShell>

          <MotionHeroContent
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: 'easeOut', delay: 0.12 }}
            className="flex flex-col gap-6 md:order-1"
          >
            <MotionHeroHeading
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, ease: 'easeOut', delay: 0.18 }}
              className="text-balance text-5xl font-semibold tracking-tight text-foreground sm:text-5xl lg:text-6xl"
            >
              Timo Diepers
              <br />
                <span className="text-3xl sm:text-4xl lg:text-4xl font-mono">&gt; </span>
              <TypingText
                text={["researcher", "programmer", "engineer"]}
                // text={["sustainability", "optimization", "lca", "energy systems", "time-dynamics"]}
                typingSpeed={85}
                pauseDuration={1500}
                showCursor={true}
                cursorCharacter="_"
                className="text-3xl sm:text-4xl lg:text-4xl font-mono" //font-mono
                textColors={['#006fd0ff', '#8b5cf6', '#06b6d4']}
                variableSpeed={{ min: 50, max: 120 }}
              />
            </MotionHeroHeading>

            <MotionHeroSubcopy
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, ease: 'easeOut', delay: 0.26 }}
              className="max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-lg"
            >
              I&apos;m a Research Associate at RWTH Aachen University, exploring Methods for designing Sustainable Processes & Systems using Life Cycle Assessment and Mathematical Optimization. Most of my work is open-source, so feel free to explore my Publications and Projects below.
            </MotionHeroSubcopy>

            <MotionHeroActions
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, ease: 'easeOut', delay: 0.32 }}
              className="flex flex-row items-center gap-2 text-sm"
            >
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
            </MotionHeroActions>
          </MotionHeroContent>
        </div>
      </MotionHeroSection>
    </header>
  );
};

export default Hero;
