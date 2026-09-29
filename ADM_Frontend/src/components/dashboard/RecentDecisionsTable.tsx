import React from 'react';
import { Decision } from '../../types/adm';
import { 
  ChevronRight, 
  Clock, 
  CheckCircle2, 
  AlertCircle, 
  XCircle, 
  ArrowUpRight,
  Plus
} from 'lucide-react';

interface RecentDecisionsTableProps {
  decisions: Decision[];
  onSelectDecision: (decisionId: string) => void;
  onRecordOutcome: (decisionId: string) => void;
  onViewAllDecisions: () => void;
}

export const RecentDecisionsTable: React.FC<RecentDecisionsTableProps> = ({
  decisions,
  onSelectDecision,
  onRecordOutcome,
  onViewAllDecisions
}) => {
  const getDecisionTypeColor = (type: string) => {
    switch (type) {
      case 'Selected':
        return 'text-emerald-800 font-semibold';
      case 'Rejected':
        return 'text-stone-500 font-medium line-through';
      case 'Shortlisted':
        return 'text-[#9A3412] font-semibold';
      case 'Deferred':
        return 'text-amber-800 font-medium';
      default:
        return 'text-stone-700';
    }
  };

  const renderOutcomeCell = (decision: Decision) => {
    if (!decision.outcome) {
      if (decision.decisionType === 'Rejected') {
        return <span className="text-stone-400 font-mono text-xs">—</span>;
      }
      return (
        <div className="flex items-center gap-1.5">
          <Clock className="w-3.5 h-3.5 text-[#B45309]" />
          <span className="text-xs font-medium text-[#B45309]">Pending</span>
        </div>
      );
    }

    const res = decision.outcome.result;
    if (res === 'Successful') {
      return (
        <div className="flex items-center gap-1.5 text-xs text-emerald-800 font-medium">
          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
          <span>Successful</span>
        </div>
      );
    } else if (res === 'Partially Successful') {
      return (
        <div className="flex items-center gap-1.5 text-xs text-amber-900 font-medium">
          <AlertCircle className="w-3.5 h-3.5 text-amber-700" />
          <span>Partially Successful</span>
        </div>
      );
    } else {
      return (
        <div className="flex items-center gap-1.5 text-xs text-rose-800 font-medium">
          <XCircle className="w-3.5 h-3.5 text-rose-600" />
          <span>Unsuccessful</span>
        </div>
      );
    }
  };

  const renderStatusCell = (status: string) => {
    switch (status) {
      case 'Completed':
        return (
          <span className="text-xs text-stone-700 font-medium flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-600" />
            Completed
          </span>
        );
      case 'Awaiting Outcome':
        return (
          <span className="text-xs text-[#B45309] font-medium flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-[#D97706] animate-pulse" />
            Awaiting Outcome
          </span>
        );
      case 'Closed':
        return (
          <span className="text-xs text-stone-400 font-medium flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-stone-300" />
            Closed
          </span>
        );
      default:
        return <span className="text-xs text-stone-500">{status}</span>;
    }
  };

  return (
    <div className="bg-white border border-[#E7DFD5] rounded-xl shadow-2xs overflow-hidden">
      {/* Header */}
      <div className="p-4 sm:p-5 border-b border-[#F2ECE3] flex items-center justify-between">
        <div>
          <h3 className="text-base font-bold text-stone-900 tracking-tight">
            Recent Decisions
          </h3>
          <p className="mt-0.5 text-xs text-stone-500">
            Recorded vendor and procurement decisions indexed in ADM memory
          </p>
        </div>

        <button
          onClick={onViewAllDecisions}
          className="text-xs font-semibold text-[#B45309] hover:text-[#7C2D12] inline-flex items-center gap-1 transition-colors"
        >
          <span>View All ({decisions.length})</span>
          <ChevronRight className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-[#F2ECE3] bg-[#FAF7F2] text-[11px] font-semibold text-stone-500 uppercase tracking-wider">
              <th className="py-3 px-4 sm:px-5">Vendor</th>
              <th className="py-3 px-3">Category</th>
              <th className="py-3 px-3">Decision</th>
              <th className="py-3 px-3">Date</th>
              <th className="py-3 px-3">Confidence</th>
              <th className="py-3 px-3">Outcome</th>
              <th className="py-3 px-3">Status</th>
              <th className="py-3 px-4 sm:px-5 text-right">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#F5EFE8] text-xs">
            {decisions.slice(0, 6).map((dec) => {
              const isPending = dec.status === 'Awaiting Outcome';

              return (
                <tr
                  key={dec.id}
                  onClick={() => onSelectDecision(dec.id)}
                  className="group hover:bg-[#FAF7F2] cursor-pointer transition-colors"
                >
                  {/* Vendor */}
                  <td className="py-3.5 px-4 sm:px-5 font-semibold text-stone-900">
                    <div className="flex flex-col">
                      <span className="group-hover:text-[#B45309] transition-colors">
                        {dec.vendorName}
                      </span>
                      <span className="text-[11px] text-stone-400 font-normal line-clamp-1">
                        {dec.projectRequirement}
                      </span>
                    </div>
                  </td>

                  {/* Category */}
                  <td className="py-3.5 px-3 text-stone-600 font-medium">
                    {dec.vendorCategory}
                  </td>

                  {/* Decision */}
                  <td className="py-3.5 px-3">
                    <span className={getDecisionTypeColor(dec.decisionType)}>
                      {dec.decisionType}
                    </span>
                  </td>

                  {/* Date */}
                  <td className="py-3.5 px-3 text-stone-500 font-mono">
                    {dec.decisionDate}
                  </td>

                  {/* Confidence */}
                  <td className="py-3.5 px-3">
                    <span className={`font-medium ${
                      dec.confidence === 'High' ? 'text-stone-900' : 'text-stone-500'
                    }`}>
                      {dec.confidence}
                    </span>
                  </td>

                  {/* Outcome */}
                  <td className="py-3.5 px-3">
                    {renderOutcomeCell(dec)}
                  </td>

                  {/* Status */}
                  <td className="py-3.5 px-3">
                    {renderStatusCell(dec.status)}
                  </td>

                  {/* Actions */}
                  <td className="py-3.5 px-4 sm:px-5 text-right whitespace-nowrap" onClick={(e) => e.stopPropagation()}>
                    <div className="flex items-center justify-end gap-2">
                      {isPending ? (
                        <button
                          onClick={() => onRecordOutcome(dec.id)}
                          className="inline-flex items-center gap-1 px-2.5 py-1 text-xs font-semibold text-white bg-[#B45309] hover:bg-[#9A3412] rounded-md transition-colors shadow-2xs"
                        >
                          <Plus className="w-3 h-3" />
                          <span>Record Outcome</span>
                        </button>
                      ) : (
                        <button
                          onClick={() => onSelectDecision(dec.id)}
                          className="p-1.5 text-stone-400 hover:text-stone-900 rounded-md hover:bg-white transition-colors"
                          title="View decision detail"
                        >
                          <ArrowUpRight className="w-4 h-4" />
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};
