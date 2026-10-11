import React from 'react';

const brands = [
  {
    name: 'VERTEX TECH',
    color: 'text-emerald-500',
    icon: (
      <svg aria-hidden="true" className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
      </svg>
    ),
  },
  {
    name: 'APEXFLOW',
    color: 'text-sky-500',
    icon: (
      <svg aria-hidden="true" className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="9" />
        <path d="M12 7v5l3 3" />
        <path d="M7 12a5 5 0 0 1 5-5" />
      </svg>
    ),
  },
  {
    name: 'SYNAPSE.IO',
    color: 'text-purple-500',
    icon: (
      <svg aria-hidden="true" className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="5" r="2.5" />
        <circle cx="6" cy="18" r="2.5" />
        <circle cx="18" cy="18" r="2.5" />
        <line x1="12" y1="7.5" x2="6.8" y2="15.8" />
        <line x1="12" y1="7.5" x2="17.2" y2="15.8" />
        <line x1="8.5" y1="18" x2="15.5" y2="18" />
      </svg>
    ),
  },
  {
    name: 'ORBITAL CRM',
    color: 'text-teal-500',
    icon: (
      <svg aria-hidden="true" className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="9" />
        <ellipse cx="12" cy="12" rx="9" ry="4" transform="rotate(30 12 12)" />
      </svg>
    ),
  },
  {
    name: 'NEXUS CAPITAL',
    color: 'text-zinc-500 dark:text-zinc-400',
    icon: (
      <svg aria-hidden="true" className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
        <line x1="4" y1="6" x2="20" y2="6" strokeWidth="2.5" />
        <line x1="7" y1="6" x2="7" y2="18" />
        <line x1="12" y1="6" x2="12" y2="18" />
        <line x1="17" y1="6" x2="17" y2="18" />
        <line x1="4" y1="18" x2="20" y2="18" strokeWidth="2.5" />
      </svg>
    ),
  },
  {
    name: 'QUANTUM SCALE',
    color: 'text-emerald-500',
    icon: (
      <svg aria-hidden="true" className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
        <polygon points="12 2 2 12 12 22 22 12 12 2" />
      </svg>
    ),
  },
  {
    name: 'HYPERLOGIX',
    color: 'text-cyan-500',
    icon: (
      <svg aria-hidden="true" className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
      </svg>
    ),
  },
];

const BrandGroup: React.FC<{ isClone?: boolean }> = ({ isClone = false }) => (
  <div
    aria-hidden={isClone}
    className="flex shrink-0 items-center gap-10 pr-10 sm:gap-16 sm:pr-16"
  >
    {brands.map(({ name, color, icon }) => (
      <div key={name} className="flex shrink-0 items-center gap-2.5 opacity-70 transition-opacity duration-200 hover:opacity-100">
        <span className={color}>{icon}</span>
        <span className="whitespace-nowrap font-mono text-[10px] font-extrabold tracking-wider text-slate-800 dark:text-zinc-200 sm:text-xs">
          {name}
        </span>
      </div>
    ))}
  </div>
);

export const TrustStrip: React.FC = () => (
  <section
    aria-label="Trusted by forward-thinking businesses"
    className="relative overflow-hidden border-y border-slate-200/60 bg-[#f8faf9] py-8 transition-colors dark:border-white/5 dark:bg-[#070a0b] sm:py-10"
  >
    <div className="mb-5 text-center">
      <span className="text-[9px] font-bold uppercase tracking-[0.22em] text-slate-400 dark:text-zinc-500 sm:text-[10px]">
        Sample brands shown for demo purposes
      </span>
    </div>

    <div className="group relative mx-auto max-w-7xl overflow-hidden px-4 sm:px-6 lg:px-8">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 bg-gradient-to-r from-[#f8faf9] via-[#f8faf9]/80 to-transparent dark:from-[#070a0b] dark:via-[#070a0b]/80 sm:w-28"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-gradient-to-l from-[#f8faf9] via-[#f8faf9]/80 to-transparent dark:from-[#070a0b] dark:via-[#070a0b]/80 sm:w-28"
      />
      <div className="capability-marquee-track flex w-max select-none items-center py-1">
        <BrandGroup />
        <BrandGroup isClone />
      </div>
    </div>
  </section>
);
