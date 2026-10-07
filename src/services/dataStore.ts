import type {
  Lead,
  Deal,
  Customer,
  Company,
  Contact,
  Task,
  Call,
  Activity,
  Workflow,
  Integration,
  Organization,
  User,
  DealStage,
  LeadStatus
} from '../types/crm';

const STORAGE_KEY = 'wordbitx_crm_state_v2';

export interface CrmState {
  organizations: Organization[];
  users: User[];
  leads: Lead[];
  deals: Deal[];
  customers: Customer[];
  companies: Company[];
  contacts: Contact[];
  tasks: Task[];
  calls: Call[];
  activities: Activity[];
  workflows: Workflow[];
  integrations: Integration[];
}

const DEFAULT_ORGANIZATIONS: Organization[] = [
  {
    id: '6ac2a411ceac76195538b01f',
    name: 'WordbitX Technologies (ABC Tech)',
    legalName: 'WordbitX Technologies Ltd.',
    code: 'wordbitx-tech',
    industry: 'Software & Technology',
    size: '50-100',
    country: 'United States',
    timezone: 'America/New_York',
    currency: 'USD',
    plan: 'PROFESSIONAL',
    status: 'ACTIVE',
    ownerId: 'usr_shaniba',
    createdAt: '2026-01-15T00:00:00.000Z',
    updatedAt: '2026-10-07T00:00:00.000Z'
  },
  {
    id: 'org_abc',
    name: 'ABC Technologies',
    legalName: 'ABC Technologies Global Inc.',
    code: 'abc-tech',
    industry: 'Software & Cloud Services',
    size: '100-250',
    country: 'United States',
    timezone: 'America/Chicago',
    currency: 'USD',
    plan: 'PROFESSIONAL',
    status: 'ACTIVE',
    ownerId: 'usr_shaniba',
    createdAt: '2026-02-01T00:00:00.000Z',
    updatedAt: '2026-10-07T00:00:00.000Z'
  },
  {
    id: 'org_nova',
    name: 'Nova Tech',
    code: 'nova-tech',
    industry: 'Technology & AI',
    size: '20-50',
    country: 'United Kingdom',
    timezone: 'Europe/London',
    currency: 'USD',
    plan: 'STARTER',
    status: 'ACTIVE',
    ownerId: 'usr_nova_owner',
    createdAt: '2026-03-01T00:00:00.000Z',
    updatedAt: '2026-10-07T00:00:00.000Z'
  },
  {
    id: 'org_prime',
    name: 'Prime Estates',
    code: 'prime-estates',
    industry: 'Real Estate & Brokerage',
    size: '50-100',
    country: 'United Arab Emirates',
    timezone: 'Asia/Dubai',
    currency: 'USD',
    plan: 'PROFESSIONAL',
    status: 'ACTIVE',
    ownerId: 'usr_prime_owner',
    createdAt: '2026-03-10T00:00:00.000Z',
    updatedAt: '2026-10-07T00:00:00.000Z'
  },
  {
    id: 'org_bright',
    name: 'Bright Dental',
    code: 'bright-dental',
    industry: 'Healthcare & Dental',
    size: '10-25',
    country: 'Canada',
    timezone: 'America/Toronto',
    currency: 'USD',
    plan: 'STARTER',
    status: 'ACTIVE',
    ownerId: 'usr_bright_owner',
    createdAt: '2026-04-05T00:00:00.000Z',
    updatedAt: '2026-10-07T00:00:00.000Z'
  },
  {
    id: 'org_techvision',
    name: 'Tech Vision',
    code: 'tech-vision',
    industry: 'Cloud & IT Services',
    size: '100-250',
    country: 'Germany',
    timezone: 'Europe/Berlin',
    currency: 'USD',
    plan: 'PROFESSIONAL',
    status: 'ACTIVE',
    ownerId: 'usr_techvision_owner',
    createdAt: '2026-04-12T00:00:00.000Z',
    updatedAt: '2026-10-07T00:00:00.000Z'
  },
  {
    id: 'org_glow',
    name: 'Glow Clinic',
    code: 'glow-clinic',
    industry: 'Aesthetic Dermatology',
    size: '10-20',
    country: 'Australia',
    timezone: 'Australia/Sydney',
    currency: 'USD',
    plan: 'STARTER',
    status: 'ACTIVE',
    ownerId: 'usr_glow_owner',
    createdAt: '2026-05-01T00:00:00.000Z',
    updatedAt: '2026-10-07T00:00:00.000Z'
  },
  {
    id: 'org_solarpro',
    name: 'SolarPro Energy',
    code: 'solarpro',
    industry: 'Renewable Energy',
    size: '50-100',
    country: 'United States',
    timezone: 'America/Phoenix',
    currency: 'USD',
    plan: 'PROFESSIONAL',
    status: 'ACTIVE',
    ownerId: 'usr_solar_owner',
    createdAt: '2026-05-18T00:00:00.000Z',
    updatedAt: '2026-10-07T00:00:00.000Z'
  },
  {
    id: 'org_urban',
    name: 'Urban Homes Architecture',
    code: 'urban-homes',
    industry: 'Architecture & Construction',
    size: '25-50',
    country: 'United States',
    timezone: 'America/Los_Angeles',
    currency: 'USD',
    plan: 'ENTERPRISE',
    status: 'ACTIVE',
    ownerId: 'usr_urban_owner',
    createdAt: '2026-06-01T00:00:00.000Z',
    updatedAt: '2026-10-07T00:00:00.000Z'
  },
  {
    id: 'org_apex',
    name: 'Apex Dynamics',
    code: 'apex-dynamics',
    industry: 'Manufacturing & Logistics',
    size: '250-500',
    country: 'United States',
    timezone: 'America/New_York',
    currency: 'USD',
    plan: 'ENTERPRISE',
    status: 'ACTIVE',
    ownerId: 'usr_apex_owner',
    createdAt: '2026-06-20T00:00:00.000Z',
    updatedAt: '2026-10-07T00:00:00.000Z'
  }
];

const DEFAULT_USERS: User[] = [
  {
    id: 'usr_admin',
    name: 'WordbitX Super Admin',
    displayName: 'WordbitX Super Admin',
    email: 'admin@wordbitx.com',
    role: 'SUPER_ADMIN',
    status: 'ACTIVE',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150',
    title: 'Platform Administrator',
    department: 'Executive',
    createdAt: '2026-01-01T00:00:00.000Z'
  },
  {
    id: 'usr_shaniba',
    name: 'Shaniba Yasin',
    displayName: 'Shaniba Yasin',
    email: 'shaniba@wordbitx.com',
    role: 'ORGANIZATION_OWNER',
    organizationId: '6ac2a411ceac76195538b01f',
    status: 'ACTIVE',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150',
    title: 'Chief Executive Officer',
    department: 'Leadership',
    phone: '+1 (555) 234-5678',
    createdAt: '2026-01-15T00:00:00.000Z'
  },
  {
    id: 'usr_sara',
    name: 'Sara Khan',
    displayName: 'Sara Khan',
    email: 'sara@alphatech.com',
    role: 'ORGANIZATION_ADMIN',
    organizationId: '6ac2a411ceac76195538b01f',
    status: 'ACTIVE',
    avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150',
    title: 'VP of Sales & Revenue Operations',
    department: 'Sales',
    phone: '+1 (555) 345-6789',
    createdAt: '2026-02-10T00:00:00.000Z'
  },
  {
    id: 'usr_ahmed',
    name: 'Ahmed Malik',
    displayName: 'Ahmed Malik',
    email: 'ahmed@alphatech.com',
    role: 'SALES_AGENT',
    organizationId: '6ac2a411ceac76195538b01f',
    status: 'ACTIVE',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150',
    title: 'Senior Account Executive',
    department: 'Sales',
    phone: '+1 (555) 456-7890',
    createdAt: '2026-02-12T00:00:00.000Z'
  }
];

const DEFAULT_LEADS: Lead[] = [
  {
    id: 'lead_1',
    organizationId: '6ac2a411ceac76195538b01f',
    name: 'Ali Raza',
    company: 'Alpha Solutions',
    email: 'ali@alphasolutions.com',
    phone: '+1 (555) 012-3456',
    source: 'Website',
    status: 'New',
    ownerId: 'usr_sara',
    ownerName: 'Sara Khan',
    value: 12500,
    lastContact: '2 hours ago',
    nextFollowUp: 'Oct 14, 2026',
    notes: 'High intent prospect interested in CRM pipeline setup and telephony integration.',
    createdAt: '2026-10-06T10:30:00.000Z',
    updatedAt: '2026-10-06T10:30:00.000Z'
  },
  {
    id: 'lead_2',
    organizationId: '6ac2a411ceac76195538b01f',
    name: 'Sara Khan',
    company: 'Tech Vision',
    email: 'sara.k@techvision.io',
    phone: '+1 (555) 123-4567',
    source: 'Referral',
    status: 'Contacted',
    ownerId: 'usr_ahmed',
    ownerName: 'Ahmed Malik',
    value: 28000,
    lastContact: 'Yesterday',
    nextFollowUp: 'Oct 15, 2026',
    notes: 'Requested product demo for 45 sales agents across 3 regional offices.',
    createdAt: '2026-10-05T09:15:00.000Z',
    updatedAt: '2026-10-05T09:15:00.000Z'
  },
  {
    id: 'lead_3',
    organizationId: '6ac2a411ceac76195538b01f',
    name: 'Ahmed Malik',
    company: 'CodeCraft Agency',
    email: 'ahmed@codecraft.dev',
    phone: '+1 (555) 234-5678',
    source: 'Website',
    status: 'Qualified',
    ownerId: 'usr_sara',
    ownerName: 'Sara Khan',
    value: 18500,
    lastContact: '3 days ago',
    nextFollowUp: 'Oct 16, 2026',
    notes: 'Budget confirmed, reviewing security checklist and SOC-2 compliance.',
    createdAt: '2026-10-04T14:20:00.000Z',
    updatedAt: '2026-10-04T14:20:00.000Z'
  },
  {
    id: 'lead_4',
    organizationId: '6ac2a411ceac76195538b01f',
    name: 'Hira Ahmed',
    company: 'Nova Tech',
    email: 'hira@novatech.com',
    phone: '+1 (555) 345-6789',
    source: 'LinkedIn',
    status: 'Proposal',
    ownerId: 'usr_ahmed',
    ownerName: 'Ahmed Malik',
    value: 45000,
    lastContact: '1 day ago',
    nextFollowUp: 'Oct 12, 2026',
    notes: 'Formal RFP proposal submitted. Waiting for procurement board signoff.',
    createdAt: '2026-10-03T11:00:00.000Z',
    updatedAt: '2026-10-03T11:00:00.000Z'
  },
  {
    id: 'lead_5',
    organizationId: '6ac2a411ceac76195538b01f',
    name: 'Usman Tariq',
    company: 'Glow Clinic',
    email: 'usman@glowclinic.com',
    phone: '+1 (555) 456-7890',
    source: 'Contact Form',
    status: 'Negotiation',
    ownerId: 'usr_shaniba',
    ownerName: 'Shaniba Yasin',
    value: 32000,
    lastContact: 'Today, 09:30 AM',
    nextFollowUp: 'Oct 13, 2026',
    notes: 'Reviewing enterprise multi-location agreement with 5 clinic locations.',
    createdAt: '2026-10-02T16:45:00.000Z',
    updatedAt: '2026-10-02T16:45:00.000Z'
  },
  {
    id: 'lead_6',
    organizationId: '6ac2a411ceac76195538b01f',
    name: 'Ayesha Noor',
    company: 'Smart Retail Inc',
    email: 'ayesha@smartretail.com',
    phone: '+1 (555) 567-8901',
    source: 'Website',
    status: 'New',
    ownerId: 'usr_sara',
    ownerName: 'Sara Khan',
    value: 14000,
    lastContact: '4 hours ago',
    nextFollowUp: 'Oct 18, 2026',
    notes: 'Inbound lead from product comparison page on CRM telephony.',
    createdAt: '2026-10-01T13:10:00.000Z',
    updatedAt: '2026-10-01T13:10:00.000Z'
  },
  {
    id: 'lead_7',
    organizationId: '6ac2a411ceac76195538b01f',
    name: 'Hamza Ali',
    company: 'Prime Estates',
    email: 'hamza@primeestates.ae',
    phone: '+1 (555) 678-9012',
    source: 'Referral',
    status: 'Won',
    ownerId: 'usr_ahmed',
    ownerName: 'Ahmed Malik',
    value: 58000,
    lastContact: 'Yesterday',
    nextFollowUp: 'Onboarding Call',
    notes: 'Closed won! Onboarding session scheduled with team leads.',
    createdAt: '2026-09-28T08:00:00.000Z',
    updatedAt: '2026-10-06T15:00:00.000Z'
  },
  {
    id: 'lead_8',
    organizationId: '6ac2a411ceac76195538b01f',
    name: 'Fatima Shah',
    company: 'SolarPro Systems',
    email: 'fatima@solarpro.com',
    phone: '+1 (555) 789-0123',
    source: 'Campaign',
    status: 'Qualified',
    ownerId: 'usr_sara',
    ownerName: 'Sara Khan',
    value: 22000,
    lastContact: '2 days ago',
    nextFollowUp: 'Oct 19, 2026',
    notes: 'Solar sales installation pipeline and GPS dispatching tracking.',
    createdAt: '2026-09-25T10:20:00.000Z',
    updatedAt: '2026-09-25T10:20:00.000Z'
  },
  {
    id: 'lead_9',
    organizationId: '6ac2a411ceac76195538b01f',
    name: 'Bilal Ahmed',
    company: 'Urban Homes',
    email: 'bilal@urbanhomes.com',
    phone: '+1 (555) 890-1234',
    source: 'Google',
    status: 'Contacted',
    ownerId: 'usr_ahmed',
    ownerName: 'Ahmed Malik',
    value: 19500,
    lastContact: '3 days ago',
    nextFollowUp: 'Oct 20, 2026',
    notes: 'Interested in pipeline automation and automated contract reminders.',
    createdAt: '2026-09-22T15:30:00.000Z',
    updatedAt: '2026-09-22T15:30:00.000Z'
  },
  {
    id: 'lead_10',
    organizationId: '6ac2a411ceac76195538b01f',
    name: 'Zainab Iqbal',
    company: 'Bright Dental Group',
    email: 'zainab@brightdental.com',
    phone: '+1 (555) 901-2345',
    source: 'Website',
    status: 'Proposal',
    ownerId: 'usr_sara',
    ownerName: 'Sara Khan',
    value: 36000,
    lastContact: '5 days ago',
    nextFollowUp: 'Oct 21, 2026',
    notes: 'Multi-clinic package proposal delivered with call center add-on.',
    createdAt: '2026-09-20T11:45:00.000Z',
    updatedAt: '2026-09-20T11:45:00.000Z'
  }
];

const DEFAULT_DEALS: Deal[] = [
  {
    id: 'deal_1',
    organizationId: '6ac2a411ceac76195538b01f',
    name: 'Alpha Solutions CRM Rollout',
    company: 'Alpha Solutions',
    value: 12500,
    stage: 'New',
    probability: 25,
    ownerId: 'usr_sara',
    ownerName: 'Sara Khan',
    expectedClose: '2026-10-30',
    priority: 'Medium',
    status: 'ACTIVE',
    createdAt: '2026-10-06T10:30:00.000Z',
    updatedAt: '2026-10-06T10:30:00.000Z'
  },
  {
    id: 'deal_2',
    organizationId: '6ac2a411ceac76195538b01f',
    name: 'Tech Vision Enterprise Suite',
    company: 'Tech Vision',
    value: 28000,
    stage: 'Contacted',
    probability: 40,
    ownerId: 'usr_ahmed',
    ownerName: 'Ahmed Malik',
    expectedClose: '2026-11-05',
    priority: 'High',
    status: 'ACTIVE',
    createdAt: '2026-10-05T09:15:00.000Z',
    updatedAt: '2026-10-05T09:15:00.000Z'
  },
  {
    id: 'deal_3',
    organizationId: '6ac2a411ceac76195538b01f',
    name: 'CodeCraft Agency License',
    company: 'CodeCraft Agency',
    value: 18500,
    stage: 'Qualified',
    probability: 60,
    ownerId: 'usr_sara',
    ownerName: 'Sara Khan',
    expectedClose: '2026-10-28',
    priority: 'Medium',
    status: 'ACTIVE',
    createdAt: '2026-10-04T14:20:00.000Z',
    updatedAt: '2026-10-04T14:20:00.000Z'
  },
  {
    id: 'deal_4',
    organizationId: '6ac2a411ceac76195538b01f',
    name: 'Nova Tech Sales Pipeline Expansion',
    company: 'Nova Tech',
    value: 45000,
    stage: 'Proposal',
    probability: 75,
    ownerId: 'usr_ahmed',
    ownerName: 'Ahmed Malik',
    expectedClose: '2026-10-22',
    priority: 'High',
    status: 'ACTIVE',
    createdAt: '2026-10-03T11:00:00.000Z',
    updatedAt: '2026-10-03T11:00:00.000Z'
  },
  {
    id: 'deal_5',
    organizationId: '6ac2a411ceac76195538b01f',
    name: 'Glow Clinic Multi-Branch System',
    company: 'Glow Clinic',
    value: 32000,
    stage: 'Negotiation',
    probability: 85,
    ownerId: 'usr_shaniba',
    ownerName: 'Shaniba Yasin',
    expectedClose: '2026-10-18',
    priority: 'High',
    status: 'ACTIVE',
    createdAt: '2026-10-02T16:45:00.000Z',
    updatedAt: '2026-10-02T16:45:00.000Z'
  },
  {
    id: 'deal_6',
    organizationId: '6ac2a411ceac76195538b01f',
    name: 'Smart Retail Automation Hub',
    company: 'Smart Retail Inc',
    value: 14000,
    stage: 'New',
    probability: 30,
    ownerId: 'usr_sara',
    ownerName: 'Sara Khan',
    expectedClose: '2026-11-15',
    priority: 'Low',
    status: 'ACTIVE',
    createdAt: '2026-10-01T13:10:00.000Z',
    updatedAt: '2026-10-01T13:10:00.000Z'
  },
  {
    id: 'deal_7',
    organizationId: '6ac2a411ceac76195538b01f',
    name: 'Prime Estates Global Portal',
    company: 'Prime Estates',
    value: 58000,
    stage: 'Won',
    probability: 100,
    ownerId: 'usr_ahmed',
    ownerName: 'Ahmed Malik',
    expectedClose: '2026-10-06',
    priority: 'High',
    status: 'WON',
    createdAt: '2026-09-28T08:00:00.000Z',
    updatedAt: '2026-10-06T15:00:00.000Z'
  },
  {
    id: 'deal_8',
    organizationId: '6ac2a411ceac76195538b01f',
    name: 'SolarPro Dispatch & CRM Core',
    company: 'SolarPro Systems',
    value: 22000,
    stage: 'Qualified',
    probability: 55,
    ownerId: 'usr_sara',
    ownerName: 'Sara Khan',
    expectedClose: '2026-11-10',
    priority: 'Medium',
    status: 'ACTIVE',
    createdAt: '2026-09-25T10:20:00.000Z',
    updatedAt: '2026-09-25T10:20:00.000Z'
  },
  {
    id: 'deal_9',
    organizationId: '6ac2a411ceac76195538b01f',
    name: 'Urban Homes Architectural Workflows',
    company: 'Urban Homes',
    value: 19500,
    stage: 'Contacted',
    probability: 45,
    ownerId: 'usr_ahmed',
    ownerName: 'Ahmed Malik',
    expectedClose: '2026-11-12',
    priority: 'Medium',
    status: 'ACTIVE',
    createdAt: '2026-09-22T15:30:00.000Z',
    updatedAt: '2026-09-22T15:30:00.000Z'
  },
  {
    id: 'deal_10',
    organizationId: '6ac2a411ceac76195538b01f',
    name: 'Bright Dental Group Integration',
    company: 'Bright Dental Group',
    value: 36500,
    stage: 'Won',
    probability: 100,
    ownerId: 'usr_sara',
    ownerName: 'Sara Khan',
    expectedClose: '2026-10-01',
    priority: 'High',
    status: 'WON',
    createdAt: '2026-09-20T11:45:00.000Z',
    updatedAt: '2026-10-01T12:00:00.000Z'
  },
  {
    id: 'deal_11',
    organizationId: '6ac2a411ceac76195538b01f',
    name: 'ABC Technologies Platform Contract',
    company: 'ABC Technologies',
    value: 48000,
    stage: 'Proposal',
    probability: 70,
    ownerId: 'usr_shaniba',
    ownerName: 'Shaniba Yasin',
    expectedClose: '2026-11-01',
    priority: 'High',
    status: 'ACTIVE',
    createdAt: '2026-09-15T09:00:00.000Z',
    updatedAt: '2026-09-15T09:00:00.000Z'
  },
  {
    id: 'deal_12',
    organizationId: '6ac2a411ceac76195538b01f',
    name: 'Apex Dynamics Logistics Telephony',
    company: 'Apex Dynamics',
    value: 39000,
    stage: 'Negotiation',
    probability: 80,
    ownerId: 'usr_ahmed',
    ownerName: 'Ahmed Malik',
    expectedClose: '2026-10-25',
    priority: 'High',
    status: 'ACTIVE',
    createdAt: '2026-09-10T14:00:00.000Z',
    updatedAt: '2026-09-10T14:00:00.000Z'
  }
];

const DEFAULT_CUSTOMERS: Customer[] = [
  {
    id: 'cust_1',
    organizationId: '6ac2a411ceac76195538b01f',
    name: 'Prime Estates Global',
    company: 'Prime Estates',
    email: 'billing@primeestates.ae',
    phone: '+971 4 345 6789',
    ownerId: 'usr_ahmed',
    ownerName: 'Ahmed Malik',
    revenue: 58000,
    lastActivity: 'Yesterday, 04:30 PM',
    status: 'Active',
    notes: 'Enterprise account with 65 seats and custom call recording retention.',
    createdAt: '2026-03-01T10:00:00.000Z',
    updatedAt: '2026-10-06T15:00:00.000Z'
  },
  {
    id: 'cust_2',
    organizationId: '6ac2a411ceac76195538b01f',
    name: 'Bright Dental Group',
    company: 'Bright Dental Group',
    email: 'accounts@brightdental.com',
    phone: '+1 (555) 901-2345',
    ownerId: 'usr_sara',
    ownerName: 'Sara Khan',
    revenue: 36500,
    lastActivity: 'Oct 01, 10:00 AM',
    status: 'Active',
    notes: 'Multi-location dental group using automated appointment SMS reminders.',
    createdAt: '2026-04-10T09:00:00.000Z',
    updatedAt: '2026-10-01T12:00:00.000Z'
  },
  {
    id: 'cust_3',
    organizationId: '6ac2a411ceac76195538b01f',
    name: 'ABC Technologies',
    company: 'ABC Technologies',
    email: 'billing@abctechnologies.com',
    phone: '+1 (555) 019-2831',
    ownerId: 'usr_shaniba',
    ownerName: 'Shaniba Yasin',
    revenue: 48000,
    lastActivity: '3 days ago',
    status: 'Onboarding',
    notes: 'Flagship technology customer migrating from legacy Salesforce CRM.',
    createdAt: '2026-02-15T10:00:00.000Z',
    updatedAt: '2026-10-04T16:00:00.000Z'
  }
];

const DEFAULT_COMPANIES: Company[] = [
  {
    id: 'comp_1',
    organizationId: '6ac2a411ceac76195538b01f',
    name: 'ABC Technologies',
    industry: 'Software & Cloud Services',
    employees: '100-250',
    contactsCount: 12,
    dealsCount: 4,
    revenue: 48000,
    ownerId: 'usr_sara',
    ownerName: 'Sara Khan',
    status: 'Active',
    website: 'https://abctechnologies.com',
    address: '100 Innovation Way, Austin, TX',
    createdAt: '2026-02-15T10:00:00.000Z',
    updatedAt: '2026-10-05T16:00:00.000Z'
  },
  {
    id: 'comp_2',
    organizationId: '6ac2a411ceac76195538b01f',
    name: 'Nova Tech',
    industry: 'Technology & AI',
    employees: '50-100',
    contactsCount: 6,
    dealsCount: 2,
    revenue: 45000,
    ownerId: 'usr_ahmed',
    ownerName: 'Ahmed Malik',
    status: 'Prospect',
    website: 'https://novatech.io',
    address: '42 Silicon Boulevard, London, UK',
    createdAt: '2026-03-01T10:00:00.000Z',
    updatedAt: '2026-10-04T11:00:00.000Z'
  },
  {
    id: 'comp_3',
    organizationId: '6ac2a411ceac76195538b01f',
    name: 'Prime Estates',
    industry: 'Real Estate & Brokerage',
    employees: '75-150',
    contactsCount: 8,
    dealsCount: 3,
    revenue: 58000,
    ownerId: 'usr_ahmed',
    ownerName: 'Ahmed Malik',
    status: 'Active',
    website: 'https://primeestates.ae',
    address: 'Level 14, Marina Plaza, Dubai, UAE',
    createdAt: '2026-03-10T10:00:00.000Z',
    updatedAt: '2026-10-06T15:00:00.000Z'
  },
  {
    id: 'comp_4',
    organizationId: '6ac2a411ceac76195538b01f',
    name: 'Bright Dental Group',
    industry: 'Healthcare & Dental',
    employees: '25-50',
    contactsCount: 5,
    dealsCount: 2,
    revenue: 36500,
    ownerId: 'usr_sara',
    ownerName: 'Sara Khan',
    status: 'Active',
    website: 'https://brightdental.com',
    address: '880 Health Park Drive, Toronto, ON',
    createdAt: '2026-04-10T10:00:00.000Z',
    updatedAt: '2026-10-01T12:00:00.000Z'
  },
  {
    id: 'comp_5',
    organizationId: '6ac2a411ceac76195538b01f',
    name: 'SolarPro Systems',
    industry: 'Renewable Energy',
    employees: '50-100',
    contactsCount: 7,
    dealsCount: 2,
    revenue: 22000,
    ownerId: 'usr_sara',
    ownerName: 'Sara Khan',
    status: 'Prospect',
    website: 'https://solarpro.com',
    address: '340 Sunbelt Way, Phoenix, AZ',
    createdAt: '2026-05-18T10:00:00.000Z',
    updatedAt: '2026-09-25T10:20:00.000Z'
  }
];

const DEFAULT_TASKS: Task[] = [
  {
    id: 'task_1',
    organizationId: '6ac2a411ceac76195538b01f',
    title: 'Follow up with Ali Raza on Telephony add-on',
    description: 'Verify custom call routing requirements and agent seat numbers.',
    assignedUserId: 'usr_sara',
    assignedUserName: 'Sara Khan',
    relatedType: 'Lead',
    relatedId: 'lead_1',
    relatedName: 'Ali Raza',
    dueDate: 'Today, 02:00 PM',
    priority: 'High',
    status: 'Pending',
    type: 'Follow-up',
    createdAt: '2026-10-06T08:00:00.000Z'
  },
  {
    id: 'task_2',
    organizationId: '6ac2a411ceac76195538b01f',
    title: 'Send enterprise SLA and MSA to Usman Tariq',
    description: 'Prepare finalized terms for 5 clinic branches at Glow Clinic.',
    assignedUserId: 'usr_shaniba',
    assignedUserName: 'Shaniba Yasin',
    relatedType: 'Deal',
    relatedId: 'deal_5',
    relatedName: 'Glow Clinic Multi-Branch System',
    dueDate: 'Tomorrow, 11:00 AM',
    priority: 'High',
    status: 'Pending',
    type: 'General',
    createdAt: '2026-10-06T09:00:00.000Z'
  },
  {
    id: 'task_3',
    organizationId: '6ac2a411ceac76195538b01f',
    title: 'Product demo with Nova Tech technical committee',
    description: 'Demonstrate live webhook ingestion and CRM REST API token flow.',
    assignedUserId: 'usr_ahmed',
    assignedUserName: 'Ahmed Malik',
    relatedType: 'Lead',
    relatedId: 'lead_4',
    relatedName: 'Hira Ahmed',
    dueDate: 'Oct 12, 03:00 PM',
    priority: 'High',
    status: 'Pending',
    type: 'Meeting',
    createdAt: '2026-10-05T14:00:00.000Z'
  },
  {
    id: 'task_4',
    organizationId: '6ac2a411ceac76195538b01f',
    title: 'Verify Prime Estates onboarding setup checklist',
    description: 'Confirm Twilio SIP trunk registration and Google Workspace directory sync.',
    assignedUserId: 'usr_ahmed',
    assignedUserName: 'Ahmed Malik',
    relatedType: 'Customer',
    relatedId: 'cust_1',
    relatedName: 'Prime Estates Global',
    dueDate: 'Oct 14, 10:00 AM',
    priority: 'Medium',
    status: 'Completed',
    type: 'Follow-up',
    createdAt: '2026-10-04T10:00:00.000Z'
  },
  {
    id: 'task_5',
    organizationId: '6ac2a411ceac76195538b01f',
    title: 'Quarterly pipeline review with sales executives',
    description: 'Review Q4 target attainment, conversion ratios, and deal velocity.',
    assignedUserId: 'usr_sara',
    assignedUserName: 'Sara Khan',
    relatedType: 'Deal',
    dueDate: 'Oct 18, 04:00 PM',
    priority: 'Medium',
    status: 'Pending',
    type: 'Meeting',
    createdAt: '2026-10-03T11:00:00.000Z'
  }
];

const DEFAULT_CALLS: Call[] = [
  {
    id: 'call_1',
    organizationId: '6ac2a411ceac76195538b01f',
    caller: '+1 (555) 012-3456',
    recipient: 'Sara Khan (WordbitX)',
    direction: 'Incoming',
    durationSeconds: 184,
    agentId: 'usr_sara',
    agentName: 'Sara Khan',
    relatedType: 'Lead',
    relatedId: 'lead_1',
    relatedName: 'Ali Raza',
    notes: 'Prospect inquired about high-volume VoIP seats and call recording compliance.',
    status: 'Completed',
    createdAt: '2026-10-07T09:24:00.000Z'
  },
  {
    id: 'call_2',
    organizationId: '6ac2a411ceac76195538b01f',
    caller: 'Ahmed Malik (WordbitX)',
    recipient: '+1 (555) 345-6789',
    direction: 'Outgoing',
    durationSeconds: 312,
    agentId: 'usr_ahmed',
    agentName: 'Ahmed Malik',
    relatedType: 'Lead',
    relatedId: 'lead_4',
    relatedName: 'Hira Ahmed',
    notes: 'Walked through security audit questions. Agreed on next demo stage.',
    status: 'Completed',
    createdAt: '2026-10-06T15:10:00.000Z'
  },
  {
    id: 'call_3',
    organizationId: '6ac2a411ceac76195538b01f',
    caller: '+1 (555) 456-7890',
    recipient: 'Shaniba Yasin (WordbitX)',
    direction: 'Incoming',
    durationSeconds: 420,
    agentId: 'usr_shaniba',
    agentName: 'Shaniba Yasin',
    relatedType: 'Deal',
    relatedId: 'deal_5',
    relatedName: 'Glow Clinic Multi-Branch System',
    notes: 'Negotiated multi-year discount rate for 5 locations. Approved terms.',
    status: 'Completed',
    createdAt: '2026-10-06T11:45:00.000Z'
  },
  {
    id: 'call_4',
    organizationId: '6ac2a411ceac76195538b01f',
    caller: '+1 (555) 567-8901',
    recipient: 'Main Sales Line',
    direction: 'Missed',
    durationSeconds: 0,
    agentId: 'usr_sara',
    agentName: 'Sara Khan',
    relatedType: 'Lead',
    relatedId: 'lead_6',
    relatedName: 'Ayesha Noor',
    notes: 'Missed inbound call outside business hours. Auto-notification triggered.',
    status: 'Missed',
    createdAt: '2026-10-05T19:30:00.000Z'
  },
  {
    id: 'call_5',
    organizationId: '6ac2a411ceac76195538b01f',
    caller: 'Sara Khan (WordbitX)',
    recipient: '+1 (555) 901-2345',
    direction: 'Outgoing',
    durationSeconds: 245,
    agentId: 'usr_sara',
    agentName: 'Sara Khan',
    relatedType: 'Customer',
    relatedId: 'cust_2',
    relatedName: 'Bright Dental Group',
    notes: 'Check-in on automated patient recall campaign performance. Customer very pleased.',
    status: 'Completed',
    createdAt: '2026-10-04T14:15:00.000Z'
  }
];

const DEFAULT_ACTIVITIES: Activity[] = [
  {
    id: 'act_1',
    organizationId: '6ac2a411ceac76195538b01f',
    userId: 'usr_sara',
    userName: 'Sara Khan',
    type: 'Call',
    description: 'Completed call with Ali Raza regarding Alpha Solutions CRM rollout',
    relatedType: 'Lead',
    relatedId: 'lead_1',
    relatedName: 'Ali Raza',
    createdAt: '2026-10-07T09:24:00.000Z'
  },
  {
    id: 'act_2',
    organizationId: '6ac2a411ceac76195538b01f',
    userId: 'usr_ahmed',
    userName: 'Ahmed Malik',
    type: 'Deal',
    description: 'Moved deal "Prime Estates Global Portal" to Closed Won ($58,000)',
    relatedType: 'Deal',
    relatedId: 'deal_7',
    relatedName: 'Prime Estates Global Portal',
    createdAt: '2026-10-06T15:00:00.000Z'
  },
  {
    id: 'act_3',
    organizationId: '6ac2a411ceac76195538b01f',
    userId: 'usr_shaniba',
    userName: 'Shaniba Yasin',
    type: 'Deal',
    description: 'Updated proposal terms on "Glow Clinic Multi-Branch System" ($32,000)',
    relatedType: 'Deal',
    relatedId: 'deal_5',
    relatedName: 'Glow Clinic Multi-Branch System',
    createdAt: '2026-10-06T11:45:00.000Z'
  },
  {
    id: 'act_4',
    organizationId: '6ac2a411ceac76195538b01f',
    userId: 'usr_sara',
    userName: 'Sara Khan',
    type: 'Lead',
    description: 'Added new qualified lead: Ali Raza (Alpha Solutions)',
    relatedType: 'Lead',
    relatedId: 'lead_1',
    relatedName: 'Ali Raza',
    createdAt: '2026-10-06T10:30:00.000Z'
  },
  {
    id: 'act_5',
    organizationId: '6ac2a411ceac76195538b01f',
    userId: 'usr_ahmed',
    userName: 'Ahmed Malik',
    type: 'Task',
    description: 'Completed onboarding verification task for Prime Estates',
    relatedType: 'Customer',
    relatedId: 'cust_1',
    relatedName: 'Prime Estates Global',
    createdAt: '2026-10-04T10:00:00.000Z'
  }
];

const DEFAULT_WORKFLOWS: Workflow[] = [
  {
    id: 'wf_1',
    organizationId: '6ac2a411ceac76195538b01f',
    name: 'Auto-Assign Inbound Leads',
    description: 'Automatically round-robin distributes website leads to available sales agents.',
    trigger: 'NEW_LEAD_CREATED',
    status: 'ACTIVE',
    runCount: 148,
    lastRun: '15 mins ago',
    actions: ['Check agent availability', 'Assign lead owner', 'Send Slack notification', 'Create follow-up task'],
    createdAt: '2026-02-01T00:00:00.000Z'
  },
  {
    id: 'wf_2',
    organizationId: '6ac2a411ceac76195538b01f',
    name: 'Deal Won Customer Provisioning',
    description: 'When a deal moves to Closed Won, automatically provision customer record and trigger onboarding email.',
    trigger: 'DEAL_STAGE_CHANGED',
    status: 'ACTIVE',
    runCount: 32,
    lastRun: 'Yesterday',
    actions: ['Create Customer entity', 'Notify finance channel', 'Generate onboarding welcome email'],
    createdAt: '2026-02-15T00:00:00.000Z'
  },
  {
    id: 'wf_3',
    organizationId: '6ac2a411ceac76195538b01f',
    name: 'Overdue Task Alert & Escalation',
    description: 'Notifies sales managers when a high-priority lead follow-up task is more than 4 hours overdue.',
    trigger: 'TASK_OVERDUE',
    status: 'ACTIVE',
    runCount: 89,
    lastRun: 'Today, 08:00 AM',
    actions: ['Send browser push alert', 'Escalate to Sales Manager Sara Khan'],
    createdAt: '2026-03-01T00:00:00.000Z'
  }
];

const DEFAULT_INTEGRATIONS: Integration[] = [
  {
    id: 'int_1',
    organizationId: '6ac2a411ceac76195538b01f',
    name: 'Google Workspace',
    provider: 'google',
    category: 'Communication',
    description: 'Sync Gmail threads, Google Calendar meetings, and Contacts bidirectional.',
    status: 'CONNECTED',
    connectedAt: '2026-02-15T00:00:00.000Z',
    config: { email: 'admin@wordbitx.com', syncEvents: true }
  },
  {
    id: 'int_2',
    organizationId: '6ac2a411ceac76195538b01f',
    name: 'Microsoft 365 & Outlook',
    provider: 'microsoft',
    category: 'Communication',
    description: 'Connect Outlook mailboxes, calendar appointments, and Teams presence.',
    status: 'NOT_CONNECTED',
    config: {}
  },
  {
    id: 'int_3',
    organizationId: '6ac2a411ceac76195538b01f',
    name: 'Cloud Telephony & Twilio VoIP',
    provider: 'twilio',
    category: 'Telephony',
    description: 'In-browser dialer, automated call recording, caller ID masking, and SMS.',
    status: 'CONNECTED',
    connectedAt: '2026-03-01T00:00:00.000Z',
    config: { phoneNumbers: ['+1 (555) 012-3456'], recording: true }
  },
  {
    id: 'int_4',
    organizationId: '6ac2a411ceac76195538b01f',
    name: 'Slack Deal Alerts',
    provider: 'slack',
    category: 'Productivity',
    description: 'Post real-time wins, high-value lead notifications, and task reminders to channels.',
    status: 'CONNECTED',
    connectedAt: '2026-03-10T00:00:00.000Z',
    config: { channel: '#sales-wins' }
  },
  {
    id: 'int_5',
    organizationId: '6ac2a411ceac76195538b01f',
    name: 'Stripe Billing & Subscriptions',
    provider: 'stripe',
    category: 'Sales',
    description: 'Track invoices, customer ARR, recurring subscriptions, and payment statuses directly.',
    status: 'CONNECTED',
    connectedAt: '2026-02-20T00:00:00.000Z',
    config: { livemode: true }
  },
  {
    id: 'int_6',
    organizationId: '6ac2a411ceac76195538b01f',
    name: 'Inbound Webhooks API',
    provider: 'webhook',
    category: 'Developer',
    description: 'Real-time JSON payload ingestion from web forms, landing pages, and external apps.',
    status: 'CONNECTED',
    connectedAt: '2026-01-15T00:00:00.000Z',
    config: { endpoint: 'https://api.wordbitx.com/v1/webhooks/inbound' }
  },
  {
    id: 'int_7',
    organizationId: '6ac2a411ceac76195538b01f',
    name: 'REST API & SDK Keys',
    provider: 'api',
    category: 'Developer',
    description: 'Full programmatic access to Leads, Deals, Pipeline, and Analytics endpoints.',
    status: 'CONNECTED',
    connectedAt: '2026-01-15T00:00:00.000Z',
    config: { keysCount: 2 }
  }
];

class DataStore {
  private state: CrmState;
  private listeners: Set<() => void> = new Set();

  constructor() {
    this.state = this.loadState();
  }

  private loadState(): CrmState {
    if (typeof window !== 'undefined') {
      try {
        const raw = localStorage.getItem(STORAGE_KEY);
        if (raw) {
          const parsed = JSON.parse(raw);
          if (parsed && Array.isArray(parsed.leads) && parsed.leads.length > 0) {
            return parsed;
          }
        }
      } catch (e) {
        console.warn('Failed to parse localStorage CRM state, using defaults', e);
      }
    }
    return {
      organizations: DEFAULT_ORGANIZATIONS,
      users: DEFAULT_USERS,
      leads: DEFAULT_LEADS,
      deals: DEFAULT_DEALS,
      customers: DEFAULT_CUSTOMERS,
      companies: DEFAULT_COMPANIES,
      contacts: [],
      tasks: DEFAULT_TASKS,
      calls: DEFAULT_CALLS,
      activities: DEFAULT_ACTIVITIES,
      workflows: DEFAULT_WORKFLOWS,
      integrations: DEFAULT_INTEGRATIONS,
    };
  }

  private saveState() {
    if (typeof window !== 'undefined') {
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(this.state));
      } catch (e) {
        console.warn('Failed to save CRM state to localStorage', e);
      }
    }
    this.notify();
  }

  public subscribe(listener: () => void) {
    this.listeners.add(listener);
    return () => {
      this.listeners.delete(listener);
    };
  }

  private notify() {
    this.listeners.forEach((fn) => fn());
  }

  // Workspaces
  public getOrganizations(): Organization[] {
    return this.state.organizations;
  }

  public getOrganization(id: string): Organization | undefined {
    return this.state.organizations.find((o) => o.id === id) || this.state.organizations[0];
  }

  // Dashboard Metrics Calculation
  public getDashboardMetrics(orgId?: string) {
    const leads = this.getLeads(orgId);
    const deals = this.getDeals(orgId);
    const customers = this.getCustomers(orgId);
    const tasks = this.getTasks(orgId);
    const calls = this.getCalls(orgId);

    const totalPipelineValue = deals.reduce((sum, d) => sum + (d.value || 0), 0);
    const wonDeals = deals.filter((d) => d.stage === 'Won' || d.status === 'WON');
    const totalWonRevenue = wonDeals.reduce((sum, d) => sum + (d.value || 0), 0);
    const avgDealSize = deals.length > 0 ? Math.round(totalPipelineValue / deals.length) : 0;
    const winRate = deals.length > 0 ? Math.round((wonDeals.length / deals.length) * 100) : 0;

    // Stage counts
    const stages: Record<DealStage, { count: number; value: number }> = {
      New: { count: 0, value: 0 },
      Contacted: { count: 0, value: 0 },
      Qualified: { count: 0, value: 0 },
      Proposal: { count: 0, value: 0 },
      Negotiation: { count: 0, value: 0 },
      Won: { count: 0, value: 0 },
      Lost: { count: 0, value: 0 },
    };

    deals.forEach((d) => {
      if (stages[d.stage]) {
        stages[d.stage].count += 1;
        stages[d.stage].value += d.value || 0;
      }
    });

    return {
      totalLeads: leads.length,
      totalDeals: deals.length,
      totalPipelineValue,
      totalWonRevenue,
      totalCustomers: customers.length,
      avgDealSize,
      winRate,
      pendingTasks: tasks.filter((t) => t.status === 'Pending').length,
      completedCalls: calls.filter((c) => c.status === 'Completed').length,
      stages,
      recentLeads: leads.slice(0, 5),
      recentDeals: deals.slice(0, 5),
      recentCalls: calls.slice(0, 4),
      recentTasks: tasks.slice(0, 5),
    };
  }

  // Leads
  public getLeads(orgId?: string): Lead[] {
    return this.state.leads;
  }

  public getLead(id: string): Lead | undefined {
    return this.state.leads.find((l) => l.id === id);
  }

  public createLead(leadData: Partial<Lead>): Lead {
    const newLead: Lead = {
      id: `lead_${Date.now()}_${Math.random().toString(36).substr(2, 4)}`,
      organizationId: leadData.organizationId || '6ac2a411ceac76195538b01f',
      name: leadData.name || 'New Inbound Lead',
      company: leadData.company || 'Prospective Company',
      email: leadData.email || 'lead@example.com',
      phone: leadData.phone || '+1 (555) 000-0000',
      source: leadData.source || 'Website',
      status: leadData.status || 'New',
      ownerId: leadData.ownerId || 'usr_sara',
      ownerName: leadData.ownerName || 'Sara Khan',
      value: Number(leadData.value) || 10000,
      notes: leadData.notes || '',
      lastContact: 'Just now',
      nextFollowUp: leadData.nextFollowUp || 'Oct 20, 2026',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    this.state.leads = [newLead, ...this.state.leads];

    this.addActivity({
      type: 'Lead',
      description: `Created new lead "${newLead.name}" (${newLead.company}) - $${newLead.value.toLocaleString()}`,
      relatedType: 'Lead',
      relatedId: newLead.id,
      relatedName: newLead.name,
    });

    this.saveState();
    return newLead;
  }

  public updateLead(id: string, updates: Partial<Lead>): Lead | undefined {
    const idx = this.state.leads.findIndex((l) => l.id === id);
    if (idx === -1) return undefined;

    const old = this.state.leads[idx];
    const updated = {
      ...old,
      ...updates,
      updatedAt: new Date().toISOString(),
    };
    this.state.leads[idx] = updated;

    if (updates.status && updates.status !== old.status) {
      this.addActivity({
        type: 'Lead',
        description: `Updated status of "${updated.name}" from ${old.status} to ${updates.status}`,
        relatedType: 'Lead',
        relatedId: updated.id,
        relatedName: updated.name,
      });
    }

    this.saveState();
    return updated;
  }

  public deleteLead(id: string): boolean {
    const lead = this.getLead(id);
    this.state.leads = this.state.leads.filter((l) => l.id !== id);
    if (lead) {
      this.addActivity({
        type: 'Lead',
        description: `Removed lead "${lead.name}" (${lead.company})`,
      });
    }
    this.saveState();
    return true;
  }

  public convertLeadToDeal(leadId: string): Deal | undefined {
    const lead = this.getLead(leadId);
    if (!lead) return undefined;

    // Update lead status
    this.updateLead(leadId, { status: 'Won' });

    // Create deal
    const deal = this.createDeal({
      name: `${lead.company} Contract Rollout`,
      company: lead.company,
      value: lead.value || 15000,
      stage: 'Proposal',
      probability: 70,
      ownerId: lead.ownerId,
      ownerName: lead.ownerName,
      expectedClose: '2026-11-15',
      priority: 'High',
    });

    this.addActivity({
      type: 'Deal',
      description: `Converted lead "${lead.name}" into active deal "${deal.name}" ($${deal.value.toLocaleString()})`,
      relatedType: 'Deal',
      relatedId: deal.id,
      relatedName: deal.name,
    });

    return deal;
  }

  // Deals
  public getDeals(orgId?: string): Deal[] {
    return this.state.deals;
  }

  public createDeal(dealData: Partial<Deal>): Deal {
    const newDeal: Deal = {
      id: `deal_${Date.now()}_${Math.random().toString(36).substr(2, 4)}`,
      organizationId: dealData.organizationId || '6ac2a411ceac76195538b01f',
      name: dealData.name || 'New Deal',
      company: dealData.company || 'Enterprise Account',
      value: Number(dealData.value) || 20000,
      stage: dealData.stage || 'New',
      probability: dealData.probability || 30,
      ownerId: dealData.ownerId || 'usr_sara',
      ownerName: dealData.ownerName || 'Sara Khan',
      expectedClose: dealData.expectedClose || '2026-11-30',
      priority: dealData.priority || 'Medium',
      status: dealData.stage === 'Won' ? 'WON' : dealData.stage === 'Lost' ? 'LOST' : 'ACTIVE',
      notes: dealData.notes || '',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    this.state.deals = [newDeal, ...this.state.deals];

    this.addActivity({
      type: 'Deal',
      description: `Created new deal "${newDeal.name}" for ${newDeal.company} ($${newDeal.value.toLocaleString()})`,
      relatedType: 'Deal',
      relatedId: newDeal.id,
      relatedName: newDeal.name,
    });

    this.saveState();
    return newDeal;
  }

  public updateDeal(id: string, updates: Partial<Deal>): Deal | undefined {
    const idx = this.state.deals.findIndex((d) => d.id === id);
    if (idx === -1) return undefined;

    const old = this.state.deals[idx];
    const updated = {
      ...old,
      ...updates,
      updatedAt: new Date().toISOString(),
    };

    if (updates.stage) {
      if (updates.stage === 'Won') updated.status = 'WON';
      else if (updates.stage === 'Lost') updated.status = 'LOST';
      else updated.status = 'ACTIVE';

      this.addActivity({
        type: 'Deal',
        description: `Moved deal "${updated.name}" to ${updates.stage} stage`,
        relatedType: 'Deal',
        relatedId: updated.id,
        relatedName: updated.name,
      });
    }

    this.state.deals[idx] = updated;
    this.saveState();
    return updated;
  }

  public deleteDeal(id: string): boolean {
    this.state.deals = this.state.deals.filter((d) => d.id !== id);
    this.saveState();
    return true;
  }

  // Customers
  public getCustomers(orgId?: string): Customer[] {
    return this.state.customers;
  }

  public createCustomer(custData: Partial<Customer>): Customer {
    const newCust: Customer = {
      id: `cust_${Date.now()}_${Math.random().toString(36).substr(2, 4)}`,
      organizationId: custData.organizationId || '6ac2a411ceac76195538b01f',
      name: custData.name || 'New Customer',
      company: custData.company || custData.name || 'Customer Org',
      email: custData.email || 'billing@example.com',
      phone: custData.phone || '+1 (555) 000-0000',
      ownerId: custData.ownerId || 'usr_sara',
      ownerName: custData.ownerName || 'Sara Khan',
      revenue: Number(custData.revenue) || 25000,
      lastActivity: 'Just now',
      status: custData.status || 'Active',
      notes: custData.notes || '',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    this.state.customers = [newCust, ...this.state.customers];
    this.saveState();
    return newCust;
  }

  // Companies
  public getCompanies(orgId?: string): Company[] {
    return this.state.companies;
  }

  public createCompany(data: Partial<Company>): Company {
    const newComp: Company = {
      id: `comp_${Date.now()}_${Math.random().toString(36).substr(2, 4)}`,
      organizationId: data.organizationId || '6ac2a411ceac76195538b01f',
      name: data.name || 'New Company',
      industry: data.industry || 'Technology',
      employees: data.employees || '20-50',
      contactsCount: 1,
      dealsCount: 1,
      revenue: Number(data.revenue) || 15000,
      ownerId: 'usr_sara',
      ownerName: 'Sara Khan',
      status: 'Active',
      website: data.website || 'https://example.com',
      address: data.address || '',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    this.state.companies = [newComp, ...this.state.companies];
    this.saveState();
    return newComp;
  }

  // Tasks
  public getTasks(orgId?: string): Task[] {
    return this.state.tasks;
  }

  public createTask(data: Partial<Task>): Task {
    const newTask: Task = {
      id: `task_${Date.now()}_${Math.random().toString(36).substr(2, 4)}`,
      organizationId: data.organizationId || '6ac2a411ceac76195538b01f',
      title: data.title || 'New Follow-up Task',
      description: data.description || '',
      assignedUserId: data.assignedUserId || 'usr_sara',
      assignedUserName: data.assignedUserName || 'Sara Khan',
      relatedType: (data.relatedType as any) || 'Lead',
      relatedId: data.relatedId,
      relatedName: data.relatedName,
      dueDate: data.dueDate || 'Tomorrow, 02:00 PM',
      priority: data.priority || 'Medium',
      status: 'Pending',
      type: data.type || 'Follow-up',
      createdAt: new Date().toISOString(),
    };

    this.state.tasks = [newTask, ...this.state.tasks];
    this.saveState();
    return newTask;
  }

  public toggleTaskStatus(id: string): Task | undefined {
    const idx = this.state.tasks.findIndex((t) => t.id === id);
    if (idx === -1) return undefined;

    const task = this.state.tasks[idx];
    const newStatus = task.status === 'Completed' ? 'Pending' : 'Completed';
    task.status = newStatus;

    this.addActivity({
      type: 'Task',
      description: `Marked task "${task.title}" as ${newStatus}`,
      relatedType: task.relatedType,
      relatedId: task.relatedId,
      relatedName: task.relatedName,
    });

    this.saveState();
    return task;
  }

  public deleteTask(id: string): boolean {
    this.state.tasks = this.state.tasks.filter((t) => t.id !== id);
    this.saveState();
    return true;
  }

  // Calls
  public getCalls(orgId?: string): Call[] {
    return this.state.calls;
  }

  public logCall(callData: Partial<Call>): Call {
    const newCall: Call = {
      id: `call_${Date.now()}_${Math.random().toString(36).substr(2, 4)}`,
      organizationId: callData.organizationId || '6ac2a411ceac76195538b01f',
      caller: callData.caller || 'Sara Khan (WordbitX)',
      recipient: callData.recipient || '+1 (555) 123-4567',
      direction: callData.direction || 'Outgoing',
      durationSeconds: Number(callData.durationSeconds) || 120,
      agentId: callData.agentId || 'usr_sara',
      agentName: callData.agentName || 'Sara Khan',
      relatedType: (callData.relatedType as any) || 'Lead',
      relatedId: callData.relatedId,
      relatedName: callData.relatedName || 'Lead Prospect',
      notes: callData.notes || 'Routine call log.',
      status: callData.status || 'Completed',
      createdAt: new Date().toISOString(),
    };

    this.state.calls = [newCall, ...this.state.calls];

    this.addActivity({
      type: 'Call',
      description: `Logged ${newCall.direction.toLowerCase()} call with ${newCall.relatedName || newCall.recipient} (${Math.floor(newCall.durationSeconds / 60)}m ${newCall.durationSeconds % 60}s)`,
      relatedType: newCall.relatedType,
      relatedId: newCall.relatedId,
      relatedName: newCall.relatedName,
    });

    this.saveState();
    return newCall;
  }

  // Activities
  public getActivities(orgId?: string): Activity[] {
    return this.state.activities;
  }

  public addActivity(data: Partial<Activity>): Activity {
    const act: Activity = {
      id: `act_${Date.now()}_${Math.random().toString(36).substr(2, 4)}`,
      organizationId: data.organizationId || '6ac2a411ceac76195538b01f',
      userId: data.userId || 'usr_sara',
      userName: data.userName || 'Sara Khan',
      type: (data.type as any) || 'Call',
      description: data.description || 'Action performed',
      relatedType: data.relatedType,
      relatedId: data.relatedId,
      relatedName: data.relatedName,
      createdAt: new Date().toISOString(),
    };

    this.state.activities = [act, ...this.state.activities.slice(0, 49)];
    return act;
  }

  // Workflows
  public getWorkflows(orgId?: string): Workflow[] {
    return this.state.workflows;
  }

  public toggleWorkflow(id: string): Workflow | undefined {
    const wf = this.state.workflows.find((w) => w.id === id);
    if (!wf) return undefined;

    wf.status = wf.status === 'ACTIVE' ? 'PAUSED' : 'ACTIVE';
    this.saveState();
    return wf;
  }

  // Integrations
  public getIntegrations(orgId?: string): Integration[] {
    return this.state.integrations;
  }

  public toggleIntegration(id: string): Integration | undefined {
    const int = this.state.integrations.find((i) => i.id === id);
    if (!int) return undefined;

    int.status = int.status === 'CONNECTED' ? 'NOT_CONNECTED' : 'CONNECTED';
    if (int.status === 'CONNECTED') {
      int.connectedAt = new Date().toISOString();
    }
    this.saveState();
    return int;
  }

  // Team
  public getUsers(): User[] {
    return this.state.users;
  }

  public inviteTeamMember(data: { name: string; email: string; role: any; title?: string }): User {
    const newUser: User = {
      id: `usr_${Date.now()}`,
      name: data.name,
      displayName: data.name,
      email: data.email.toLowerCase().trim(),
      role: data.role,
      status: 'ACTIVE',
      organizationId: '6ac2a411ceac76195538b01f',
      title: data.title || 'Account Representative',
      department: 'Sales',
      avatar: `https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150`,
      createdAt: new Date().toISOString(),
    };

    this.state.users = [...this.state.users, newUser];
    this.saveState();
    return newUser;
  }
}

export const crmStore = new DataStore();
