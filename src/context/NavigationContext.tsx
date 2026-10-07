import React, { createContext, useContext, useEffect, useState } from 'react';
import { PageRoute } from '../types';

interface NavigationContextType {
  currentPath: string;
  navigate: (path: string) => void;
  isExploreDemoOpen: boolean;
  openExploreDemo: () => void;
  closeExploreDemo: () => void;
}

const NavigationContext = createContext<NavigationContextType | undefined>(undefined);

export const NavigationProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentPath, setCurrentPath] = useState<string>(() => {
    if (typeof window !== 'undefined') {
      const p = window.location.pathname;
      return p || '/';
    }
    return '/';
  });

  const [isExploreDemoOpen, setIsExploreDemoOpen] = useState(false);

  useEffect(() => {
    const handlePopState = () => {
      setCurrentPath(window.location.pathname || '/');
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const navigate = (path: string) => {
    if (path.startsWith('/#')) {
      if (currentPath !== '/') {
        setCurrentPath('/');
        window.history.pushState({}, '', '/');
        setTimeout(() => {
          const el = document.querySelector(path.substring(1));
          if (el) el.scrollIntoView({ behavior: 'smooth' });
        }, 150);
      } else {
        const el = document.querySelector(path.substring(1));
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }
      return;
    }

    if (path.startsWith('http://') || path.startsWith('https://')) {
      window.location.href = path;
      return;
    }

    const cleanPath = path.split('#')[0] || '/';
    setCurrentPath(cleanPath);
    try {
      window.history.pushState({}, '', path);
    } catch (e) {}
    window.scrollTo({ top: 0, behavior: 'smooth' });

    if (path.includes('#')) {
      const hash = path.substring(path.indexOf('#'));
      setTimeout(() => {
        const el = document.querySelector(hash);
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }, 200);
    }
  };

  const openExploreDemo = () => setIsExploreDemoOpen(true);
  const closeExploreDemo = () => setIsExploreDemoOpen(false);

  return (
    <NavigationContext.Provider
      value={{
        currentPath,
        navigate,
        isExploreDemoOpen,
        openExploreDemo,
        closeExploreDemo,
      }}
    >
      {children}
    </NavigationContext.Provider>
  );
};

export const useNavigation = () => {
  const context = useContext(NavigationContext);
  if (!context) {
    throw new Error('useNavigation must be used within a NavigationProvider');
  }
  return context;
};
