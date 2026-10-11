import React from 'react';
import { ArrowRight, Check, Sparkles } from 'lucide-react';
import { motion, useReducedMotion } from 'motion/react';
import { Button } from '../ui/Button';
import { useNavigation } from '../../context/NavigationContext';
import { HeroDashboardPreview } from './HeroDashboardPreview';

export const HeroSection: React.FC = () => {
  const { navigate } = useNavigation();
  const reduceMotion = useReducedMotion();

  return (
    <section className="relative isolate overflow-hidden bg-[#020d0a] pb-16 pt-4 text-white sm:pb-24 lg:pb-28">
      <div aria-hidden="true" className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(48,190,155,0.12),transparent_35%),radial-gradient(circle_at_85%_20%,rgba(101,92,255,0.14),transparent_25%)]" />
      <div aria-hidden="true" className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />

      <div className="relative mx-auto max-w-[1280px] px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl pt-12 text-center sm:pt-16 lg:pt-20">
          <motion.div
            initial={reduceMotion ? false : { opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: reduceMotion ? 0 : 0.45 }}
            className="mb-5 inline-flex items-center gap-2 rounded-full border border-emerald-400/20 bg-emerald-400/5 px-3 py-1.5 text-[11px] font-medium tracking-[0.18em] text-emerald-100 uppercase"
          >
            <Sparkles className="h-3.5 w-3.5 text-emerald-300" />
            WordbitX CRM Platform
          </motion.div>

          <motion.h1
            initial={reduceMotion ? false : { opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: reduceMotion ? 0 : 0.55, delay: reduceMotion ? 0 : 0.05 }}
            className="mx-auto max-w-5xl text-balance font-display text-[clamp(2.8rem,6vw,5rem)] font-semibold leading-[0.96] tracking-[-0.065em] text-white"
          >
            One CRM for your
            <br className="hidden sm:block" /> leads, deals and{' '}
            <span className="bg-gradient-to-r from-emerald-300 via-cyan-200 to-violet-200 bg-clip-text text-transparent">
              customer calls.
            </span>
          </motion.h1>

          <motion.p
            initial={reduceMotion ? false : { opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: reduceMotion ? 0 : 0.5, delay: reduceMotion ? 0 : 0.12 }}
            className="mx-auto mt-5 max-w-2xl text-pretty text-base leading-relaxed text-slate-300 sm:text-lg"
          >
            Track leads, deals and customer calls in one place — with a cleaner workflow, better context, and a faster path to revenue.
          </motion.p>

          <motion.div
            initial={reduceMotion ? false : { opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: reduceMotion ? 0 : 0.5, delay: reduceMotion ? 0 : 0.18 }}
            className="mt-8 flex flex-col justify-center gap-3 sm:flex-row"
          >
            <Button
              variant="primary"
              size="lg"
              onClick={() => navigate('/demo')}
              className="min-h-12 rounded-xl bg-emerald-400 px-6 text-sm font-semibold text-[#041d18] shadow-[0_10px_40px_-12px_rgba(52,211,153,0.75)] transition-transform hover:-translate-y-0.5 hover:bg-emerald-300"
              iconRight={<ArrowRight className="h-4 w-4" />}
            >
              Try the demo
            </Button>
            <Button
              variant="outline"
              size="lg"
              onClick={() => navigate('/demo')}
              className="min-h-12 rounded-xl border border-white/10 bg-white/[0.04] px-6 text-sm font-semibold text-white hover:border-white/20 hover:bg-white/[0.06]"
            >
              Request a demo
            </Button>
          </motion.div>

          <div className="mt-5 flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-xs text-slate-400">
            {['Leads & companies', 'Deal pipeline', 'Calls & follow-ups'].map((item) => (
              <span key={item} className="inline-flex items-center gap-1.5">
                <Check aria-hidden="true" className="h-3.5 w-3.5 text-emerald-400" />
                {item}
              </span>
            ))}
          </div>
        </div>

        <motion.div
          initial={reduceMotion ? false : { opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: reduceMotion ? 0 : 0.65, delay: reduceMotion ? 0 : 0.2 }}
          className="mt-14 sm:mt-20"
        >
          <HeroDashboardPreview />
        </motion.div>
      </div>
    </section>
  );
};
