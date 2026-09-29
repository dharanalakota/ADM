import React from 'react';
import { HistoricalInsight, Decision } from '../../types/adm';
import { X, Database, ArrowRight, CheckCircle2, AlertCircle, Calendar } from 'lucide-react';

interface EvidenceModalProps {
  insight: HistoricalInsight;
  decisions: Decision[];
  isOpen: boolean;
  onClose: () => void;
  onSelectDecision: (decisionId: string) => void;
}

export const EvidenceModal: React.FC<EvidenceModalProps> = ({
  insight,
  decisions,
  isOpen,
  onClose,
  onSelectDecision
}) => {
  if (!isOpen) return null;

  // Retrieve matching decisions
  const matchedDecisions = decisions.filter(d => 
    insight.evidenceDecisionIds.includes(d.id) || 
    d.vendorCategory === insight.category
  );

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-900/50 backdrop-blur-xs animate-in fade-in duration-150"
      onClick={onClose}
    >
      <div 
        className="w-full max-w-2xl bg-white border border-[#E7DFD5] rounded-2xl shadow-xl overflow-hidden flex flex-col max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="p-5 border-b border-[#F2ECE3] flex items-center justify-between bg-[#FAF7F2]">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-[#522912] text-amber-200 flex items-center justify-center">
              <Database className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-base font-bold text-stone-900">
                Historical Evidence Audit
              </h3>
              <p className="text-xs text-stone-500">
                Empirical records supporting this ADM learned insight
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 text-stone-400 hover:text-stone-900 rounded-lg hover:bg-white transition-colors"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-5 overflow-y-auto space-y-4">
          {/* Summary Box */}
          <div className="p-4 rounded-xl bg-[#FAF0E6] border border-[#E7DFD5] space-y-1">
            <span className="text-[11px] font-bold uppercase tracking-wider text-[#9A3412] block">
              Synthesized Insight
            </span>
            <p className="text-sm font-semibold text-stone-900 leading-snug">
              "{insight.summary}"
            </p>
            <p className="text-xs text-stone-600 mt-1">
              {insight.keyLesson}
            </p>
          </div>

          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-stone-500 mb-2">
              Underlying Recorded Decisions ({matchedDecisions.length})
            </h4>

            <div className="space-y-3">
              {matchedDecisions.map((dec) => {
                const out = dec.outcome;
                return (
                  <div
                    key={dec.id}
                    className="p-4 rounded-xl border border-[#E7DFD5] bg-[#FAF7F2]/60 hover:bg-[#FAF7F2] transition-colors text-xs space-y-2"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-stone-900 text-sm">
                          {dec.vendorName}
                        </span>
                        <span className="text-stone-300" aria-hidden="true">·</span>
                        <span className="text-stone-500">{dec.projectRequirement}</span>
                      </div>
                      <span className="font-mono text-stone-400 text-[11px]">{dec.decisionDate}</span>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1">
                      <div className="p-2 rounded bg-white border border-[#E5DDD2]">
                        <span className="text-[10px] font-bold text-stone-500 block uppercase">
                          Expected Baseline
                        </span>
                        <p className="text-stone-700 line-clamp-2 mt-0.5">
                          {dec.expectedOutcome}
                        </p>
                      </div>

                      <div className="p-2 rounded bg-white border border-[#E5DDD2]">
                        <span className="text-[10px] font-bold text-[#B45309] block uppercase">
                          Actual Outcome ({out?.result || 'Pending'})
                        </span>
                        <p className="text-stone-700 line-clamp-2 mt-0.5">
                          {out?.actualOutcomeDescription || 'Awaiting outcome recording'}
                        </p>
                      </div>
                    </div>

                    {out?.comparisons && out.comparisons.length > 0 && (
                      <div className="pt-1 flex flex-wrap gap-1.5">
                        {out.comparisons.map((c, i) => (
                          <span
                            key={i}
                            className={`text-[10px] font-mono px-2 py-0.5 rounded border ${
                              c.deltaStatus === 'exceeded'
                                ? 'bg-emerald-50 text-emerald-800 border-emerald-200'
                                : c.deltaStatus === 'met'
                                ? 'bg-stone-50 text-stone-700 border-stone-200'
                                : 'bg-rose-50 text-rose-800 border-rose-200'
                            }`}
                          >
                            {c.metric}: {c.variance || c.actual}
                          </span>
                        ))}
                      </div>
                    )}

                    <div className="pt-1 flex justify-end">
                      <button
                        onClick={() => {
                          onClose();
                          onSelectDecision(dec.id);
                        }}
                        className="text-xs font-semibold text-[#B45309] hover:text-[#7C2D12] inline-flex items-center gap-1"
                      >
                        <span>View Decision Timeline</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="p-4 border-t border-[#F2ECE3] flex items-center justify-between bg-[#FAF7F2]">
          <span className="text-xs text-stone-500">
            ADM memory verification audit
          </span>
          <button
            onClick={onClose}
            className="px-4 py-1.5 text-xs font-semibold text-stone-700 bg-white border border-[#E3DCD2] hover:bg-stone-50 rounded-lg transition-colors"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
};
