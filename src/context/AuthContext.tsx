import React, { createContext, useContext, useState, useEffect } from 'react';
import { api, setToken, getToken } from '../services/apiClient.js';
import type { User, Organization } from '../types/crm.js';

interface AuthContextType {
  user: User | null;
  organization: Organization | null;
  token: string | null;
  loading: boolean;
  isSuperAdmin: boolean;
  login: (email: string, password: string) => Promise<{ needsOrganization: boolean; user: User }>;
  register: (name: string, email: string, password: string) => Promise<{ needsOrganization: boolean; user: User }>;
  createOrganization: (data: { name: string; industry: string; size: string; country?: string; timezone?: string }) => Promise<void>;
  logout: () => void;
  quickDemoLogin: (email: string, password?: string) => Promise<void>;
  refreshAuth: () => Promise<void>;
  switchWorkspace: (organizationId: string) => Promise<Organization>;
  updateUserLocal: (updates: Partial<User>) => void;
  updateOrgLocal: (updates: Partial<Organization>) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [organization, setOrganization] = useState<Organization | null>(null);
  const [token, setAuthToken] = useState<string | null>(getToken());
  const [loading, setLoading] = useState(true);

  const refreshAuth = async () => {
    const currentToken = getToken();
    if (!currentToken) {
      setUser(null);
      setOrganization(null);
      setLoading(false);
      return;
    }
    try {
      const data = await api.me();
      setUser(data.user);
      setOrganization(data.organization || null);
    } catch (err) {
      console.warn('Session expired or invalid:', err);
      setToken(null);
      setAuthToken(null);
      setUser(null);
      setOrganization(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    refreshAuth();
  }, []);

  const login = async (email: string, password: string) => {
    const res = await api.login({ email, password });
    setToken(res.token);
    setAuthToken(res.token);
    setUser(res.user);
    setOrganization(res.organization || null);
    return { needsOrganization: res.needsOrganization, user: res.user };
  };

  const register = async (name: string, email: string, password: string) => {
    const res = await api.register({ name, email, password });
    setToken(res.token);
    setAuthToken(res.token);
    setUser(res.user);
    setOrganization(null);
    return { needsOrganization: res.needsOrganization, user: res.user };
  };

  const createOrganization = async (data: { name: string; industry: string; size: string; country?: string; timezone?: string }) => {
    const res = await api.createOrganization(data);
    setToken(res.token);
    setAuthToken(res.token);
    setUser(res.user);
    setOrganization(res.organization);
  };

  const logout = () => {
    setToken(null);
    setAuthToken(null);
    setUser(null);
    setOrganization(null);
    window.location.href = '/login';
  };

  const quickDemoLogin = async (email: string, password = 'password123') => {
    setLoading(true);
    try {
      const res = await api.login({ email, password });
      setToken(res.token);
      setAuthToken(res.token);
      setUser(res.user);
      setOrganization(res.organization || null);
      if (res.user.role === 'SUPER_ADMIN') {
        window.location.href = '/super-admin';
      } else if (res.needsOrganization) {
        window.location.href = '/onboarding/organization';
      } else {
        window.location.href = '/app/dashboard';
      }
    } catch (e: any) {
      console.error(`Login failed: ${e.message}`);
    } finally {
      setLoading(false);
    }
  };

  const switchWorkspace = async (organizationId: string) => {
    setLoading(true);
    try {
      const res = await api.switchOrganization(organizationId);
      setToken(res.token);
      setAuthToken(res.token);
      setOrganization(res.organization);
      setUser(res.user);
      return res.organization;
    } finally {
      setLoading(false);
    }
  };

  const isSuperAdmin = user?.role === 'SUPER_ADMIN';

  const updateUserLocal = (updates: Partial<User>) => {
    setUser((prev) => (prev ? { ...prev, ...updates } : null));
  };

  const updateOrgLocal = (updates: Partial<Organization>) => {
    setOrganization((prev) => (prev ? { ...prev, ...updates } : null));
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        organization,
        token,
        loading,
        isSuperAdmin,
        login,
        register,
        createOrganization,
        logout,
        quickDemoLogin,
        refreshAuth,
        switchWorkspace,
        updateUserLocal,
        updateOrgLocal,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
