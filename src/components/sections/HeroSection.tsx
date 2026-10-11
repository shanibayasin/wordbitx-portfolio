import React from 'react';
import { ArrowRight, Check, Headphones, UsersRound } from 'lucide-react';
import { motion, useReducedMotion } from 'motion/react';
import { Button } from '../ui/Button';
import { useNavigation } from '../../context/NavigationContext';
import { HeroDashboardPreview } from './HeroDashboardPreview';

export const HeroSection: React.FC = () => {
  const { navigate } = useNavigation();
  const shouldReduceMotion = useReducedMotion();
  const enter = (delay: number) => ({
    duration: shouldReduceMotion ? 0 : 0.48,
    delay: shouldReduceMotion ? 0 : delay,
    ease: [0.22, 1, 0.36, 1] as const,
  });

  return (
    <section className="relative isolate overflow-hidden bg-[#f5f8f7] py-8 dark:bg-[#101a18] sm:py-11 lg:min-h-[calc(100svh-56px)] lg:py-12">
      <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_46%_34%,rgba(219,239,230,0.55),transparent_66%)] dark:bg-[radial-gradient(ellipse_at_46%_34%,rgba(26,74,58,0.18),transparent_66%)]" />

      <div className="mx-auto grid w-full max-w-[1400px] items-center gap-8 px-4 sm:px-6 md:gap-10 lg:min-h-[calc(100svh-152px)] lg:grid-cols-[minmax(0,0.82fr)_minmax(0,1.18fr)] lg:gap-8 lg:px-8 xl:gap-12">
        <div className="mx-auto w-full max-w-[540px] text-center lg:mx-0 lg:text-left">
          <motion.div
            initial={shouldReduceMotion ? false : { opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={enter(0)}
            className="mb-4 inline-flex items-center gap-2 rounded-full border border-[#cfe4d9] bg-[#eaf4ef] px-3 py-1.5 text-[9px] font-bold uppercase tracking-[0.1em] text-[#176d5b] dark:border-[#285344] dark:bg-[#12352e] dark:text-emerald-300 sm:mb-5 sm:text-[10px]"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-[#319679]" />
            CRM software for growing teams
          </motion.div>

          <motion.h1
            initial={shouldReduceMotion ? false : { opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={enter(0.06)}
            className="text-balance font-display text-[clamp(2.35rem,4.5vw,3.65rem)] font-bold leading-[0.99] tracking-[-0.045em] text-[#172a3e] dark:text-white"
          >
            One CRM for your
            <br className="hidden lg:block" /> leads, deals and
            <br />
            customer calls.
          </motion.h1>

          <motion.p
            initial={shouldReduceMotion ? false : { opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={enter(0.12)}
            className="mx-auto mt-4 max-w-[470px] text-pretty text-[13px] leading-[1.7] text-slate-600 dark:text-slate-300 sm:text-sm lg:mx-0"
          >
            Track leads, move deals through a Kanban pipeline, log calls and manage your team, in separate secure workspaces.
          </motion.p>

          <motion.div
            initial={shouldReduceMotion ? false : { opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={enter(0.18)}
            className="mt-5 flex flex-col justify-center gap-2.5 sm:flex-row lg:justify-start"
          >
            <Button
              variant="primary"
              size="md"
              onClick={() => navigate('/demo')}
              className="w-full border-[#123c32] bg-[#123c32] text-white shadow-sm hover:border-[#1c5547] hover:bg-[#1c5547] dark:border-emerald-400 dark:bg-emerald-400 dark:text-[#10231e] sm:w-auto"
              iconRight={<ArrowRight className="h-4 w-4" />}
            >
              Try the live demo
            </Button>
            <Button
              variant="outline"
              size="md"
              onClick={() => navigate('/features')}
              className="w-full border-slate-300 bg-white text-slate-700 hover:border-[#9ac8b9] hover:text-[#176d5b] dark:border-[#3c514a] dark:bg-[#18231f] dark:text-slate-200 sm:w-auto"
            >
              See features
            </Button>
          </motion.div>

          <motion.div
            initial={shouldReduceMotion ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={enter(0.25)}
            className="mt-4 flex flex-wrap items-center justify-center gap-x-4 gap-y-2 text-[9px] font-medium text-slate-500 dark:text-slate-400 sm:gap-x-5 sm:text-[10px] lg:justify-start"
          >
            <span className="inline-flex items-center gap-1.5">
              <Check aria-hidden="true" className="h-3 w-3 text-[#23836b]" />
              Leads and deals
            </span>
            <span className="inline-flex items-center gap-1.5">
              <UsersRound aria-hidden="true" className="h-3 w-3 text-[#23836b]" />
              Call logging
            </span>
            <span className="inline-flex items-center gap-1.5">
              <Headphones aria-hidden="true" className="h-3 w-3 text-[#23836b]" />
              Team and workspaces
            </span>
          </motion.div>
        </div>

        <motion.div
          initial={shouldReduceMotion ? false : { opacity: 0, x: 16, scale: 0.99 }}
          animate={{ opacity: 1, x: 0, scale: 1 }}
          transition={enter(0.16)}
          className="min-w-0 lg:-mr-2 xl:-mr-4"
        >
          <HeroDashboardPreview />
        </motion.div>
      </div>
    </section>
  );
};
