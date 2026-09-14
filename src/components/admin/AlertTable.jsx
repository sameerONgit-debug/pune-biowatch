import React, { useState } from 'react';
import { SeverityBadge, StatusBadge } from '../common/Badge';
import { ShieldAlert, CheckCircle2, Clock, Eye, Filter, ArrowUpDown, FileText, Check, AlertTriangle, Building } from 'lucide-react';

export default function AlertTable({ alerts = [], onUpdateStatus, regions = [] }) {
  const [selectedSeverity, setSelectedSeverity] = useState('All');
  const [selectedStatus, setSelectedStatus] = useState('All');
  const [selectedRegion, setSelectedRegion] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeAlertDetail, setActiveAlertDetail] = useState(null);
  const [updatingId, setUpdatingId] = useState(null);

  // Filter alerts
  const filteredAlerts = alerts.filter((alert) => {
    if (selectedSeverity !== 'All' && alert.severity.toLowerCase() !== selectedSeverity.toLowerCase()) {
      return false;
    }
    if (selectedStatus !== 'All' && alert.status.toLowerCase() !== selectedStatus.toLowerCase()) {
      return false;
    }
    if (selectedRegion !== 'All' && alert.regionId !== selectedRegion) {
      return false;
    }
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      const match =
        alert.speciesName.toLowerCase().includes(q) ||
        alert.regionName.toLowerCase().includes(q) ||
        alert.recommendedAction.toLowerCase().includes(q) ||
        alert.id.toLowerCase().includes(q);
      if (!match) return false;
    }
    return true;
  });

  const handleStatusChange = async (alertId, newStatus) => {
    try {
      setUpdatingId(alertId);
      await onUpdateStatus(alertId, newStatus);
    } catch (e) {
      console.error('Failed to change status:', e);
    } finally {
      setUpdatingId(null);
    }
  };

  const criticalCount = alerts.filter((a) => a.severity === 'Critical').length;
  const pendingCount = alerts.filter((a) => a.status === 'Pending').length;
  const reviewedCount = alerts.filter((a) => a.status === 'Reviewed').length;
  const actionTakenCount = alerts.filter((a) => a.status === 'Action Taken').length;

  return (
    <div className="space-y-7">
      {/* Official Status Metrics Summary */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="metric-card flex items-center justify-between">
          <div>
            <div className="text-xs font-mono text-slate-500 uppercase">Total Active Directives</div>
            <div className="text-2xl font-bold text-slate-900 mt-1">{alerts.length}</div>
          </div>
          <div className="p-2 rounded-lg bg-[#102d22] text-[#73e5cf]">
            <ShieldAlert className="w-5 h-5" />
          </div>
        </div>

        <div className="metric-card flex items-center justify-between">
          <div>
            <div className="text-xs font-mono text-rose-600 uppercase font-semibold">Critical Thresholds</div>
            <div className="text-2xl font-bold text-rose-600 mt-1">{criticalCount}</div>
          </div>
          <div className="p-2 rounded-lg bg-[#351f20] text-[#ff9d8a]">
            <AlertTriangle className="w-5 h-5" />
          </div>
        </div>

        <div className="metric-card flex items-center justify-between">
          <div>
            <div className="text-xs font-mono text-amber-600 uppercase font-semibold">Pending Review</div>
            <div className="text-2xl font-bold text-amber-600 mt-1">{pendingCount}</div>
          </div>
          <div className="p-2 rounded-lg bg-[#332b1d] text-[#ffd184]">
            <Clock className="w-5 h-5" />
          </div>
        </div>

        <div className="metric-card flex items-center justify-between">
          <div>
            <div className="text-xs font-mono text-emerald-600 uppercase font-semibold">Action Executed</div>
            <div className="text-2xl font-bold text-emerald-600 mt-1">{actionTakenCount}</div>
          </div>
          <div className="p-2 rounded-lg bg-[#102d22] text-[#9ee7b8]">
            <CheckCircle2 className="w-5 h-5" />
          </div>
        </div>
      </div>

      {/* Internal Tool Header & Filters */}
      <div className="surface space-y-5 p-5 sm:p-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <div className="flex items-center space-x-2">
              <span className="text-xs font-mono uppercase bg-slate-800 text-slate-200 px-2 py-0.5 rounded font-bold">
                Internal Administrative Desk
              </span>
              <span className="text-xs text-slate-400 font-mono">Departmental Action Portal</span>
            </div>
            <h2 className="text-xl font-bold text-slate-900 mt-1">
              Active Ecological Risk Directives & Interventions
            </h2>
            <p className="text-xs text-slate-500">
              Auto-generated alerts triggered when Pune regional climatic and ecological indices cross critical resilience thresholds.
            </p>
          </div>

          {/* Quick Search */}
          <div className="w-full md:w-64">
            <input
              type="text"
              placeholder="Search alert by keyword..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="input-control"
            />
          </div>
        </div>

        {/* Filter Controls Bar */}
        <div className="flex flex-wrap items-center gap-3 pt-3 border-t border-slate-100 text-xs">
          <div className="flex items-center space-x-1.5 text-slate-500 font-mono font-semibold">
            <Filter className="w-3.5 h-3.5" />
            <span>Filters:</span>
          </div>

          {/* Severity filter */}
          <select
            value={selectedSeverity}
            onChange={(e) => setSelectedSeverity(e.target.value)}
            className="select-control w-auto"
          >
            <option value="All">All Severities</option>
            <option value="Critical">Critical Only</option>
            <option value="High">High Stress</option>
            <option value="Moderate">Moderate</option>
          </select>

          {/* Status filter */}
          <select
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
            className="select-control w-auto"
          >
            <option value="All">All Statuses</option>
            <option value="Pending">Pending Review</option>
            <option value="Reviewed">Reviewed</option>
            <option value="Action Taken">Action Taken</option>
          </select>

          {/* Region filter */}
          <select
            value={selectedRegion}
            onChange={(e) => setSelectedRegion(e.target.value)}
            className="select-control w-auto"
          >
            <option value="All">All Pune Sub-Regions</option>
            {regions.map((r) => (
              <option key={r.id} value={r.id}>
                {r.name}
              </option>
            ))}
          </select>

          <span className="text-slate-400 font-mono text-[11px] ml-auto">
            Showing {filteredAlerts.length} of {alerts.length} directives
          </span>
        </div>

        {/* Table View */}
        <div className="overflow-x-auto rounded-xl border border-slate-200">
          <table className="data-table w-full text-left text-xs text-slate-600">
            <thead className="bg-[#103d32] text-emerald-50/75 font-mono uppercase text-[10px] tracking-wider">
              <tr>
                <th className="px-4 py-3.5">Directive ID</th>
                <th className="px-4 py-3.5">Severity</th>
                <th className="px-4 py-3.5">Affected Species & Region</th>
                <th className="px-4 py-3.5">Ecological Trigger / Threshold</th>
                <th className="px-4 py-3.5">Recommended Forest Dept Action</th>
                <th className="px-4 py-3.5 text-center">Status & Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 bg-white">
              {filteredAlerts.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-4 py-8 text-center text-slate-400 font-medium">
                    No alerts match the selected criteria.
                  </td>
                </tr>
              ) : (
                filteredAlerts.map((alert) => {
                  const isUpdating = updatingId === alert.id;
                  return (
                    <tr
                      key={alert.id}
                      className="transition-colors hover:bg-[#102d22]"
                    >
                      {/* ID & Date */}
                      <td className="px-4 py-3.5 whitespace-nowrap font-mono">
                        <div className="font-bold text-slate-800">{alert.id}</div>
                        <div className="text-[10px] text-slate-400">{alert.dateIssued}</div>
                      </td>

                      {/* Severity */}
                      <td className="px-4 py-3.5 whitespace-nowrap">
                        <SeverityBadge severity={alert.severity} />
                      </td>

                      {/* Species & Region */}
                      <td className="px-4 py-3.5">
                        <div className="font-bold text-slate-900">{alert.speciesName}</div>
                        <div className="text-[11px] text-emerald-700 font-medium">
                          {alert.regionName}
                        </div>
                        <div className="text-[10px] text-slate-400 mt-0.5">{alert.issuingAgency}</div>
                      </td>

                      {/* Trigger */}
                      <td className="px-4 py-3.5 max-w-xs">
                        <p className="text-slate-700 leading-snug line-clamp-3">
                          {alert.thresholdExceeded}
                        </p>
                      </td>

                      {/* Recommendation */}
                      <td className="px-4 py-3.5 max-w-sm">
                        <p className="text-slate-800 font-medium leading-snug bg-[#091a15] p-2 rounded border border-[#1b3a2e]">
                          {alert.recommendedAction}
                        </p>
                        {alert.adminNotes && (
                          <div className="mt-1 text-[10px] text-slate-500 font-mono italic">
                            Note: {alert.adminNotes}
                          </div>
                        )}
                      </td>

                      {/* Status Dropdown */}
                      <td className="px-4 py-3.5 whitespace-nowrap text-center">
                        <div className="inline-flex flex-col items-center gap-1.5">
                          <select
                            disabled={isUpdating}
                            value={alert.status}
                            onChange={(e) => handleStatusChange(alert.id, e.target.value)}
                            className={`px-2.5 py-1 rounded-md text-xs font-bold border transition-colors focus:outline-none cursor-pointer ${
                              alert.status === 'Action Taken'
                                ? 'bg-[#102d22] text-[#9ee7b8] border-[#285442]'
                                : alert.status === 'Reviewed'
                                ? 'bg-[#332b1d] text-[#ffd184] border-[#6b552e]'
                                : 'bg-[#351f20] text-[#ff9d8a] border-[#743e39]'
                            }`}
                          >
                            <option value="Pending">Pending</option>
                            <option value="Reviewed">Reviewed</option>
                            <option value="Action Taken">Action Taken</option>
                          </select>
                          {isUpdating && (
                            <span className="text-[10px] font-mono text-slate-400 animate-pulse">
                              Updating...
                            </span>
                          )}
                        </div>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
