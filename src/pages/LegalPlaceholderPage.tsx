import React from 'react';
import { useNavigation } from '../context/NavigationContext';

type LegalPageKind = 'privacy' | 'terms';

const pageContent: Record<LegalPageKind, { title: string; description: string }> = {
  privacy: {
    title: 'Privacy',
    description: 'Our privacy information is being prepared. This placeholder does not describe a complete privacy policy.',
  },
  terms: {
    title: 'Terms',
    description: 'Our terms of service are being prepared. This placeholder does not describe complete terms.',
  },
};

export const LegalPlaceholderPage: React.FC<{ kind: LegalPageKind }> = ({ kind }) => {
  const { navigate } = useNavigation();
  const content = pageContent[kind];

  return (
    <main className="flex w-full flex-1 items-center justify-center bg-[#f5f8f6] px-4 py-16 dark:bg-[#071714] sm:px-6 lg:px-8">
      <section className="w-full max-w-2xl rounded-2xl border border-slate-200 bg-white p-8 text-center shadow-sm dark:border-[#183932] dark:bg-[#0e2722]">
        <h1 className="font-display text-3xl font-bold tracking-tight text-slate-950 dark:text-white">{content.title}</h1>
        <p className="mt-4 text-sm leading-relaxed text-slate-600 dark:text-slate-300">{content.description}</p>
        <button
          type="button"
          onClick={() => navigate('/')}
          className="mt-6 rounded-lg bg-[#123c32] px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-[#1c5547] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-600"
        >
          Back to homepage
        </button>
      </section>
    </main>
  );
};
