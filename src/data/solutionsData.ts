export interface SolutionItem {
  id: string;
  category: 'role' | 'industry';
  title: string;
  badge: string;
  tagline: string;
  description: string;
  keyBenefits: string[];
  workflowSteps: { title: string; desc: string }[];
  metrics: { label: string; value: string }[];
}

export const SOLUTIONS_DATA: SolutionItem[] = [
  {
    id: 'sales-teams',
    category: 'role',
    title: 'For Sales Teams',
    badge: 'Leads & Deals',
    tagline: 'Organize leads and move deals through pipeline stages',
    description: 'Use lead records, deal values, Kanban stages, and reports to keep sales activity organized in one CRM.',
    keyBenefits: [
      'Create, assign, and convert leads',
      'Track deals by stage and value',
      'Review win rate, lead source conversion, and revenue reports'
    ],
    workflowSteps: [
      { title: 'Create a lead', desc: 'Record the lead and its source.' },
      { title: 'Assign and follow up', desc: 'Assign the lead and track tasks or calls.' },
      { title: 'Convert', desc: 'Convert the lead into a customer and deal.' }
    ],
    metrics: [
      { label: 'Lead and deal records', value: 'Available' },
      { label: 'Illustrative workflow', value: 'Demo data' }
    ]
  },
  {
    id: 'call-centers',
    category: 'role',
    title: 'For Call-Center Operations',
    badge: 'Call Logging',
    tagline: 'Keep call logs with lead and customer records',
    description: 'WordbitX supports call logging today. Live calling, telephony providers, call queues, and call recording are not available yet.',
    keyBenefits: [
      'Log calls against leads or customers',
      'Review call entries in activity history',
      'Use tasks to track follow-ups'
    ],
    workflowSteps: [
      { title: 'Log a call', desc: 'Record call details after a conversation.' },
      { title: 'Link the record', desc: 'Associate the entry with a lead or customer.' },
      { title: 'Plan follow-up', desc: 'Create a task if another action is needed.' }
    ],
    metrics: [
      { label: 'Call logging', value: 'Available' },
      { label: 'Live telephony', value: 'Coming soon' }
    ]
  },
  {
    id: 'customer-support',
    category: 'role',
    title: 'For Customer-Facing Teams',
    badge: 'Tasks & Activities',
    tagline: 'Track follow-ups and customer activity',
    description: 'Use customer records, tasks, calls, notes, and the activity timeline to keep track of customer interactions. Support tickets and SLA timers are not available yet.',
    keyBenefits: [
      'Review customer and company detail views',
      'Track tasks, call logs, notes, and activities',
      'Support tickets and SLA timers — Coming soon'
    ],
    workflowSteps: [
      { title: 'Open a record', desc: 'Review customer or company details.' },
      { title: 'Record activity', desc: 'Add a note, call log, or activity.' },
      { title: 'Create a task', desc: 'Track a follow-up action.' }
    ],
    metrics: [
      { label: 'Customer records and tasks', value: 'Available' },
      { label: 'Support tickets', value: 'Coming soon' }
    ]
  },
  {
    id: 'agencies',
    category: 'industry',
    title: 'For Agencies',
    badge: 'Organizations',
    tagline: 'Switch between organization workspaces',
    description: 'Create organizations and switch between them. Organization roles and audit logs are available; client-specific agency features are not promised here.',
    keyBenefits: [
      'Create and switch organizations',
      'Invite team members and assign organization roles',
      'Review audit logs in settings'
    ],
    workflowSteps: [
      { title: 'Create an organization', desc: 'Set up a separate organization workspace.' },
      { title: 'Invite members', desc: 'Choose an organization role for each member.' },
      { title: 'Switch workspace', desc: 'Move between organizations as needed.' }
    ],
    metrics: [
      { label: 'Organization switching', value: 'Available' },
      { label: 'Illustrative workflow', value: 'Demo data' }
    ]
  },
  {
    id: 'real-estate',
    category: 'industry',
    title: 'For Real Estate Teams',
    badge: 'CRM Basics',
    tagline: 'Organize inquiries, follow-ups, and deal stages',
    description: 'Use the CRM’s general lead, customer, task, and deal features to organize a sales process. Property-specific tools and integrations are not available yet.',
    keyBenefits: [
      'Track lead sources and assigned owners',
      'Create follow-up tasks',
      'Move deals through Kanban stages'
    ],
    workflowSteps: [
      { title: 'Add an inquiry', desc: 'Create a lead and record its source.' },
      { title: 'Track follow-up', desc: 'Assign the lead and create a task.' },
      { title: 'Manage the deal', desc: 'Create a deal and move it through stages.' }
    ],
    metrics: [
      { label: 'General CRM features', value: 'Available' },
      { label: 'Property-specific tools', value: 'Coming soon' }
    ]
  },
  {
    id: 'enterprise',
    category: 'industry',
    title: 'For Organizations',
    badge: 'Roles & Settings',
    tagline: 'Manage organization members and settings',
    description: 'Invite members, assign one of the available organization roles, and review audit logs. Compliance certifications and enterprise service-level commitments are not claimed.',
    keyBenefits: [
      'Organization Owner, Admin, Sales Manager, Sales Agent, and Viewer roles',
      'Organization profile and permission settings',
      'Audit logs and API keys in settings'
    ],
    workflowSteps: [
      { title: 'Invite a member', desc: 'Add a team member to the organization.' },
      { title: 'Set a role', desc: 'Choose an available organization role.' },
      { title: 'Review activity', desc: 'Use audit logs in settings.' }
    ],
    metrics: [
      { label: 'Organization roles', value: 'Available' },
      { label: 'Audit logs', value: 'Available' }
    ]
  }
];
