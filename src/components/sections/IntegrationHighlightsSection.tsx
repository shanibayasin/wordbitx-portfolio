import React, { useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import { CheckCircle2 } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';

const integrationTools = [
  {
    id: 'email-sync',
    title: 'Email Sync',
    subtext: 'Email connectors',
    status: 'Coming soon',
    icon: (
      <svg aria-hidden="true" className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="4" width="18" height="16" rx="2" />
        <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
      </svg>
    ),
  },
  {
    id: 'whatsapp',
    title: 'WhatsApp',
    subtext: 'Messaging',
    status: 'Coming soon',
    icon: (
      <svg aria-hidden="true" className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
      </svg>
    ),
  },
  {
    id: 'webrtc-voice',
    title: 'Telephony',
    subtext: 'Voice integrations',
    status: 'Coming soon',
    icon: (
      <span aria-hidden="true" className="flex h-7 w-7 items-center justify-center rounded-full bg-sky-400 shadow-sm">
        <svg className="h-3.5 w-3.5 fill-white text-white" viewBox="0 0 24 24">
          <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
        </svg>
      </span>
    ),
  },
  {
    id: 'calendar',
    title: 'Calendar sync',
    subtext: 'Calendar connectors',
    status: 'Coming soon',
    icon: (
      <span aria-hidden="true" className="flex h-7 w-7 flex-col overflow-hidden rounded-md border border-slate-300 bg-white shadow-sm dark:border-zinc-700 dark:bg-zinc-800">
        <span className="h-2.5 w-full bg-rose-500" />
        <span className="grid flex-1 grid-cols-3 items-center gap-0.5 p-1">
          <span className="mx-auto h-1 w-1 rounded-full bg-slate-300 dark:bg-zinc-600" />
          <span className="mx-auto h-1 w-1 rounded-full bg-slate-300 dark:bg-zinc-600" />
          <span className="mx-auto h-1 w-1 rounded-full bg-slate-300 dark:bg-zinc-600" />
        </span>
      </span>
    ),
  },
  {
    id: 'rest-api',
    title: 'REST API',
    subtext: 'Available in settings',
    status: 'Available',
    icon: (
      <svg aria-hidden="true" className="h-6 w-6 fill-amber-500 text-amber-500" viewBox="0 0 24 24">
        <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
      </svg>
    ),
  },
  {
    id: 'webhooks',
    title: 'Webhooks',
    subtext: 'Available in settings',
    status: 'Available',
    icon: (
      <svg aria-hidden="true" className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M18 16.98h-5.99c-1.1 0-1.95.94-2.48 1.9A4 4 0 0 1 2 17c0-2.21 1.79-4 4-4h5.99c1.1 0 1.95-.94 2.48-1.9A4 4 0 0 1 22 13c0 2.21-1.79 4-4 3.98z" />
      </svg>
    ),
  },
];

export const IntegrationHighlightsSection: React.FC = () => {
  const { resolvedTheme } = useTheme();
  const shouldReduceMotion = useReducedMotion();
  const [selectedTool, setSelectedTool] = useState<string | null>(null);
  const isDark = resolvedTheme === 'dark';

  return (
    <section
      aria-labelledby="integration-highlights-title"
      className="relative isolate overflow-hidden border-t border-slate-200/60 py-16 transition-colors dark:border-white/5 sm:py-20"
    >
      <div
        aria-hidden="true"
        className={`pointer-events-none absolute left-1/2 top-1/2 -z-10 h-[400px] w-[min(85vw,850px)] -translate-x-1/2 -translate-y-1/2 rounded-full blur-[150px] ${
          isDark ? 'bg-emerald-500/10' : 'bg-emerald-300/20'
        }`}
      />

      <div className="relative mx-auto max-w-[1360px] px-4 sm:px-6 lg:px-8">
        <header className="mx-auto mb-9 max-w-3xl text-center sm:mb-11">
          <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3.5 py-1.5 text-[9px] font-bold uppercase tracking-wider text-emerald-700 dark:text-emerald-400 sm:text-[10px]">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
            Integration availability
          </div>
          <h2
            id="integration-highlights-title"
            className="text-balance text-2xl font-extrabold leading-tight tracking-tight text-slate-950 dark:text-white sm:text-3xl lg:text-4xl"
          >
            Connect with your stack.
          </h2>
          <p className="mx-auto mt-3 max-w-2xl text-pretty text-sm leading-relaxed text-slate-600 dark:text-zinc-300 sm:text-base">
            REST API and Webhooks are available in settings. Other connectors are coming soon.
          </p>
        </header>

        <div className="grid grid-cols-2 gap-3.5 sm:grid-cols-3 sm:gap-4 lg:grid-cols-6">
          {integrationTools.map((tool) => {
            const isSelected = selectedTool === tool.title;
            return (
              <motion.button
                key={tool.id}
                type="button"
                whileHover={shouldReduceMotion ? undefined : { y: -4 }}
                transition={{ duration: 0.18 }}
                aria-pressed={isSelected}
                aria-label={`${tool.title}: ${tool.status}`}
                onClick={() => setSelectedTool(isSelected ? null : tool.title)}
                className={`group flex min-h-32 cursor-pointer flex-col items-center justify-center rounded-2xl border px-3 py-5 text-center shadow-sm transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-500 sm:px-4 ${
                  isSelected
                    ? 'border-emerald-500 bg-emerald-500/5 ring-2 ring-emerald-500'
                    : isDark
                      ? 'border-white/10 bg-[#0e1517] hover:border-emerald-500/40 hover:shadow-md'
                      : 'border-slate-200/80 bg-white hover:border-emerald-300 hover:shadow-sm'
                }`}
              >
                <span className={`mb-3 flex h-10 items-center justify-center transition-transform duration-200 group-hover:scale-105 ${
                  tool.id === 'webrtc-voice' ? '' : tool.id === 'rest-api' ? '' : 'text-slate-700 dark:text-zinc-200'
                }`}>
                  {tool.icon}
                </span>
                <span className="mb-1 text-xs font-bold tracking-tight text-slate-900 dark:text-white sm:text-sm">
                  {tool.title}
                </span>
                <span className="font-mono text-[9px] font-semibold tracking-tight text-teal-700 dark:text-teal-400 sm:text-[10px]">
                  {tool.subtext}
                </span>
                <span className={`mt-2 rounded-full px-2 py-0.5 text-[8px] font-bold uppercase tracking-wide ${
                  tool.status === 'Available'
                    ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-300'
                    : 'bg-slate-100 text-slate-600 dark:bg-white/10 dark:text-zinc-300'
                }`}>
                  {tool.status}
                </span>
              </motion.button>
            );
          })}
        </div>

        <AnimatePresence mode="wait">
          {selectedTool && (
            <motion.div
              key={selectedTool}
              role="status"
              initial={shouldReduceMotion ? false : { opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={shouldReduceMotion ? undefined : { opacity: 0, y: -8 }}
              className="mt-5 flex items-center justify-center"
            >
              <div className="flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-4 py-2 text-[10px] font-semibold text-emerald-700 shadow-sm dark:text-emerald-400 sm:text-xs">
                <CheckCircle2 aria-hidden="true" className="h-3.5 w-3.5 shrink-0 text-emerald-500" />
                <span>{selectedTool} is {integrationTools.find((tool) => tool.title === selectedTool)?.status.toLowerCase()}.</span>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};
