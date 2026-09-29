import React, { useState } from 'react';
import { Decision, DecisionStatus, DecisionType } from '../../types/adm';
import { 
  Search, 
  Filter, 
  Plus, 
  ArrowUpRight, 
  CheckCircle2, 
  Clock, 
  AlertCircle, 
  XCircle,
  Layers,
  ChevronDown
} from 'lucide-react';

interface DecisionHistoryViewProps {
  decisions: Decision[];
  onSelectDecision: (decisionId: string) => void;
  onRecordNewDecision: () => void;
  onRecordOutcome: (decisionId: string) => void;
}

export const DecisionHistoryView: React.FC<DecisionHistoryViewProps> = ({
  decisions,
  onSelectDecision,
  onRecordNewDecision,
  onRecordOutcome
}) => {
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [selectedStatus, setSelectedStatus] = useState<string>('All');
  const [selectedDecisionType, setSelectedDecisionType] = useState<string>('All');

  const filteredDecisions = decisions.filter((d) => {
    if (search.trim()) {
      const q = search.toLowerCase();
      const match = 
        d.vendorName.toLowerCase().includes(q) ||
        d.projectRequirement.toLowerCase().includes(q) ||
        d.vendorCategory.toLowerCase().includes(q) ||
        d.reasoning.toLowerCase().includes(q);
      if (!match) return false;
    }

    if (selectedCategory !== 'All' && d.vendorCategory !== selectedCategory) {
      return false;
    }

    if (selectedStatus !== 'All' && d.status !== selectedStatus) {
      return false;
    }

    if (selectedDecisionType !== 'All' && d.decisionType !== selectedDecisionType) {
      return false;
    }

    return true;
  });

  return (
    <div className="max-w-6xl mx-auto space-y-6 pb-12">
      {/* Header with Title and Record CTA */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-stone-900 tracking-tight">
            Decision History
          </h2>
          <p className="mt-1 text-xs sm:text-sm text-stone-600">
            Audit trail of every procurement decision, reasoning, and subsequent outcome recorded in ADM memory.
          </p>
        </div>

        <button
          onClick={onRecordNewDecision}
          className="inline-flex items-center gap-1.5 px-4 py-2 text-xs sm:text-sm font-semibold text-white bg-[#B45309] hover:bg-[#9A3412] rounded-lg shadow-xs transition-colors shrink-0 self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>Record Decision</span>
        </button>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white border border-[#E7DFD5] rounded-xl p-4 shadow-2xs space-y-3">
        <div className="flex flex-col md:flex-row gap-3">
          {/* Search */}
          <div className="relative flex-1">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400" />
            <input
              type="text"
              placeholder="Search by vendor, requirement, or reasoning..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-9.5 pr-4 py-2 text-xs sm:text-sm bg-white border border-[#E3DCD2] rounded-lg text-stone-900 placeholder:text-stone-400 focus:outline-hidden focus:ring-2 focus:ring-[#B45309]"
            />
          </div>

          {/* Category Filter */}
          <div className="flex flex-wrap sm:flex-nowrap gap-2">
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="px-3 py-2 text-xs bg-white border border-[#E3DCD2] rounded-lg text-stone-700 focus:outline-hidden focus:ring-2 focus:ring-[#B45309]"
            >
              <option value="All">All Categories</option>
              <option value="Logistics & Freight">Logistics & Freight</option>
              <option value="Hardware & Infrastructure">Hardware & Infrastructure</option>
              <option value="Cloud Infrastructure">Cloud Infrastructure</option>
              <option value="Packaging & Materials">Packaging & Materials</option>
              <option value="Security & Compliance">Security & Compliance</option>
            </select>

            {/* Status Filter */}
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="px-3 py-2 text-xs bg-white border border-[#E3DCD2] rounded-lg text-stone-700 focus:outline-hidden focus:ring-2 focus:ring-[#B45309]"
            >
              <option value="All">All Statuses</option>
              <option value="Completed">Completed (Outcome Saved)</option>
              <option value="Awaiting Outcome">Awaiting Outcome</option>
              <option value="Closed">Closed</option>
            </select>

            {/* Decision Type Filter */}
            <select
              value={selectedDecisionType}
              onChange={(e) => setSelectedDecisionType(e.target.value)}
              className="px-3 py-2 text-xs bg-white border border-[#E3DCD2] rounded-lg text-stone-700 focus:outline-hidden focus:ring-2 focus:ring-[#B45309]"
            >
              <option value="All">All Decisions</option>
              <option value="Selected">Selected</option>
              <option value="Rejected">Rejected</option>
              <option value="Shortlisted">Shortlisted</option>
              <option value="Deferred">Deferred</option>
            </select>
          </div>
        </div>

        {/* Results Counter */}
        <div className="pt-2 border-t border-[#F2ECE3] flex items-center justify-between text-xs text-stone-500">
          <span>
            Showing <strong className="text-stone-800">{filteredDecisions.length}</strong> of {decisions.length} decisions
          </span>
          {(search || selectedCategory !== 'All' || selectedStatus !== 'All' || selectedDecisionType !== 'All') && (
            <button
              onClick={() => {
                setSearch('');
                setSelectedCategory('All');
                setSelectedStatus('All');
                setSelectedDecisionType('All');
              }}
              className="text-[#B45309] hover:underline"
            >
              Reset filters
            </button>
          )}
        </div>
      </div>

      {/* Decisions Data Table */}
      <div className="bg-white border border-[#E7DFD5] rounded-xl shadow-2xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="bg-[#FAF7F2] border-b border-[#F2ECE3] text-[11px] font-semibold text-stone-500 uppercase tracking-wider">
                <th className="py-3 px-4 sm:px-5">Vendor & Requirement</th>
                <th className="py-3 px-3">Category</th>
                <th className="py-3 px-3">Decision</th>
                <th className="py-3 px-3">Date</th>
                <th className="py-3 px-3">Confidence</th>
                <th className="py-3 px-3">Outcome</th>
                <th className="py-3 px-3">Status</th>
                <th className="py-3 px-4 sm:px-5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#F5EFE8]">
              {filteredDecisions.length === 0 ? (
                <tr>
                  <td colSpan={8} className="py-12 text-center text-stone-500">
                    <p className="font-semibold text-sm text-stone-700">No decisions match current filters</p>
                    <p className="text-xs mt-1">Try resetting search keywords or recording a new decision.</p>
                  </td>
                </tr>
              ) : (
                filteredDecisions.map((dec) => {
                  const isPending = dec.status === 'Awaiting Outcome';

                  return (
                    <tr
                      key={dec.id}
                      onClick={() => onSelectDecision(dec.id)}
                      className="group hover:bg-[#FAF7F2] cursor-pointer transition-colors"
                    >
                      {/* Vendor & Project */}
                      <td className="py-3.5 px-4 sm:px-5 font-semibold text-stone-900">
                        <div className="flex flex-col">
                          <span className="group-hover:text-[#B45309] transition-colors text-sm">
                            {dec.vendorName}
                          </span>
                          <span className="text-[11px] text-stone-500 font-normal line-clamp-1">
                            {dec.projectRequirement}
                          </span>
                        </div>
                      </td>

                      {/* Category */}
                      <td className="py-3.5 px-3 text-stone-600 font-medium whitespace-nowrap">
                        {dec.vendorCategory}
                      </td>

                      {/* Decision */}
                      <td className="py-3.5 px-3 font-semibold whitespace-nowrap">
                        <span className={
                          dec.decisionType === 'Selected' ? 'text-emerald-800' :
                          dec.decisionType === 'Rejected' ? 'text-stone-400 line-through' :
                          'text-[#9A3412]'
                        }>
                          {dec.decisionType}
                        </span>
                      </td>

                      {/* Date */}
                      <td className="py-3.5 px-3 text-stone-500 font-mono whitespace-nowrap">
                        {dec.decisionDate}
                      </td>

                      {/* Confidence */}
                      <td className="py-3.5 px-3 whitespace-nowrap">
                        <span className="text-stone-700 font-medium">
                          {dec.confidence}
                        </span>
                      </td>

                      {/* Outcome */}
                      <td className="py-3.5 px-3 whitespace-nowrap">
                        {dec.outcome ? (
                          <span className={`flex items-center gap-1 font-medium ${
                            dec.outcome.result === 'Successful' ? 'text-emerald-700' :
                            dec.outcome.result === 'Partially Successful' ? 'text-[#B45309]' :
                            'text-rose-700'
                          }`}>
                            <CheckCircle2 className="w-3.5 h-3.5" />
                            {dec.outcome.result}
                          </span>
                        ) : dec.decisionType === 'Rejected' ? (
                          <span className="text-stone-400 font-mono">—</span>
                        ) : (
                          <span className="text-[#B45309] flex items-center gap-1 font-medium">
                            <Clock className="w-3.5 h-3.5" />
                            Pending
                          </span>
                        )}
                      </td>

                      {/* Status */}
                      <td className="py-3.5 px-3 whitespace-nowrap">
                        <span className="text-xs text-stone-600 font-medium">
                          {dec.status}
                        </span>
                      </td>

                      {/* Action */}
                      <td className="py-3.5 px-4 sm:px-5 text-right whitespace-nowrap" onClick={(e) => e.stopPropagation()}>
                        <div className="flex items-center justify-end gap-2">
                          {isPending && (
                            <button
                              onClick={() => onRecordOutcome(dec.id)}
                              className="px-2.5 py-1 text-xs font-semibold text-white bg-[#B45309] hover:bg-[#9A3412] rounded-md transition-colors shadow-2xs"
                            >
                              Record Outcome
                            </button>
                          )}
                          <button
                            onClick={() => onSelectDecision(dec.id)}
                            className="p-1.5 text-stone-400 hover:text-stone-900 rounded-md hover:bg-white transition-colors"
                            title="View timeline"
                          >
                            <ArrowUpRight className="w-4 h-4" />
                          </button>
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
};
