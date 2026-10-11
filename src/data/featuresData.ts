export interface FeatureDetail {
  id: string;
  category: 'Sales' | 'Operations' | 'Intelligence' | 'Platform';
  title: string;
  tagline: string;
  description: string;
  highlights: string[];
  useCase: string;
  ctaText: string;
  status: 'Available' | 'Coming soon';
}

export const FEATURES_DATA: FeatureDetail[] = [
  {
    id: 'lead-management',
    category: 'Sales',
    title: 'Lead Management',
    tagline: 'Create, assign, track, and convert leads',
    description: 'Manage lead records, keep their sources visible, assign them to team members, and convert leads into customers and deals.',
    highlights: [
      'Create, edit, assign, and delete lead records',
      'Track lead sources',
      'Convert a lead into a customer and deal'
    ],
    useCase: 'Illustrative example: a team reviews a lead, assigns an owner, and converts it when it is ready to become a customer and deal.',
    ctaText: 'Explore Leads',
    status: 'Available'
  },
  {
    id: 'sales-pipeline',
    category: 'Sales',
    title: 'Deal Pipeline',
    tagline: 'Move deals through Kanban stages',
    description: 'View deals on a Kanban pipeline, track their value, and move them between stages.',
    highlights: [
      'View deals grouped by pipeline stage',
      'Track deal values',
      'Move deals to another stage'
    ],
    useCase: 'Illustrative example: a sales agent moves a deal from one pipeline stage to the next and reviews its value.',
    ctaText: 'View Pipeline',
    status: 'Available'
  },
  {
    id: 'contact-management',
    category: 'Sales',
    title: 'Customers & Companies',
    tagline: 'Keep customer and company records together',
    description: 'Manage customer and company records, with detail views for reviewing their information and related activity.',
    highlights: [
      'Create and manage customer records',
      'Manage company records',
      'Review record details and activity history'
    ],
    useCase: 'Illustrative example: a team member opens a customer or company record to review its details and activity history.',
    ctaText: 'Explore Records',
    status: 'Available'
  },
  {
    id: 'call-center',
    category: 'Operations',
    title: 'Call Logging',
    tagline: 'Keep call details with customer records',
    description: 'Log calls against leads or customers and review them in the activity history. WordbitX does not place or record live calls.',
    highlights: [
      'Create call log entries',
      'Associate a call log with a lead or customer',
      'Review calls in the activity history'
    ],
    useCase: 'Illustrative example: after a phone conversation outside WordbitX, a team member records its details against a lead.',
    ctaText: 'Explore Call Logs',
    status: 'Available'
  },
  {
    id: 'customer-support',
    category: 'Operations',
    title: 'Support Tickets',
    tagline: 'Support desk features are not available yet',
    description: 'Support tickets, ticket assignments, and SLA timers are planned for a future release.',
    highlights: [
      'Support ticket management — Coming soon',
      'Ticket assignment — Coming soon',
      'SLA timers — Coming soon'
    ],
    useCase: 'Coming soon: support ticket workflows are not part of the current CRM.',
    ctaText: 'Coming soon',
    status: 'Coming soon'
  },
  {
    id: 'automation',
    category: 'Operations',
    title: 'Workflow Rules',
    tagline: 'Create automation rules and toggle them',
    description: 'Create workflow automation rules and turn each rule on or off in the CRM.',
    highlights: [
      'Create workflow rules',
      'Toggle workflow rules on or off'
    ],
    useCase: 'Illustrative example: an administrator creates a workflow rule and enables it for the organization.',
    ctaText: 'Explore Workflows',
    status: 'Available'
  },
  {
    id: 'ai-crm',
    category: 'Intelligence',
    title: 'AI Features',
    tagline: 'AI assistance is not available yet',
    description: 'AI summaries, recommendations, email drafting, lead scoring, and sentiment analysis are not currently available.',
    highlights: [
      'AI lead summaries — Coming soon',
      'Next-best-action suggestions — Coming soon',
      'AI email drafts — Coming soon'
    ],
    useCase: 'Coming soon: AI-generated CRM content is not part of the current product.',
    ctaText: 'Coming soon',
    status: 'Coming soon'
  },
  {
    id: 'analytics',
    category: 'Intelligence',
    title: 'Reports',
    tagline: 'Review sales outcomes and lead sources',
    description: 'View win rate, lead source conversion, revenue, and deals by stage in the Reports area.',
    highlights: [
      'Win rate',
      'Lead source conversion',
      'Revenue and deals by stage'
    ],
    useCase: 'Illustrative example: a manager reviews report metrics for the selected date range.',
    ctaText: 'Explore Reports',
    status: 'Available'
  },
  {
    id: 'multi-workspace',
    category: 'Platform',
    title: 'Organizations, Roles & Audit Logs',
    tagline: 'Switch organizations and manage organization access',
    description: 'Switch between organizations or create a new organization. Invite team members, assign organization roles, and review audit logs.',
    highlights: [
      'Organization Owner, Admin, Sales Manager, Sales Agent, and Viewer roles',
      'Organization switching and creation',
      'Audit logs in settings'
    ],
    useCase: 'Illustrative example: an organization owner invites a teammate and assigns an organization role.',
    ctaText: 'Explore the Demo',
    status: 'Available'
  }
];
