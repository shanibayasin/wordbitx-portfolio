export interface IntegrationDetail {
  id: string;
  name: string;
  category: 'Communication' | 'Telephony' | 'Sales' | 'Productivity' | 'Developer' | 'Automation';
  tagline: string;
  description: string;
  status: 'Available' | 'Coming soon';
  iconColor: string;
  badge?: string;
  docsUrl?: string;
}

export const INTEGRATIONS_DATA: IntegrationDetail[] = [
  {
    id: 'gmail',
    name: 'Gmail & Google Workspace',
    category: 'Communication',
    tagline: 'Email integration',
    description: 'Not connected to WordbitX yet. Email integrations are planned.',
    status: 'Coming soon',
    iconColor: 'bg-red-500/10 text-red-600 dark:text-red-400'
  },
  {
    id: 'outlook',
    name: 'Microsoft Outlook & 365',
    category: 'Communication',
    tagline: 'Email integration',
    description: 'Not connected to WordbitX yet. Email integrations are planned.',
    status: 'Coming soon',
    iconColor: 'bg-blue-500/10 text-blue-600 dark:text-blue-400'
  },
  {
    id: 'whatsapp',
    name: 'WhatsApp Business API',
    category: 'Communication',
    tagline: 'Messaging integration',
    description: 'Not connected to WordbitX yet. Messaging integrations are planned.',
    status: 'Coming soon',
    iconColor: 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400'
  },
  {
    id: 'twilio',
    name: 'Twilio Voice & SMS',
    category: 'Telephony',
    tagline: 'Telephony integration',
    description: 'Not connected to WordbitX yet. Telephony integrations are planned.',
    status: 'Coming soon',
    iconColor: 'bg-rose-500/10 text-rose-600 dark:text-rose-400'
  },
  {
    id: 'vonage',
    name: 'Vonage Communications API',
    category: 'Telephony',
    tagline: 'Telephony integration',
    description: 'Not connected to WordbitX yet. Telephony integrations are planned.',
    status: 'Coming soon',
    iconColor: 'bg-purple-500/10 text-purple-600 dark:text-purple-400'
  },
  {
    id: 'sip-pbx',
    name: 'Custom SIP & On-Premises PBX',
    category: 'Telephony',
    tagline: 'Telephony integration',
    description: 'Not connected to WordbitX yet. Telephony integrations are planned.',
    status: 'Coming soon',
    iconColor: 'bg-slate-500/10 text-slate-600 dark:text-slate-400'
  },
  {
    id: 'smtp-imap',
    name: 'Custom SMTP & IMAP Relay',
    category: 'Communication',
    tagline: 'Email integration',
    description: 'Not connected to WordbitX yet. Email integrations are planned.',
    status: 'Coming soon',
    iconColor: 'bg-amber-500/10 text-amber-600 dark:text-amber-400'
  },
  {
    id: 'webhooks',
    name: 'Webhooks',
    category: 'Developer',
    tagline: 'Webhook settings',
    description: 'Configure the webhook secret in WordbitX settings.',
    status: 'Available',
    iconColor: 'bg-teal-500/10 text-teal-600 dark:text-teal-400'
  },
  {
    id: 'rest-api',
    name: 'WordbitX REST API',
    category: 'Developer',
    tagline: 'API keys in settings',
    description: 'Manage API keys in WordbitX settings to use the available REST API.',
    status: 'Available',
    iconColor: 'bg-emerald-500/10 text-emerald-700 dark:text-emerald-300'
  },
  {
    id: 'google-calendar',
    name: 'Google Calendar & Meet',
    category: 'Productivity',
    tagline: 'Calendar integration',
    description: 'Not connected to WordbitX yet. Calendar integrations are planned.',
    status: 'Coming soon',
    iconColor: 'bg-teal-500/10 text-teal-700 dark:text-teal-300'
  },
  {
    id: 'stripe',
    name: 'Stripe Billing & Invoicing',
    category: 'Sales',
    tagline: 'Billing integration',
    description: 'Not connected to WordbitX yet. Billing and invoicing integrations are planned.',
    status: 'Coming soon',
    iconColor: 'bg-emerald-600/10 text-emerald-800 dark:text-emerald-300'
  },
  {
    id: 'slack',
    name: 'Slack',
    category: 'Productivity',
    tagline: 'Messaging integration',
    description: 'Not connected to WordbitX yet. Messaging integrations are planned.',
    status: 'Coming soon',
    iconColor: 'bg-pink-500/10 text-pink-600 dark:text-pink-400'
  }
];
