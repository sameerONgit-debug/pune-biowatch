import React from 'react';
import AlertTable from '../components/admin/AlertTable';
import { Download, ShieldAlert } from 'lucide-react';

export default function AdminAlertsPage({ alerts = [], onUpdateStatus, regions = [] }) {
  const handleExportCSV = () => {
    const headers = ['ID', 'Date', 'Severity', 'Region', 'Species', 'Threshold Trigger', 'Recommended Action', 'Status'];
    const rows = alerts.map((a) => [
      a.id,
      a.dateIssued,
      a.severity,
      `"${a.regionName}"`,
      `"${a.speciesName}"`,
      `"${a.thresholdExceeded.replace(/"/g, '""')}"`,
      `"${a.recommendedAction.replace(/"/g, '""')}"`,
      a.status,
    ]);

    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map((e) => e.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `pune_biowatch_alerts_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="space-y-10">
      {/* Internal Tool Header */}
      <div className="surface-dark flex flex-col gap-5 p-6 sm:p-8 md:flex-row md:items-center md:justify-between">
        <div>
          <div className="eyebrow !text-[#d5f36b]"><ShieldAlert className="h-3.5 w-3.5" /> Official administrative console</div>
          <h1 className="mt-2 text-2xl font-extrabold tracking-[-0.04em] text-white sm:text-3xl">
            Ecological Threshold Directives & Incident Dispatch Desk
          </h1>
          <p className="mt-3 max-w-2xl text-sm leading-6 text-emerald-50/60">
            Curated monitoring directives for review by local teams. They are not automatically generated from live sensor feeds; weather, biodiversity and imagery providers are surfaced in their dedicated views when available.
          </p>
        </div>

        <div className="flex items-center space-x-3">
          <button
            onClick={handleExportCSV}
            className="inline-flex items-center gap-2 rounded-xl bg-[#d5f36b] px-4 py-2.5 text-xs font-extrabold text-[#0b3028] transition-colors hover:bg-[#e1fb83]"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Export Directives (CSV)</span>
          </button>
        </div>
      </div>

      {/* Main Alert Table */}
      <AlertTable alerts={alerts} onUpdateStatus={onUpdateStatus} regions={regions} />
    </div>
  );
}
