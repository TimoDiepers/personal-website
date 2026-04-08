'use client';

import { useEffect, useState } from 'react';
import { cn } from '@/lib/utils';

type ThemeToggleProps = {
  className?: string;
  size?: 'sm' | 'md';
};

const ThemeToggle = ({
  className,
  size = 'md',
}: ThemeToggleProps) => {
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const root = document.documentElement;
    const isDark = root.classList.contains('dark');
    setTheme(isDark ? 'dark' : 'light');
    setReady(true);
  }, []);

  const applyTheme = (value: 'light' | 'dark') => {
    document.documentElement.classList.toggle('dark', value === 'dark');
    window.localStorage.setItem('theme-preference', value);
    setTheme(value);
  };

  const dimensions = size === 'sm' ? 'h-7 px-1 text-sm' : 'h-8 px-1.5 text-sm';

  const options: Array<{ value: 'light' | 'dark'; label: 'light' | 'dark' }> = [
    { value: 'light', label: 'light' },
    { value: 'dark', label: 'dark' },
  ];

  return (
    <div
      role="radiogroup"
      aria-label="Theme selector"
      className={cn(
        'inline-flex items-center gap-1 text-foreground/60',
        !ready && 'cursor-not-allowed opacity-70',
        dimensions,
        className,
      )}
    >
      <span className="sr-only">Choose theme</span>
      {options.map((option) => {
        const isActive = theme === option.value;

        return (
          <button
            key={option.value}
            type="button"
            role="radio"
            aria-checked={isActive}
            disabled={!ready}
            onClick={() => applyTheme(option.value)}
            className={cn(
              'inline-flex cursor-pointer select-none items-center px-1 py-0.5 leading-none',
              isActive
                ? 'text-foreground/80 opacity-100 font-normal underline underline-offset-4 decoration-foreground/40 decoration-1'
                : 'text-foreground/50 opacity-70 hover:opacity-100',
              'disabled:cursor-not-allowed',
            )}
          >
            [{option.label}]
          </button>
        );
      })}
    </div>
  );
};

export default ThemeToggle;