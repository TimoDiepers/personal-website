'use client';

import React from 'react';
import Image from 'next/image';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithub, faLinkedinIn, faOrcid } from '@fortawesome/free-brands-svg-icons';
import { faEnvelope } from '@fortawesome/free-solid-svg-icons';
import ThemeToggle from '@/components/theme-toggle';

const SOCIAL_LINKS = [
  { href: 'mailto:timo.diepers@rwth-aachen.de', icon: faEnvelope,    label: 'Email',    external: false },
  { href: 'https://github.com/TimoDiepers',      icon: faGithub,      label: 'GitHub',   external: true  },
  { href: 'https://www.linkedin.com/in/timo-diepers/', icon: faLinkedinIn, label: 'LinkedIn', external: true  },
  { href: 'https://orcid.org/0009-0002-8566-8618',     icon: faOrcid,      label: 'ORCID',    external: true  },
];

const Hero = () => (
  <header className="pb-5 border-b border-border">
    <div className="flex items-center justify-between gap-4">
      {/* Avatar + name */}
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

      {/* Social icons + theme toggle */}
      <div className="flex items-center gap-0.5 shrink-0">
        {SOCIAL_LINKS.map(({ href, icon, label, external }) => (
          <a
            key={label}
            href={href}
            aria-label={label}
            target={external ? '_blank' : undefined}
            rel={external ? 'noopener noreferrer' : undefined}
            className="flex h-8 w-8 items-center justify-center rounded-md text-muted-foreground hover:text-primary hover:bg-muted transition-colors text-sm"
          >
            <FontAwesomeIcon icon={icon} />
          </a>
        ))}
        <ThemeToggle className="shrink-0 ml-0.5" />
      </div>
    </div>

    <p className="text-sm text-muted-foreground mt-3 leading-snug max-w-xl">
      Methods for designing Sustainable Processes &amp; Systems using Life Cycle Assessment and Mathematical Optimization.
    </p>
  </header>
);

export default Hero;
