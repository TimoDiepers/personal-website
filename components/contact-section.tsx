'use client';

import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithub, faLinkedinIn, faOrcid } from '@fortawesome/free-brands-svg-icons';
import { faEnvelope } from '@fortawesome/free-solid-svg-icons';
import { motion, useReducedMotion } from 'framer-motion';
import { useScrollAnimation } from '@/lib/hooks/use-scroll-animation';

const MotionContactSection = motion.create('section');

const SOCIAL_LINKS = [
  { href: 'mailto:timo.diepers@rwth-aachen.de', label: 'Mail', icon: faEnvelope },
  { href: 'https://www.linkedin.com/in/timo-diepers/', label: 'LinkedIn', icon: faLinkedinIn },
  { href: 'https://github.com/TimoDiepers', label: 'GitHub', icon: faGithub },
  { href: 'https://orcid.org/0009-0002-8566-8618', label: 'ORCID', icon: faOrcid },
];

const ContactSection: React.FC = () => {
  const prefersReducedMotion = useReducedMotion();
  const scrollAnimation = useScrollAnimation({ offsetStart: 0.9, offsetEnd: 0.4 });
  
  return (
    <MotionContactSection
      id="contact"
      ref={scrollAnimation.ref}
      style={{
        opacity: prefersReducedMotion ? 1 : scrollAnimation.opacity,
        y: prefersReducedMotion ? 0 : scrollAnimation.y,
      }}
      className="text-foreground border-t border-border pt-12 my-12"
    >
      {/* Header */}
      <div className="flex items-center gap-3 sm:gap-6">
        <div>
          <h2 className="text-lg font-bold tracking-tight sm:text-xl lg:text-2xl">
            Get in Touch
          </h2>
          <p className="max-w-xl text-muted-foreground sm:text-lg pb-3">
            Let&apos;s connect and discuss opportunities to collaborate.
          </p>
        </div>
      </div>
      <div className="flex flex-wrap gap-3">
        {SOCIAL_LINKS.map(({ href, label, icon }) => (
          <a
            key={`contact-${label}`}
            href={href}
            target={label === 'Mail' ? undefined : '_blank'}
            rel={label === 'Mail' ? undefined : 'noopener noreferrer'}
            className="inline-flex items-center gap-2 rounded-lg bg-card/50 px-3 py-2 text-sm font-medium text-foreground transition-all duration-300 hover:bg-card hover:text-primary"
            aria-label={label}
          >
            <FontAwesomeIcon icon={icon} className="text-base" />
            {label}
          </a>
        ))}
      </div>
    </MotionContactSection>
  );
};

export default ContactSection;
