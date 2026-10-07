export type UserRole =
  | 'SUPER_ADMIN'
  | 'ORGANIZATION_OWNER'
  | 'ORGANIZATION_ADMIN'
  | 'SALES_MANAGER'
  | 'SALES_AGENT'
  | 'VIEWER';

export interface UserNotificationPreferences {
  emailNotifications: boolean;
  taskReminders: boolean;
  leadAssignments: boolean;
  dealUpdates: boolean;
  mentions: boolean;
  workflowNotifications: boolean;
  dailySummary: boolean;
  browserNotifications: boolean;
}

export interface UserAppearancePreferences {
  theme: 'light' | 'dark' | 'system';
  density: 'comfortable' | 'compact';
  sidebarCollapsed: boolean;
  defaultDashboard: 'overview' | 'leads' | 'deals' | 'reports';
  language: string;
  timezone: string;
  dateFormat: string;
  currency: string;
}

export interface UserSession {
  id: string;
  device: string;
  browser: string;
  ip: string;
  location: string;
  lastActive: string;
  current: boolean;
}

export interface UserLoginHistoryItem {
  id: string;
  ip: string;
  browser: string;
  location: string;
  timestamp: string;
  success: boolean;
}

export interface User {
  id: string;
  name: string;
  displayName?: string;
  email: string;
  role: UserRole;
  organizationId?: string;
  avatar?: string;
  phone?: string;
  title?: string;
  department?: string;
  status: 'ACTIVE' | 'SUSPENDED' | 'PENDING';
  lastLogin?: string;
  timezone?: string;
  language?: string;
  mfaEnabled?: boolean;
  notifications?: UserNotificationPreferences;
  preferences?: UserAppearancePreferences;
  activeSessions?: UserSession[];
  loginHistory?: UserLoginHistoryItem[];
  createdAt: string;
}

export interface ApiKey {
  id: string;
  name: string;
  keyPrefix: string;
  keyHash?: string;
  scopes: string[];
  lastUsed?: string;
  createdAt: string;
}

export interface Organization {
  id: string;
  name: string;
  legalName?: string;
  displayName?: string;
  tradingName?: string;
  code: string;
  industry: string;
  size: string;
  website?: string;
  phone?: string;
  email?: string;
  country: string;
  state?: string;
  city?: string;
  address?: string;
  timezone: string;
  currency?: string;
  dateFormat?: string;
  fiscalYear?: string;
  logo?: string;
  plan: 'FREE' | 'STARTER' | 'PROFESSIONAL' | 'ENTERPRISE';
  status: 'ACTIVE' | 'SUSPENDED' | 'TRIAL';
  ownerId: string;
  apiKeys?: ApiKey[];
  webhookSecret?: string;
  rolePermissions?: Record<string, Record<string, string[]>>;
  createdAt: string;
  updatedAt: string;
}

export interface Membership {
  id: string;
  userId: string;
  organizationId: string;
  role: UserRole;
  status: 'ACTIVE' | 'INVITED' | 'SUSPENDED';
  invitedBy?: string;
  joinedAt: string;
}

export type LeadStatus =
  | 'New'
  | 'Contacted'
  | 'Qualified'
  | 'Proposal'
  | 'Negotiation'
  | 'Won'
  | 'Lost';

export type LeadSource =
  | 'Website'
  | 'Contact Form'
  | 'Referral'
  | 'LinkedIn'
  | 'Google'
  | 'Facebook'
  | 'Campaign'
  | 'Other';

export interface Lead {
  id: string;
  organizationId: string;
  name: string;
  company: string;
  email: string;
  phone: string;
  source: LeadSource;
  status: LeadStatus;
  ownerId: string;
  ownerName: string;
  value: number;
  lastContact?: string;
  nextFollowUp?: string;
  notes?: string;
  createdAt: string;
  updatedAt: string;
}

export type DealStage =
  | 'New'
  | 'Contacted'
  | 'Qualified'
  | 'Proposal'
  | 'Negotiation'
  | 'Won'
  | 'Lost';

export interface Deal {
  id: string;
  organizationId: string;
  name: string;
  companyId?: string;
  company: string;
  customerId?: string;
  leadId?: string;
  value: number;
  stage: DealStage;
  probability: number;
  ownerId: string;
  ownerName: string;
  expectedClose: string;
  priority: 'Low' | 'Medium' | 'High';
  status: 'ACTIVE' | 'WON' | 'LOST';
  notes?: string;
  createdAt: string;
  updatedAt: string;
}

export interface Customer {
  id: string;
  organizationId: string;
  name: string;
  company: string;
  email: string;
  phone: string;
  ownerId: string;
  ownerName: string;
  revenue: number;
  lastActivity?: string;
  status: 'Active' | 'Churned' | 'Onboarding';
  notes?: string;
  createdAt: string;
  updatedAt: string;
}

export interface Company {
  id: string;
  organizationId: string;
  name: string;
  industry: string;
  employees: string;
  contactsCount: number;
  dealsCount: number;
  revenue: number;
  ownerId: string;
  ownerName: string;
  status: 'Active' | 'Prospect' | 'Inactive';
  website?: string;
  address?: string;
  createdAt: string;
  updatedAt: string;
}

export interface Contact {
  id: string;
  organizationId: string;
  companyId?: string;
  customerId?: string;
  name: string;
  email: string;
  phone: string;
  title: string;
  isPrimary?: boolean;
  createdAt: string;
}

export type TaskType = 'Follow-up' | 'Call' | 'Meeting' | 'Email' | 'General';
export type TaskPriority = 'Low' | 'Medium' | 'High';
export type TaskStatus = 'Pending' | 'Completed' | 'Overdue';

export interface Task {
  id: string;
  organizationId: string;
  title: string;
  description?: string;
  assignedUserId: string;
  assignedUserName: string;
  relatedType?: 'Lead' | 'Customer' | 'Deal' | 'Company' | 'General';
  relatedId?: string;
  relatedName?: string;
  dueDate: string;
  priority: TaskPriority;
  status: TaskStatus;
  type: TaskType;
  createdAt: string;
}

export type CallStatus = 'Completed' | 'Missed' | 'Scheduled';
export type CallType = 'Incoming' | 'Outgoing' | 'Missed';

export interface Call {
  id: string;
  organizationId: string;
  caller: string;
  recipient: string;
  direction: CallType;
  durationSeconds: number;
  agentId: string;
  agentName: string;
  relatedType?: 'Lead' | 'Customer' | 'Deal';
  relatedId?: string;
  relatedName?: string;
  notes?: string;
  status: CallStatus;
  createdAt: string;
}

export type ActivityType =
  | 'Call'
  | 'Email'
  | 'Meeting'
  | 'Note'
  | 'Task'
  | 'Status Change'
  | 'Deal Update'
  | 'Lead'
  | 'Deal'
  | 'General';

export interface Activity {
  id: string;
  organizationId: string;
  userId: string;
  userName: string;
  type: ActivityType;
  description: string;
  relatedType?: 'Lead' | 'Deal' | 'Customer' | 'Company' | 'General';
  relatedId?: string;
  relatedName?: string;
  createdAt: string;
}

export interface Note {
  id: string;
  organizationId: string;
  userId: string;
  userName: string;
  relatedType: 'Lead' | 'Deal' | 'Customer' | 'Company';
  relatedId: string;
  content: string;
  createdAt: string;
}

export interface Notification {
  id: string;
  organizationId: string;
  userId?: string;
  title: string;
  message: string;
  type: 'INFO' | 'SUCCESS' | 'WARNING' | 'ALERT';
  read: boolean;
  link?: string;
  createdAt: string;
}

export interface Workflow {
  id: string;
  organizationId: string;
  name: string;
  trigger: 'LEAD_CREATED' | 'DEAL_WON' | 'TASK_OVERDUE' | 'STAGE_CHANGED' | string;
  conditions?: string;
  actions?: string | string[];
  status?: 'ACTIVE' | 'PAUSED';
  enabled?: boolean;
  description?: string;
  runCount?: number;
  lastRun?: string;
  createdAt: string;
}

export interface Integration {
  id: string;
  organizationId: string;
  provider: 'google' | 'microsoft' | 'email' | 'calendar' | 'telephony' | 'webhooks' | 'api' | string;
  name: string;
  category?: string;
  description?: string;
  status: 'CONNECTED' | 'NOT_CONNECTED';
  config?: Record<string, any>;
  connectedAt?: string;
  lastSynced?: string;
}

export interface KpiMetric {
  current: number;
  previous: number;
  changePercent: number;
  trend: 'up' | 'down' | 'neutral';
  timeframe?: string;
  formattedChange?: string;
}

export interface DemoRequest {
  id: string;
  name: string;
  workEmail: string;
  company: string;
  phone: string;
  companySize: string;
  interestedIn: string;
  preferredDate: string;
  message?: string;
  status: 'NEW' | 'CONTACTED' | 'SCHEDULED' | 'COMPLETED' | 'CANCELLED';
  notes?: string;
  createdAt: string;
}

export interface Invoice {
  id: string;
  number: string;
  date: string;
  amount: number;
  status: 'PAID' | 'PENDING' | 'FAILED';
  downloadUrl?: string;
  planName: string;
}

export interface Subscription {
  id: string;
  organizationId: string;
  organizationName: string;
  plan: 'Free' | 'Starter' | 'Professional' | 'Enterprise';
  status: 'Active' | 'Trial' | 'Past Due' | 'Canceled';
  billingCycle: 'Monthly' | 'Annual';
  mrr: number;
  renewalDate: string;
  paymentGatewayConnected: boolean;
  trialEndsAt?: string;
  seatsUsed?: number;
  seatsLimit?: number;
  paymentMethod?: {
    type: string;
    brand?: string;
    last4?: string;
    expMonth?: number;
    expYear?: number;
  };
  invoices?: Invoice[];
  createdAt: string;
}

export interface Plan {
  id: string;
  name: string;
  priceMonthly: number;
  priceAnnual: number;
  userLimit: number;
  leadLimit: number;
  features: string[];
  status: 'ACTIVE' | 'ARCHIVED';
}

export interface AuditLog {
  id: string;
  userId: string;
  userName: string;
  organizationId?: string;
  organizationName?: string;
  action: string;
  resource: string;
  resourceId?: string;
  details?: string;
  ipAddress?: string;
  createdAt: string;
}
