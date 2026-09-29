import React, { useState } from 'react';
import { Decision, Outcome } from '../../types/adm';
import { 
  CheckSquare, 
  Clock, 
  CheckCircle2, 
  AlertCircle, 
  XCircle, 
  ArrowUpRight, 
  Plus, 
  Lightbulb,
  Search,
  Filter
} from 'lucide-react';

interface OutcomesTrackerViewProps {
  decisions: Decision[];
  outcomes: Outcome[];
  onSelectDecision: (decisionId: string) => void;
  onRecordOutcome: (decisionId: string) => void;
  onViewOutcomeDetail: (decisionId: string) => void;
}

export const OutcomesTrackerView: React.FC<OutcomesTrackerViewProps> = ({
  decisions,
  outcomes,
  onSelectDecision,
  onRecordOutcome,
  onViewOutcomeDetail
}) => {
  const [activeTab, setActiveTab] = useState<'pending' | 'recorded'>('pending');
  const [filterResult, setFilterResult] = useState<string>('All');

  const pendingDecisions = decisions.filter(d => d.status === 'Awaiting Outcome');
  const completedDecisions = decisions.filter(d => d.status === 'Completed' && d.outcome);

  const filteredCompleted = completedDecisions.filter(d => {
    if (filterResult === 'All') return true;
    return d.outcome?.result === filterResult;
  });

  return (
    <div className="max-w-6xl mx-auto space-y-6 pb-12">
      {/* Header */}
      <div>
        <div className="flex items-center gap-2 mb-1">
          <div className="w-6 h-6 rounded-md bg-[#522912] text-amber-200 flex items-center justify-center">
            <CheckSquare className="w-3.5 h-3.5" />
          </div>
          <h2 className="text-2xl font-bold text-stone-900 tracking-tight">
            Outcome Tracker
          </h2>
        </div>
        <p className="text-sm text-stone-600">
          Track and log post-decision performance. Every outcome recorded permanently enriches ADM’s predictive memory.
        </p>
      </div>

      {/* Overview Metric Banner */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white border border-[#E7DFD5] rounded-xl p-4.5 shadow-2xs">
          <div className="flex items-center justify-between text-xs text-stone-500 font-medium">
            <span>Pending Outcomes</span>
            <Clock className="w-4 h-4 text-[#B45309]" />
          </div>
          <div className="mt-2 text-2xl font-bold font-mono text-stone-900">
            {pendingDecisions.length}
          </div>
          <p className="mt-1 text-[11px] text-stone-500">
            Decisions awaiting operational verification
          </p>
        </div>

        <div className="bg-white border border-[#E7DFD5] rounded-xl p-4.5 shadow-2xs">
          <div className="flex items-center justify-between text-xs text-stone-500 font-medium">
            <span>Outcomes Recorded</span>
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
          </div>
          <div className="mt-2 text-2xl font-bold font-mono text-stone-900">
            {outcomes.length}
          </div>
          <p className="mt-1 text-[11px] text-stone-500">
            Empirical data points powering ADM memory
          </p>
        </div>

        <div className="bg-white border border-[#E7DFD5] rounded-xl p-4.5 shadow-2xs">
          <div className="flex items-center justify-between text-xs text-stone-500 font-medium">
            <span>Positive Outcome Rate</span>
            <CheckSquare className="w-4 h-4 text-[#B45309]" />
          </div>
          <div className="mt-2 text-2xl font-bold font-mono text-emerald-800">
            {Math.round((outcomes.filter(o => o.result === 'Successful').length / (outcomes.length || 1)) * 100)}%
          </div>
          <p className="mt-1 text-[11px] text-stone-500">
            Across verified vendor engagements
          </p>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex items-center justify-between border-b border-[#E7DFD5] pb-1">
        <div className="flex items-center gap-2">
          <button
            onClick={() => setActiveTab('pending')}
            className={`px-4 py-2 text-xs sm:text-sm font-semibold rounded-lg transition-all ${
              activeTab === 'pending'
                ? 'bg-white text-stone-900 shadow-2xs border border-[#E7DFD5]'
                : 'text-stone-500 hover:text-stone-900'
            }`}
          >
            Awaiting Outcomes ({pendingDecisions.length})
          </button>
          <button
            onClick={() => setActiveTab('recorded')}
            className={`px-4 py-2 text-xs sm:text-sm font-semibold rounded-lg transition-all ${
              activeTab === 'recorded'
                ? 'bg-white text-stone-900 shadow-2xs border border-[#E7DFD5]'
                : 'text-stone-500 hover:text-stone-900'
            }`}
          >
            Recorded History ({completedDecisions.length})
          </button>
        </div>

        {activeTab === 'recorded' && (
          <div className="flex items-center gap-1.5 text-xs">
            <span className="text-stone-400 font-medium hidden sm:inline">Filter:</span>
            {['All', 'Successful', 'Partially Successful', 'Unsuccessful'].map((res) => (
              <button
                key={res}
                onClick={() => setFilterResult(res)}
                className={`px-2.5 py-1 rounded-md text-xs transition-colors ${
                  filterResult === res
                    ? 'bg-[#EFE8DF] text-[#7C2D12] font-semibold'
                    : 'text-stone-600 hover:bg-[#F4EFEA]'
                }`}
              >
                {res}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* TAB CONTENT 1: Awaiting Outcomes */}
      {activeTab === 'pending' && (
        <div className="space-y-4">
          {pendingDecisions.length === 0 ? (
            <div className="bg-white border border-[#E7DFD5] rounded-xl p-10 text-center text-stone-500">
              <CheckCircle2 className="w-8 h-8 text-emerald-600 mx-auto mb-2" />
              <p className="font-semibold text-stone-800">All decisions have recorded outcomes</p>
              <p className="text-xs text-stone-500 mt-1">Great job closing the memory loop on your decisions.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {pendingDecisions.map((dec) => (
                <div
                  key={dec.id}
                  className="bg-white border border-[#E7DFD5] rounded-xl p-5 shadow-2xs flex flex-col justify-between space-y-4 hover:border-[#B45309]/50 transition-colors"
                >
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-stone-500 font-medium">{dec.vendorCategory}</span>
                      <span className="text-[#B45309] font-mono text-[11px] font-semibold flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        Pending Record
                      </span>
                    </div>

                    <h3 className="text-base font-bold text-stone-900">
                      {dec.vendorName}
                    </h3>
                    <p className="text-xs text-stone-600">
                      {dec.projectRequirement}
                    </p>

                    <div className="p-3 bg-[#FAF7F2] rounded-lg border border-[#E5DDD2] text-xs space-y-1">
                      <span className="font-bold text-stone-700 block">Original Expectation:</span>
                      <p className="text-stone-600 italic">"{dec.expectedOutcome}"</p>
                    </div>
                  </div>

                  <div className="pt-3 border-t border-[#F2ECE3] flex items-center justify-between">
                    <span className="text-[11px] text-stone-400 font-mono">
                      Decided {dec.decisionDate}
                    </span>

                    <button
                      onClick={() => onRecordOutcome(dec.id)}
                      className="inline-flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-semibold text-white bg-[#B45309] hover:bg-[#9A3412] rounded-lg shadow-2xs transition-colors"
                    >
                      <Plus className="w-3.5 h-3.5" />
                      <span>Record Outcome</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* TAB CONTENT 2: Recorded Outcomes History */}
      {activeTab === 'recorded' && (
        <div className="space-y-4">
          <div className="grid grid-cols-1 gap-4">
            {filteredCompleted.map((dec) => {
              const out = dec.outcome!;

              return (
                <div
                  key={dec.id}
                  className="bg-white border border-[#E7DFD5] rounded-xl p-5 shadow-2xs space-y-4 hover:border-[#DACFC0] transition-colors"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-[#F2ECE3] pb-3">
                    <div>
                      <div className="flex items-center gap-2 text-xs text-stone-500 font-medium mb-0.5">
                        <span>{dec.vendorCategory}</span>
                        <span aria-hidden="true">·</span>
                        <span className="font-mono">Outcome logged {out.recordedDate}</span>
                      </div>
                      <h3 className="text-base font-bold text-stone-900">
                        {dec.vendorName}
                      </h3>
                    </div>

                    <div className="flex items-center gap-2">
                      <span className={`text-xs font-semibold px-2.5 py-1 rounded-md border flex items-center gap-1 ${
                        out.result === 'Successful'
                          ? 'bg-emerald-50 text-emerald-800 border-emerald-200'
                          : out.result === 'Partially Successful'
                          ? 'bg-[#FAF4EB] text-[#7C2D12] border-[#E2D5C3]'
                          : 'bg-rose-50 text-rose-800 border-rose-200'
                      }`}>
                        {out.result}
                      </span>

                      <button
                        onClick={() => onViewOutcomeDetail(dec.id)}
                        className="p-1.5 text-stone-400 hover:text-stone-900 rounded-md hover:bg-[#FAF7F2]"
                        title="View variance comparison"
                      >
                        <ArrowUpRight className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  <p className="text-xs sm:text-sm text-stone-700 leading-relaxed">
                    {out.actualOutcomeDescription}
                  </p>

                  {/* ADM Learned Banner */}
                  <div className="p-3.5 rounded-lg bg-[#FAF0E6] border border-[#E7DFD5] text-xs space-y-1">
                    <div className="flex items-center gap-1.5 text-[#9A3412] font-bold">
                      <Lightbulb className="w-3.5 h-3.5" />
                      <span>ADM Synthesized Memory:</span>
                    </div>
                    <p className="text-stone-800 font-medium">"{out.admLearned}"</p>
                  </div>

                  {/* Metric Comparisons Preview */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 pt-1 text-xs">
                    {out.comparisons.slice(0, 3).map((comp, idx) => (
                      <div key={idx} className="p-2.5 bg-[#FAF7F2] rounded border border-[#E5DDD2]">
                        <span className="text-[10px] text-stone-400 font-mono block mb-0.5">{comp.metric}</span>
                        <div className="text-stone-800 font-semibold truncate">{comp.actual}</div>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};
