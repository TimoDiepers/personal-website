'use client';

import React from 'react';
import ThemeToggle from '@/components/theme-toggle';
import TypingText from './ui/shadcn-io/typing-text';

type HeroProps = {
  onReady?: () => void;
  onExploreClick?: (event: React.MouseEvent<HTMLAnchorElement>) => void;
  onContactClick?: (event: React.MouseEvent<HTMLAnchorElement>) => void;
};

const Hero = ({ onReady, onExploreClick, onContactClick }: HeroProps) => {
  React.useEffect(() => {
    const timer = window.setTimeout(() => onReady?.(), 100);
    return () => window.clearTimeout(timer);
  }, [onReady]);

  return (
    <header className="pb-4 border-b border-border">
      <div className="flex items-start justify-between gap-4">
        <div className="min-w-0">
          <h1 className="text-xl font-bold tracking-tight font-mono flex items-baseline flex-wrap gap-x-1">
            <span>Timo Diepers</span>
            <span className="text-muted-foreground font-normal">&gt;</span>
            <TypingText
              text={["researcher", "programmer", "engineer"]}
              typingSpeed={85}
              pauseDuration={1500}
              showCursor={true}
              cursorCharacter="_"
              className="text-primary font-mono"
              textColors={['#006fd0ff', '#8b5cf6', '#06b6d4']}
              variableSpeed={{ min: 50, max: 120 }}
            />
          </h1>
          <p className="text-sm text-muted-foreground mt-1 leading-snug">
            Research Associate at RWTH Aachen University — Life Cycle Assessment &amp; Mathematical Optimization.{' '}
            <a
              href="#publications"
              onClick={onExploreClick}
              className="text-primary hover:underline focus-visible:outline-none"
            >
              Explore work
            </a>
            {' · '}
            <a
              href="#contact"
              onClick={onContactClick}
              className="text-muted-foreground hover:text-foreground hover:underline focus-visible:outline-none"
            >
              Get in touch
            </a>
          </p>
        </div>
        <ThemeToggle className="shrink-0" />
      </div>
    </header>
  );
};

export default Hero;
