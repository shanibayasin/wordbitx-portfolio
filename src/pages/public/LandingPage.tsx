import React from 'react';
import { useRouter } from '../../router/Router.js';
import {
  Sparkles,
  ArrowRight,
  Shield,
  Layers,
  BarChart3,
  Users,
  Kanban,
  Zap,
  PhoneCall,
  Check,
  Building,
} from 'lucide-react';

export const LandingPage: React.FC = () => {
  const { navigate } = useRouter();

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-indigo-500 selection:text-white">
      {/* Top Navbar */}
      <header className="border-b border-slate-800/80 bg-slate-950/80 backdrop-blur-md sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-8">
            <div
              onClick={() => navigate('/')}
              className="flex items-center gap-2.5 cursor-pointer font-bold text-xl tracking-tight text-white"
            >
              <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-indigo-600 to-purple-500 flex items-center justify-center shadow-md shadow-indigo-500/20">
                <span className="text-white font-black text-lg">W</span>
              </div>
              <span>Wordbit<span className="text-indigo-400">X</span></span>
            </div>
            <nav className="hidden md:flex items-center gap-6 text-sm text-slate-300">
              <a href="#features" className="hover:text-white transition">Product</a>
              <a href="#solutions" className="hover:text-white transition">Solutions</a>
              <a href="#features" className="hover:text-white transition">Features</a>
              <a href="#integrations" className="hover:text-white transition">Integrations</a>
              <a href="#pricing" className="hover:text-white transition">Pricing</a>
              <a href="#features" className="hover:text-white transition">Resources</a>
            </nav>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={() => navigate('/login')}
              className="px-4 py-2 text-sm font-medium text-slate-300 hover:text-white transition rounded-lg hover:bg-slate-800/60"
            >
              Sign In
            </button>
            <button
              onClick={() => navigate('/demo')}
              className="hidden sm:inline-flex px-4 py-2 text-sm font-medium text-indigo-300 hover:text-white border border-indigo-500/30 hover:border-indigo-400/60 rounded-lg transition"
            >
              Book a Demo
            </button>
            <button
              onClick={() => navigate('/signup')}
              className="px-4 py-2 text-sm font-semibold text-white bg-indigo-600 hover:bg-indigo-500 rounded-lg shadow-md shadow-indigo-600/30 transition flex items-center gap-1.5"
            >
              Start Free <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative pt-20 pb-24 overflow-hidden border-b border-slate-900">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(99,102,241,0.25),rgba(255,255,255,0))] pointer-events-none" />
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-indigo-500/30 bg-indigo-500/10 text-indigo-300 text-xs font-semibold mb-6">
            <Sparkles className="w-3.5 h-3.5" /> Next-Gen Enterprise Multi-Tenant CRM Platform
          </div>
          <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-white leading-tight sm:leading-none">
            Smarter Sales. <br className="hidden sm:inline" />
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 via-purple-300 to-indigo-200">
              Stronger Relationships.
            </span>
          </h1>
          <p className="mt-6 text-lg sm:text-xl text-slate-300 max-w-3xl mx-auto leading-relaxed">
            All-in-one CRM to manage your leads, customers, pipeline, and team — in one unified place with strict tenant isolation and role-based controls.
          </p>
          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={() => navigate('/signup')}
              className="w-full sm:w-auto px-8 py-3.5 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold rounded-xl shadow-lg shadow-indigo-600/30 text-base transition flex items-center justify-center gap-2"
            >
              Start Free <ArrowRight className="w-4 h-4" />
            </button>
            <button
              onClick={() => navigate('/demo')}
              className="w-full sm:w-auto px-8 py-3.5 bg-slate-900 hover:bg-slate-800 text-slate-200 border border-slate-700 font-semibold rounded-xl text-base transition flex items-center justify-center gap-2"
            >
              Book a Demo
            </button>
          </div>
          <div className="mt-6 text-xs text-slate-400 flex items-center justify-center gap-4">
            <span>✓ No credit card required</span>
            <span>✓ Instant organization provisioning</span>
            <span>✓ 14-day full Pro trial</span>
          </div>

          {/* Interactive UI Mockup Showcase */}
          <div className="mt-14 rounded-2xl p-2 bg-gradient-to-b from-indigo-500/20 to-slate-800/40 border border-slate-800 shadow-2xl overflow-hidden text-left">
            <div className="bg-slate-900 rounded-xl p-4 sm:p-6 border border-slate-800">
              <div className="flex items-center justify-between pb-4 border-b border-slate-800 mb-6">
                <div className="flex items-center gap-3">
                  <div className="w-3 h-3 rounded-full bg-rose-500" />
                  <div className="w-3 h-3 rounded-full bg-amber-500" />
                  <div className="w-3 h-3 rounded-full bg-emerald-500" />
                  <span className="text-xs text-slate-400 font-mono ml-2">app.wordbitx.com/app/dashboard</span>
                </div>
                <span className="text-xs font-semibold px-2.5 py-1 rounded bg-indigo-900/60 text-indigo-300 border border-indigo-700/50">
                  LIVE WORKSPACE: Alpha Tech Solutions
                </span>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
                <div className="p-4 rounded-xl bg-slate-950/70 border border-slate-800">
                  <span className="text-xs text-slate-400 uppercase font-semibold">Total Leads</span>
                  <div className="text-2xl font-bold text-white mt-1">128</div>
                  <span className="text-xs text-emerald-400 font-medium">↑ 12% from last month</span>
                </div>
                <div className="p-4 rounded-xl bg-slate-950/70 border border-slate-800">
                  <span className="text-xs text-slate-400 uppercase font-semibold">Qualified Leads</span>
                  <div className="text-2xl font-bold text-white mt-1">42</div>
                  <span className="text-xs text-emerald-400 font-medium">↑ 18% conversion</span>
                </div>
                <div className="p-4 rounded-xl bg-slate-950/70 border border-slate-800">
                  <span className="text-xs text-slate-400 uppercase font-semibold">Active Deals</span>
                  <div className="text-2xl font-bold text-white mt-1">24</div>
                  <span className="text-xs text-indigo-400 font-medium">$56,400 pipeline</span>
                </div>
                <div className="p-4 rounded-xl bg-slate-950/70 border border-slate-800">
                  <span className="text-xs text-slate-400 uppercase font-semibold">Revenue</span>
                  <div className="text-2xl font-bold text-emerald-400 mt-1">$24,500</div>
                  <span className="text-xs text-emerald-400 font-medium">↑ 16% this period</span>
                </div>
              </div>

              {/* Pipeline bar preview */}
              <div className="bg-slate-950/60 p-4 rounded-xl border border-slate-800">
                <div className="flex justify-between items-center mb-3 text-xs text-slate-400 font-medium">
                  <span>Sales Pipeline Flow</span>
                  <span className="text-indigo-400">Interactive Kanban Board</span>
                </div>
                <div className="grid grid-cols-6 gap-2 text-center text-xs">
                  <div className="bg-blue-950/50 border border-blue-800/40 rounded-lg p-2.5">
                    <div className="text-blue-300 font-bold">New (32)</div>
                    <div className="text-[11px] text-slate-400 mt-0.5">$8.2k</div>
                  </div>
                  <div className="bg-indigo-950/50 border border-indigo-800/40 rounded-lg p-2.5">
                    <div className="text-indigo-300 font-bold">Contacted (26)</div>
                    <div className="text-[11px] text-slate-400 mt-0.5">$11.4k</div>
                  </div>
                  <div className="bg-emerald-950/50 border border-emerald-800/40 rounded-lg p-2.5">
                    <div className="text-emerald-300 font-bold">Qualified (18)</div>
                    <div className="text-[11px] text-slate-400 mt-0.5">$15.8k</div>
                  </div>
                  <div className="bg-amber-950/50 border border-amber-800/40 rounded-lg p-2.5">
                    <div className="text-amber-300 font-bold">Proposal (12)</div>
                    <div className="text-[11px] text-slate-400 mt-0.5">$14.2k</div>
                  </div>
                  <div className="bg-purple-950/50 border border-purple-800/40 rounded-lg p-2.5">
                    <div className="text-purple-300 font-bold">Negotiation (7)</div>
                    <div className="text-[11px] text-slate-400 mt-0.5">$12.5k</div>
                  </div>
                  <div className="bg-emerald-900/40 border border-emerald-700/60 rounded-lg p-2.5">
                    <div className="text-emerald-400 font-bold">Won (5)</div>
                    <div className="text-[11px] text-emerald-300 mt-0.5">$24.5k</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section id="features" className="py-20 bg-slate-900/60 border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-indigo-400 text-sm font-semibold tracking-wider uppercase">Features</h2>
            <p className="mt-2 text-3xl font-bold text-white">Built for High-Velocity Modern Sales Teams</p>
            <p className="mt-3 text-slate-400">
              Everything your revenue teams need from lead intake to customer expansion.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-6 rounded-2xl bg-slate-950/60 border border-slate-800 hover:border-indigo-500/40 transition">
              <div className="w-12 h-12 rounded-xl bg-indigo-600/20 text-indigo-400 flex items-center justify-center mb-5">
                <Kanban className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-semibold text-white">Visual Drag & Drop Pipeline</h3>
              <p className="mt-2 text-sm text-slate-400 leading-relaxed">
                Move deals fluidly across custom stages with automatic probability calculation and database-persisted Kanban cards.
              </p>
            </div>
            <div className="p-6 rounded-2xl bg-slate-950/60 border border-slate-800 hover:border-indigo-500/40 transition">
              <div className="w-12 h-12 rounded-xl bg-emerald-600/20 text-emerald-400 flex items-center justify-center mb-5">
                <Shield className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-semibold text-white">Multi-Tenant Isolation & RBAC</h3>
              <p className="mt-2 text-sm text-slate-400 leading-relaxed">
                Enterprise security with strict tenant scoping at the database query layer. Granular roles: Owner, Admin, Manager, Agent, Viewer.
              </p>
            </div>
            <div className="p-6 rounded-2xl bg-slate-950/60 border border-slate-800 hover:border-indigo-500/40 transition">
              <div className="w-12 h-12 rounded-xl bg-purple-600/20 text-purple-400 flex items-center justify-center mb-5">
                <Zap className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-semibold text-white">Automated Workflows</h3>
              <p className="mt-2 text-sm text-slate-400 leading-relaxed">
                Automate follow-up tasks when leads land, provision customers when deals are won, and notify teams in real-time.
              </p>
            </div>
            <div className="p-6 rounded-2xl bg-slate-950/60 border border-slate-800 hover:border-indigo-500/40 transition">
              <div className="w-12 h-12 rounded-xl bg-amber-600/20 text-amber-400 flex items-center justify-center mb-5">
                <PhoneCall className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-semibold text-white">Telephony & Unified Timeline</h3>
              <p className="mt-2 text-sm text-slate-400 leading-relaxed">
                Log calls, track incoming/outgoing durations, and view all communications in a chronological multi-entity activity stream.
              </p>
            </div>
            <div className="p-6 rounded-2xl bg-slate-950/60 border border-slate-800 hover:border-indigo-500/40 transition">
              <div className="w-12 h-12 rounded-xl bg-blue-600/20 text-blue-400 flex items-center justify-center mb-5">
                <BarChart3 className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-semibold text-white">Dynamic Analytics & Reports</h3>
              <p className="mt-2 text-sm text-slate-400 leading-relaxed">
                Real database-calculated metrics: conversion funnels, win/loss ratios, team leaderboards, and instant CSV export.
              </p>
            </div>
            <div className="p-6 rounded-2xl bg-slate-950/60 border border-slate-800 hover:border-indigo-500/40 transition">
              <div className="w-12 h-12 rounded-xl bg-rose-600/20 text-rose-400 flex items-center justify-center mb-5">
                <Building className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-semibold text-white">Super Admin Control Center</h3>
              <p className="mt-2 text-sm text-slate-400 leading-relaxed">
                Platform-level management for organizations, tenant subscriptions, inbound demo requests, and platform-wide audit trails.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-20 border-b border-slate-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-indigo-400 text-sm font-semibold tracking-wider uppercase">Pricing</h2>
            <p className="mt-2 text-3xl font-bold text-white">Simple, Transparent SaaS Plans</p>
            <p className="mt-3 text-slate-400">Scale effortlessly from small startups to enterprise sales teams.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800 flex flex-col justify-between">
              <div>
                <h3 className="font-semibold text-lg text-white">Free</h3>
                <div className="mt-4 flex items-baseline gap-1">
                  <span className="text-3xl font-bold text-white">$0</span>
                  <span className="text-xs text-slate-400">/month</span>
                </div>
                <p className="mt-2 text-xs text-slate-400">For solopreneurs and freelancers starting out.</p>
                <ul className="mt-6 space-y-2.5 text-xs text-slate-300">
                  <li className="flex items-center gap-2"><Check className="w-4 h-4 text-emerald-400" /> Up to 2 team members</li>
                  <li className="flex items-center gap-2"><Check className="w-4 h-4 text-emerald-400" /> 100 Leads limit</li>
                  <li className="flex items-center gap-2"><Check className="w-4 h-4 text-emerald-400" /> Basic Pipeline board</li>
                </ul>
              </div>
              <button
                onClick={() => navigate('/signup')}
                className="mt-8 w-full py-2.5 bg-slate-800 hover:bg-slate-700 text-white rounded-lg text-xs font-semibold transition"
              >
                Get Started
              </button>
            </div>
            <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800 flex flex-col justify-between">
              <div>
                <h3 className="font-semibold text-lg text-white">Starter</h3>
                <div className="mt-4 flex items-baseline gap-1">
                  <span className="text-3xl font-bold text-white">$29</span>
                  <span className="text-xs text-slate-400">/month</span>
                </div>
                <p className="mt-2 text-xs text-slate-400">For growing sales teams needing automation.</p>
                <ul className="mt-6 space-y-2.5 text-xs text-slate-300">
                  <li className="flex items-center gap-2"><Check className="w-4 h-4 text-emerald-400" /> Up to 5 team members</li>
                  <li className="flex items-center gap-2"><Check className="w-4 h-4 text-emerald-400" /> 1,000 Leads</li>
                  <li className="flex items-center gap-2"><Check className="w-4 h-4 text-emerald-400" /> Task automation</li>
                </ul>
              </div>
              <button
                onClick={() => navigate('/signup')}
                className="mt-8 w-full py-2.5 bg-slate-800 hover:bg-slate-700 text-white rounded-lg text-xs font-semibold transition"
              >
                Choose Starter
              </button>
            </div>
            <div className="p-6 rounded-2xl bg-gradient-to-b from-indigo-900/40 to-slate-900 border-2 border-indigo-500 relative flex flex-col justify-between shadow-xl">
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-0.5 rounded-full bg-indigo-500 text-white text-[10px] font-bold uppercase tracking-wider">
                Most Popular
              </div>
              <div>
                <h3 className="font-semibold text-lg text-white">Professional</h3>
                <div className="mt-4 flex items-baseline gap-1">
                  <span className="text-3xl font-bold text-white">$79</span>
                  <span className="text-xs text-slate-400">/month</span>
                </div>
                <p className="mt-2 text-xs text-slate-400">Full power for high-performing organizations.</p>
                <ul className="mt-6 space-y-2.5 text-xs text-slate-300">
                  <li className="flex items-center gap-2"><Check className="w-4 h-4 text-emerald-400" /> Up to 20 team members</li>
                  <li className="flex items-center gap-2"><Check className="w-4 h-4 text-emerald-400" /> 10,000 Leads</li>
                  <li className="flex items-center gap-2"><Check className="w-4 h-4 text-emerald-400" /> Custom Workflows</li>
                  <li className="flex items-center gap-2"><Check className="w-4 h-4 text-emerald-400" /> Advanced Reports & CSV</li>
                </ul>
              </div>
              <button
                onClick={() => navigate('/signup')}
                className="mt-8 w-full py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg text-xs font-semibold shadow-md transition"
              >
                Start 14-Day Free Trial
              </button>
            </div>
            <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800 flex flex-col justify-between">
              <div>
                <h3 className="font-semibold text-lg text-white">Enterprise</h3>
                <div className="mt-4 flex items-baseline gap-1">
                  <span className="text-3xl font-bold text-white">$199</span>
                  <span className="text-xs text-slate-400">/month</span>
                </div>
                <p className="mt-2 text-xs text-slate-400">Custom solutions for large-scale enterprises.</p>
                <ul className="mt-6 space-y-2.5 text-xs text-slate-300">
                  <li className="flex items-center gap-2"><Check className="w-4 h-4 text-emerald-400" /> Unlimited team members</li>
                  <li className="flex items-center gap-2"><Check className="w-4 h-4 text-emerald-400" /> Unlimited Leads</li>
                  <li className="flex items-center gap-2"><Check className="w-4 h-4 text-emerald-400" /> Platform Audit Trail & RBAC</li>
                  <li className="flex items-center gap-2"><Check className="w-4 h-4 text-emerald-400" /> Dedicated SLA & Support</li>
                </ul>
              </div>
              <button
                onClick={() => navigate('/demo')}
                className="mt-8 w-full py-2.5 bg-slate-800 hover:bg-slate-700 text-white rounded-lg text-xs font-semibold transition"
              >
                Contact Sales
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="mt-auto py-12 bg-slate-950 border-t border-slate-900 text-xs text-slate-400">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2 font-bold text-white">
            <div className="w-6 h-6 rounded bg-indigo-600 flex items-center justify-center text-xs">W</div>
            WordbitX CRM Platform
          </div>
          <div className="flex items-center gap-6">
            <button onClick={() => navigate('/demo')} className="hover:text-white transition">Book a Demo</button>
            <button onClick={() => navigate('/login')} className="hover:text-white transition">Sign In</button>
            <button onClick={() => navigate('/signup')} className="hover:text-white transition">Start Free</button>
          </div>
          <div className="text-slate-400">
            © 2026 WordbitX Inc. All rights reserved. Built with multi-tenant architecture.
          </div>
        </div>
      </footer>
    </div>
  );
};
