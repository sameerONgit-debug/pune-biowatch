import React from 'react';

export function IUCNBadge({ status }) {
  const styles = {
    'Critically Endangered': 'bg-red-100 text-red-800 border-red-300',
    Endangered: 'bg-orange-100 text-orange-800 border-orange-300',
    Vulnerable: 'bg-amber-100 text-amber-800 border-amber-300',
    'Near Threatened': 'bg-yellow-100 text-yellow-800 border-yellow-300',
    'Least Concern': 'bg-emerald-100 text-emerald-800 border-emerald-300',
  };

  const style = styles[status] || 'bg-slate-100 text-slate-800 border-slate-300';

  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold border ${style}`}>
      <span className="w-1.5 h-1.5 rounded-full mr-1.5 bg-current opacity-70"></span>
      {status}
    </span>
  );
}

export function SeverityBadge({ severity }) {
  const styles = {
    Critical: 'bg-red-50 text-red-700 border-red-200 ring-1 ring-red-400/20',
    High: 'bg-orange-50 text-orange-700 border-orange-200 ring-1 ring-orange-400/20',
    Moderate: 'bg-amber-50 text-amber-700 border-amber-200 ring-1 ring-amber-400/20',
    Medium: 'bg-amber-50 text-amber-700 border-amber-200 ring-1 ring-amber-400/20',
    Low: 'bg-emerald-50 text-emerald-700 border-emerald-200 ring-1 ring-emerald-400/20',
    Advisory: 'bg-blue-50 text-blue-700 border-blue-200 ring-1 ring-blue-400/20',
  };

  const style = styles[severity] || 'bg-slate-50 text-slate-700 border-slate-200';

  return (
    <span className={`inline-flex items-center px-2 py-0.5 rounded-md text-xs font-semibold uppercase tracking-wider border ${style}`}>
      {severity}
    </span>
  );
}

export function StatusBadge({ status }) {
  const styles = {
    Pending: 'bg-rose-100 text-rose-800 border-rose-200',
    Reviewed: 'bg-amber-100 text-amber-800 border-amber-200',
    'Action Taken': 'bg-emerald-100 text-emerald-800 border-emerald-200',
    Verified: 'bg-emerald-100 text-emerald-800 border-emerald-200',
    'Community Submitted': 'bg-sky-100 text-sky-800 border-sky-200',
  };

  const style = styles[status] || 'bg-slate-100 text-slate-800 border-slate-200';

  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${style}`}>
      <span className="w-1.5 h-1.5 rounded-full mr-1.5 bg-current"></span>
      {status}
    </span>
  );
}
