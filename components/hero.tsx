'use client';

import React from 'react';
import Image from 'next/image';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithub, faLinkedinIn, faOrcid } from '@fortawesome/free-brands-svg-icons';
import { faEnvelope } from '@fortawesome/free-solid-svg-icons';
import { Button } from '@/components/ui/button';
import ThemeToggle from '@/components/theme-toggle';
import { publications, codingProjects, presentations } from '@/lib/content';

const SOCIAL_LINKS = [
  { href: 'mailto:timo.diepers@rwth-aachen.de', icon: faEnvelope,    label: 'Email',    external: false },
  { href: 'https://github.com/TimoDiepers',      icon: faGithub,      label: 'GitHub',   external: true  },
  { href: 'https://www.linkedin.com/in/timo-diepers/', icon: faLinkedinIn, label: 'LinkedIn', external: true  },
  { href: 'https://orcid.org/0009-0002-8566-8618',     icon: faOrcid,      label: 'ORCID',    external: true  },
];

const NAV_ITEMS = [
  { id: 'publications',  label: 'publications',  count: publications.length  },
  { id: 'coding',        label: 'coding',        count: codingProjects.length },
  { id: 'presentations', label: 'presentations', count: presentations.length },
];

const Sidebar = () => {
  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <aside className="lg:sticky lg:top-8 lg:self-start">
      {/* ── Mobile: compact one-row header ─────────────────────────── */}
      <div className="flex items-center justify-between gap-3 lg:hidden pb-4 border-b border-border">
        <div className="flex items-center gap-3 min-w-0">
          <Image
            src="/profile_pic_cut.jpeg"
            alt="Timo Diepers"
            width={40} height={40} priority
            className="rounded-full object-cover shrink-0 border border-border grayscale-[40%] hover:grayscale-0 transition-[filter] duration-500"
            style={{ width: 40, height: 40 }}
          />
          <div className="min-w-0">
            <h1 className="text-base font-bold font-mono leading-tight truncate">Timo Diepers</h1>
            <p className="text-xs font-mono text-muted-foreground truncate">Research Associate · RWTH Aachen</p>
          </div>
        </div>
        <div className="flex items-center gap-0.5 shrink-0">
          {SOCIAL_LINKS.map(({ href, icon, label, external }) => (
            <a key={label} href={href} aria-label={label}
              target={external ? '_blank' : undefined}
              rel={external ? 'noopener noreferrer' : undefined}
              className="flex h-7 w-7 items-center justify-center rounded-md text-muted-foreground hover:text-primary hover:bg-muted transition-colors text-xs"
            >
              <FontAwesomeIcon icon={icon} />
            </a>
          ))}
          <ThemeToggle size="sm" className="ml-0.5" />
        </div>
      </div>

      {/* ── Desktop: full sidebar column ───────────────────────────── */}
      <div className="hidden lg:flex lg:flex-col lg:gap-5 lg:pr-8 lg:border-r lg:border-border">
        {/* Theme toggle top-right */}
        <div className="flex justify-end">
          <ThemeToggle size="sm" />
        </div>

        {/* Avatar + name */}
        <div className="flex flex-col gap-3">
          <Image
            src="/profile_pic_cut.jpeg"
            alt="Timo Diepers"
            width={64} height={64} priority
            className="rounded-full object-cover border border-border grayscale-[40%] hover:grayscale-0 transition-[filter] duration-500"
            style={{ width: 64, height: 64 }}
          />
          <div>
            <h1 className="text-lg font-bold font-mono leading-tight">Timo Diepers</h1>
            <p className="text-xs font-mono text-muted-foreground mt-0.5">Research Associate</p>
            <p className="text-xs font-mono text-muted-foreground">RWTH Aachen University</p>
          </div>
        </div>

        {/* Bio */}
        <p className="text-xs text-muted-foreground leading-relaxed">
          Methods for designing Sustainable Processes &amp; Systems using Life Cycle Assessment and Mathematical Optimization.
        </p>

        {/* Social links */}
        <div className="flex flex-col gap-0.5">
          {SOCIAL_LINKS.map(({ href, icon, label, external }) => (
            <a key={label} href={href} aria-label={label}
              target={external ? '_blank' : undefined}
              rel={external ? 'noopener noreferrer' : undefined}
              className="inline-flex items-center gap-2 px-2 py-1 rounded-md text-xs font-mono text-muted-foreground hover:text-primary hover:bg-muted transition-colors"
            >
              <FontAwesomeIcon icon={icon} className="w-3 h-3 shrink-0" />
              {label}
            </a>
          ))}
        </div>

        {/* Section nav */}
        <nav className="flex flex-col gap-0.5 pt-4 border-t border-border">
          {NAV_ITEMS.map(({ id, label, count }) => (
            <Button
              key={id}
              variant="ghost"
              size="sm"
              className="justify-start font-mono text-xs text-muted-foreground hover:text-foreground h-7 px-2"
              onClick={() => scrollTo(id)}
            >
              <span className="text-emerald-700 dark:text-emerald-500 mr-1 select-none">{'//'}</span>
              {label}
              <span className="ml-auto text-muted-foreground/40 font-normal">{count}</span>
            </Button>
          ))}
        </nav>
      </div>
    </aside>
  );
};

export default Sidebar;
