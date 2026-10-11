export const DEMO_LEADS = [
  { name: 'Olivia Chen', initials: 'OC', company: 'Cortexa Health', source: 'Referral', status: 'Qualified', value: 42000 },
  { name: 'Marcus Reed', initials: 'MR', company: 'Northpeak Cloud', source: 'Website', status: 'Contacted', value: 78000 },
  { name: 'Priya Nair', initials: 'PN', company: 'Omni Workspace', source: 'Partner', status: 'Proposal', value: 45000 },
] as const;

export const DEMO_DEALS = [
  { company: 'Cortexa Health', title: 'Regional rollout', value: 42000, stage: 'Discovery', owner: 'OC', age: '4 days' },
  { company: 'Northpeak Cloud', title: 'Cloud workspace', value: 78000, stage: 'Proposal', owner: 'MR', age: '9 days' },
  { company: 'Omni Workspace', title: 'Annual platform', value: 45000, stage: 'Negotiation', owner: 'PN', age: '2 days' },
] as const;

export const DEMO_CALLS = [
  { name: 'Olivia Chen', company: 'Cortexa Health', time: '10:42 AM', duration: '08:24', note: 'Reviewed regional rollout; send revised seat estimate by Thursday.' },
  { name: 'Marcus Reed', company: 'Northpeak Cloud', time: 'Yesterday', duration: '05:16', note: 'Confirmed security review attendees and next-step timeline.' },
  { name: 'Priya Nair', company: 'Omni Workspace', time: 'Mon, 2:18 PM', duration: '12:03', note: 'Walked through annual terms; procurement reviewing proposal.' },
] as const;

export const DEMO_TASKS = [
  { title: 'Send revised seat estimate', due: 'Today · 2:30 PM', owner: 'Olivia Chen', completed: false },
  { title: 'Share security overview', due: 'Today · 4:00 PM', owner: 'Marcus Reed', completed: false },
  { title: 'Prepare renewal options', due: 'Tomorrow · 11:00 AM', owner: 'Priya Nair', completed: true },
] as const;

export const DEMO_REVENUE = [
  { month: 'May', revenue: 28 },
  { month: 'Jun', revenue: 35 },
  { month: 'Jul', revenue: 32 },
  { month: 'Aug', revenue: 48 },
  { month: 'Sep', revenue: 57 },
  { month: 'Oct', revenue: 72 },
] as const;

export const DEMO_REPORT_METRICS = {
  totalWonRevenue: 272_000,
  monthlyWonRevenue: 72_000,
  dealsWonThisMonth: 5,
  winRate: 28.4,
  openPipeline: 384_500,
  openDeals: 42,
  newLeadsThisWeek: 36,
} as const;

export const DEMO_SOURCES = [
  { name: 'Referral', leads: 10, rate: 38 },
  { name: 'Website', leads: 12, rate: 24 },
  { name: 'Partner', leads: 8, rate: 32 },
  { name: 'Outbound', leads: 6, rate: 17 },
] as const;

export const DEMO_STAGES = [
  { name: 'Discovery', count: 18, amount: '$186k', width: '100%' },
  { name: 'Qualified', count: 14, amount: '$148k', width: '80%' },
  { name: 'Proposal', count: 9, amount: '$104k', width: '61%' },
  { name: 'Negotiation', count: 5, amount: '$72k', width: '43%' },
  { name: 'Won', count: 5, amount: '$72k', width: '28%' },
] as const;

export const DEMO_ROLES = ['Owner', 'Admin', 'Sales Manager', 'Sales Agent', 'Viewer'] as const;

export const DEMO_PERMISSIONS = [
  { action: 'Manage workspace', values: ['Full access', 'Full access', '—', '—', '—'] },
  { action: 'Manage team', values: ['Full access', 'Full access', 'Team', '—', '—'] },
  { action: 'Edit deals', values: ['Full access', 'Full access', 'Team', 'Assigned', '—'] },
  { action: 'View reports', values: ['Full access', 'Full access', 'Team', 'Assigned', 'Read only'] },
] as const;

export const DEMO_PALETTE_RECORDS = [
  'Olivia Chen · Cortexa Health',
  'Marcus Reed · Northpeak Cloud',
  'Priya Nair · Omni Workspace',
] as const;
