'use client';

import React from 'react';
import Image from 'next/image';
import ThemeToggle from '@/components/theme-toggle';

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
        <div className="flex items-center gap-3 min-w-0">
          <Image
            src="/profile_pic_cut.jpeg"
            alt="Timo Diepers"
            width={44}
            height={44}
            priority
            className="rounded-full object-cover shrink-0 border border-border grayscale-[40%] hover:grayscale-0 transition-[filter] duration-500"
            style={{ width: 44, height: 44 }}
          />
          <div className="min-w-0">
            <h1 className="text-xl font-bold tracking-tight font-mono leading-tight">
              Timo Diepers
            </h1>
            <p className="text-xs font-mono text-muted-foreground leading-snug">
              Research Associate · RWTH Aachen University
            </p>
          </div>
        </div>
        <ThemeToggle className="shrink-0 mt-0.5" />
      </div>
      <p className="text-sm text-muted-foreground mt-3 leading-snug">
        Methods for designing Sustainable Processes &amp; Systems using Life Cycle Assessment and Mathematical Optimization.{' '}
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
    </header>
  );
};

export default Hero;
