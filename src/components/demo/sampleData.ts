export const DEMO_LEADS = [
  { name: 'Olivia Chen', initials: 'OC', company: 'Northstar Health', source: 'Referral', status: 'Qualified', value: 24500 },
  { name: 'Marcus Reed', initials: 'MR', company: 'Fieldnote Labs', source: 'Website', status: 'Contacted', value: 18200 },
  { name: 'Priya Nair', initials: 'PN', company: 'Cedar & Finch', source: 'Partner', status: 'Proposal', value: 32750 },
  { name: 'Theo Martin', initials: 'TM', company: 'Arcwell Systems', source: 'Outbound', status: 'New', value: 12800 },
] as const;

export const DEMO_DEALS = [
  { company: 'Northstar Health', title: 'Regional rollout', value: 24500, stage: 'Discovery', owner: 'OC', age: '4 days' },
  { company: 'Fieldnote Labs', title: 'Team workspace', value: 18200, stage: 'Proposal', owner: 'MR', age: '9 days' },
  { company: 'Cedar & Finch', title: 'Annual platform', value: 32750, stage: 'Negotiation', owner: 'PN', age: '2 days' },
  { company: 'Arcwell Systems', title: 'Service expansion', value: 12800, stage: 'Qualified', owner: 'TM', age: '6 days' },
] as const;

export const DEMO_CALLS = [
  { name: 'Olivia Chen', company: 'Northstar Health', time: '10:42 AM', duration: '08:24', note: 'Reviewed regional rollout; send revised seat estimate by Thursday.' },
  { name: 'Marcus Reed', company: 'Fieldnote Labs', time: 'Yesterday', duration: '05:16', note: 'Confirmed security review attendees and next-step timeline.' },
  { name: 'Priya Nair', company: 'Cedar & Finch', time: 'Mon, 2:18 PM', duration: '12:03', note: 'Walked through annual terms; procurement reviewing proposal.' },
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
  winRate: 32.6,
  closedDeals: 46,
  qualifiedLeads: 48,
  openPipeline: 286_400,
  activeDeals: 24,
  newLeadsThisMonth: 38,
} as const;

export const DEMO_SOURCES = [
  { name: 'Referral', leads: 42, rate: 38 },
  { name: 'Website', leads: 68, rate: 24 },
  { name: 'Partner', leads: 31, rate: 32 },
  { name: 'Outbound', leads: 54, rate: 17 },
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
  'Olivia Chen · Northstar Health',
  'Marcus Reed · Fieldnote Labs',
  'Priya Nair · Cedar & Finch',
  'Theo Martin · Arcwell Systems',
] as const;
