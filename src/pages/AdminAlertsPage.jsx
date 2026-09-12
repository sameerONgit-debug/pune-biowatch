import React from 'react';
import AlertTable from '../components/admin/AlertTable';
import { ShieldAlert, Download, RefreshCw, CheckCircle2 } from 'lucide-react';

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
    <div className="space-y-8">
      {/* Internal Tool Header */}
      <div className="bg-slate-900 text-white p-6 rounded-2xl border border-slate-800 shadow-md flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <div className="flex items-center space-x-2 text-xs font-mono uppercase text-emerald-400 font-bold mb-1">
            <ShieldAlert className="w-4 h-4 text-emerald-400" />
            <span>Official Administrative Console • Pune Forest & Municipal Cell</span>
          </div>
          <h1 className="text-2xl font-extrabold tracking-tight">
            Ecological Threshold Directives & Incident Dispatch Desk
          </h1>
          <p className="text-xs text-slate-400 mt-1 max-w-2xl">
            Automated alerts synthesized from real-time meteorological sensor feeds, river flow monitors, and satellite vegetation reflectance thresholds across Pune district.
          </p>
        </div>

        <div className="flex items-center space-x-3">
          <button
            onClick={handleExportCSV}
            className="flex items-center space-x-2 px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold border border-slate-700 transition-colors shadow-sm"
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
