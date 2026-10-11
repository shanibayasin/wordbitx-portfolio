import React, { useState, useEffect, useRef } from 'react';
import { Menu, Moon, Sun, X } from 'lucide-react';
import { useNavigation } from '../../context/NavigationContext';
import { PRODUCT_MENU, SOLUTIONS_MENU } from '../../data/navigationData';
import { Button } from '../ui/Button';
import { useTheme } from '../../context/ThemeContext';

export const Navbar: React.FC = () => {
  const { currentPath, navigate } = useNavigation();
  const handleGo = (to: string) => navigate(to);
  const [activeDropdown, setActiveDropdown] = useState<'product' | 'solutions' | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const isHomePage = currentPath === '/';
  const { resolvedTheme, toggleTheme } = useTheme();
  const dropdownTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const mobileMenuToggleRef = useRef<HTMLButtonElement>(null);
  const mobileMenuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 12);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (!mobileMenuOpen) return;

    const handlePointerDown = (event: PointerEvent) => {
      const target = event.target;
      if (
        target instanceof Node &&
        !mobileMenuRef.current?.contains(target) &&
        !mobileMenuToggleRef.current?.contains(target)
      ) {
        setMobileMenuOpen(false);
      }
    };
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setMobileMenuOpen(false);
        mobileMenuToggleRef.current?.focus();
      }
    };

    document.addEventListener('pointerdown', handlePointerDown);
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('pointerdown', handlePointerDown);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [mobileMenuOpen]);

  const handleMouseEnter = (menu: 'product' | 'solutions') => {
    if (dropdownTimeoutRef.current) clearTimeout(dropdownTimeoutRef.current);
    setActiveDropdown(menu);
  };

  const handleMouseLeave = () => {
    dropdownTimeoutRef.current = setTimeout(() => {
      setActiveDropdown(null);
    }, 150);
  };

  const closeDropdown = () => {
    setActiveDropdown(null);
  };

  return (
    <header
      className={`sticky top-0 z-40 w-full transition-all duration-200 ${
        isHomePage && !isScrolled
          ? 'border-b border-white/5 bg-[#020d0a] text-white'
          : isScrolled
            ? 'bg-white/95 shadow-xs backdrop-blur-xl border-b border-slate-200/90 dark:bg-[#11111f]/95 dark:border-[#323250]'
            : 'bg-white/90 backdrop-blur-lg border-b border-slate-200/60 dark:bg-[#11111f]/90 dark:border-[#323250]/70'
      }`}
    >
      <div className={`mx-auto flex max-w-[1336px] items-center justify-between gap-3 px-4 sm:px-6 lg:px-8 ${isHomePage ? 'h-[84px]' : 'h-[60px]'}`}>
        {/* WordbitX brand */}
        <div className="flex shrink-0 items-center">
          <button
            onClick={() => navigate('/')}
            aria-label="WordbitX CRM home"
            className={`group flex items-center gap-2 text-left focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-600 ${isHomePage && !isScrolled ? 'text-white' : ''}`}
          >
            <span className={`grid h-9 w-9 place-items-center rounded-xl text-base font-black shadow-sm transition-transform group-hover:scale-105 ${isHomePage ? 'bg-emerald-400 text-[#041d18]' : 'bg-emerald-500 text-[#071714]'}`}>
              W
            </span>
            <span className={isHomePage ? 'text-lg font-bold tracking-tight text-white' : 'flex flex-col leading-none'}>
              <span className={`${isHomePage ? '' : 'text-[15px] '}font-bold tracking-tight ${isHomePage && !isScrolled ? 'text-white' : isHomePage ? '' : 'text-slate-950 dark:text-white'}`}>
                Wordbit<span className={isHomePage ? 'text-emerald-300' : 'text-[#23836b] dark:text-emerald-400'}>X</span>
              </span>
              {!isHomePage && <span className="mt-1 text-xs font-bold uppercase tracking-[0.16em] text-[#26735e] dark:text-emerald-300">CRM</span>}
            </span>
          </button>
        </div>

        {/* Zone 2: Navigation Links */}
        <nav className="hidden lg:flex items-center gap-0.5 xl:gap-1 text-[13px] font-medium text-slate-600 dark:text-slate-300">
          {isHomePage ? (
            [
              ['Product', '/features'],
              ['Solutions', '/solutions'],
              ['Integrations', '/integrations'],
              ['Pricing', '/pricing'],
              ['Resources', '/resources'],
            ].map(([label, path]) => (
              <button
                key={path}
                type="button"
                onClick={() => navigate(path)}
                className="rounded-lg px-3 py-2 text-slate-300 transition-colors hover:text-white"
              >
                {label}
              </button>
            ))
          ) : (
            <>
          {/* Capabilities menu */}
          <div
            className="relative"
            onMouseEnter={() => handleMouseEnter('product')}
            onMouseLeave={handleMouseLeave}
          >
            <button
              onClick={() => setActiveDropdown(activeDropdown === 'product' ? null : 'product')}
              aria-haspopup="true"
              aria-expanded={activeDropdown === 'product'}
              aria-controls="product-navigation-menu"
              className={`flex items-center gap-1 px-3 py-1.5 rounded-lg hover:text-indigo-700 dark:hover:text-indigo-300 transition-colors cursor-pointer ${
                activeDropdown === 'product' ? 'text-indigo-700 dark:text-indigo-300 bg-indigo-50/80 dark:bg-[#20203a]' : ''
              }`}
            >
              <span>Product</span>
            </button>
            {activeDropdown === 'product' && (
              <div
                id="product-navigation-menu"
                className="absolute top-full left-0 mt-2 w-[540px] bg-white dark:bg-[#20203a] rounded-2xl border border-slate-200 dark:border-[#323250] shadow-xl p-4 grid grid-cols-2 gap-4 animate-in fade-in slide-in-from-top-1 duration-150"
                onMouseEnter={() => handleMouseEnter('product')}
                onMouseLeave={handleMouseLeave}
              >
                {PRODUCT_MENU.map((col, idx) => (
                  <div key={idx} className="space-y-1">
                    <div className="text-xs font-bold uppercase tracking-wider text-indigo-800 dark:text-indigo-400 px-2 py-1">
                      {col.title}
                    </div>
                    {col.items.map((item) => item.badge ? (
                      <div key={item.name} aria-disabled="true" className="block w-full rounded-xl p-2 text-left">
                        <div className="flex items-center justify-between gap-2">
                          <span className="text-sm font-semibold text-slate-700 dark:text-slate-300">{item.name}</span>
                          <span className="shrink-0 rounded-full bg-slate-100 px-2 py-0.5 text-xs font-bold text-slate-600 dark:bg-white/10 dark:text-zinc-300">{item.badge}</span>
                        </div>
                        <div className="mt-0.5 text-xs text-slate-500 dark:text-slate-400">{item.description}</div>
                      </div>
                    ) : (
                      <button
                        key={item.name}
                        onClick={() => {
                          closeDropdown();
                          navigate(item.href);
                        }}
                        className="group block w-full cursor-pointer rounded-xl p-2 text-left transition-colors hover:bg-indigo-50/70 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-600 dark:hover:bg-[#252542]"
                      >
                        <div className="text-sm font-semibold text-slate-900 transition-colors group-hover:text-indigo-700 dark:text-white dark:group-hover:text-indigo-300">
                          {item.name}
                        </div>
                        <div className="mt-0.5 line-clamp-1 text-xs text-slate-500 dark:text-slate-400">
                          {item.description}
                        </div>
                      </button>
                    ))}
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Use cases menu */}
          <div
            className="relative"
            onMouseEnter={() => handleMouseEnter('solutions')}
            onMouseLeave={handleMouseLeave}
          >
            <button
              onClick={() => setActiveDropdown(activeDropdown === 'solutions' ? null : 'solutions')}
              aria-haspopup="true"
              aria-expanded={activeDropdown === 'solutions'}
              aria-controls="solutions-navigation-menu"
              className={`flex items-center gap-1 px-3 py-1.5 rounded-lg hover:text-indigo-700 dark:hover:text-indigo-300 transition-colors cursor-pointer ${
                activeDropdown === 'solutions' ? 'text-indigo-700 dark:text-indigo-300 bg-indigo-50/80 dark:bg-[#20203a]' : ''
              }`}
            >
              <span>Solutions</span>
            </button>
            {activeDropdown === 'solutions' && (
              <div
                id="solutions-navigation-menu"
                className="absolute top-full left-0 mt-2 w-[520px] bg-white dark:bg-[#20203a] rounded-2xl border border-slate-200 dark:border-[#323250] shadow-xl p-4 grid grid-cols-2 gap-4 animate-in fade-in slide-in-from-top-1 duration-150"
                onMouseEnter={() => handleMouseEnter('solutions')}
                onMouseLeave={handleMouseLeave}
              >
                {SOLUTIONS_MENU.map((col, idx) => (
                  <div key={idx} className="space-y-1">
                    <div className="text-xs font-bold uppercase tracking-wider text-indigo-800 dark:text-indigo-400 px-2 py-1">
                      {col.title}
                    </div>
                    {col.items.map((item) => item.badge ? (
                      <div key={item.name} aria-disabled="true" className="block w-full rounded-xl p-2 text-left">
                        <div className="flex items-center justify-between gap-2">
                          <span className="text-sm font-semibold text-slate-700 dark:text-slate-300">{item.name}</span>
                          <span className="shrink-0 rounded-full bg-slate-100 px-2 py-0.5 text-xs font-bold text-slate-600 dark:bg-white/10 dark:text-zinc-300">{item.badge}</span>
                        </div>
                        <div className="mt-0.5 text-xs text-slate-500 dark:text-slate-400">{item.description}</div>
                      </div>
                    ) : (
                      <button
                        key={item.name}
                        onClick={() => {
                          closeDropdown();
                          navigate(item.href);
                        }}
                        className="group block w-full cursor-pointer rounded-xl p-2 text-left transition-colors hover:bg-indigo-50/70 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-600 dark:hover:bg-[#252542]"
                      >
                        <div className="text-sm font-semibold text-slate-900 transition-colors group-hover:text-indigo-700 dark:text-white dark:group-hover:text-indigo-300">
                          {item.name}
                        </div>
                        <div className="mt-0.5 line-clamp-1 text-xs text-slate-500 dark:text-slate-400">
                          {item.description}
                        </div>
                      </button>
                    ))}
                  </div>
                ))}
              </div>
            )}
          </div>

          <button
            onClick={() => navigate('/integrations')}
            className="px-3 py-1.5 rounded-lg hover:text-[#176d5b] dark:hover:text-emerald-300 transition-colors cursor-pointer"
          >
            Integrations
          </button>

          <button
            onClick={() => navigate('/pricing')}
            className={`px-3 py-1.5 rounded-lg hover:text-[#176d5b] dark:hover:text-emerald-300 transition-colors cursor-pointer ${
              currentPath === '/pricing' ? 'text-[#176d5b] dark:text-emerald-300 font-bold' : ''
            }`}
          >
            Pricing
          </button>

          <button
            onClick={() => navigate('/#security')}
            className="px-3 py-1.5 rounded-lg hover:text-[#176d5b] dark:hover:text-emerald-300 transition-colors cursor-pointer"
          >
            Security
          </button>
            </>
          )}
        </nav>

        {/* Zone 3: Account actions */}
        <div className="flex items-center gap-2 sm:gap-3">
          <button
            type="button"
            onClick={toggleTheme}
            aria-label={`Switch to ${resolvedTheme === 'dark' ? 'light' : 'dark'} mode`}
            title={`Switch to ${resolvedTheme === 'dark' ? 'light' : 'dark'} mode`}
            className={`grid h-10 w-10 shrink-0 place-items-center rounded-lg transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-600 ${isHomePage ? 'hidden' : 'text-slate-600 hover:bg-slate-100 hover:text-slate-950 dark:text-slate-300 dark:hover:bg-white/10 dark:hover:text-white'}`}
          >
            {resolvedTheme === 'dark' ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
          </button>

          {/* Sign In */}
          <button
            onClick={() => handleGo('/login')}
            className={`text-[13px] font-semibold hover:text-white px-2.5 py-1.5 rounded-lg transition-colors whitespace-nowrap cursor-pointer ${isHomePage && !isScrolled ? 'text-slate-300' : 'text-slate-700 dark:text-slate-200'}`}
          >
            Sign In
          </button>

          {/* Get Started */}
          {isHomePage && (
            <Button
              variant="outline"
              size="sm"
              onClick={() => handleGo('/demo')}
              className="hidden border-[#253143] bg-[#091411] px-4 py-2 text-sm text-slate-200 hover:border-emerald-400/60 hover:bg-white/5 hover:text-white sm:inline-flex"
            >
              Try the demo
            </Button>
          )}
          <Button
            variant="primary"
            size="sm"
            onClick={() => handleGo('/signup')}
            className={`hidden sm:inline-flex ${isHomePage ? 'border-emerald-400 bg-emerald-400 px-4 py-2 text-sm font-semibold text-[#041d18] hover:border-emerald-300 hover:bg-emerald-300' : 'border-[#123c32] bg-[#123c32] text-white hover:border-[#1c5547] hover:bg-[#1c5547] dark:border-emerald-400 dark:bg-emerald-400 dark:text-[#10231e]'}`}
          >
            {isHomePage ? 'Start Free' : 'Get started'}
            {isHomePage && <span aria-hidden="true" className="ml-1">→</span>}
          </Button>

          {/* Mobile hamburger */}
          <button
            ref={mobileMenuToggleRef}
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className={`lg:hidden cursor-pointer rounded-lg p-2 transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-600 ${isHomePage && !isScrolled ? 'text-slate-300 hover:bg-white/10 hover:text-white' : 'text-slate-600 hover:bg-indigo-50 hover:text-indigo-800 dark:text-slate-300 dark:hover:bg-[#20203a] dark:hover:text-white'}`}
            aria-label="Toggle mobile menu"
            aria-expanded={mobileMenuOpen}
            aria-controls="public-mobile-navigation"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div
          id="public-mobile-navigation"
          ref={mobileMenuRef}
          role="region"
          aria-label="Mobile navigation"
          className="lg:hidden border-b border-slate-200 dark:border-[#323250] bg-white dark:bg-[#11111f] px-4 py-4 space-y-4 animate-in fade-in duration-150"
        >
          <div className="space-y-1">
            {['/features', '/solutions', '/integrations', '/pricing', '/#security', '/resources', '/updates', '/about', '/contact'].map((path) => {
              const label =
                path === '/features'
                  ? 'Product'
                  : path === '/solutions'
                  ? 'Solutions'
                  : path === '/integrations'
                  ? 'Integrations'
                  : path === '/pricing'
                  ? 'Pricing'
                  : path === '/#security'
                  ? 'Security'
                  : path === '/resources'
                  ? 'Guides & Playbooks'
                  : path === '/updates'
                  ? "What's new"
                  : path === '/about'
                  ? 'About WordbitX'
                  : 'Contact';
              return (
                <button
                  key={path}
                  onClick={() => {
                    setMobileMenuOpen(false);
                    navigate(path);
                  }}
                  className="w-full text-left px-3 py-2 text-sm font-semibold rounded-lg hover:bg-indigo-50 dark:hover:bg-[#20203a] text-slate-900 dark:text-white hover:text-indigo-800 dark:hover:text-indigo-300"
                >
                  {label}
                </button>
              );
            })}
          </div>

          <div className="pt-3 border-t border-slate-200 dark:border-[#323250] flex flex-col gap-2">
            <Button
              variant="outline"
              size="md"
              onClick={() => {
                setMobileMenuOpen(false);
                navigate('/demo');
              }}
              className="w-full justify-center"
            >
              Request a demo
            </Button>
            <Button
              variant="primary"
              size="md"
              onClick={() => {
                setMobileMenuOpen(false);
                navigate('/signup');
              }}
              className="w-full justify-center border-[#123c32] bg-[#123c32] text-white hover:border-[#1c5547] hover:bg-[#1c5547] dark:border-emerald-400 dark:bg-emerald-400 dark:text-[#10231e]"
            >
              Get started
            </Button>
          </div>
        </div>
      )}
    </header>
  );
};
