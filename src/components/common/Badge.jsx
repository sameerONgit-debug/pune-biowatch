import React from 'react';

export function IUCNBadge({ status }) {
  const styles = {
    'Critically Endangered': 'bg-[#fff0ec] text-[#ae4d40] border-[#f1c5bb]',
    Endangered: 'bg-[#fff7e8] text-[#9d6b25] border-[#efd9a8]',
    Vulnerable: 'bg-[#fff9e9] text-[#9d6b25] border-[#f0dfb9]',
    'Near Threatened': 'bg-[#f5f7e8] text-[#6e7e37] border-[#dfe5ba]',
    'Least Concern': 'bg-[#edf8ef] text-[#327150] border-[#c8e4ce]',
  };

  const style = styles[status] || 'bg-[#f2f6f1] text-[#5f7065] border-[#dfe8df]';

  return (
    <span className={`inline-flex items-center rounded-full border px-2 py-1 text-[9px] font-bold leading-none ${style}`}>
      <span className="mr-1.5 h-1.5 w-1.5 rounded-full bg-current opacity-70" />
      {status}
    </span>
  );
}

export function SeverityBadge({ severity }) {
  const styles = {
    Critical: 'bg-[#fff0ec] text-[#ae4d40] border-[#f1c5bb]',
    High: 'bg-[#fff7e8] text-[#9d6b25] border-[#efd9a8]',
    Moderate: 'bg-[#f5f8eb] text-[#6b7b36] border-[#dce6ba]',
    Medium: 'bg-[#f5f8eb] text-[#6b7b36] border-[#dce6ba]',
    Low: 'bg-[#edf8ef] text-[#327150] border-[#c8e4ce]',
    Advisory: 'bg-[#eef5fb] text-[#3d6f91] border-[#cddfeb]',
  };

  const style = styles[severity] || 'bg-[#f2f6f1] text-[#5f7065] border-[#dfe8df]';

  return (
    <span className={`inline-flex items-center rounded-full border px-2 py-1 text-[9px] font-extrabold uppercase tracking-[0.08em] leading-none ${style}`}>
      {severity}
    </span>
  );
}

export function StatusBadge({ status }) {
  const styles = {
    Pending: 'bg-[#fff0ec] text-[#ae4d40] border-[#f1c5bb]',
    Reviewed: 'bg-[#fff7e8] text-[#9d6b25] border-[#efd9a8]',
    'Action Taken': 'bg-[#edf8ef] text-[#327150] border-[#c8e4ce]',
    Verified: 'bg-[#edf8ef] text-[#327150] border-[#c8e4ce]',
    'Community Submitted': 'bg-[#eef5fb] text-[#3d6f91] border-[#cddfeb]',
  };

  const style = styles[status] || 'bg-[#f2f6f1] text-[#5f7065] border-[#dfe8df]';

  return (
    <span className={`inline-flex items-center rounded-full border px-2.5 py-1 text-[9px] font-bold leading-none ${style}`}>
      <span className="mr-1.5 h-1.5 w-1.5 rounded-full bg-current" />
      {status}
    </span>
  );
}
