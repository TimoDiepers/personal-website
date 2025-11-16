'use client';

import React, { memo } from 'react';
import { ArrowUpRight } from 'lucide-react';
import { motion, useReducedMotion } from 'framer-motion';
import type { ContentItem } from '@/lib/content';
import { useScrollAnimation } from '@/lib/hooks/use-scroll-animation';

type CompactContentItemProps = {
  item: ContentItem;
  delay?: number;
  isActive?: boolean;
};

const CompactContentItem: React.FC<CompactContentItemProps> = ({
  item,
  delay = 0,
  isActive = false,
}) => {
  const shouldAnimate = delay > 0 || isActive;
  const prefersReducedMotion = useReducedMotion();
  const scrollAnimation = useScrollAnimation<HTMLDivElement>({ offsetStart: 0.9, offsetEnd: 0.3 });

  const variants = {
    hidden: { opacity: 0, y: 12 },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { 
        duration: 0.35, 
        ease: 'easeOut' as const, 
        delay: shouldAnimate ? delay : 0 
      } 
    },
  };

  const itemContent = (
    <div className="group flex items-start gap-3 rounded-3xl px-5 sm:px-6 py-3 bg-card/50 transition-all duration-500 hover:bg-card hover:scale-[1.01]">
      <div className="flex-1 min-w-0">
        <div className="flex items-start justify-between gap-2">
          <div className="flex-1 min-w-0">
            <h4 className="text-sm font-medium leading-tight line-clamp-2 group-hover:text-primary transition-colors">
              {item.title}
            </h4>
            {item.meta && (
              <p className="text-xs text-muted-foreground mt-0.5">
                {item.meta}
              </p>
            )}
          </div>
          <div className="flex gap-1.5 ml-2">
            {item.links.slice(0, 2).map((link) => (
              <a
                key={link.href}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-sm ml-2 font-medium text-primary/70 hover:text-primary transition-colors"
              >
                {link.label}
                <ArrowUpRight className="h-2.5 w-2.5" />
              </a>
            ))}
          </div>
        </div>
        
        <div className="flex flex-wrap gap-1 mt-2">
          {item.topics.slice(0, 3).map((topic) => (
            <span
              key={topic}
              className="inline-flex items-center rounded-full bg-background/80 px-1.5 py-0.5 text-xs font-medium text-muted-foreground"
            >
              {topic}
            </span>
          ))}
          {item.topics.length > 3 && (
            <span className="inline-flex items-center rounded-full bg-background/80 px-1.5 py-0.5 text-xs font-medium text-muted-foreground">
              +{item.topics.length - 3}
            </span>
          )}
        </div>
      </div>
    </div>
  );

  if (!shouldAnimate) {
    return itemContent;
  }

  // For items triggered by parent (isActive prop), keep existing behavior
  if (isActive || delay > 0) {
    return (
      <motion.div
        variants={variants}
        initial="hidden"
        animate={isActive ? 'visible' : 'hidden'}
        className="will-change-transform"
      >
        {itemContent}
      </motion.div>
    );
  }

  // Use scroll-based animation for standalone items
  return (
    <motion.div
      ref={scrollAnimation.ref}
      style={{
        opacity: prefersReducedMotion ? 1 : scrollAnimation.opacity,
        y: prefersReducedMotion ? 0 : scrollAnimation.y,
      }}
      className="will-change-transform"
    >
      {itemContent}
    </motion.div>
  );
};

export default memo(CompactContentItem);
