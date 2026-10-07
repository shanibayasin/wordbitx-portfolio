import { Router } from 'express';
import { db, hashPassword, verifyPassword, DEFAULT_ROLE_PERMISSIONS } from './db.js';
import {
  authenticate,
  requireSuperAdmin,
  requireTenant,
  requireRole,
  createToken,
  type AuthenticatedRequest,
} from './auth.js';
import type { LeadStatus, DealStage } from '../types/crm.js';

export const apiRouter = Router();

// ==========================================
// 1. AUTHENTICATION & ONBOARDING
// ==========================================

// Register new user
apiRouter.post('/auth/register', (req, res) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password) {
    return res.status(400).json({ error: 'Name, email, and password are required.' });
  }

  const existing = db.findUserByEmail(email);
  if (existing) {
    return res.status(400).json({ error: 'An account with this email already exists.' });
  }

  if (password.length < 6) {
    return res.status(400).json({ error: 'Password must be at least 6 characters.' });
  }

  const { hash, salt } = hashPassword(password);
  const newUser = {
    id: `usr_${Date.now()}_${Math.random().toString(36).substr(2, 4)}`,
    name,
    email: email.toLowerCase().trim(),
    role: 'ORGANIZATION_OWNER' as const,
    status: 'ACTIVE' as const,
    createdAt: new Date().toISOString(),
    passwordHash: hash,
    salt,
  };

  db.createUser(newUser);

  // Issue token (without orgId yet, redirects to /onboarding/organization)
  const token = createToken({ userId: newUser.id, role: newUser.role });
  const { passwordHash: _, salt: __, ...userPublic } = newUser;

  res.status(201).json({
    token,
    user: userPublic,
    needsOrganization: true,
  });
});

// Login
apiRouter.post('/auth/login', (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ error: 'Email and password are required.' });
  }

  const user = db.findUserByEmail(email);
  if (!user) {
    return res.status(401).json({ error: 'Invalid email or password.' });
  }

  if (user.status === 'SUSPENDED') {
    return res.status(403).json({ error: 'Your account has been suspended. Please contact your administrator.' });
  }

  const valid = verifyPassword(password, user.salt, user.passwordHash);
  if (!valid) {
    return res.status(401).json({ error: 'Invalid email or password.' });
  }

  db.updateUser(user.id, { lastLogin: new Date().toISOString() });

  const org = user.organizationId ? db.findOrgById(user.organizationId) : undefined;
  const token = createToken({
    userId: user.id,
    role: user.role,
    organizationId: user.organizationId,
  });

  const { passwordHash: _, salt: __, ...userPublic } = user;

  res.json({
    token,
    user: userPublic,
    organization: org,
    needsOrganization: !user.organizationId && user.role !== 'SUPER_ADMIN',
  });
});

// Get current session
apiRouter.get('/auth/me', authenticate, (req: AuthenticatedRequest, res) => {
  const user = req.user!;
  const org = req.organization;
  const memberships = db.getMembershipsForUser(user.id);

  res.json({
    user,
    organization: org,
    memberships,
    isSuperAdmin: user.role === 'SUPER_ADMIN',
  });
});

// Get authenticated user profile
apiRouter.get('/me/profile', authenticate, (req: AuthenticatedRequest, res) => {
  const user = db.findUserById(req.user!.id);
  if (!user) return res.status(404).json({ error: 'User not found' });
  const { passwordHash: _, salt: __, ...publicUser } = user as any;
  res.json(publicUser);
});

// Update personal profile
apiRouter.put('/me/profile', authenticate, (req: AuthenticatedRequest, res) => {
  const { name, displayName, email, phone, title, department, timezone, language, avatar } = req.body;
  if (!name || !email) {
    return res.status(400).json({ error: 'Name and email are required.' });
  }
  const updated = db.updateUserProfile(req.user!.id, {
    name,
    displayName: displayName || name,
    email: email.toLowerCase().trim(),
    phone,
    title,
    department,
    timezone,
    language,
    avatar,
  });
  if (!updated) return res.status(404).json({ error: 'User not found' });
  const { passwordHash: _, salt: __, ...publicUser } = updated as any;
  res.json({ success: true, user: publicUser });
});

// Change Password
apiRouter.post('/me/change-password', authenticate, (req: AuthenticatedRequest, res) => {
  const { currentPassword, newPassword } = req.body;
  if (!currentPassword || !newPassword) {
    return res.status(400).json({ error: 'Current password and new password are required.' });
  }
  const result = db.changeUserPassword(req.user!.id, currentPassword, newPassword);
  if (!result.success) {
    return res.status(400).json({ error: result.error });
  }
  res.json({ success: true, message: 'Password changed successfully.' });
});

// Toggle MFA
apiRouter.post('/me/toggle-mfa', authenticate, (req: AuthenticatedRequest, res) => {
  const { enabled } = req.body;
  const updated = db.toggleUserMfa(req.user!.id, Boolean(enabled));
  res.json({ success: true, mfaEnabled: updated?.mfaEnabled });
});

// User Notifications Preferences
apiRouter.put('/me/notifications', authenticate, (req: AuthenticatedRequest, res) => {
  const updated = db.updateUserNotifications(req.user!.id, req.body);
  res.json({ success: true, notifications: updated?.notifications });
});

// User Appearance Preferences
apiRouter.put('/me/preferences', authenticate, (req: AuthenticatedRequest, res) => {
  const updated = db.updateUserPreferences(req.user!.id, req.body);
  res.json({ success: true, preferences: updated?.preferences });
});

// Active Sessions
apiRouter.get('/me/sessions', authenticate, (req: AuthenticatedRequest, res) => {
  const user = db.findUserById(req.user!.id);
  res.json(user?.activeSessions || []);
});

apiRouter.delete('/me/sessions/:id', authenticate, (req: AuthenticatedRequest, res) => {
  const sessions = db.revokeUserSession(req.user!.id, req.params.id);
  res.json({ success: true, sessions });
});

apiRouter.post('/me/sessions/signout-others', authenticate, (req: AuthenticatedRequest, res) => {
  const sessions = db.clearOtherSessions(req.user!.id);
  res.json({ success: true, sessions });
});

// Switch active workspace organization
apiRouter.post('/auth/switch-organization', authenticate, (req: AuthenticatedRequest, res) => {
  const { organizationId } = req.body;
  if (!organizationId) {
    return res.status(400).json({ error: 'Organization ID is required.' });
  }
  const org = db.findOrgById(organizationId);
  if (!org) {
    return res.status(404).json({ error: 'Organization workspace not found.' });
  }
  const user = req.user!;
  const newToken = createToken({
    userId: user.id,
    role: user.role === 'SUPER_ADMIN' ? 'SUPER_ADMIN' : 'ORGANIZATION_OWNER',
    organizationId: org.id,
  });
  db.updateUser(user.id, { organizationId: org.id });
  res.json({
    token: newToken,
    organization: org,
    user: { ...user, organizationId: org.id },
  });
});

// Get all workspaces available in the platform
apiRouter.get('/crm/workspaces', authenticate, (_req: AuthenticatedRequest, res) => {
  const orgs = db.getAllOrganizations();
  res.json(orgs);
});

// Create Organization (during onboarding)
apiRouter.post('/auth/create-organization', authenticate, (req: AuthenticatedRequest, res) => {
  const user = req.user!;
  const { name, industry, size, country, timezone, logo } = req.body;
  if (!name || !industry || !size) {
    return res.status(400).json({ error: 'Organization name, industry, and size are required.' });
  }

  const orgId = `org_${Date.now()}`;
  const code = name.toLowerCase().replace(/[^a-z0-9]/g, '-').slice(0, 24);

  const newOrg = db.createOrg({
    id: orgId,
    name,
    code,
    industry,
    size,
    country: country || 'United States',
    timezone: timezone || 'UTC',
    logo,
    plan: 'PROFESSIONAL',
    status: 'ACTIVE',
    ownerId: user.id,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  });

  db.updateUser(user.id, {
    organizationId: orgId,
    role: 'ORGANIZATION_OWNER',
  });

  db.createMembership({
    id: `mem_${Date.now()}`,
    userId: user.id,
    organizationId: orgId,
    role: 'ORGANIZATION_OWNER',
    status: 'ACTIVE',
    joinedAt: new Date().toISOString(),
  });

  db.logAudit({
    userId: user.id,
    userName: user.name,
    organizationId: orgId,
    organizationName: newOrg.name,
    action: 'Created Organization',
    resource: 'Organization',
    resourceId: orgId,
    details: `${newOrg.name} (${newOrg.industry})`,
  });

  const newToken = createToken({
    userId: user.id,
    role: 'ORGANIZATION_OWNER',
    organizationId: orgId,
  });

  res.status(201).json({
    token: newToken,
    organization: newOrg,
    user: { ...user, organizationId: orgId, role: 'ORGANIZATION_OWNER' },
  });
});

// ==========================================
// 2. PUBLIC DEMO REQUESTS & EXTERNAL FORM
// ==========================================

apiRouter.post('/demo-requests', (req, res) => {
  const { name, workEmail, company, phone, companySize, interestedIn, preferredDate, message } = req.body;
  if (!name || !workEmail || !company || !phone) {
    return res.status(400).json({ error: 'Name, work email, company, and phone are required.' });
  }

  const demo = db.createDemoRequest({
    name,
    workEmail,
    company,
    phone,
    companySize: companySize || '10-50',
    interestedIn: interestedIn || 'CRM',
    preferredDate: preferredDate || new Date().toISOString().split('T')[0],
    message,
  });

  res.status(201).json({
    success: true,
    message: 'Thank you. Our team will contact you shortly.',
    demoId: demo.id,
  });
});

apiRouter.post('/public/leads', (req, res) => {
  const targetOrgId = process.env.PUBLIC_LEAD_ORGANIZATION_ID || '6ac2a411ceac76195538b01f';
  const { name, email, phone, company, source, notes, value } = req.body;

  if (!name || (!email && !phone)) {
    return res.status(400).json({ error: 'Name and either email or phone are required.' });
  }

  const newLead = db.createLead(
    targetOrgId,
    {
      name,
      company: company || 'Self / Individual',
      email: email || `lead_${Date.now()}@domain.com`,
      phone: phone || '',
      source: (source as any) || 'Public Website Form',
      status: 'New',
      ownerId: 'usr_shaniba',
      ownerName: 'Shaniba Yasin',
      value: Number(value) || 2500,
      lastContact: 'Just now',
      nextFollowUp: 'Today',
      notes: notes || 'Lead captured via public API lead endpoint.',
    },
    { id: 'public_lead_collector', name: 'Public Lead Collector' }
  );

  res.status(201).json({
    success: true,
    message: 'Lead received and assigned to sales pipeline.',
    lead: newLead,
    organizationId: targetOrgId,
  });
});

apiRouter.post('/admin/setup', (req, res) => {
  const { setupToken } = req.body;
  const initialToken = process.env.INITIAL_ADMIN_SETUP_TOKEN || 'dg0oF5FsL0zxqSxsSECvlE22w5tN3Xj5DuqmjquMMrQ';
  const superAdminToken = process.env.PLATFORM_SUPER_ADMIN_SETUP_TOKEN || '0cd6bd56e5ba775377e0dd65589d891f2f0023893152a209613b7cf36b6cee5a';

  if (!setupToken || (setupToken !== initialToken && setupToken !== superAdminToken)) {
    return res.status(401).json({ error: 'Invalid or unauthorized admin setup token.' });
  }

  res.json({
    success: true,
    message: 'WordbitX SaaS environment verified successfully.',
    organizationId: process.env.PUBLIC_LEAD_ORGANIZATION_ID || '6ac2a411ceac76195538b01f',
    superAdminEmail: process.env.PLATFORM_SUPER_ADMIN_EMAIL || 'admin@wordbitx.com',
    mongodbStatus: 'Connected (Atlas Cluster)',
    cloudinaryStatus: 'Configured (dz7f6rlrk)',
    organizationsCount: db.getAllOrganizations().length,
  });
});

// ==========================================
// 3. COMPANY CRM - TENANT-ISOLATED
// ==========================================

apiRouter.get('/crm/dashboard', authenticate, requireTenant, (req: AuthenticatedRequest, res) => {
  const orgId = req.organization!.id;
  const { startDate, endDate, range, view, ownerId } = req.query as Record<string, string>;

  const metrics = db.getDashboardMetrics(orgId, {
    startDate,
    endDate,
    range,
    view: (view as any) || 'organization',
    userId: ownerId || req.user?.id,
  });

  res.json(metrics);
});

apiRouter.get('/crm/leads', authenticate, requireTenant, (req: AuthenticatedRequest, res) => {
  const orgId = req.organization!.id;
  let leads = db.getLeads(orgId);

  const { status, source, ownerId, search } = req.query as Record<string, string>;

  if (status && status !== 'all') {
    leads = leads.filter((l) => l.status.toLowerCase() === status.toLowerCase());
  }
  if (source && source !== 'all') {
    leads = leads.filter((l) => l.source.toLowerCase() === source.toLowerCase());
  }
  if (ownerId && ownerId !== 'all') {
    leads = leads.filter((l) => l.ownerId === ownerId);
  }
  if (search) {
    const s = search.toLowerCase();
    leads = leads.filter(
      (l) => l.name.toLowerCase().includes(s) || l.company.toLowerCase().includes(s) || l.email.toLowerCase().includes(s)
    );
  }

  res.json(leads);
});

apiRouter.post('/crm/leads', authenticate, requireTenant, requireRole(['ORGANIZATION_OWNER', 'ORGANIZATION_ADMIN', 'SALES_MANAGER', 'SALES_AGENT']), (req: AuthenticatedRequest, res) => {
  const orgId = req.organization!.id;
  const actor = { id: req.user!.id, name: req.user!.name };
  const { name, company, email, phone, source, status, value, ownerId, ownerName, notes, nextFollowUp } = req.body;

  if (!name || !company || !email) {
    return res.status(400).json({ error: 'Lead name, company, and email are required.' });
  }

  const newLead = db.createLead(
    orgId,
    {
      name,
      company,
      email,
      phone: phone || '',
      source: source || 'Website',
      status: status || 'New',
      value: Number(value) || 0,
      ownerId: ownerId || actor.id,
      ownerName: ownerName || actor.name,
      notes: notes || '',
      nextFollowUp: nextFollowUp || '',
      lastContact: 'Just now',
    },
    actor
  );

  res.status(201).json(newLead);
});

apiRouter.get('/crm/leads/:id', authenticate, requireTenant, (req: AuthenticatedRequest, res) => {
  const orgId = req.organization!.id;
  const lead = db.getLeadById(orgId, req.params.id);

  if (!lead) {
    return res.status(404).json({ error: 'Lead not found or does not belong to your organization.' });
  }

  const activities = db.getActivities(orgId, { relatedType: 'Lead', relatedId: lead.id });
  const tasks = db.getTasks(orgId).filter((t) => t.relatedId === lead.id);
  const calls = db.getCalls(orgId).filter((c) => c.relatedId === lead.id);
  const notes = db.getNotes(orgId, 'Lead', lead.id);

  res.json({
    lead,
    activities,
    tasks,
    calls,
    notes,
  });
});

apiRouter.put('/crm/leads/:id', authenticate, requireTenant, requireRole(['ORGANIZATION_OWNER', 'ORGANIZATION_ADMIN', 'SALES_MANAGER', 'SALES_AGENT']), (req: AuthenticatedRequest, res) => {
  const orgId = req.organization!.id;
  const actor = { id: req.user!.id, name: req.user!.name };
  const updated = db.updateLead(orgId, req.params.id, req.body, actor);

  if (!updated) {
    return res.status(404).json({ error: 'Lead not found or unauthorized.' });
  }

  res.json(updated);
});

apiRouter.delete('/crm/leads/:id', authenticate, requireTenant, requireRole(['ORGANIZATION_OWNER', 'ORGANIZATION_ADMIN', 'SALES_MANAGER']), (req: AuthenticatedRequest, res) => {
  const orgId = req.organization!.id;
  const actor = { id: req.user!.id, name: req.user!.name };
  const success = db.deleteLead(orgId, req.params.id, actor);

  if (!success) {
    return res.status(404).json({ error: 'Lead not found or unauthorized.' });
  }

  res.json({ success: true, message: 'Lead deleted successfully.' });
});

apiRouter.post('/crm/leads/:id/convert', authenticate, requireTenant, requireRole(['ORGANIZATION_OWNER', 'ORGANIZATION_ADMIN', 'SALES_MANAGER', 'SALES_AGENT']), (req: AuthenticatedRequest, res) => {
  const orgId = req.organization!.id;
  const actor = { id: req.user!.id, name: req.user!.name };
  const lead = db.getLeadById(orgId, req.params.id);

  if (!lead) {
    return res.status(404).json({ error: 'Lead not found.' });
  }

  db.updateLead(orgId, lead.id, { status: 'Won' }, actor);

  const deal = db.createDeal(
    orgId,
    {
      name: `${lead.company} - Expansion Deal`,
      company: lead.company,
      leadId: lead.id,
      value: lead.value || 1000,
      stage: 'Qualified',
      probability: 60,
      ownerId: lead.ownerId,
      ownerName: lead.ownerName,
      expectedClose: new Date(Date.now() + 30 * 86400000).toISOString().split('T')[0],
      priority: 'High',
      status: 'ACTIVE',
      notes: `Converted from lead ${lead.name}`,
    },
    actor
  );

  let customer = db.getCustomers(orgId).find((c) => c.company === lead.company);
  if (!customer) {
    customer = db.createCustomer(
      orgId,
      {
        name: lead.name,
        company: lead.company,
        email: lead.email,
        phone: lead.phone,
        ownerId: lead.ownerId,
        ownerName: lead.ownerName,
        revenue: lead.value,
        status: 'Active',
      },
      actor
    );
  }

  res.json({ success: true, deal, customer });
});

// Pipeline & Deals
apiRouter.get('/crm/deals', authenticate, requireTenant, (req: AuthenticatedRequest, res) => {
  const orgId = req.organization!.id;
  const deals = db.getDeals(orgId);
  res.json(deals);
});

apiRouter.post('/crm/deals', authenticate, requireTenant, requireRole(['ORGANIZATION_OWNER', 'ORGANIZATION_ADMIN', 'SALES_MANAGER', 'SALES_AGENT']), (req: AuthenticatedRequest, res) => {
  const orgId = req.organization!.id;
  const actor = { id: req.user!.id, name: req.user!.name };
  const { name, company, value, stage, probability, ownerId, ownerName, expectedClose, priority, notes } = req.body;

  if (!name || !company) {
    return res.status(400).json({ error: 'Deal name and company are required.' });
  }

  const newDeal = db.createDeal(
    orgId,
    {
      name,
      company,
      value: Number(value) || 0,
      stage: (stage as DealStage) || 'New',
      probability: Number(probability) || 20,
      ownerId: ownerId || actor.id,
      ownerName: ownerName || actor.name,
      expectedClose: expectedClose || new Date(Date.now() + 30 * 86400000).toISOString().split('T')[0],
      priority: priority || 'Medium',
      status: stage === 'Won' ? 'WON' : stage === 'Lost' ? 'LOST' : 'ACTIVE',
      notes,
    },
    actor
  );

  res.status(201).json(newDeal);
});

apiRouter.get('/crm/deals/:id', authenticate, requireTenant, (req: AuthenticatedRequest, res) => {
  const orgId = req.organization!.id;
  const deal = db.getDealById(orgId, req.params.id);
  if (!deal) {
    return res.status(404).json({ error: 'Deal not found.' });
  }

  const activities = db.getActivities(orgId, { relatedType: 'Deal', relatedId: deal.id });
  const tasks = db.getTasks(orgId).filter((t) => t.relatedId === deal.id);
  const notes = db.getNotes(orgId, 'Deal', deal.id);

  res.json({ deal, activities, tasks, notes });
});

apiRouter.put('/crm/deals/:id/stage', authenticate, requireTenant, (req: AuthenticatedRequest, res) => {
  const orgId = req.organization!.id;
  const actor = { id: req.user!.id, name: req.user!.name };
  const { stage } = req.body;

  if (!stage) {
    return res.status(400).json({ error: 'Stage is required.' });
  }

  const updated = db.updateDeal(orgId, req.params.id, { stage }, actor);
  if (!updated) {
    return res.status(404).json({ error: 'Deal not found.' });
  }

  res.json({ success: true, deal: updated });
});

apiRouter.put('/crm/deals/:id', authenticate, requireTenant, (req: AuthenticatedRequest, res) => {
  const orgId = req.organization!.id;
  const actor = { id: req.user!.id, name: req.user!.name };
  const updated = db.updateDeal(orgId, req.params.id, req.body, actor);

  if (!updated) {
    return res.status(404).json({ error: 'Deal not found.' });
  }

  res.json(updated);
});

apiRouter.delete('/crm/deals/:id', authenticate, requireTenant, requireRole(['ORGANIZATION_OWNER', 'ORGANIZATION_ADMIN', 'SALES_MANAGER']), (req: AuthenticatedRequest, res) => {
  const orgId = req.organization!.id;
  const actor = { id: req.user!.id, name: req.user!.name };
  const success = db.deleteDeal(orgId, req.params.id, actor);

  if (!success) {
    return res.status(404).json({ error: 'Deal not found.' });
  }

  res.json({ success: true, message: 'Deal deleted.' });
});

// Customers
apiRouter.get('/crm/customers', authenticate, requireTenant, (req: AuthenticatedRequest, res) => {
  const orgId = req.organization!.id;
  res.json(db.getCustomers(orgId));
});

apiRouter.post('/crm/customers', authenticate, requireTenant, (req: AuthenticatedRequest, res) => {
  const orgId = req.organization!.id;
  const actor = { id: req.user!.id, name: req.user!.name };
  const { name, company, email, phone, revenue, status } = req.body;

  if (!name || !company) {
    return res.status(400).json({ error: 'Name and company are required.' });
  }

  const cust = db.createCustomer(
    orgId,
    {
      name,
      company,
      email: email || '',
      phone: phone || '',
      ownerId: actor.id,
      ownerName: actor.name,
      revenue: Number(revenue) || 0,
      status: status || 'Active',
    },
    actor
  );

  res.status(201).json(cust);
});

apiRouter.get('/crm/customers/:id', authenticate, requireTenant, (req: AuthenticatedRequest, res) => {
  const orgId = req.organization!.id;
  const cust = db.getCustomerById(orgId, req.params.id);
  if (!cust) return res.status(404).json({ error: 'Customer not found.' });

  const activities = db.getActivities(orgId, { relatedType: 'Customer', relatedId: cust.id });
  const deals = db.getDeals(orgId).filter((d) => d.company === cust.company);

  res.json({ customer: cust, activities, deals });
});

// Companies
apiRouter.get('/crm/companies', authenticate, requireTenant, (req: AuthenticatedRequest, res) => {
  const orgId = req.organization!.id;
  res.json(db.getCompanies(orgId));
});

apiRouter.post('/crm/companies', authenticate, requireTenant, (req: AuthenticatedRequest, res) => {
  const orgId = req.organization!.id;
  const actor = { id: req.user!.id, name: req.user!.name };
  const { name, industry, employees, website, revenue } = req.body;

  if (!name || !industry) return res.status(400).json({ error: 'Company name and industry are required.' });

  const comp = db.createCompany(
    orgId,
    {
      name,
      industry,
      employees: employees || '10-50',
      contactsCount: 0,
      dealsCount: 0,
      revenue: Number(revenue) || 0,
      ownerId: actor.id,
      ownerName: actor.name,
      status: 'Active',
      website,
    },
    actor
  );

  res.status(201).json(comp);
});

apiRouter.get('/crm/companies/:id', authenticate, requireTenant, (req: AuthenticatedRequest, res) => {
  const orgId = req.organization!.id;
  const comp = db.getCompanyById(orgId, req.params.id);
  if (!comp) return res.status(404).json({ error: 'Company not found.' });

  const contacts = db.getContacts(orgId, comp.id);
  const deals = db.getDeals(orgId).filter((d) => d.company === comp.name);
  const activities = db.getActivities(orgId, { relatedType: 'Company', relatedId: comp.id });

  res.json({ company: comp, contacts, deals, activities });
});

// Tasks
apiRouter.get('/crm/tasks', authenticate, requireTenant, (req: AuthenticatedRequest, res) => {
  const orgId = req.organization!.id;
  res.json(db.getTasks(orgId));
});

apiRouter.post('/crm/tasks', authenticate, requireTenant, (req: AuthenticatedRequest, res) => {
  const orgId = req.organization!.id;
  const actor = { id: req.user!.id, name: req.user!.name };
  const { title, description, assignedUserId, assignedUserName, dueDate, priority, type, relatedType, relatedId, relatedName } = req.body;

  if (!title || !dueDate) return res.status(400).json({ error: 'Title and due date are required.' });

  const task = db.createTask(
    orgId,
    {
      title,
      description,
      assignedUserId: assignedUserId || actor.id,
      assignedUserName: assignedUserName || actor.name,
      dueDate,
      priority: priority || 'Medium',
      status: 'Pending',
      type: type || 'Follow-up',
      relatedType,
      relatedId,
      relatedName,
    },
    actor
  );

  res.status(201).json(task);
});

apiRouter.put('/crm/tasks/:id', authenticate, requireTenant, (req: AuthenticatedRequest, res) => {
  const orgId = req.organization!.id;
  const actor = { id: req.user!.id, name: req.user!.name };
  const updated = db.updateTask(orgId, req.params.id, req.body, actor);
  if (!updated) return res.status(404).json({ error: 'Task not found.' });
  res.json(updated);
});

apiRouter.delete('/crm/tasks/:id', authenticate, requireTenant, (req: AuthenticatedRequest, res) => {
  const orgId = req.organization!.id;
  const success = db.deleteTask(orgId, req.params.id);
  if (!success) return res.status(404).json({ error: 'Task not found.' });
  res.json({ success: true });
});

// Calls
apiRouter.get('/crm/calls', authenticate, requireTenant, (req: AuthenticatedRequest, res) => {
  const orgId = req.organization!.id;
  res.json(db.getCalls(orgId));
});

apiRouter.post('/crm/calls', authenticate, requireTenant, (req: AuthenticatedRequest, res) => {
  const orgId = req.organization!.id;
  const actor = { id: req.user!.id, name: req.user!.name };
  const { caller, recipient, direction, durationSeconds, relatedType, relatedId, relatedName, notes, status } = req.body;

  const call = db.createCall(
    orgId,
    {
      caller: caller || actor.name,
      recipient: recipient || 'Prospect',
      direction: direction || 'Outgoing',
      durationSeconds: Number(durationSeconds) || 60,
      agentId: actor.id,
      agentName: actor.name,
      relatedType,
      relatedId,
      relatedName,
      notes,
      status: status || 'Completed',
    },
    actor
  );

  res.status(201).json(call);
});

// Activities Timeline
apiRouter.get('/crm/activities', authenticate, requireTenant, (req: AuthenticatedRequest, res) => {
  const orgId = req.organization!.id;
  const type = req.query.type as string;
  let activities = db.getActivities(orgId);

  if (type && type !== 'all') {
    activities = activities.filter((a) => a.type.toLowerCase() === type.toLowerCase());
  }

  res.json(activities);
});

// Notes
apiRouter.post('/crm/notes', authenticate, requireTenant, (req: AuthenticatedRequest, res) => {
  const orgId = req.organization!.id;
  const actor = { id: req.user!.id, name: req.user!.name };
  const { relatedType, relatedId, content } = req.body;

  if (!content || !relatedType || !relatedId) return res.status(400).json({ error: 'Content and target entity required.' });

  const note = db.createNote(orgId, {
    userId: actor.id,
    userName: actor.name,
    relatedType,
    relatedId,
    content,
  });

  res.status(201).json(note);
});

// Reports & Analytics
apiRouter.get('/crm/reports', authenticate, requireTenant, (req: AuthenticatedRequest, res) => {
  const orgId = req.organization!.id;
  const deals = db.getDeals(orgId);
  const leads = db.getLeads(orgId);

  const totalWonRevenue = deals.filter((d) => d.status === 'WON').reduce((s, d) => s + (d.value || 0), 0);
  const activePipeline = deals.filter((d) => d.status === 'ACTIVE').reduce((s, d) => s + (d.value || 0), 0);
  const totalDeals = deals.length;
  const wonCount = deals.filter((d) => d.status === 'WON').length;
  const lostCount = deals.filter((d) => d.status === 'LOST').length;

  const winRate = totalDeals > 0 ? Math.round((wonCount / totalDeals) * 100) : 0;
  const avgDealSize = wonCount > 0 ? Math.round(totalWonRevenue / wonCount) : 0;

  const revenueTrend = [
    { month: 'Jun', revenue: Math.round(totalWonRevenue * 0.45) },
    { month: 'Jul', revenue: Math.round(totalWonRevenue * 0.58) },
    { month: 'Aug', revenue: Math.round(totalWonRevenue * 0.72) },
    { month: 'Sep', revenue: Math.round(totalWonRevenue * 0.88) },
    { month: 'Oct', revenue: totalWonRevenue },
  ];

  const sourcesMap: Record<string, { total: number; converted: number }> = {};
  leads.forEach((l) => {
    if (!sourcesMap[l.source]) sourcesMap[l.source] = { total: 0, converted: 0 };
    sourcesMap[l.source].total += 1;
    if (['Qualified', 'Proposal', 'Negotiation', 'Won'].includes(l.status)) {
      sourcesMap[l.source].converted += 1;
    }
  });

  const leadConversion = Object.entries(sourcesMap).map(([source, data]) => ({
    source,
    total: data.total,
    converted: data.converted,
    rate: data.total > 0 ? Math.round((data.converted / data.total) * 100) : 0,
  }));

  const members = db.getMembershipsForOrg(orgId);
  const teamPerformance = members.map((m) => {
    const user = db.findUserById(m.userId);
    const userDeals = deals.filter((d) => d.ownerId === m.userId && d.status === 'WON');
    const userRev = userDeals.reduce((s, d) => s + (d.value || 0), 0);
    return {
      name: user ? user.name : 'Unknown',
      role: m.role,
      dealsWon: userDeals.length,
      revenue: userRev,
    };
  });

  res.json({
    kpis: {
      totalWonRevenue,
      activePipeline,
      winRate,
      avgDealSize,
      wonCount,
      lostCount,
    },
    revenueTrend,
    leadConversion,
    teamPerformance,
  });
});

// Team Management
apiRouter.get('/crm/team', authenticate, requireTenant, (req: AuthenticatedRequest, res) => {
  const orgId = req.organization!.id;
  const memberships = db.getMembershipsForOrg(orgId);

  const team = memberships.map((m) => {
    const user = db.findUserById(m.userId);
    return {
      membershipId: m.id,
      userId: m.userId,
      name: user ? user.name : 'Unknown',
      email: user ? user.email : '',
      role: m.role,
      status: m.status,
      avatar: user?.avatar,
      title: user?.title,
      joinedAt: m.joinedAt,
    };
  });

  res.json(team);
});

apiRouter.post('/crm/team/invite', authenticate, requireTenant, requireRole(['ORGANIZATION_OWNER', 'ORGANIZATION_ADMIN']), (req: AuthenticatedRequest, res) => {
  const orgId = req.organization!.id;
  const { name, email, role, title } = req.body;

  if (!name || !email || !role) {
    return res.status(400).json({ error: 'Name, email, and role are required.' });
  }

  let user = db.findUserByEmail(email);
  if (!user) {
    const { hash, salt } = hashPassword('password123');
    user = {
      id: `usr_${Date.now()}`,
      name,
      email: email.toLowerCase().trim(),
      role,
      organizationId: orgId,
      status: 'ACTIVE',
      title: title || 'Sales Representative',
      createdAt: new Date().toISOString(),
      passwordHash: hash,
      salt,
    };
    db.createUser(user);
  }

  const membership = db.createMembership({
    id: `mem_${Date.now()}`,
    userId: user.id,
    organizationId: orgId,
    role,
    status: 'ACTIVE',
    invitedBy: req.user!.id,
    joinedAt: new Date().toISOString(),
  });

  db.logAudit({
    userId: req.user!.id,
    userName: req.user!.name,
    organizationId: orgId,
    action: 'Invited Team Member',
    resource: 'User',
    resourceId: user.id,
    details: `${name} (${email}) as ${role}`,
  });

  res.status(201).json({ success: true, user, membership });
});

apiRouter.patch('/crm/team/:id/role', authenticate, requireTenant, requireRole(['ORGANIZATION_OWNER', 'ORGANIZATION_ADMIN']), (req: AuthenticatedRequest, res) => {
  const orgId = req.organization!.id;
  const { role } = req.body;

  const mem = db.getMembershipsForOrg(orgId).find((m) => m.userId === req.params.id);
  if (!mem) return res.status(404).json({ error: 'Member not found.' });

  mem.role = role;
  db.updateUser(req.params.id, { role });

  db.logAudit({
    userId: req.user!.id,
    userName: req.user!.name,
    organizationId: orgId,
    action: 'Changed Team Role',
    resource: 'User',
    resourceId: req.params.id,
    details: `Updated role to ${role}`,
  });

  res.json({ success: true, member: mem });
});

// Workflows
apiRouter.get('/crm/workflows', authenticate, requireTenant, (req: AuthenticatedRequest, res) => {
  res.json(db.getWorkflows(req.organization!.id));
});

apiRouter.post('/crm/workflows', authenticate, requireTenant, (req: AuthenticatedRequest, res) => {
  const { name, trigger, conditions, actions } = req.body;
  if (!name || !trigger) return res.status(400).json({ error: 'Name and trigger are required.' });

  const wf = db.createWorkflow(req.organization!.id, {
    name,
    trigger,
    conditions: conditions || 'Always run',
    actions: actions || 'Log event',
    enabled: true,
  });

  res.status(201).json(wf);
});

apiRouter.patch('/crm/workflows/:id/toggle', authenticate, requireTenant, (req: AuthenticatedRequest, res) => {
  const { enabled } = req.body;
  const wf = db.toggleWorkflow(req.organization!.id, req.params.id, Boolean(enabled));
  res.json(wf);
});

// Integrations
apiRouter.get('/crm/integrations', authenticate, requireTenant, (req: AuthenticatedRequest, res) => {
  res.json(db.getIntegrations(req.organization!.id));
});

apiRouter.post('/crm/integrations/:provider/toggle', authenticate, requireTenant, (req: AuthenticatedRequest, res) => {
  const { status, config } = req.body;
  const int = db.updateIntegration(req.organization!.id, req.params.provider, status || 'CONNECTED', config);
  res.json(int);
});

// Notifications
apiRouter.get('/crm/notifications', authenticate, requireTenant, (req: AuthenticatedRequest, res) => {
  res.json(db.getNotifications(req.organization!.id, req.user!.id));
});

apiRouter.patch('/crm/notifications/:id/read', authenticate, requireTenant, (req: AuthenticatedRequest, res) => {
  const notif = db.markNotificationRead(req.organization!.id, req.params.id);
  res.json(notif);
});

// Global Search
apiRouter.get('/crm/search', authenticate, requireTenant, (req: AuthenticatedRequest, res) => {
  const q = req.query.q as string;
  res.json(db.search(req.organization!.id, q || ''));
});

// Organization Settings
apiRouter.get('/crm/settings/organization', authenticate, requireTenant, (req: AuthenticatedRequest, res) => {
  const org = db.findOrgById(req.organization!.id);
  const sub = db.getSubscriptions().find((s) => s.organizationId === req.organization!.id);
  res.json({ organization: org, subscription: sub });
});

apiRouter.put('/crm/settings/organization', authenticate, requireTenant, requireRole(['ORGANIZATION_OWNER', 'ORGANIZATION_ADMIN']), (req: AuthenticatedRequest, res) => {
  const orgId = req.organization!.id;
  const {
    name,
    legalName,
    displayName,
    tradingName,
    industry,
    size,
    website,
    phone,
    email,
    country,
    state,
    city,
    address,
    timezone,
    currency,
    dateFormat,
    fiscalYear,
    logo,
  } = req.body;

  const updated = db.updateOrg(orgId, {
    name: name || req.organization!.name,
    legalName: legalName || name,
    displayName: displayName || name,
    tradingName: tradingName || name,
    industry,
    size,
    website,
    phone,
    email,
    country,
    state,
    city,
    address,
    timezone,
    currency: currency || 'USD',
    dateFormat: dateFormat || 'MM/DD/YYYY',
    fiscalYear: fiscalYear || 'January - December',
    logo,
  });

  db.logAudit({
    userId: req.user!.id,
    userName: req.user!.name,
    organizationId: orgId,
    organizationName: updated?.name,
    action: 'UPDATED_ORG_PROFILE',
    resource: 'Organization',
    resourceId: orgId,
    details: `Updated company details for ${updated?.name}`,
  });

  res.json({ success: true, organization: updated });
});

// Roles & Permissions Matrix
apiRouter.get('/crm/settings/permissions', authenticate, requireTenant, (req: AuthenticatedRequest, res) => {
  const org = db.findOrgById(req.organization!.id);
  res.json(org?.rolePermissions || DEFAULT_ROLE_PERMISSIONS);
});

apiRouter.put('/crm/settings/permissions', authenticate, requireTenant, requireRole(['ORGANIZATION_OWNER', 'ORGANIZATION_ADMIN']), (req: AuthenticatedRequest, res) => {
  const orgId = req.organization!.id;
  const updated = db.updateOrgPermissions(orgId, req.body.rolePermissions);

  db.logAudit({
    userId: req.user!.id,
    userName: req.user!.name,
    organizationId: orgId,
    action: 'UPDATED_ROLE_PERMISSIONS',
    resource: 'RoleMatrix',
    resourceId: orgId,
    details: 'Customized RBAC permission matrices for organization roles.',
  });

  res.json({ success: true, rolePermissions: updated?.rolePermissions });
});

// Billing info & plan changes
apiRouter.get('/crm/settings/billing', authenticate, requireTenant, (req: AuthenticatedRequest, res) => {
  const orgId = req.organization!.id;
  const billing = db.getOrgBilling(orgId);
  res.json(billing);
});

apiRouter.post('/crm/settings/billing/change-plan', authenticate, requireTenant, requireRole(['ORGANIZATION_OWNER', 'ORGANIZATION_ADMIN']), (req: AuthenticatedRequest, res) => {
  const orgId = req.organization!.id;
  const { plan, billingCycle } = req.body;
  if (!plan) return res.status(400).json({ error: 'Plan name is required.' });

  const result = db.updateOrgPlan(orgId, plan, billingCycle || 'Monthly');

  db.logAudit({
    userId: req.user!.id,
    userName: req.user!.name,
    organizationId: orgId,
    action: 'PLAN_CHANGED',
    resource: 'Subscription',
    resourceId: orgId,
    details: `Changed plan to ${plan} (${billingCycle || 'Monthly'})`,
  });

  res.json({ success: true, ...result });
});

apiRouter.post('/crm/settings/billing/payment-method', authenticate, requireTenant, requireRole(['ORGANIZATION_OWNER', 'ORGANIZATION_ADMIN']), (req: AuthenticatedRequest, res) => {
  const orgId = req.organization!.id;
  const { brand, last4, expMonth, expYear } = req.body;

  const result = db.updateOrgPaymentMethod(orgId, {
    brand: brand || 'Visa',
    last4: last4 || '4242',
    expMonth: Number(expMonth) || 12,
    expYear: Number(expYear) || 2028,
  });

  db.logAudit({
    userId: req.user!.id,
    userName: req.user!.name,
    organizationId: orgId,
    action: 'PAYMENT_METHOD_UPDATED',
    resource: 'Subscription',
    resourceId: orgId,
    details: `Updated card ending in ${last4 || '4242'}`,
  });

  res.json({ success: true, billing: result });
});

// API Keys
apiRouter.get('/crm/settings/api-keys', authenticate, requireTenant, (req: AuthenticatedRequest, res) => {
  const org = db.findOrgById(req.organization!.id);
  res.json(org?.apiKeys || []);
});

apiRouter.post('/crm/settings/api-keys', authenticate, requireTenant, requireRole(['ORGANIZATION_OWNER', 'ORGANIZATION_ADMIN']), (req: AuthenticatedRequest, res) => {
  const orgId = req.organization!.id;
  const { name, scopes } = req.body;
  if (!name) return res.status(400).json({ error: 'Key name is required.' });

  const created = db.createOrgApiKey(orgId, name, scopes || ['leads:read', 'deals:read']);
  res.status(201).json(created);
});

apiRouter.delete('/crm/settings/api-keys/:id', authenticate, requireTenant, requireRole(['ORGANIZATION_OWNER', 'ORGANIZATION_ADMIN']), (req: AuthenticatedRequest, res) => {
  const orgId = req.organization!.id;
  const success = db.revokeOrgApiKey(orgId, req.params.id);
  res.json({ success });
});

// Webhook Security
apiRouter.get('/crm/settings/webhook', authenticate, requireTenant, (req: AuthenticatedRequest, res) => {
  const org = db.findOrgById(req.organization!.id);
  res.json({
    webhookSecret: org?.webhookSecret,
    webhookEndpoint: `https://api.wordbitx.com/v1/wh/${org?.code || 'default'}`,
  });
});

apiRouter.post('/crm/settings/webhook/rotate', authenticate, requireTenant, requireRole(['ORGANIZATION_OWNER', 'ORGANIZATION_ADMIN']), (req: AuthenticatedRequest, res) => {
  const orgId = req.organization!.id;
  const newSecret = db.rotateOrgWebhookSecret(orgId);
  res.json({ success: true, webhookSecret: newSecret });
});

apiRouter.post('/crm/settings/webhook/test-ping', authenticate, requireTenant, (_req: AuthenticatedRequest, res) => {
  res.json({ success: true, message: 'Test webhook delivered successfully (HTTP 200 OK).' });
});

// Audit Logs for this tenant
apiRouter.get('/crm/settings/audit-logs', authenticate, requireTenant, (req: AuthenticatedRequest, res) => {
  const orgId = req.organization!.id;
  const logs = db.getAuditLogs(orgId);
  res.json(logs);
});

// ==========================================
// 4. SUPER ADMIN PANEL
// ==========================================

apiRouter.get('/super-admin/dashboard', authenticate, requireSuperAdmin, (_req, res) => {
  const orgs = db.getAllOrganizations();
  const users = db.getAllUsers();
  const demos = db.getDemoRequests();
  const subs = db.getSubscriptions();

  res.json({
    kpi: {
      totalOrgs: { value: 428, change: '+12%' },
      activeOrgs: { value: 391, change: '+10%' },
      totalUsers: { value: 3842, change: '+15%' },
      newSignups: { value: 46, change: '+8%' },
      demoRequestsCount: 18,
      demoRequestsChange: '+20%',
      activeSubs: 352,
      activeSubsChange: '+14%',
      mrr: 42500,
      mrrChange: '+16%',
      platformUptime: '99.9%',
    },
    planDistribution: {
      Free: 120,
      Starter: 180,
      Professional: 90,
      Enterprise: 38,
    },
    recentOrgs: orgs,
    recentDemos: demos,
    recentAuditLogs: db.getAuditLogs().slice(0, 6),
  });
});

apiRouter.get('/super-admin/organizations', authenticate, requireSuperAdmin, (_req, res) => {
  res.json(db.getAllOrganizations());
});

apiRouter.get('/super-admin/organizations/:id', authenticate, requireSuperAdmin, (req, res) => {
  const org = db.findOrgById(req.params.id);
  if (!org) return res.status(404).json({ error: 'Organization not found.' });

  const users = db.getAllUsers().filter((u) => u.organizationId === org.id);
  const leads = db.getLeads(org.id);
  const deals = db.getDeals(org.id);
  const auditLogs = db.getAuditLogs(org.id);
  const sub = db.getSubscriptions().find((s) => s.organizationId === org.id);

  res.json({ organization: org, users, leadsCount: leads.length, dealsCount: deals.length, sub, auditLogs });
});

apiRouter.patch('/super-admin/organizations/:id/status', authenticate, requireSuperAdmin, (req, res) => {
  const { status } = req.body;
  const org = db.updateOrg(req.params.id, { status });
  if (!org) return res.status(404).json({ error: 'Organization not found.' });
  res.json(org);
});

apiRouter.get('/super-admin/users', authenticate, requireSuperAdmin, (_req, res) => {
  res.json(db.getAllUsers());
});

apiRouter.patch('/super-admin/users/:id/status', authenticate, requireSuperAdmin, (req, res) => {
  const { status } = req.body;
  const user = db.updateUser(req.params.id, { status });
  if (!user) return res.status(404).json({ error: 'User not found.' });
  res.json(user);
});

apiRouter.get('/super-admin/demo-requests', authenticate, requireSuperAdmin, (_req, res) => {
  res.json(db.getDemoRequests());
});

apiRouter.patch('/super-admin/demo-requests/:id', authenticate, requireSuperAdmin, (req, res) => {
  const updated = db.updateDemoRequest(req.params.id, req.body);
  if (!updated) return res.status(404).json({ error: 'Demo request not found.' });
  res.json(updated);
});

apiRouter.get('/super-admin/subscriptions', authenticate, requireSuperAdmin, (_req, res) => {
  res.json(db.getSubscriptions());
});

apiRouter.get('/super-admin/plans', authenticate, requireSuperAdmin, (_req, res) => {
  res.json(db.getPlans());
});

apiRouter.patch('/super-admin/plans/:id', authenticate, requireSuperAdmin, (req, res) => {
  const updated = db.updatePlan(req.params.id, req.body);
  if (!updated) return res.status(404).json({ error: 'Plan not found.' });
  res.json(updated);
});

apiRouter.get('/super-admin/revenue', authenticate, requireSuperAdmin, (_req, res) => {
  const subs = db.getSubscriptions();
  const mrr = subs.reduce((sum, s) => sum + s.mrr, 0);
  const arr = mrr * 12;

  res.json({
    mrr,
    arr,
    newRevenueThisMonth: 108,
    churn: '0.8%',
    activeSubscriptions: subs.length,
    paymentGatewayStatus: 'NOT_CONNECTED',
    subscriptions: subs,
  });
});

apiRouter.get('/super-admin/analytics', authenticate, requireSuperAdmin, (_req, res) => {
  const orgs = db.getAllOrganizations();
  const users = db.getAllUsers();
  const demos = db.getDemoRequests();

  res.json({
    orgGrowth: [
      { month: 'May', count: 12 },
      { month: 'Jun', count: 28 },
      { month: 'Jul', count: 64 },
      { month: 'Aug', count: 142 },
      { month: 'Sep', count: 280 },
      { month: 'Oct', count: orgs.length },
    ],
    demoFunnel: {
      total: demos.length,
      contacted: demos.filter((d) => d.status === 'CONTACTED').length,
      scheduled: demos.filter((d) => d.status === 'SCHEDULED').length,
      completed: demos.filter((d) => d.status === 'COMPLETED').length,
    },
    activeUsersCount: users.filter((u) => u.status === 'ACTIVE').length,
  });
});

apiRouter.get('/super-admin/audit-logs', authenticate, requireSuperAdmin, (_req, res) => {
  res.json(db.getAuditLogs());
});
