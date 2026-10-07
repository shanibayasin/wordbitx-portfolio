import React from 'react';

interface BadgeProps {
  children: React.ReactNode;
  variant?: 'blue' | 'indigo' | 'emerald' | 'amber' | 'rose' | 'purple' | 'slate';
  size?: 'sm' | 'md';
}

export const Badge: React.FC<BadgeProps> = ({ children, variant = 'slate', size = 'sm' }) => {
  const variantStyles = {
    blue: 'bg-blue-50 text-blue-700 border-blue-200',
    indigo: 'bg-indigo-50 text-indigo-700 border-indigo-200',
    emerald: 'bg-emerald-50 text-emerald-700 border-emerald-200',
    amber: 'bg-amber-50 text-amber-700 border-amber-200',
    rose: 'bg-rose-50 text-rose-700 border-rose-200',
    purple: 'bg-purple-50 text-purple-700 border-purple-200',
    slate: 'bg-slate-100 text-slate-700 border-slate-200',
  };

  const sizeStyles = {
    sm: 'text-xs px-2 py-0.5',
    md: 'text-sm px-2.5 py-1',
  };

  return (
    <span className={`inline-flex items-center font-medium rounded-full border ${variantStyles[variant]} ${sizeStyles[size]}`}>
      {children}
    </span>
  );
};

export const StatusBadge: React.FC<{ status: string }> = ({ status }) => {
  switch (status.toLowerCase()) {
    case 'new':
      return <Badge variant="blue">New</Badge>;
    case 'contacted':
      return <Badge variant="indigo">Contacted</Badge>;
    case 'qualified':
      return <Badge variant="emerald">Qualified</Badge>;
    case 'proposal':
      return <Badge variant="amber">Proposal</Badge>;
    case 'negotiation':
      return <Badge variant="purple">Negotiation</Badge>;
    case 'won':
    case 'active':
    case 'completed':
      return <Badge variant="emerald">{status}</Badge>;
    case 'lost':
    case 'suspended':
    case 'cancelled':
      return <Badge variant="rose">{status}</Badge>;
    default:
      return <Badge variant="slate">{status}</Badge>;
  }
};
