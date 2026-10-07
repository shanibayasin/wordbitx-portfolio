import fs from 'fs';
import path from 'path';
import crypto from 'crypto';
import type {
  User,
  Organization,
  Membership,
  Lead,
  Deal,
  Customer,
  Company,
  Contact,
  Task,
  Call,
  Activity,
  Note,
  Notification,
  Workflow,
  Integration,
  DemoRequest,
  Subscription,
  Plan,
  AuditLog,
  UserRole,
  UserAppearancePreferences,
  UserNotificationPreferences,
  UserSession,
  UserLoginHistoryItem,
  ApiKey,
  Invoice,
  KpiMetric,
} from '../types/crm.js';

interface DatabaseSchema {
  users: (User & { passwordHash: string; salt: string })[];
  organizations: Organization[];
  memberships: Membership[];
  leads: Lead[];
  deals: Deal[];
  customers: Customer[];
  companies: Company[];
  contacts: Contact[];
  tasks: Task[];
  calls: Call[];
  activities: Activity[];
  notes: Note[];
  notifications: Notification[];
  workflows: Workflow[];
  integrations: Integration[];
  demoRequests: DemoRequest[];
  subscriptions: Subscription[];
  plans: Plan[];
  auditLogs: AuditLog[];
}

const DB_DIR = path.resolve(process.cwd(), 'data');
const DB_FILE = path.resolve(DB_DIR, 'db.json');

export const DEFAULT_USER_PREFERENCES: UserAppearancePreferences = {
  theme: 'light',
  density: 'comfortable',
  sidebarCollapsed: false,
  defaultDashboard: 'overview',
  language: 'en',
  timezone: 'Asia/Karachi',
  dateFormat: 'MM/DD/YYYY',
  currency: 'USD',
};

export const DEFAULT_USER_NOTIFICATIONS: UserNotificationPreferences = {
  emailNotifications: true,
  taskReminders: true,
  leadAssignments: true,
  dealUpdates: true,
  mentions: true,
  workflowNotifications: true,
  dailySummary: false,
  browserNotifications: false,
};

export const DEFAULT_ROLE_PERMISSIONS: Record<UserRole, Record<string, string[]>> = {
  ORGANIZATION_OWNER: {
    leads: ['view', 'create', 'edit', 'delete', 'export', 'manage'],
    pipeline: ['view', 'create', 'edit', 'delete', 'export', 'manage'],
    deals: ['view', 'create', 'edit', 'delete', 'export', 'manage'],
    customers: ['view', 'create', 'edit', 'delete', 'export', 'manage'],
    companies: ['view', 'create', 'edit', 'delete', 'export', 'manage'],
    tasks: ['view', 'create', 'edit', 'delete', 'export', 'manage'],
    calls: ['view', 'create', 'edit', 'delete', 'export', 'manage'],
    activities: ['view', 'create', 'edit', 'delete', 'export', 'manage'],
    reports: ['view', 'create', 'edit', 'delete', 'export', 'manage'],
    team: ['view', 'create', 'edit', 'delete', 'export', 'manage'],
    workflows: ['view', 'create', 'edit', 'delete', 'export', 'manage'],
    integrations: ['view', 'create', 'edit', 'delete', 'export', 'manage'],
    settings: ['view', 'create', 'edit', 'delete', 'export', 'manage'],
  },
  ORGANIZATION_ADMIN: {
    leads: ['view', 'create', 'edit', 'delete', 'export', 'manage'],
    pipeline: ['view', 'create', 'edit', 'delete', 'export', 'manage'],
    deals: ['view', 'create', 'edit', 'delete', 'export', 'manage'],
    customers: ['view', 'create', 'edit', 'delete', 'export', 'manage'],
    companies: ['view', 'create', 'edit', 'delete', 'export', 'manage'],
    tasks: ['view', 'create', 'edit', 'delete', 'export', 'manage'],
    calls: ['view', 'create', 'edit', 'delete', 'export', 'manage'],
    activities: ['view', 'create', 'edit', 'delete', 'export', 'manage'],
    reports: ['view', 'create', 'edit', 'delete', 'export', 'manage'],
    team: ['view', 'create', 'edit', 'delete', 'export'],
    workflows: ['view', 'create', 'edit', 'delete'],
    integrations: ['view', 'create', 'edit'],
    settings: ['view', 'edit'],
  },
  SALES_MANAGER: {
    leads: ['view', 'create', 'edit', 'delete', 'export'],
    pipeline: ['view', 'create', 'edit', 'delete', 'export'],
    deals: ['view', 'create', 'edit', 'delete', 'export'],
    customers: ['view', 'create', 'edit', 'delete', 'export'],
    companies: ['view', 'create', 'edit', 'delete', 'export'],
    tasks: ['view', 'create', 'edit', 'delete', 'export'],
    calls: ['view', 'create', 'edit', 'delete', 'export'],
    activities: ['view', 'create', 'edit', 'export'],
    reports: ['view', 'export'],
    team: ['view'],
    workflows: ['view'],
    integrations: ['view'],
    settings: ['view'],
  },
  SALES_AGENT: {
    leads: ['view', 'create', 'edit'],
    pipeline: ['view', 'create', 'edit'],
    deals: ['view', 'create', 'edit'],
    customers: ['view', 'create', 'edit'],
    companies: ['view', 'create', 'edit'],
    tasks: ['view', 'create', 'edit'],
    calls: ['view', 'create', 'edit'],
    activities: ['view', 'create'],
    reports: ['view'],
    team: ['view'],
    workflows: [],
    integrations: [],
    settings: [],
  },
  VIEWER: {
    leads: ['view'],
    pipeline: ['view'],
    deals: ['view'],
    customers: ['view'],
    companies: ['view'],
    tasks: ['view'],
    calls: ['view'],
    activities: ['view'],
    reports: ['view'],
    team: ['view'],
    workflows: [],
    integrations: [],
    settings: [],
  },
  SUPER_ADMIN: {
    leads: ['view', 'create', 'edit', 'delete', 'export', 'manage'],
    pipeline: ['view', 'create', 'edit', 'delete', 'export', 'manage'],
    deals: ['view', 'create', 'edit', 'delete', 'export', 'manage'],
    customers: ['view', 'create', 'edit', 'delete', 'export', 'manage'],
    companies: ['view', 'create', 'edit', 'delete', 'export', 'manage'],
    tasks: ['view', 'create', 'edit', 'delete', 'export', 'manage'],
    calls: ['view', 'create', 'edit', 'delete', 'export', 'manage'],
    activities: ['view', 'create', 'edit', 'delete', 'export', 'manage'],
    reports: ['view', 'create', 'edit', 'delete', 'export', 'manage'],
    team: ['view', 'create', 'edit', 'delete', 'export', 'manage'],
    workflows: ['view', 'create', 'edit', 'delete', 'export', 'manage'],
    integrations: ['view', 'create', 'edit', 'delete', 'export', 'manage'],
    settings: ['view', 'create', 'edit', 'delete', 'export', 'manage'],
  },
};

// Helper for password hashing using native Node crypto
export function hashPassword(password: string, existingSalt?: string): { salt: string; hash: string } {
  const salt = existingSalt || crypto.randomBytes(16).toString('hex');
  const hash = crypto.scryptSync(password, salt, 64).toString('hex');
  return { salt, hash };
}

export function verifyPassword(password: string, salt: string, storedHash: string): boolean {
  try {
    const hash = crypto.scryptSync(password, salt, 64).toString('hex');
    return crypto.timingSafeEqual(Buffer.from(hash, 'hex'), Buffer.from(storedHash, 'hex'));
  } catch {
    return false;
  }
}

class Database {
  private data: DatabaseSchema;

  constructor() {
    this.ensureDirectory();
    this.data = this.loadOrInit();
  }

  private ensureDirectory() {
    if (!fs.existsSync(DB_DIR)) {
      fs.mkdirSync(DB_DIR, { recursive: true });
    }
  }

  public save() {
    try {
      const tempPath = `${DB_FILE}.tmp`;
      fs.writeFileSync(tempPath, JSON.stringify(this.data, null, 2), 'utf8');
      fs.renameSync(tempPath, DB_FILE);
    } catch (err) {
      console.error('Failed to write db file:', err);
    }
  }

  private loadOrInit(): DatabaseSchema {
    let schema: DatabaseSchema;
    if (fs.existsSync(DB_FILE)) {
      try {
        const content = fs.readFileSync(DB_FILE, 'utf8');
        schema = JSON.parse(content) as DatabaseSchema;
      } catch (e) {
        console.warn('DB file corrupt or unreadable, re-seeding...', e);
        schema = this.generateSeedData();
      }
    } else {
      schema = this.generateSeedData();
    }

    this.ensureAllOrganizations(schema);
    this.ensureUserSettingsDefaults(schema);

    const tempPath = `${DB_FILE}.tmp`;
    fs.writeFileSync(tempPath, JSON.stringify(schema, null, 2), 'utf8');
    fs.renameSync(tempPath, DB_FILE);

    return schema;
  }

  private ensureUserSettingsDefaults(data: DatabaseSchema) {
    data.users.forEach((u) => {
      if (!u.preferences) {
        u.preferences = { ...DEFAULT_USER_PREFERENCES };
      }
      if (!u.notifications) {
        u.notifications = { ...DEFAULT_USER_NOTIFICATIONS };
      }
      if (!u.displayName) {
        u.displayName = u.name;
      }
      if (!u.department) {
        u.department = u.role.includes('ADMIN') || u.role.includes('OWNER') ? 'Executive' : 'Sales';
      }
      if (!u.activeSessions || u.activeSessions.length === 0) {
        u.activeSessions = [
          {
            id: `sess_curr_${u.id}`,
            device: 'Desktop Chrome 128 / macOS Sequoia',
            browser: 'Chrome 128.0',
            ip: '192.168.1.10',
            location: 'Karachi, Pakistan',
            lastActive: 'Active Now',
            current: true,
          },
          {
            id: `sess_mob_${u.id}`,
            device: 'iPhone 15 Pro / Safari iOS 18.0',
            browser: 'Mobile Safari',
            ip: '182.185.24.12',
            location: 'Karachi, Pakistan',
            lastActive: '2 hours ago',
            current: false,
          },
        ];
      }
      if (!u.loginHistory || u.loginHistory.length === 0) {
        u.loginHistory = [
          {
            id: `log_1_${u.id}`,
            ip: '192.168.1.10',
            browser: 'Chrome 128 / macOS',
            location: 'Karachi, Pakistan',
            timestamp: new Date().toISOString(),
            success: true,
          },
          {
            id: `log_2_${u.id}`,
            ip: '192.168.1.10',
            browser: 'Chrome 128 / macOS',
            location: 'Karachi, Pakistan',
            timestamp: new Date(Date.now() - 86400000).toISOString(),
            success: true,
          },
          {
            id: `log_3_${u.id}`,
            ip: '182.185.24.12',
            browser: 'Safari iOS 18.0',
            location: 'Karachi, Pakistan',
            timestamp: new Date(Date.now() - 172800000).toISOString(),
            success: true,
          },
        ];
      }
    });

    data.organizations.forEach((org) => {
      if (!org.legalName) org.legalName = org.name;
      if (!org.displayName) org.displayName = org.name;
      if (!org.tradingName) org.tradingName = org.name;
      if (!org.currency) org.currency = 'USD';
      if (!org.dateFormat) org.dateFormat = 'MM/DD/YYYY';
      if (!org.fiscalYear) org.fiscalYear = 'January - December';
      if (!org.website) org.website = `https://${org.code}.com`;
      if (!org.phone) org.phone = '+92 300 1234567';
      if (!org.email) org.email = `contact@${org.code}.com`;
      if (!org.city) org.city = org.country === 'Pakistan' ? 'Karachi' : 'New York';
      if (!org.state) org.state = org.country === 'Pakistan' ? 'Sindh' : 'NY';
      if (!org.address) org.address = 'Suite 400, Commercial Business District';
      if (!org.webhookSecret) org.webhookSecret = `whsec_${crypto.randomBytes(16).toString('hex')}`;
      if (!org.apiKeys || org.apiKeys.length === 0) {
        org.apiKeys = [
          {
            id: `key_${org.id}_1`,
            name: 'Production Inbound Webhook Key',
            keyPrefix: 'wbx_live_pk_8f49...',
            scopes: ['leads:write', 'deals:read', 'webhooks:dispatch'],
            lastUsed: 'Today, 04:12 AM',
            createdAt: '2026-03-01T00:00:00.000Z',
          },
        ];
      }
      if (!org.rolePermissions) {
        org.rolePermissions = JSON.parse(JSON.stringify(DEFAULT_ROLE_PERMISSIONS));
      }
    });

    data.subscriptions.forEach((sub) => {
      if (!sub.invoices || sub.invoices.length === 0) {
        sub.invoices = [
          {
            id: `inv_1_${sub.id}`,
            number: 'INV-2026-003',
            date: 'Oct 01, 2026',
            amount: sub.mrr || 79,
            status: 'PAID',
            planName: sub.plan,
          },
          {
            id: `inv_2_${sub.id}`,
            number: 'INV-2026-002',
            date: 'Sep 01, 2026',
            amount: sub.mrr || 79,
            status: 'PAID',
            planName: sub.plan,
          },
          {
            id: `inv_3_${sub.id}`,
            number: 'INV-2026-001',
            date: 'Aug 01, 2026',
            amount: sub.mrr || 79,
            status: 'PAID',
            planName: sub.plan,
          },
        ];
      }
      if (!sub.paymentMethod) {
        sub.paymentMethod = {
          type: 'Credit Card',
          brand: 'Visa',
          last4: '4242',
          expMonth: 12,
          expYear: 2028,
        };
      }
    });
  }

  private ensureAllOrganizations(data: DatabaseSchema) {
    const defaultUserPass = hashPassword('password123');

    const orgsList: Array<{
      id: string;
      name: string;
      code: string;
      industry: string;
      plan: 'FREE' | 'STARTER' | 'PROFESSIONAL' | 'ENTERPRISE';
      size: string;
      country: string;
      ownerName: string;
      ownerEmail?: string;
    }> = [
      { id: '6ac2a411ceac76195538b01f', name: 'WordbitX Technologies (ABC Tech)', code: 'wordbitx', industry: 'Software & Technology', plan: 'PROFESSIONAL', size: '10-50', country: 'Pakistan', ownerName: 'Shaniba Yasin', ownerEmail: 'shaniba@wordbitx.com' },
      { id: 'org_abc', name: 'ABC Technologies', code: 'abc-tech', industry: 'Software & Technology', plan: 'PROFESSIONAL', size: '10-50', country: 'Pakistan', ownerName: 'Shaniba Yasin', ownerEmail: 'shaniba@abctechnologies.com' },
      { id: 'org_nova', name: 'Nova Tech', code: 'nova-tech', industry: 'Technology & AI', plan: 'STARTER', size: '10-50', country: 'United States', ownerName: 'Sara Khan', ownerEmail: 'sara@novatech.com' },
      { id: 'org_prime', name: 'Prime Estates', code: 'prime-est', industry: 'Real Estate & Brokerage', plan: 'PROFESSIONAL', size: '25-50', country: 'United Arab Emirates', ownerName: 'Ahmed Malik', ownerEmail: 'ahmed@primeestates.com' },
      { id: 'org_bright', name: 'Bright Dental', code: 'bright-dent', industry: 'Healthcare & Dental', plan: 'STARTER', size: '10-25', country: 'United Kingdom', ownerName: 'Hira Ahmed', ownerEmail: 'hira@brightdental.com' },
      { id: 'org_techvision', name: 'Tech Vision', code: 'tech-vision', industry: 'Cloud & IT Services', plan: 'PROFESSIONAL', size: '50-100', country: 'Canada', ownerName: 'Usman Tariq', ownerEmail: 'usman@techvision.com' },
      { id: 'org_glow', name: 'Glow Clinic', code: 'glow-clinic', industry: 'Aesthetic Dermatology', plan: 'STARTER', size: '10-20', country: 'Pakistan', ownerName: 'Ayesha Noor', ownerEmail: 'ayesha@glowclinic.com' },
      { id: 'org_solarpro', name: 'SolarPro', code: 'solar-pro', industry: 'Renewable Energy', plan: 'PROFESSIONAL', size: '25-50', country: 'Australia', ownerName: 'Hamza Ali', ownerEmail: 'hamza@solarpro.com' },
      { id: 'org_urban', name: 'Urban Homes', code: 'urban-homes', industry: 'Architecture & Construction', plan: 'ENTERPRISE', size: '50-100', country: 'United States', ownerName: 'Fatima Shah', ownerEmail: 'fatima@urbanhomes.com' },
      { id: 'org_apex', name: 'Apex Dynamics', code: 'apex-dyn', industry: 'Manufacturing & Logistics', plan: 'STARTER', size: '50-100', country: 'Germany', ownerName: 'Kamran Akram', ownerEmail: 'kamran@apexdynamics.com' },
    ];

    orgsList.forEach((spec) => {
      let existing = data.organizations.find((o) => o.id === spec.id);
      if (!existing) {
        existing = {
          id: spec.id,
          name: spec.name,
          legalName: spec.name,
          displayName: spec.name,
          tradingName: spec.name,
          code: spec.code,
          industry: spec.industry,
          size: spec.size,
          country: spec.country,
          timezone: 'Asia/Karachi',
          plan: spec.plan,
          status: 'ACTIVE',
          ownerId: `usr_owner_${spec.id}`,
          createdAt: '2026-02-10T08:00:00.000Z',
          updatedAt: '2026-02-10T08:00:00.000Z',
        };
        data.organizations.push(existing);
      }
      if (spec.ownerEmail && !data.users.some((u) => u.email.toLowerCase() === spec.ownerEmail!.toLowerCase())) {
        data.users.push({
          id: `usr_owner_${spec.id}`,
          name: spec.ownerName,
          displayName: spec.ownerName,
          email: spec.ownerEmail,
          role: 'ORGANIZATION_OWNER',
          organizationId: spec.id,
          status: 'ACTIVE',
          title: 'Owner & Founder',
          department: 'Executive',
          phone: '+92 300 1234567',
          avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150',
          createdAt: '2026-02-10T08:00:00.000Z',
          passwordHash: defaultUserPass.hash,
          salt: defaultUserPass.salt,
        });
      }
      if (!data.subscriptions.some((s) => s.organizationId === spec.id)) {
        data.subscriptions.push({
          id: `sub_${spec.id}`,
          organizationId: spec.id,
          organizationName: spec.name,
          plan: spec.plan === 'ENTERPRISE' ? 'Enterprise' : spec.plan === 'PROFESSIONAL' ? 'Professional' : 'Starter',
          status: 'Active',
          billingCycle: 'Monthly',
          mrr: spec.plan === 'ENTERPRISE' ? 199 : spec.plan === 'PROFESSIONAL' ? 79 : 29,
          renewalDate: '2026-11-01',
          paymentGatewayConnected: false,
          createdAt: '2026-02-10T08:00:00.000Z',
        });
      }
    });
  }

  private generateSeedData(): DatabaseSchema {
    const adminPass = hashPassword('admin123');
    const userPass = hashPassword('password123');

    const superAdmin: User & { passwordHash: string; salt: string } = {
      id: 'usr_admin',
      name: 'WordbitX Super Admin',
      displayName: 'Super Admin',
      email: 'admin@wordbitx.com',
      role: 'SUPER_ADMIN',
      status: 'ACTIVE',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150',
      createdAt: '2026-01-01T00:00:00.000Z',
      passwordHash: adminPass.hash,
      salt: adminPass.salt,
    };

    const orgAlphaId = 'org_abc';
    const orgApexId = 'org_apex';

    const shanibaYasin: User & { passwordHash: string; salt: string } = {
      id: 'usr_shaniba',
      name: 'Shaniba Yasin',
      displayName: 'Shaniba Yasin',
      email: 'shaniba@abctechnologies.com',
      role: 'ORGANIZATION_OWNER',
      organizationId: orgAlphaId,
      status: 'ACTIVE',
      title: 'CEO & Founder',
      department: 'Executive',
      phone: '+92 300 1234567',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150',
      createdAt: '2026-02-01T08:00:00.000Z',
      passwordHash: userPass.hash,
      salt: userPass.salt,
    };

    const saraKhan: User & { passwordHash: string; salt: string } = {
      id: 'usr_sara',
      name: 'Sara Khan',
      displayName: 'Sara Khan',
      email: 'sara@alphatech.com',
      role: 'ORGANIZATION_ADMIN',
      organizationId: orgAlphaId,
      status: 'ACTIVE',
      title: 'Head of Sales',
      department: 'Sales & Growth',
      phone: '+92 300 1234567',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150',
      createdAt: '2026-02-10T08:00:00.000Z',
      passwordHash: userPass.hash,
      salt: userPass.salt,
    };

    const ahmedMalik: User & { passwordHash: string; salt: string } = {
      id: 'usr_ahmed',
      name: 'Ahmed Malik',
      displayName: 'Ahmed Malik',
      email: 'ahmed@alphatech.com',
      role: 'SALES_AGENT',
      organizationId: orgAlphaId,
      status: 'ACTIVE',
      title: 'Senior Account Executive',
      department: 'Sales',
      phone: '+92 321 3456789',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150',
      createdAt: '2026-02-12T08:00:00.000Z',
      passwordHash: userPass.hash,
      salt: userPass.salt,
    };

    const kamranAkram: User & { passwordHash: string; salt: string } = {
      id: 'usr_kamran',
      name: 'Kamran Akram',
      displayName: 'Kamran Akram',
      email: 'kamran@apexdynamics.com',
      role: 'ORGANIZATION_OWNER',
      organizationId: orgApexId,
      status: 'ACTIVE',
      title: 'Director',
      department: 'Executive',
      phone: '+92 300 9998877',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150',
      createdAt: '2026-03-01T08:00:00.000Z',
      passwordHash: userPass.hash,
      salt: userPass.salt,
    };

    const orgAlpha: Organization = {
      id: orgAlphaId,
      name: 'ABC Technologies',
      legalName: 'ABC Technologies (Pvt) Ltd',
      displayName: 'ABC Technologies',
      tradingName: 'ABC Tech Global',
      code: 'abc-tech',
      industry: 'Software & Technology',
      size: '10-50',
      website: 'https://abctechnologies.com',
      phone: '+92 300 1234567',
      email: 'contact@abctechnologies.com',
      country: 'Pakistan',
      state: 'Sindh',
      city: 'Karachi',
      address: 'Suite 400, Commercial Business District, Shahrah-e-Faisal',
      timezone: 'Asia/Karachi',
      currency: 'USD',
      dateFormat: 'MM/DD/YYYY',
      fiscalYear: 'January - December',
      plan: 'PROFESSIONAL',
      status: 'ACTIVE',
      ownerId: shanibaYasin.id,
      createdAt: '2026-02-10T08:00:00.000Z',
      updatedAt: '2026-02-10T08:00:00.000Z',
    };

    const orgApex: Organization = {
      id: orgApexId,
      name: 'Apex Dynamics',
      code: 'apex-dyn',
      industry: 'Manufacturing & Logistics',
      size: '50-100',
      country: 'United States',
      timezone: 'America/New_York',
      plan: 'STARTER',
      status: 'ACTIVE',
      ownerId: kamranAkram.id,
      createdAt: '2026-03-01T08:00:00.000Z',
      updatedAt: '2026-03-01T08:00:00.000Z',
    };

    const memberships: Membership[] = [
      { id: 'mem_0', userId: shanibaYasin.id, organizationId: orgAlphaId, role: 'ORGANIZATION_OWNER', status: 'ACTIVE', joinedAt: '2026-02-01T08:00:00.000Z' },
      { id: 'mem_1', userId: saraKhan.id, organizationId: orgAlphaId, role: 'ORGANIZATION_ADMIN', status: 'ACTIVE', joinedAt: '2026-02-10T08:00:00.000Z' },
      { id: 'mem_2', userId: ahmedMalik.id, organizationId: orgAlphaId, role: 'SALES_AGENT', status: 'ACTIVE', joinedAt: '2026-02-12T08:00:00.000Z' },
      { id: 'mem_6', userId: kamranAkram.id, organizationId: orgApexId, role: 'ORGANIZATION_OWNER', status: 'ACTIVE', joinedAt: '2026-03-01T08:00:00.000Z' },
    ];

    const leads: Lead[] = [
      {
        id: 'lead_1',
        organizationId: orgAlphaId,
        name: 'Ali Raza',
        company: 'Alpha Solutions',
        email: 'ali@alphasolutions.com',
        phone: '0300-1234567',
        source: 'Website',
        status: 'New',
        ownerId: saraKhan.id,
        ownerName: saraKhan.name,
        value: 600,
        lastContact: '2 hours ago',
        nextFollowUp: 'Oct 14, 2026',
        notes: 'High intent prospect interested in CRM pipeline setup.',
        createdAt: '2026-10-06T10:30:00.000Z',
        updatedAt: '2026-10-06T10:30:00.000Z',
      },
    ];

    const deals: Deal[] = [
      {
        id: 'deal_1',
        organizationId: orgAlphaId,
        name: 'Alpha Solutions CRM Rollout',
        company: 'Alpha Solutions',
        value: 600,
        stage: 'New',
        probability: 20,
        ownerId: saraKhan.id,
        ownerName: saraKhan.name,
        expectedClose: '2026-10-25',
        priority: 'Medium',
        status: 'ACTIVE',
        createdAt: '2026-10-06T10:30:00.000Z',
        updatedAt: '2026-10-06T10:30:00.000Z',
      },
    ];

    const companies: Company[] = [];
    const customers: Customer[] = [];
    const contacts: Contact[] = [];
    const tasks: Task[] = [];
    const calls: Call[] = [];
    const activities: Activity[] = [];
    const notes: Note[] = [];
    const notifications: Notification[] = [];
    const workflows: Workflow[] = [];
    const integrations: Integration[] = [];
    const demoRequests: DemoRequest[] = [];
    const subscriptions: Subscription[] = [
      {
        id: 'sub_1',
        organizationId: orgAlphaId,
        organizationName: 'ABC Technologies',
        plan: 'Professional',
        status: 'Active',
        billingCycle: 'Monthly',
        mrr: 79,
        renewalDate: '2026-11-10',
        paymentGatewayConnected: false,
        createdAt: '2026-02-10T08:00:00.000Z',
      },
    ];

    const plans: Plan[] = [
      {
        id: 'plan_free',
        name: 'Free',
        priceMonthly: 0,
        priceAnnual: 0,
        userLimit: 2,
        leadLimit: 100,
        features: ['Up to 2 users', '100 Leads', 'Basic Kanban Pipeline', 'Community Support'],
        status: 'ACTIVE',
      },
      {
        id: 'plan_starter',
        name: 'Starter',
        priceMonthly: 29,
        priceAnnual: 290,
        userLimit: 5,
        leadLimit: 1000,
        features: ['Up to 5 users', '1,000 Leads', 'Custom Pipeline Stages', 'Task Automation', 'Email Support'],
        status: 'ACTIVE',
      },
      {
        id: 'plan_pro',
        name: 'Professional',
        priceMonthly: 79,
        priceAnnual: 790,
        userLimit: 20,
        leadLimit: 10000,
        features: ['Up to 20 users', '10,000 Leads', 'Multi-Pipeline Management', 'Workflow Automations', 'Advanced Analytics', 'Priority Support'],
        status: 'ACTIVE',
      },
      {
        id: 'plan_enterprise',
        name: 'Enterprise',
        priceMonthly: 199,
        priceAnnual: 1990,
        userLimit: 100,
        leadLimit: 100000,
        features: ['Unlimited users', 'Unlimited Leads', 'Dedicated Account Manager', 'Custom Workflows', 'Audit Logs & RBAC', '99.9% SLA'],
        status: 'ACTIVE',
      },
    ];

    const auditLogs: AuditLog[] = [];

    return {
      users: [superAdmin, shanibaYasin, saraKhan, ahmedMalik, kamranAkram],
      organizations: [orgAlpha, orgApex],
      memberships,
      leads,
      deals,
      customers,
      companies,
      contacts,
      tasks,
      calls,
      activities,
      notes,
      notifications,
      workflows,
      integrations,
      demoRequests,
      subscriptions,
      plans,
      auditLogs,
    };
  }

  // --- QUERY & MUTATION METHODS ---
  findUserByEmail(email: string) {
    return this.data.users.find((u) => u.email.toLowerCase() === email.toLowerCase());
  }

  findUserById(id: string) {
    return this.data.users.find((u) => u.id === id);
  }

  createUser(user: User & { passwordHash: string; salt: string }) {
    this.data.users.push(user);
    this.save();
    return user;
  }

  updateUser(id: string, updates: Partial<User>) {
    const user = this.findUserById(id);
    if (user) {
      Object.assign(user, updates);
      this.save();
    }
    return user;
  }

  updateUserProfile(userId: string, updates: {
    name?: string;
    displayName?: string;
    email?: string;
    phone?: string;
    title?: string;
    department?: string;
    timezone?: string;
    language?: string;
    avatar?: string;
  }) {
    const user = this.findUserById(userId);
    if (!user) return null;
    if (updates.name && updates.name !== user.name) {
      // update ownerName across this user's leads and deals
      this.data.leads.forEach((l) => {
        if (l.ownerId === userId) l.ownerName = updates.name!;
      });
      this.data.deals.forEach((d) => {
        if (d.ownerId === userId) d.ownerName = updates.name!;
      });
    }
    Object.assign(user, updates);
    this.save();
    return user;
  }

  changeUserPassword(userId: string, currentPass: string, newPass: string): { success: boolean; error?: string } {
    const user = this.findUserById(userId);
    if (!user) return { success: false, error: 'User not found' };
    const valid = verifyPassword(currentPass, user.salt, user.passwordHash);
    if (!valid) {
      return { success: false, error: 'Current password is incorrect.' };
    }
    if (newPass.length < 6) {
      return { success: false, error: 'New password must be at least 6 characters.' };
    }
    const { hash, salt } = hashPassword(newPass);
    user.passwordHash = hash;
    user.salt = salt;
    this.logAudit({
      userId: user.id,
      userName: user.name,
      organizationId: user.organizationId,
      action: 'PASSWORD_CHANGED',
      resource: 'UserSecurity',
      details: 'User successfully updated password credentials.',
    });
    this.save();
    return { success: true };
  }

  toggleUserMfa(userId: string, enabled: boolean) {
    const user = this.findUserById(userId);
    if (!user) return null;
    user.mfaEnabled = enabled;
    this.logAudit({
      userId: user.id,
      userName: user.name,
      organizationId: user.organizationId,
      action: enabled ? 'MFA_ENABLED' : 'MFA_DISABLED',
      resource: 'UserSecurity',
      details: `Two-factor authentication ${enabled ? 'activated' : 'deactivated'}.`,
    });
    this.save();
    return user;
  }

  updateUserNotifications(userId: string, notifications: UserNotificationPreferences) {
    const user = this.findUserById(userId);
    if (!user) return null;
    user.notifications = notifications;
    this.save();
    return user;
  }

  updateUserPreferences(userId: string, preferences: UserAppearancePreferences) {
    const user = this.findUserById(userId);
    if (!user) return null;
    user.preferences = preferences;
    this.save();
    return user;
  }

  revokeUserSession(userId: string, sessionId: string) {
    const user = this.findUserById(userId);
    if (!user || !user.activeSessions) return null;
    user.activeSessions = user.activeSessions.filter((s) => s.id !== sessionId);
    this.save();
    return user.activeSessions;
  }

  clearOtherSessions(userId: string) {
    const user = this.findUserById(userId);
    if (!user || !user.activeSessions) return [];
    user.activeSessions = user.activeSessions.filter((s) => s.current);
    this.save();
    return user.activeSessions;
  }

  findOrgById(id: string) {
    if (id === '6ac2a411ceac76195538b01f' || id === 'org_abc') {
      return (
        this.data.organizations.find((o) => o.id === '6ac2a411ceac76195538b01f') ||
        this.data.organizations.find((o) => o.id === 'org_abc') ||
        this.data.organizations[0]
      );
    }
    return this.data.organizations.find((o) => o.id === id);
  }

  createOrg(org: Organization) {
    this.data.organizations.push(org);
    this.data.subscriptions.push({
      id: `sub_${Date.now()}`,
      organizationId: org.id,
      organizationName: org.name,
      plan: 'Professional',
      status: 'Trial',
      billingCycle: 'Monthly',
      mrr: 79,
      renewalDate: new Date(Date.now() + 14 * 86400000).toISOString().split('T')[0],
      paymentGatewayConnected: false,
      createdAt: new Date().toISOString(),
    });

    const defaultProviders = ['google', 'microsoft', 'email', 'calendar', 'telephony', 'webhooks', 'api'] as const;
    defaultProviders.forEach((prov) => {
      this.data.integrations.push({
        id: `int_${org.id}_${prov}`,
        organizationId: org.id,
        provider: prov,
        name: prov.charAt(0).toUpperCase() + prov.slice(1),
        status: prov === 'email' ? 'CONNECTED' : 'NOT_CONNECTED',
      });
    });

    this.data.workflows.push({
      id: `wf_${Date.now()}`,
      organizationId: org.id,
      name: 'Default Lead Assignment',
      trigger: 'LEAD_CREATED',
      conditions: 'Any source',
      actions: 'Assign to Organization Owner',
      enabled: true,
      createdAt: new Date().toISOString(),
    });

    this.save();
    return org;
  }

  updateOrg(id: string, updates: Partial<Organization>) {
    const org = this.findOrgById(id);
    if (org) {
      Object.assign(org, updates, { updatedAt: new Date().toISOString() });
      if (updates.name) {
        const sub = this.data.subscriptions.find((s) => s.organizationId === org.id);
        if (sub) sub.organizationName = updates.name;
      }
      this.save();
    }
    return org;
  }

  updateOrgPermissions(orgId: string, rolePermissions: Record<string, Record<string, string[]>>) {
    const org = this.findOrgById(orgId);
    if (!org) return null;
    org.rolePermissions = rolePermissions;
    org.updatedAt = new Date().toISOString();
    this.save();
    return org;
  }

  createOrgApiKey(orgId: string, name: string, scopes: string[]) {
    const org = this.findOrgById(orgId);
    if (!org) return null;
    if (!org.apiKeys) org.apiKeys = [];
    const rawKey = `wbx_live_${crypto.randomBytes(24).toString('hex')}`;
    const keyItem: ApiKey = {
      id: `key_${Date.now()}`,
      name,
      keyPrefix: `${rawKey.substring(0, 16)}...`,
      scopes,
      createdAt: new Date().toISOString(),
    };
    org.apiKeys.unshift(keyItem);
    this.save();
    return { keyItem, rawSecret: rawKey };
  }

  revokeOrgApiKey(orgId: string, keyId: string) {
    const org = this.findOrgById(orgId);
    if (!org || !org.apiKeys) return false;
    org.apiKeys = org.apiKeys.filter((k) => k.id !== keyId);
    this.save();
    return true;
  }

  rotateOrgWebhookSecret(orgId: string) {
    const org = this.findOrgById(orgId);
    if (!org) return null;
    org.webhookSecret = `whsec_${crypto.randomBytes(16).toString('hex')}`;
    this.save();
    return org.webhookSecret;
  }

  getOrgBilling(orgId: string) {
    const org = this.findOrgById(orgId);
    if (!org) return null;
    let sub = this.data.subscriptions.find((s) => s.organizationId === org.id);
    if (!sub) {
      sub = {
        id: `sub_${org.id}`,
        organizationId: org.id,
        organizationName: org.name,
        plan: org.plan === 'ENTERPRISE' ? 'Enterprise' : org.plan === 'PROFESSIONAL' ? 'Professional' : 'Starter',
        status: 'Active',
        billingCycle: 'Monthly',
        mrr: org.plan === 'ENTERPRISE' ? 199 : org.plan === 'PROFESSIONAL' ? 79 : 29,
        renewalDate: '2026-11-01',
        paymentGatewayConnected: false,
        createdAt: new Date().toISOString(),
      };
      this.data.subscriptions.push(sub);
      this.save();
    }
    const members = this.getMembershipsForOrg(org.id);
    const leads = this.getLeads(org.id);
    const currentPlan = this.data.plans.find((p) => p.name.toLowerCase() === sub!.plan.toLowerCase()) || this.data.plans[2];
    return {
      subscription: sub,
      currentPlan,
      seatsUsed: Math.max(members.length, 1),
      seatsLimit: currentPlan.userLimit,
      leadsUsed: leads.length,
      leadsLimit: currentPlan.leadLimit,
      paymentMethod: sub.paymentMethod || {
        type: 'Credit Card',
        brand: 'Visa',
        last4: '4242',
        expMonth: 12,
        expYear: 2028,
      },
      invoices: sub.invoices || [],
      availablePlans: this.data.plans,
    };
  }

  updateOrgPlan(orgId: string, planName: 'Free' | 'Starter' | 'Professional' | 'Enterprise', billingCycle: 'Monthly' | 'Annual') {
    const org = this.findOrgById(orgId);
    if (!org) return null;
    const planObj = this.data.plans.find((p) => p.name.toLowerCase() === planName.toLowerCase());
    const mrr = planObj ? (billingCycle === 'Annual' ? Math.round(planObj.priceAnnual / 12) : planObj.priceMonthly) : 79;
    org.plan = planName.toUpperCase() as any;
    let sub = this.data.subscriptions.find((s) => s.organizationId === org.id);
    if (!sub) {
      sub = {
        id: `sub_${org.id}`,
        organizationId: org.id,
        organizationName: org.name,
        plan: planName,
        status: 'Active',
        billingCycle,
        mrr,
        renewalDate: new Date(Date.now() + 30 * 86400000).toISOString().split('T')[0],
        paymentGatewayConnected: false,
        createdAt: new Date().toISOString(),
      };
      this.data.subscriptions.push(sub);
    } else {
      sub.plan = planName;
      sub.billingCycle = billingCycle;
      sub.mrr = mrr;
      sub.renewalDate = new Date(Date.now() + (billingCycle === 'Annual' ? 365 : 30) * 86400000).toISOString().split('T')[0];
    }
    // Add invoice record
    if (!sub.invoices) sub.invoices = [];
    sub.invoices.unshift({
      id: `inv_${Date.now()}`,
      number: `INV-2026-${Math.floor(100 + Math.random() * 900)}`,
      date: new Date().toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' }),
      amount: billingCycle === 'Annual' && planObj ? planObj.priceAnnual : mrr,
      status: 'PAID',
      planName,
    });
    this.save();
    return this.getOrgBilling(orgId);
  }

  updateOrgPaymentMethod(orgId: string, cardData: { brand: string; last4: string; expMonth: number; expYear: number }) {
    const sub = this.data.subscriptions.find((s) => s.organizationId === orgId);
    if (sub) {
      sub.paymentMethod = {
        type: 'Credit Card',
        brand: cardData.brand || 'Visa',
        last4: cardData.last4 || '4242',
        expMonth: cardData.expMonth || 12,
        expYear: cardData.expYear || 2028,
      };
      this.save();
    }
    return this.getOrgBilling(orgId);
  }

  getMembershipsForUser(userId: string) {
    return this.data.memberships.filter((m) => m.userId === userId);
  }

  getMembershipsForOrg(orgId: string) {
    return this.data.memberships.filter((m) => m.organizationId === orgId);
  }

  createMembership(mem: Membership) {
    this.data.memberships.push(mem);
    this.save();
    return mem;
  }

  getLeads(orgId: string) {
    if (orgId === '6ac2a411ceac76195538b01f' || orgId === 'org_abc') {
      return this.data.leads.filter((l) => l.organizationId === '6ac2a411ceac76195538b01f' || l.organizationId === 'org_abc');
    }
    return this.data.leads.filter((l) => l.organizationId === orgId);
  }

  getLeadById(orgId: string, leadId: string) {
    if (orgId === '6ac2a411ceac76195538b01f' || orgId === 'org_abc') {
      return this.data.leads.find((l) => (l.organizationId === '6ac2a411ceac76195538b01f' || l.organizationId === 'org_abc') && l.id === leadId);
    }
    return this.data.leads.find((l) => l.organizationId === orgId && l.id === leadId);
  }

  createLead(orgId: string, lead: Omit<Lead, 'id' | 'organizationId' | 'createdAt' | 'updatedAt'>, actor: { id: string; name: string }) {
    const newLead: Lead = {
      ...lead,
      id: `lead_${Date.now()}_${Math.random().toString(36).substr(2, 4)}`,
      organizationId: orgId,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    this.data.leads.unshift(newLead);
    this.save();
    return newLead;
  }

  updateLead(orgId: string, leadId: string, updates: Partial<Lead>, actor: { id: string; name: string }) {
    const lead = this.getLeadById(orgId, leadId);
    if (!lead) return null;
    Object.assign(lead, updates, { updatedAt: new Date().toISOString() });
    this.save();
    return lead;
  }

  deleteLead(orgId: string, leadId: string, actor: { id: string; name: string }) {
    const idx = this.data.leads.findIndex((l) => (l.organizationId === orgId || (orgId === 'org_abc' && l.organizationId === '6ac2a411ceac76195538b01f')) && l.id === leadId);
    if (idx === -1) return false;
    this.data.leads.splice(idx, 1);
    this.save();
    return true;
  }

  getDeals(orgId: string) {
    if (orgId === '6ac2a411ceac76195538b01f' || orgId === 'org_abc') {
      return this.data.deals.filter((d) => d.organizationId === '6ac2a411ceac76195538b01f' || d.organizationId === 'org_abc');
    }
    return this.data.deals.filter((d) => d.organizationId === orgId);
  }

  getDealById(orgId: string, dealId: string) {
    if (orgId === '6ac2a411ceac76195538b01f' || orgId === 'org_abc') {
      return this.data.deals.find((d) => (d.organizationId === '6ac2a411ceac76195538b01f' || d.organizationId === 'org_abc') && d.id === dealId);
    }
    return this.data.deals.find((d) => d.organizationId === orgId && d.id === dealId);
  }

  createDeal(orgId: string, deal: Omit<Deal, 'id' | 'organizationId' | 'createdAt' | 'updatedAt'>, actor: { id: string; name: string }) {
    const newDeal: Deal = {
      ...deal,
      id: `deal_${Date.now()}_${Math.random().toString(36).substr(2, 4)}`,
      organizationId: orgId,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    this.data.deals.unshift(newDeal);
    this.save();
    return newDeal;
  }

  updateDeal(orgId: string, dealId: string, updates: Partial<Deal>, actor: { id: string; name: string }) {
    const deal = this.getDealById(orgId, dealId);
    if (!deal) return null;
    Object.assign(deal, updates, { updatedAt: new Date().toISOString() });
    this.save();
    return deal;
  }

  deleteDeal(orgId: string, dealId: string, actor: { id: string; name: string }) {
    const idx = this.data.deals.findIndex((d) => (d.organizationId === orgId || (orgId === 'org_abc' && d.organizationId === '6ac2a411ceac76195538b01f')) && d.id === dealId);
    if (idx === -1) return false;
    this.data.deals.splice(idx, 1);
    this.save();
    return true;
  }

  getCompanies(orgId: string) {
    if (orgId === '6ac2a411ceac76195538b01f' || orgId === 'org_abc') {
      return this.data.companies.filter((c) => c.organizationId === '6ac2a411ceac76195538b01f' || c.organizationId === 'org_abc');
    }
    return this.data.companies.filter((c) => c.organizationId === orgId);
  }

  getCompanyById(orgId: string, id: string) {
    if (orgId === '6ac2a411ceac76195538b01f' || orgId === 'org_abc') {
      return this.data.companies.find((c) => (c.organizationId === '6ac2a411ceac76195538b01f' || c.organizationId === 'org_abc') && c.id === id);
    }
    return this.data.companies.find((c) => c.organizationId === orgId && c.id === id);
  }

  createCompany(orgId: string, comp: Omit<Company, 'id' | 'organizationId' | 'createdAt' | 'updatedAt'>, actor: { id: string; name: string }) {
    const newComp: Company = {
      ...comp,
      id: `comp_${Date.now()}_${Math.random().toString(36).substr(2, 4)}`,
      organizationId: orgId,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    this.data.companies.unshift(newComp);
    this.save();
    return newComp;
  }

  getCustomers(orgId: string) {
    if (orgId === '6ac2a411ceac76195538b01f' || orgId === 'org_abc') {
      return this.data.customers.filter((c) => c.organizationId === '6ac2a411ceac76195538b01f' || c.organizationId === 'org_abc');
    }
    return this.data.customers.filter((c) => c.organizationId === orgId);
  }

  getCustomerById(orgId: string, id: string) {
    if (orgId === '6ac2a411ceac76195538b01f' || orgId === 'org_abc') {
      return this.data.customers.find((c) => (c.organizationId === '6ac2a411ceac76195538b01f' || c.organizationId === 'org_abc') && c.id === id);
    }
    return this.data.customers.find((c) => c.organizationId === orgId && c.id === id);
  }

  createCustomer(orgId: string, cust: Omit<Customer, 'id' | 'organizationId' | 'createdAt' | 'updatedAt'>, actor: { id: string; name: string }) {
    const newCust: Customer = {
      ...cust,
      id: `cust_${Date.now()}_${Math.random().toString(36).substr(2, 4)}`,
      organizationId: orgId,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    this.data.customers.unshift(newCust);
    this.save();
    return newCust;
  }

  getContacts(orgId: string, companyId?: string) {
    if (orgId === '6ac2a411ceac76195538b01f' || orgId === 'org_abc') {
      return this.data.contacts.filter((c) => (c.organizationId === '6ac2a411ceac76195538b01f' || c.organizationId === 'org_abc') && (!companyId || c.companyId === companyId));
    }
    return this.data.contacts.filter((c) => c.organizationId === orgId && (!companyId || c.companyId === companyId));
  }

  createContact(orgId: string, contact: Omit<Contact, 'id' | 'organizationId' | 'createdAt'>) {
    const newContact: Contact = {
      ...contact,
      id: `cont_${Date.now()}`,
      organizationId: orgId,
      createdAt: new Date().toISOString(),
    };
    this.data.contacts.push(newContact);
    this.save();
    return newContact;
  }

  getTasks(orgId: string) {
    if (orgId === '6ac2a411ceac76195538b01f' || orgId === 'org_abc') {
      return this.data.tasks.filter((t) => t.organizationId === '6ac2a411ceac76195538b01f' || t.organizationId === 'org_abc');
    }
    return this.data.tasks.filter((t) => t.organizationId === orgId);
  }

  getTaskById(orgId: string, id: string) {
    if (orgId === '6ac2a411ceac76195538b01f' || orgId === 'org_abc') {
      return this.data.tasks.find((t) => (t.organizationId === '6ac2a411ceac76195538b01f' || t.organizationId === 'org_abc') && t.id === id);
    }
    return this.data.tasks.find((t) => t.organizationId === orgId && t.id === id);
  }

  createTask(orgId: string, task: Omit<Task, 'id' | 'organizationId' | 'createdAt'>, actor: { id: string; name: string }) {
    const newTask: Task = {
      ...task,
      id: `task_${Date.now()}_${Math.random().toString(36).substr(2, 4)}`,
      organizationId: orgId,
      createdAt: new Date().toISOString(),
    };
    this.data.tasks.unshift(newTask);
    this.save();
    return newTask;
  }

  updateTask(orgId: string, taskId: string, updates: Partial<Task>, actor: { id: string; name: string }) {
    const task = this.getTaskById(orgId, taskId);
    if (!task) return null;
    Object.assign(task, updates);
    this.save();
    return task;
  }

  deleteTask(orgId: string, taskId: string) {
    const idx = this.data.tasks.findIndex((t) => (t.organizationId === orgId || (orgId === 'org_abc' && t.organizationId === '6ac2a411ceac76195538b01f')) && t.id === taskId);
    if (idx === -1) return false;
    this.data.tasks.splice(idx, 1);
    this.save();
    return true;
  }

  getCalls(orgId: string) {
    if (orgId === '6ac2a411ceac76195538b01f' || orgId === 'org_abc') {
      return this.data.calls.filter((c) => c.organizationId === '6ac2a411ceac76195538b01f' || c.organizationId === 'org_abc');
    }
    return this.data.calls.filter((c) => c.organizationId === orgId);
  }

  createCall(orgId: string, call: Omit<Call, 'id' | 'organizationId' | 'createdAt'>, actor: { id: string; name: string }) {
    const newCall: Call = {
      ...call,
      id: `call_${Date.now()}`,
      organizationId: orgId,
      createdAt: new Date().toISOString(),
    };
    this.data.calls.unshift(newCall);
    this.save();
    return newCall;
  }

  getActivities(orgId: string, filter?: { relatedType?: string; relatedId?: string }) {
    const effectiveOrgs = orgId === '6ac2a411ceac76195538b01f' || orgId === 'org_abc' ? ['6ac2a411ceac76195538b01f', 'org_abc'] : [orgId];
    return this.data.activities
      .filter((a) => effectiveOrgs.includes(a.organizationId))
      .filter((a) => {
        if (filter?.relatedType && a.relatedType !== filter.relatedType) return false;
        if (filter?.relatedId && a.relatedId !== filter.relatedId) return false;
        return true;
      })
      .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
  }

  createActivity(orgId: string, act: Omit<Activity, 'id' | 'organizationId' | 'createdAt'>) {
    const newAct: Activity = {
      ...act,
      id: `act_${Date.now()}_${Math.random().toString(36).substr(2, 4)}`,
      organizationId: orgId,
      createdAt: new Date().toISOString(),
    };
    this.data.activities.unshift(newAct);
    this.save();
    return newAct;
  }

  getNotes(orgId: string, relatedType: string, relatedId: string) {
    return this.data.notes.filter((n) => (n.organizationId === orgId || (orgId === 'org_abc' && n.organizationId === '6ac2a411ceac76195538b01f')) && n.relatedType === relatedType && n.relatedId === relatedId);
  }

  createNote(orgId: string, note: Omit<Note, 'id' | 'organizationId' | 'createdAt'>) {
    const newNote: Note = {
      ...note,
      id: `note_${Date.now()}`,
      organizationId: orgId,
      createdAt: new Date().toISOString(),
    };
    this.data.notes.unshift(newNote);
    this.save();
    return newNote;
  }

  getNotifications(orgId: string, userId?: string) {
    const effectiveOrgs = orgId === '6ac2a411ceac76195538b01f' || orgId === 'org_abc' ? ['6ac2a411ceac76195538b01f', 'org_abc'] : [orgId];
    return this.data.notifications
      .filter((n) => effectiveOrgs.includes(n.organizationId) && (!n.userId || n.userId === userId))
      .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
  }

  createNotification(orgId: string, notif: Omit<Notification, 'id' | 'organizationId' | 'createdAt' | 'read'>) {
    const n: Notification = {
      ...notif,
      id: `notif_${Date.now()}`,
      organizationId: orgId,
      read: false,
      createdAt: new Date().toISOString(),
    };
    this.data.notifications.unshift(n);
    this.save();
    return n;
  }

  markNotificationRead(orgId: string, id: string) {
    const n = this.data.notifications.find((notif) => notif.id === id);
    if (n) {
      n.read = true;
      this.save();
    }
    return n;
  }

  getWorkflows(orgId: string) {
    if (orgId === '6ac2a411ceac76195538b01f' || orgId === 'org_abc') {
      return this.data.workflows.filter((w) => w.organizationId === '6ac2a411ceac76195538b01f' || w.organizationId === 'org_abc');
    }
    return this.data.workflows.filter((w) => w.organizationId === orgId);
  }

  createWorkflow(orgId: string, wf: Omit<Workflow, 'id' | 'organizationId' | 'createdAt'>) {
    const w: Workflow = {
      ...wf,
      id: `wf_${Date.now()}`,
      organizationId: orgId,
      createdAt: new Date().toISOString(),
    };
    this.data.workflows.push(w);
    this.save();
    return w;
  }

  toggleWorkflow(orgId: string, id: string, enabled: boolean) {
    const w = this.data.workflows.find((item) => item.id === id);
    if (w) {
      w.enabled = enabled;
      this.save();
    }
    return w;
  }

  getIntegrations(orgId: string) {
    if (orgId === '6ac2a411ceac76195538b01f' || orgId === 'org_abc') {
      return this.data.integrations.filter((i) => i.organizationId === '6ac2a411ceac76195538b01f' || i.organizationId === 'org_abc');
    }
    return this.data.integrations.filter((i) => i.organizationId === orgId);
  }

  updateIntegration(orgId: string, provider: string, status: 'CONNECTED' | 'NOT_CONNECTED', config?: Record<string, any>) {
    let int = this.data.integrations.find((i) => (i.organizationId === orgId || (orgId === 'org_abc' && i.organizationId === '6ac2a411ceac76195538b01f')) && i.provider === provider);
    if (!int) {
      int = {
        id: `int_${orgId}_${provider}`,
        organizationId: orgId,
        provider: provider as any,
        name: provider.toUpperCase(),
        status,
        config,
      };
      this.data.integrations.push(int);
    } else {
      int.status = status;
      if (config) int.config = config;
      if (status === 'CONNECTED') int.lastSynced = new Date().toISOString();
    }
    this.save();
    return int;
  }

  createDemoRequest(req: Omit<DemoRequest, 'id' | 'status' | 'createdAt'>) {
    const newDemo: DemoRequest = {
      ...req,
      id: `demo_${Date.now()}`,
      status: 'NEW',
      createdAt: new Date().toISOString(),
    };
    this.data.demoRequests.unshift(newDemo);
    this.save();
    return newDemo;
  }

  getDemoRequests() {
    return this.data.demoRequests.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
  }

  updateDemoRequest(id: string, updates: Partial<DemoRequest>) {
    const demo = this.data.demoRequests.find((d) => d.id === id);
    if (demo) {
      Object.assign(demo, updates);
      this.save();
    }
    return demo;
  }

  getAllOrganizations() {
    return this.data.organizations.map((org) => {
      const users = this.data.users.filter((u) => u.organizationId === org.id);
      const sub = this.data.subscriptions.find((s) => s.organizationId === org.id);
      const owner = this.data.users.find((u) => u.id === org.ownerId);
      return {
        ...org,
        ownerName: owner ? owner.name : 'Unknown',
        userCount: users.length,
        planName: sub ? sub.plan : org.plan,
        mrr: sub ? sub.mrr : 0,
      };
    });
  }

  getAllUsers() {
    return this.data.users.map((u) => {
      const org = u.organizationId ? this.findOrgById(u.organizationId) : null;
      return {
        id: u.id,
        name: u.name,
        email: u.email,
        role: u.role,
        organizationId: u.organizationId,
        organizationName: org ? org.name : 'Platform',
        status: u.status,
        createdAt: u.createdAt,
        lastLogin: u.lastLogin,
      };
    });
  }

  getSubscriptions() {
    return this.data.subscriptions;
  }

  getPlans() {
    return this.data.plans;
  }

  updatePlan(id: string, updates: Partial<Plan>) {
    const p = this.data.plans.find((plan) => plan.id === id);
    if (p) {
      Object.assign(p, updates);
      this.save();
    }
    return p;
  }

  logAudit(log: Omit<AuditLog, 'id' | 'createdAt'>) {
    const entry: AuditLog = {
      ...log,
      id: `audit_${Date.now()}_${Math.random().toString(36).substr(2, 4)}`,
      createdAt: new Date().toISOString(),
    };
    this.data.auditLogs.unshift(entry);
    if (this.data.auditLogs.length > 1000) {
      this.data.auditLogs.pop();
    }
    this.save();
    return entry;
  }

  getAuditLogs(orgId?: string) {
    if (orgId) {
      if (orgId === '6ac2a411ceac76195538b01f' || orgId === 'org_abc') {
        return this.data.auditLogs.filter((l) => l.organizationId === '6ac2a411ceac76195538b01f' || l.organizationId === 'org_abc');
      }
      return this.data.auditLogs.filter((l) => l.organizationId === orgId);
    }
    return this.data.auditLogs;
  }

  getDashboardMetrics(
    orgId: string,
    options?: {
      startDate?: string;
      endDate?: string;
      range?: string;
      view?: 'organization' | 'team' | 'my';
      userId?: string;
    }
  ) {
    const rawLeads = this.getLeads(orgId);
    const rawDeals = this.getDeals(orgId);
    const rawTasks = this.getTasks(orgId);
    const rawCalls = this.getCalls(orgId);
    const rawActivities = this.getActivities(orgId);

    // Filter by view / user assignment if requested
    let leads = rawLeads;
    let deals = rawDeals;
    let tasks = rawTasks;
    let calls = rawCalls;
    let activities = rawActivities;

    const view = options?.view || 'organization';
    const userId = options?.userId;
    if (view === 'my' && userId) {
      leads = rawLeads.filter((l) => l.ownerId === userId);
      deals = rawDeals.filter((d) => d.ownerId === userId);
      tasks = rawTasks.filter((t) => t.assignedUserId === userId);
      calls = rawCalls.filter((c) => c.agentId === userId);
      activities = rawActivities.filter((a) => a.userId === userId);
    }

    // Determine current & previous time windows
    const now = new Date();
    let currentStart: Date;
    let currentEnd: Date = options?.endDate ? new Date(options.endDate) : now;
    if (isNaN(currentEnd.getTime())) currentEnd = now;

    const range = options?.range || 'Last 30 Days';
    switch (range) {
      case 'Today': {
        currentStart = new Date(currentEnd);
        currentStart.setHours(0, 0, 0, 0);
        break;
      }
      case 'Yesterday': {
        currentStart = new Date(currentEnd);
        currentStart.setDate(currentStart.getDate() - 1);
        currentStart.setHours(0, 0, 0, 0);
        currentEnd = new Date(currentStart);
        currentEnd.setHours(23, 59, 59, 999);
        break;
      }
      case 'Last 7 Days': {
        currentStart = new Date(currentEnd);
        currentStart.setDate(currentStart.getDate() - 7);
        break;
      }
      case 'Last 30 Days':
      default: {
        if (options?.startDate) {
          currentStart = new Date(options.startDate);
          if (isNaN(currentStart.getTime())) {
            currentStart = new Date(currentEnd);
            currentStart.setDate(currentStart.getDate() - 30);
          }
        } else if (range === 'Last 90 Days') {
          currentStart = new Date(currentEnd);
          currentStart.setDate(currentStart.getDate() - 90);
        } else if (range === 'This Month') {
          currentStart = new Date(currentEnd.getFullYear(), currentEnd.getMonth(), 1);
        } else if (range === 'Last Month') {
          currentStart = new Date(currentEnd.getFullYear(), currentEnd.getMonth() - 1, 1);
          currentEnd = new Date(currentEnd.getFullYear(), currentEnd.getMonth(), 0, 23, 59, 59, 999);
        } else if (range === 'This Quarter') {
          const qMonth = Math.floor(currentEnd.getMonth() / 3) * 3;
          currentStart = new Date(currentEnd.getFullYear(), qMonth, 1);
        } else if (range === 'This Year') {
          currentStart = new Date(currentEnd.getFullYear(), 0, 1);
        } else {
          currentStart = new Date(currentEnd);
          currentStart.setDate(currentStart.getDate() - 30);
        }
        break;
      }
    }

    const durationMs = Math.max(currentEnd.getTime() - currentStart.getTime(), 86400000);
    const prevEnd = new Date(currentStart.getTime() - 1);
    const prevStart = new Date(prevEnd.getTime() - durationMs);

    const isInWindow = (dateStr: string | undefined, start: Date, end: Date) => {
      if (!dateStr) return false;
      const d = new Date(dateStr).getTime();
      return !isNaN(d) && d >= start.getTime() && d <= end.getTime();
    };

    // Calculate metrics in Current Period vs Previous Period
    const currentLeads = leads.filter((l) => isInWindow(l.createdAt, currentStart, currentEnd));
    const prevLeads = leads.filter((l) => isInWindow(l.createdAt, prevStart, prevEnd));

    const currentQualified = currentLeads.filter((l) =>
      ['Qualified', 'Proposal', 'Negotiation', 'Won'].includes(l.status)
    );
    const prevQualified = prevLeads.filter((l) =>
      ['Qualified', 'Proposal', 'Negotiation', 'Won'].includes(l.status)
    );

    // Open/Active deals in current window vs prev
    const currentDeals = deals.filter((d) => isInWindow(d.createdAt, currentStart, currentEnd));
    const prevDeals = deals.filter((d) => isInWindow(d.createdAt, prevStart, prevEnd));

    // Pipeline Open Value (active deals)
    const currentActiveDeals = currentDeals.filter((d) => d.status === 'ACTIVE');
    const prevActiveDeals = prevDeals.filter((d) => d.status === 'ACTIVE');
    const openPipelineValue = currentActiveDeals.reduce((sum, d) => sum + (Number(d.value) || 0), 0);
    const prevOpenPipelineValue = prevActiveDeals.reduce((sum, d) => sum + (Number(d.value) || 0), 0);

    // Weighted Pipeline (value * probability)
    const currentWeighted = currentActiveDeals.reduce(
      (sum, d) => sum + (Number(d.value) || 0) * ((d.probability || 20) / 100),
      0
    );
    const prevWeighted = prevActiveDeals.reduce(
      (sum, d) => sum + (Number(d.value) || 0) * ((d.probability || 20) / 100),
      0
    );

    // Won Revenue in period
    const currentWonDeals = currentDeals.filter((d) => d.status === 'WON' || d.stage === 'Won');
    const prevWonDeals = prevDeals.filter((d) => d.status === 'WON' || d.stage === 'Won');
    const wonRevenue = currentWonDeals.reduce((sum, d) => sum + (Number(d.value) || 0), 0);
    const prevWonRevenue = prevWonDeals.reduce((sum, d) => sum + (Number(d.value) || 0), 0);

    // Closed deals total for Win Rate (Won + Lost)
    const currentClosedCount = currentDeals.filter((d) =>
      ['WON', 'LOST'].includes(d.status) || ['Won', 'Lost'].includes(d.stage)
    ).length;
    const prevClosedCount = prevDeals.filter((d) =>
      ['WON', 'LOST'].includes(d.status) || ['Won', 'Lost'].includes(d.stage)
    ).length;
    const winRate =
      currentClosedCount > 0 ? Math.round((currentWonDeals.length / currentClosedCount) * 100) : 0;
    const prevWinRate =
      prevClosedCount > 0 ? Math.round((prevWonDeals.length / prevClosedCount) * 100) : 0;

    // Average Deal Size
    const avgDealSize =
      currentWonDeals.length > 0
        ? Math.round(wonRevenue / currentWonDeals.length)
        : currentDeals.length > 0
        ? Math.round(
            currentDeals.reduce((sum, d) => sum + (Number(d.value) || 0), 0) / currentDeals.length
          )
        : 0;
    const prevAvgDealSize =
      prevWonDeals.length > 0
        ? Math.round(prevWonRevenue / prevWonDeals.length)
        : prevDeals.length > 0
        ? Math.round(
            prevDeals.reduce((sum, d) => sum + (Number(d.value) || 0), 0) / prevDeals.length
          )
        : 0;

    // Overdue tasks
    const currentTasks = tasks.filter((t) => {
      if (t.status === 'Overdue') return true;
      if (t.status === 'Pending' && t.dueDate) {
        const dueTime = new Date(t.dueDate).getTime();
        return !isNaN(dueTime) && dueTime < now.getTime();
      }
      return false;
    });
    const prevTasksOverdueCount = Math.max(0, currentTasks.length - 1);

    const calcMetric = (current: number, previous: number): KpiMetric => {
      let changePercent = 0;
      let trend: 'up' | 'down' | 'neutral' = 'neutral';
      if (previous === 0) {
        changePercent = current > 0 ? 100 : 0;
      } else {
        changePercent = Math.round(((current - previous) / previous) * 100);
      }
      if (changePercent > 0) trend = 'up';
      else if (changePercent < 0) trend = 'down';
      return {
        current,
        previous,
        changePercent: Math.abs(changePercent),
        trend,
        formattedChange: `${changePercent >= 0 ? '+' : '-'}${Math.abs(changePercent)}%`,
      };
    };

    // Pipeline stages from ALL active deals in organization/filtered scope
    const pipelineStages: Record<string, { count: number; value: number }> = {
      New: { count: 0, value: 0 },
      Contacted: { count: 0, value: 0 },
      Qualified: { count: 0, value: 0 },
      Proposal: { count: 0, value: 0 },
      Negotiation: { count: 0, value: 0 },
      Won: { count: 0, value: 0 },
      Lost: { count: 0, value: 0 },
    };
    deals.forEach((d) => {
      const stage = d.stage || 'New';
      if (!pipelineStages[stage]) {
        pipelineStages[stage] = { count: 0, value: 0 };
      }
      pipelineStages[stage].count += 1;
      pipelineStages[stage].value += Number(d.value) || 0;
    });

    // Lead Sources breakdown
    const sourceBreakdown: Record<string, { count: number; percentage: number }> = {};
    const totalLeadsWithSource = leads.length;
    leads.forEach((l) => {
      const src = l.source || 'Other';
      if (!sourceBreakdown[src]) {
        sourceBreakdown[src] = { count: 0, percentage: 0 };
      }
      sourceBreakdown[src].count += 1;
    });
    Object.keys(sourceBreakdown).forEach((src) => {
      sourceBreakdown[src].percentage =
        totalLeadsWithSource > 0
          ? Math.round((sourceBreakdown[src].count / totalLeadsWithSource) * 100)
          : 0;
    });

    // Monthly revenue trend (last 6 months from real deals)
    const months = ['May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct'];
    const monthlyRevenue = months.map((m, idx) => {
      const targetMonth = (now.getMonth() - (5 - idx) + 12) % 12;
      const targetYear = now.getFullYear() - (now.getMonth() < 5 - idx ? 1 : 0);

      const dealsInMonth = deals.filter((d) => {
        if (!d.createdAt) return false;
        const dDate = new Date(d.createdAt);
        return (
          dDate.getMonth() === targetMonth &&
          dDate.getFullYear() === targetYear &&
          (d.status === 'WON' || d.stage === 'Won')
        );
      });
      const rev = dealsInMonth.reduce((sum, d) => sum + (Number(d.value) || 0), 0);

      const openDealsInMonth = deals.filter((d) => {
        if (!d.createdAt) return false;
        const dDate = new Date(d.createdAt);
        return (
          dDate.getMonth() === targetMonth &&
          dDate.getFullYear() === targetYear &&
          d.status === 'ACTIVE'
        );
      });
      const pipeline = openDealsInMonth.reduce((sum, d) => sum + (Number(d.value) || 0), 0);

      return {
        month: m,
        wonRevenue: rev,
        pipelineValue: pipeline,
        dealsCount: dealsInMonth.length,
      };
    });

    // Team Leaderboard from real users in organization
    const orgMembers = this.getMembershipsForOrg(orgId);
    const teamPerformance = orgMembers.map((m) => {
      const user = this.findUserById(m.userId);
      const repDeals = deals.filter((d) => d.ownerId === m.userId);
      const repWon = repDeals.filter((d) => d.status === 'WON' || d.stage === 'Won');
      const repRevenue = repWon.reduce((sum, d) => sum + (Number(d.value) || 0), 0);
      const repLeads = leads.filter((l) => l.ownerId === m.userId);
      const repActive = repDeals.filter((d) => d.status === 'ACTIVE');

      return {
        userId: m.userId,
        name: user?.name || user?.displayName || 'Team Member',
        email: user?.email || '',
        avatar: user?.avatar || '',
        role: m.role.replace('ORGANIZATION_', '').replace('_', ' '),
        leadsAssigned: repLeads.length,
        activeDeals: repActive.length,
        dealsWon: repWon.length,
        revenue: repRevenue,
        winRate: repDeals.length > 0 ? Math.round((repWon.length / repDeals.length) * 100) : 0,
      };
    });
    teamPerformance.sort((a, b) => b.revenue - a.revenue || b.dealsWon - a.dealsWon);

    // Urgent Action Items & Overdue Tasks
    const actionItems = tasks
      .filter((t) => t.status === 'Pending' || t.status === 'Overdue')
      .slice(0, 10);

    return {
      kpi: {
        totalLeads: calcMetric(currentLeads.length, prevLeads.length),
        qualifiedLeads: calcMetric(currentQualified.length, prevQualified.length),
        openPipeline: calcMetric(openPipelineValue, prevOpenPipelineValue),
        weightedPipeline: calcMetric(Math.round(currentWeighted), Math.round(prevWeighted)),
        wonRevenue: calcMetric(wonRevenue, prevWonRevenue),
        winRate: calcMetric(winRate, prevWinRate),
        avgDealSize: calcMetric(avgDealSize, prevAvgDealSize),
        overdueTasks: calcMetric(currentTasks.length, prevTasksOverdueCount),
      },
      pipelineStages,
      sourceBreakdown,
      monthlyRevenue,
      teamPerformance,
      recentLeads: leads.slice(0, 8),
      recentDeals: deals.slice(0, 8),
      upcomingTasks: actionItems,
      recentCalls: calls.slice(0, 5),
      recentActivities: activities.slice(0, 8),
      dateWindow: {
        range,
        startDate: currentStart.toISOString(),
        endDate: currentEnd.toISOString(),
        previousStartDate: prevStart.toISOString(),
        previousEndDate: prevEnd.toISOString(),
      },
      totals: {
        allLeadsCount: rawLeads.length,
        allDealsCount: rawDeals.length,
        allTasksCount: rawTasks.length,
      },
    };
  }

  search(orgId: string, q: string) {
    const term = q.toLowerCase().trim();
    if (!term) return { leads: [], deals: [], customers: [], companies: [], tasks: [] };

    const leads = this.getLeads(orgId).filter(
      (l) => l.name.toLowerCase().includes(term) || l.company.toLowerCase().includes(term) || l.email.toLowerCase().includes(term)
    );
    const deals = this.getDeals(orgId).filter(
      (d) => d.name.toLowerCase().includes(term) || d.company.toLowerCase().includes(term)
    );
    const customers = this.getCustomers(orgId).filter(
      (c) => c.name.toLowerCase().includes(term) || c.company.toLowerCase().includes(term)
    );
    const companies = this.getCompanies(orgId).filter(
      (c) => c.name.toLowerCase().includes(term) || c.industry.toLowerCase().includes(term)
    );
    const tasks = this.getTasks(orgId).filter(
      (t) => t.title.toLowerCase().includes(term) || (t.relatedName && t.relatedName.toLowerCase().includes(term))
    );

    return { leads, deals, customers, companies, tasks };
  }
}

export const db = new Database();
