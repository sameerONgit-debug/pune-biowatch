import React from 'react';

export function IUCNBadge({ status }) {
  const styles = {
    'Critically Endangered': 'bg-[#351f20] text-[#ff9d8a] border-[#743e39]',
    Endangered: 'bg-[#332b1d] text-[#ffd184] border-[#6b552e]',
    Vulnerable: 'bg-[#332b1d] text-[#ffd184] border-[#6b552e]',
    'Near Threatened': 'bg-[#26301e] text-[#d9f99d] border-[#536b35]',
    'Least Concern': 'bg-[#102d22] text-[#9ee7b8] border-[#285442]',
  };
  const style = styles[status] || 'bg-[#0e281f] text-[#9db5a8] border-[#1b3a2e]';
  return <span className={`inline-flex items-center rounded-full border px-2 py-1 text-[9px] font-bold leading-none ${style}`}><span className="mr-1.5 h-1.5 w-1.5 rounded-full bg-current opacity-70" />{status}</span>;
}

export function SeverityBadge({ severity }) {
  const styles = {
    Critical: 'bg-[#351f20] text-[#ff9d8a] border-[#743e39]',
    High: 'bg-[#332b1d] text-[#ffd184] border-[#6b552e]',
    Moderate: 'bg-[#26301e] text-[#d9f99d] border-[#536b35]',
    Medium: 'bg-[#26301e] text-[#d9f99d] border-[#536b35]',
    Low: 'bg-[#102d22] text-[#9ee7b8] border-[#285442]',
    Advisory: 'bg-[#102c34] text-[#73e5cf] border-[#245969]',
  };
  const style = styles[severity] || 'bg-[#0e281f] text-[#9db5a8] border-[#1b3a2e]';
  return <span className={`inline-flex items-center rounded-full border px-2 py-1 text-[9px] font-extrabold uppercase tracking-[0.08em] leading-none ${style}`}>{severity}</span>;
}

export function StatusBadge({ status }) {
  const styles = {
    Pending: 'bg-[#351f20] text-[#ff9d8a] border-[#743e39]',
    Reviewed: 'bg-[#332b1d] text-[#ffd184] border-[#6b552e]',
    'Action Taken': 'bg-[#102d22] text-[#9ee7b8] border-[#285442]',
    Verified: 'bg-[#102d22] text-[#9ee7b8] border-[#285442]',
    'Community Submitted': 'bg-[#102c34] text-[#73e5cf] border-[#245969]',
  };
  const style = styles[status] || 'bg-[#0e281f] text-[#9db5a8] border-[#1b3a2e]';
  return <span className={`inline-flex items-center rounded-full border px-2.5 py-1 text-[9px] font-bold leading-none ${style}`}><span className="mr-1.5 h-1.5 w-1.5 rounded-full bg-current" />{status}</span>;
}
