'use client';

import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithub, faLinkedinIn, faOrcid } from '@fortawesome/free-brands-svg-icons';
import { faEnvelope } from '@fortawesome/free-solid-svg-icons';

const SOCIAL_LINKS = [
  { href: 'mailto:timo.diepers@rwth-aachen.de', label: 'Mail', icon: faEnvelope },
  { href: 'https://www.linkedin.com/in/timo-diepers/', label: 'LinkedIn', icon: faLinkedinIn },
  { href: 'https://github.com/TimoDiepers', label: 'GitHub', icon: faGithub },
  { href: 'https://orcid.org/0009-0002-8566-8618', label: 'ORCID', icon: faOrcid },
];

type ContactSectionProps = {
  isReady?: boolean;
};

const ContactSection: React.FC<ContactSectionProps> = () => (
  <section id="contact" className="mt-6 pt-4 border-t border-border">
    <div className="flex flex-wrap gap-4">
      {SOCIAL_LINKS.map(({ href, label, icon }) => (
        <a
          key={label}
          href={href}
          target={label === 'Mail' ? undefined : '_blank'}
          rel={label === 'Mail' ? undefined : 'noopener noreferrer'}
          className="inline-flex items-center gap-1.5 text-xs font-mono text-muted-foreground hover:text-primary transition-colors"
          aria-label={label}
        >
          <FontAwesomeIcon icon={icon} />
          {label}
        </a>
      ))}
    </div>
  </section>
);

export default ContactSection;
