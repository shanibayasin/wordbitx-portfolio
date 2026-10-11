export interface NavItem {
  name: string;
  href: string;
  description?: string;
  badge?: string;
}

export interface MegaMenuCategory {
  title: string;
  items: NavItem[];
}

export const PRODUCT_MENU: MegaMenuCategory[] = [
  {
    title: 'Core CRM & Sales',
    items: [
      { name: 'CRM Overview', href: '/#customer-operations-title', description: 'Leads, deals, call logs, tasks, team, and reports' },
      { name: 'Lead Management', href: '/#lead-management', description: 'Track lead sources, assign leads, and convert records' },
      { name: 'Deal Pipeline', href: '/#deal-pipeline', description: 'Move deals through Kanban stages and track values' },
      { name: 'Customers & Companies', href: '/app/customers', description: 'Manage customer and company records' }
    ]
  },
  {
    title: 'Team & Operations',
    items: [
      { name: 'Call Logging', href: '/#call-logging', description: 'Log calls against leads and customers' },
      { name: 'Tasks & Follow-ups', href: '/#tasks-follow-ups', description: 'Create and track follow-up tasks' },
      { name: 'Workflow Automation', href: '/app/workflows', description: 'Create automation rules and toggle them' },
      { name: 'Customer Support', href: '/', description: 'Support desk features are coming soon', badge: 'Coming soon' },
      { name: 'AI CRM Assistant', href: '/', description: 'AI features are not available yet', badge: 'Coming soon' }
    ]
  }
];

export const SOLUTIONS_MENU: MegaMenuCategory[] = [
  {
    title: 'By Team',
    items: [
      { name: 'Sales Teams', href: '/#deal-pipeline', description: 'Organize leads and deals in a Kanban pipeline' },
      { name: 'Call-Center Operations', href: '/#call-logging', description: 'Keep call logs with lead and customer records' },
      { name: 'Support Desk', href: '/', description: 'Support desk features are coming soon', badge: 'Coming soon' },
      { name: 'Agencies', href: '/#security', description: 'Switch between separate organization workspaces' }
    ]
  },
  {
    title: 'By Industry & Scale',
    items: [
      { name: 'Real Estate', href: '/solutions', description: 'Organize leads, customers, and deal stages' },
      { name: 'E-commerce & Retail', href: '/solutions', description: 'Organize customer and company records' },
      { name: 'Growing Businesses', href: '/solutions', description: 'Keep leads, deals, tasks, and reports together' },
      { name: 'Enterprise Operations', href: '/#security', description: 'Use organization workspaces, roles, and audit logs' }
    ]
  }
];

export const RESOURCES_MENU: MegaMenuCategory[] = [
  {
    title: 'Knowledge & Guidance',
    items: [
      { name: 'CRM Implementation Guide', href: '/resources#crm-guide', description: 'How to transition your team to WordbitX smoothly' },
      { name: 'Sales Velocity Playbook', href: '/resources#sales-guide', description: 'Proven pipeline stages and qualification models' },
      { name: 'Automation Library', href: '/resources#automation-guide', description: 'Pre-built blueprints for lead distribution & SLA reminders' },
      { name: 'AI Sales Playbook', href: '/resources#ai-guide', description: 'Using generative assistance for realistic high-intent follow-ups' }
    ]
  },
  {
    title: 'Support & Updates',
    items: [
      { name: 'Product Documentation', href: '/resources#docs', description: 'API reference, webhooks and developer guides' },
      { name: "What's New", href: '/updates', description: 'Recent releases and platform improvements' },
      { name: 'Help Center', href: '/resources#help', description: 'Step-by-step walkthroughs for common admin tasks' },
      { name: 'Case Studies', href: '/resources#case-studies', description: 'Realistic transformation examples across diverse industries' },
      { name: 'FAQ & Architecture', href: '/#faq', description: 'Frequently asked questions on data security & pricing' }
    ]
  }
];
