export interface FaqItem {
  id: string;
  category: 'General' | 'Sales & CRM' | 'Telephony' | 'Security & Tech';
  question: string;
  answer: string;
}

export const FAQ_DATA: FaqItem[] = [
  {
    id: 'faq-1',
    category: 'General',
    question: 'What is WordbitX CRM?',
    answer: 'WordbitX CRM helps teams manage leads, deals, customers, companies, tasks, call logs, team access, and sales reports in organization workspaces.'
  },
  {
    id: 'faq-2',
    category: 'General',
    question: 'Is there a demo?',
    answer: 'Yes. Demo accounts are available from the sign-in page, and the public homepage previews use clearly labeled demo data.'
  },
  {
    id: 'faq-3',
    category: 'Sales & CRM',
    question: 'How can I manage leads and deals?',
    answer: 'Create and update leads, track their sources, assign them to team members, and convert them to customers and deals. Deals can be moved between Kanban stages and have a value.'
  },
  {
    id: 'faq-4',
    category: 'Telephony',
    question: 'Does WordbitX make real phone calls?',
    answer: 'Not today. WordbitX supports call logging against leads and customers. Telephony integrations are planned for a future release.'
  },
  {
    id: 'faq-5',
    category: 'General',
    question: 'Does WordbitX have AI?',
    answer: 'Not yet. AI assistance, lead scoring, and sentiment analysis are not currently available.'
  },
  {
    id: 'faq-6',
    category: 'Security & Tech',
    question: 'Can I use multiple workspaces and assign roles?',
    answer: 'Yes. You can switch organizations or create one. Organization roles are Organization Owner, Admin, Sales Manager, Sales Agent, and Viewer. Platform Super Admin is a separate role.'
  },
  {
    id: 'faq-7',
    category: 'Sales & CRM',
    question: 'What do the reports show?',
    answer: 'Reports include win rate, lead source conversion, revenue, and deals by stage. Homepage report previews are labeled as sample data.'
  },
  {
    id: 'faq-8',
    category: 'Security & Tech',
    question: 'Which integrations are available?',
    answer: 'REST API and Webhooks are available in settings. Other advertised email, calendar, messaging, and telephony integrations are coming soon.'
  }
];
