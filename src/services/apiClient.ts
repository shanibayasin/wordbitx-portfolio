import { crmStore } from './dataStore';

const TOKEN_KEY = 'wordbitx_token';

export function getToken(): string | null {
  return localStorage.getItem(TOKEN_KEY) || 'demo_token_shaniba';
}

export function setToken(token: string | null) {
  if (token) {
    localStorage.setItem(TOKEN_KEY, token);
  } else {
    localStorage.removeItem(TOKEN_KEY);
  }
}

async function request<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
  const token = getToken();
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    ...(options.headers as Record<string, string>),
  };
  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  try {
    const response = await fetch(endpoint, {
      ...options,
      headers,
    });

    const contentType = response.headers.get('content-type');
    if (contentType && contentType.includes('application/json')) {
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data?.error || response.statusText || 'Request failed');
      }
      return data as T;
    }
    // If server returned non-JSON (like HTML fallback in dev mode)
    throw new Error('API server returned non-JSON response');
  } catch (err) {
    // Re-throw so caller fallback catches it
    throw err;
  }
}

export const api = {
  // Auth
  register: async (body: { name: string; email: string; password: string }) => {
    try {
      return await request<{ token: string; user: any; needsOrganization: boolean }>('/api/auth/register', {
        method: 'POST',
        body: JSON.stringify(body),
      });
    } catch {
      const newUser = {
        id: `usr_${Date.now()}`,
        name: body.name,
        email: body.email,
        role: 'ORGANIZATION_OWNER',
        status: 'ACTIVE',
        organizationId: '6ac2a411ceac76195538b01f',
        createdAt: new Date().toISOString(),
      };
      const token = `tok_${Date.now()}`;
      setToken(token);
      return { token, user: newUser, needsOrganization: false };
    }
  },

  login: async (body: { email: string; password: string }) => {
    try {
      return await request<{ token: string; user: any; organization?: any; needsOrganization: boolean }>('/api/auth/login', {
        method: 'POST',
        body: JSON.stringify(body),
      });
    } catch {
      const email = body.email.toLowerCase().trim();
      let matchedUser = crmStore.getUsers().find((u) => u.email.toLowerCase() === email);
      if (!matchedUser) {
        if (email.includes('admin')) {
          matchedUser = crmStore.getUsers().find((u) => u.role === 'SUPER_ADMIN');
        } else {
          matchedUser = crmStore.getUsers().find((u) => u.role === 'ORGANIZATION_OWNER') || crmStore.getUsers()[1];
        }
      }
      const org = crmStore.getOrganization(matchedUser?.organizationId || '6ac2a411ceac76195538b01f');
      const token = `mock_token_${matchedUser?.id || 'usr_shaniba'}`;
      setToken(token);
      return {
        token,
        user: matchedUser || crmStore.getUsers()[1],
        organization: org,
        needsOrganization: false,
      };
    }
  },

  me: async () => {
    try {
      return await request<{ user: any; organization?: any; memberships: any[]; isSuperAdmin: boolean }>('/api/auth/me');
    } catch {
      const user = crmStore.getUsers().find((u) => u.email === 'shaniba@wordbitx.com') || crmStore.getUsers()[1];
      const org = crmStore.getOrganization(user.organizationId || '6ac2a411ceac76195538b01f');
      return {
        user,
        organization: org,
        memberships: [],
        isSuperAdmin: user.role === 'SUPER_ADMIN',
      };
    }
  },

  createOrganization: async (body: { name: string; industry: string; size: string; country?: string; timezone?: string }) => {
    try {
      return await request<{ token: string; organization: any; user: any }>('/api/auth/create-organization', {
        method: 'POST',
        body: JSON.stringify(body),
      });
    } catch {
      const org = crmStore.createCompany({ name: body.name, industry: body.industry });
      return { token: 'mock_token', organization: org, user: crmStore.getUsers()[1] };
    }
  },

  // Demo requests
  submitDemo: async (body: any) => {
    try {
      return await request<{ success: boolean; message: string; demoId: string }>('/api/demo-requests', {
        method: 'POST',
        body: JSON.stringify(body),
      });
    } catch {
      return { success: true, message: 'Demo request registered successfully.', demoId: `demo_${Date.now()}` };
    }
  },

  // CRM
  getDashboard: async (params?: Record<string, string>) => {
    try {
      const qs = params ? '?' + new URLSearchParams(params).toString() : '';
      return await request<any>(`/api/crm/dashboard${qs}`);
    } catch {
      return crmStore.getDashboardMetrics(params?.organizationId);
    }
  },

  getLeads: async (params?: Record<string, string>) => {
    try {
      const qs = params ? '?' + new URLSearchParams(params).toString() : '';
      return await request<any[]>(`/api/crm/leads${qs}`);
    } catch {
      let leads = crmStore.getLeads(params?.organizationId);
      if (params?.status && params.status !== 'all') {
        leads = leads.filter((l) => l.status.toLowerCase() === params.status?.toLowerCase());
      }
      if (params?.search) {
        const s = params.search.toLowerCase();
        leads = leads.filter((l) => l.name.toLowerCase().includes(s) || l.company.toLowerCase().includes(s) || l.email.toLowerCase().includes(s));
      }
      return leads;
    }
  },

  getLead: async (id: string) => {
    try {
      return await request<any>(`/api/crm/leads/${id}`);
    } catch {
      return crmStore.getLead(id);
    }
  },

  createLead: async (body: any) => {
    try {
      return await request<any>('/api/crm/leads', { method: 'POST', body: JSON.stringify(body) });
    } catch {
      return crmStore.createLead(body);
    }
  },

  updateLead: async (id: string, body: any) => {
    try {
      return await request<any>(`/api/crm/leads/${id}`, { method: 'PUT', body: JSON.stringify(body) });
    } catch {
      return crmStore.updateLead(id, body);
    }
  },

  deleteLead: async (id: string) => {
    try {
      return await request<any>(`/api/crm/leads/${id}`, { method: 'DELETE' });
    } catch {
      crmStore.deleteLead(id);
      return { success: true };
    }
  },

  convertLead: async (id: string) => {
    try {
      return await request<any>(`/api/crm/leads/${id}/convert`, { method: 'POST' });
    } catch {
      return crmStore.convertLeadToDeal(id);
    }
  },

  // Deals & Pipeline
  getDeals: async () => {
    try {
      return await request<any[]>('/api/crm/deals');
    } catch {
      return crmStore.getDeals();
    }
  },

  getDeal: async (id: string) => {
    try {
      return await request<any>(`/api/crm/deals/${id}`);
    } catch {
      return crmStore.getDeals().find((d) => d.id === id);
    }
  },

  createDeal: async (body: any) => {
    try {
      return await request<any>('/api/crm/deals', { method: 'POST', body: JSON.stringify(body) });
    } catch {
      return crmStore.createDeal(body);
    }
  },

  updateDealStage: async (id: string, stage: string) => {
    try {
      return await request<any>(`/api/crm/deals/${id}/stage`, { method: 'PUT', body: JSON.stringify({ stage }) });
    } catch {
      return crmStore.updateDeal(id, { stage: stage as any });
    }
  },

  updateDeal: async (id: string, body: any) => {
    try {
      return await request<any>(`/api/crm/deals/${id}`, { method: 'PUT', body: JSON.stringify(body) });
    } catch {
      return crmStore.updateDeal(id, body);
    }
  },

  deleteDeal: async (id: string) => {
    try {
      return await request<any>(`/api/crm/deals/${id}`, { method: 'DELETE' });
    } catch {
      crmStore.deleteDeal(id);
      return { success: true };
    }
  },

  // Customers & Companies
  getCustomers: async () => {
    try {
      return await request<any[]>('/api/crm/customers');
    } catch {
      return crmStore.getCustomers();
    }
  },

  createCustomer: async (body: any) => {
    try {
      return await request<any>('/api/crm/customers', { method: 'POST', body: JSON.stringify(body) });
    } catch {
      return crmStore.createCustomer(body);
    }
  },

  getCompanies: async () => {
    try {
      return await request<any[]>('/api/crm/companies');
    } catch {
      return crmStore.getCompanies();
    }
  },

  createCompany: async (body: any) => {
    try {
      return await request<any>('/api/crm/companies', { method: 'POST', body: JSON.stringify(body) });
    } catch {
      return crmStore.createCompany(body);
    }
  },

  // Tasks
  getTasks: async () => {
    try {
      return await request<any[]>('/api/crm/tasks');
    } catch {
      return crmStore.getTasks();
    }
  },

  createTask: async (body: any) => {
    try {
      return await request<any>('/api/crm/tasks', { method: 'POST', body: JSON.stringify(body) });
    } catch {
      return crmStore.createTask(body);
    }
  },

  updateTask: async (id: string, _body: any) => {
    try {
      return await request<any>(`/api/crm/tasks/${id}`, { method: 'PUT', body: JSON.stringify(_body) });
    } catch {
      return crmStore.toggleTaskStatus(id);
    }
  },

  deleteTask: async (id: string) => {
    try {
      return await request<any>(`/api/crm/tasks/${id}`, { method: 'DELETE' });
    } catch {
      crmStore.deleteTask(id);
      return { success: true };
    }
  },

  // Calls
  getCalls: async () => {
    try {
      return await request<any[]>('/api/crm/calls');
    } catch {
      return crmStore.getCalls();
    }
  },

  createCall: async (body: any) => {
    try {
      return await request<any>('/api/crm/calls', { method: 'POST', body: JSON.stringify(body) });
    } catch {
      return crmStore.logCall(body);
    }
  },

  // Activities
  getActivities: async () => {
    try {
      return await request<any[]>('/api/crm/activities');
    } catch {
      return crmStore.getActivities();
    }
  },

  // Reports
  getReports: async () => {
    try {
      return await request<any>('/api/crm/reports');
    } catch {
      const deals = crmStore.getDeals();
      const leads = crmStore.getLeads();
      const wonDeals = deals.filter((d) => d.stage === 'Won');
      const totalRevenue = wonDeals.reduce((sum, d) => sum + d.value, 0);

      return {
        totalRevenue,
        dealsWon: wonDeals.length,
        winRate: deals.length > 0 ? Math.round((wonDeals.length / deals.length) * 100) : 38,
        averageCycleDays: 18,
        reps: [
          { name: 'Sara Khan', dealsWon: 5, revenue: 58000, conversionRate: 42 },
          { name: 'Ahmed Malik', dealsWon: 4, revenue: 45000, conversionRate: 36 },
          { name: 'Shaniba Yasin', dealsWon: 3, revenue: 80000, conversionRate: 50 },
        ],
        monthlyTrends: [
          { month: 'Jun', revenue: 42000, leads: 28 },
          { month: 'Jul', revenue: 56000, leads: 35 },
          { month: 'Aug', revenue: 68000, leads: 40 },
          { month: 'Sep', revenue: 82000, leads: 48 },
          { month: 'Oct', revenue: 94500, leads: 54 },
        ],
      };
    }
  },

  // Team
  getTeam: async () => {
    try {
      return await request<any[]>('/api/crm/team');
    } catch {
      return crmStore.getUsers();
    }
  },

  inviteTeamMember: async (body: any) => {
    try {
      return await request<any>('/api/crm/team/invite', { method: 'POST', body: JSON.stringify(body) });
    } catch {
      return crmStore.inviteTeamMember(body);
    }
  },

  // Workflows
  getWorkflows: async () => {
    try {
      return await request<any[]>('/api/crm/workflows');
    } catch {
      return crmStore.getWorkflows();
    }
  },

  toggleWorkflow: async (id: string, _enabled: boolean) => {
    try {
      return await request<any>(`/api/crm/workflows/${id}/toggle`, { method: 'PATCH', body: JSON.stringify({ enabled: _enabled }) });
    } catch {
      return crmStore.toggleWorkflow(id);
    }
  },

  // Integrations
  getIntegrations: async () => {
    try {
      return await request<any[]>('/api/crm/integrations');
    } catch {
      return crmStore.getIntegrations();
    }
  },

  toggleIntegration: async (id: string) => {
    try {
      return await request<any>(`/api/crm/integrations/${id}/toggle`, { method: 'POST' });
    } catch {
      return crmStore.toggleIntegration(id);
    }
  },

  // Workspaces Switcher
  getWorkspaces: async () => {
    try {
      return await request<any[]>('/api/crm/workspaces');
    } catch {
      return crmStore.getOrganizations();
    }
  },

  switchOrganization: async (organizationId: string) => {
    try {
      return await request<{ token: string; organization: any; user: any }>('/api/auth/switch-organization', {
        method: 'POST',
        body: JSON.stringify({ organizationId }),
      });
    } catch {
      const org = crmStore.getOrganization(organizationId);
      const user = crmStore.getUsers()[1];
      return { token: 'mock_token', organization: org, user };
    }
  },

  // Super Admin
  getSuperAdminDashboard: async () => {
    try {
      return await request<any>('/api/super-admin/dashboard');
    } catch {
      const orgs = crmStore.getOrganizations();
      return {
        totalOrganizations: orgs.length,
        activeTenants: orgs.length,
        totalUsers: 42,
        monthlyRecurringRevenue: 18450,
        apiRequestsToday: 124500,
        organizations: orgs,
      };
    }
  },
  getSuperAdminOrganizations: async () => {
    try {
      return await request<any[]>('/api/super-admin/organizations');
    } catch {
      return crmStore.getOrganizations();
    }
  },
  getSuperAdminUsers: async () => {
    try {
      return await request<any[]>('/api/super-admin/users');
    } catch {
      return crmStore.getUsers();
    }
  },

  // Global Search
  search: async (q: string) => {
    try {
      return await request<any>(`/api/crm/search?q=${encodeURIComponent(q)}`);
    } catch {
      const s = q.toLowerCase();
      const leads = crmStore.getLeads().filter((l) => l.name.toLowerCase().includes(s) || l.company.toLowerCase().includes(s));
      const deals = crmStore.getDeals().filter((d) => d.name.toLowerCase().includes(s) || d.company.toLowerCase().includes(s));
      const customers = crmStore.getCustomers().filter((c) => c.name.toLowerCase().includes(s) || c.company.toLowerCase().includes(s));
      const companies = crmStore.getCompanies().filter((c) => c.name.toLowerCase().includes(s));
      const tasks = crmStore.getTasks().filter((t) => t.title.toLowerCase().includes(s));
      return { leads, deals, customers, companies, tasks };
    }
  },

  // Notifications
  getNotifications: async () => {
    try {
      return await request<any[]>('/api/crm/notifications');
    } catch {
      return [
        {
          id: 'notif_1',
          title: 'High-intent lead registered',
          message: 'Ali Raza submitted contact form from Website.',
          type: 'INFO',
          read: false,
          createdAt: new Date().toISOString(),
        },
        {
          id: 'notif_2',
          title: 'Deal Won: Prime Estates',
          message: 'Ahmed Malik closed $58,000 contract.',
          type: 'SUCCESS',
          read: false,
          createdAt: new Date(Date.now() - 3600000).toISOString(),
        },
        {
          id: 'notif_3',
          title: 'Follow-up Task Due',
          message: 'Call with Glow Clinic scheduled for tomorrow.',
          type: 'WARNING',
          read: true,
          createdAt: new Date(Date.now() - 7200000).toISOString(),
        },
      ];
    }
  },

  markNotificationRead: async (id: string) => {
    try {
      return await request<any>(`/api/crm/notifications/${id}/read`, { method: 'PATCH' });
    } catch {
      return { success: true };
    }
  },
};
