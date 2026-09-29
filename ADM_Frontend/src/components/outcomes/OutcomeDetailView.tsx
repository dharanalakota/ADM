import React from 'react';
import { Outcome, Decision } from '../../types/adm';
import { 
  ArrowLeft, 
  Lightbulb, 
  Database, 
  CheckCircle2, 
  AlertCircle, 
  XCircle, 
  Calendar, 
  Star, 
  Compass, 
  ArrowRight,
  TrendingDown,
  TrendingUp,
  Minus
} from 'lucide-react';

interface OutcomeDetailViewProps {
  outcome: Outcome;
  decision?: Decision;
  onBack: () => void;
  onAskAdmAboutThis?: (vendorName: string) => void;
}

export const OutcomeDetailView: React.FC<OutcomeDetailViewProps> = ({
  outcome,
  decision,
  onBack,
  onAskAdmAboutThis
}) => {
  const renderDeltaIcon = (status: string) => {
    switch (status) {
      case 'exceeded':
        return <TrendingUp className="w-3.5 h-3.5 text-emerald-600" />;
      case 'met':
        return <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />;
      case 'missed':
        return <TrendingDown className="w-3.5 h-3.5 text-rose-600" />;
      default:
        return <Minus className="w-3.5 h-3.5 text-stone-400" />;
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6 pb-12">
      {/* Back button */}
      <div>
        <button
          onClick={onBack}
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-stone-600 hover:text-stone-900 transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to Timeline</span>
        </button>
      </div>

      {/* Header */}
      <div className="bg-white border border-[#E7DFD5] rounded-xl p-5 sm:p-6 shadow-2xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs text-stone-500 font-medium mb-1">
              <span>Outcome Detail & Learning Analysis</span>
              <span aria-hidden="true">·</span>
              <span className="font-mono">{outcome.recordedDate}</span>
            </div>
            <h2 className="text-2xl font-bold text-stone-900 tracking-tight">
              {outcome.vendorName}
            </h2>
            <p className="mt-1 text-xs sm:text-sm text-stone-600">
              Evaluated and captured by {outcome.recordedBy}
            </p>
          </div>

          <div className="flex items-center gap-2">
            <span className={`text-xs font-semibold px-3 py-1.5 rounded-lg border flex items-center gap-1.5 ${
              outcome.result === 'Successful'
                ? 'bg-emerald-50 text-emerald-800 border-emerald-200'
                : outcome.result === 'Partially Successful'
                ? 'bg-[#FAF4EB] text-[#7C2D12] border-[#E2D5C3]'
                : 'bg-rose-50 text-rose-800 border-rose-200'
            }`}>
              {outcome.result === 'Successful' ? (
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              ) : outcome.result === 'Partially Successful' ? (
                <AlertCircle className="w-4 h-4 text-[#B45309]" />
              ) : (
                <XCircle className="w-4 h-4 text-rose-600" />
              )}
              <span>{outcome.result}</span>
            </span>
          </div>
        </div>
      </div>

      {/* EXPECTED VS ACTUAL COMPARISON TABLE */}
      <section className="bg-white border border-[#E7DFD5] rounded-xl shadow-2xs overflow-hidden">
        <div className="p-4 sm:p-5 border-b border-[#F2ECE3]">
          <h3 className="text-sm font-bold text-stone-900 uppercase tracking-wider">
            Expected vs Actual Variance Analysis
          </h3>
          <p className="mt-0.5 text-xs text-stone-500">
            Direct delta comparison between decision baseline targets and physical outcome
          </p>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="bg-[#FAF7F2] border-b border-[#F2ECE3] text-[11px] font-semibold text-stone-500 uppercase tracking-wider">
                <th className="py-3 px-4 sm:px-5">Performance Metric</th>
                <th className="py-3 px-4 text-stone-600">Expected Baseline</th>
                <th className="py-3 px-4 text-stone-900 font-bold">Actual Result</th>
                <th className="py-3 px-4 text-right">Variance / Delta</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#F5EFE8]">
              {outcome.comparisons.map((comp, idx) => (
                <tr key={idx} className="hover:bg-[#FAF7F2]/60">
                  <td className="py-3.5 px-4 sm:px-5 font-semibold text-stone-900">
                    {comp.metric}
                  </td>
                  <td className="py-3.5 px-4 text-stone-600">
                    {comp.expected}
                  </td>
                  <td className="py-3.5 px-4 font-medium text-stone-900">
                    <div className="flex items-center gap-1.5">
                      {renderDeltaIcon(comp.deltaStatus)}
                      <span>{comp.actual}</span>
                    </div>
                  </td>
                  <td className="py-3.5 px-4 text-right font-mono text-[11px] font-semibold">
                    <span className={
                      comp.deltaStatus === 'exceeded'
                        ? 'text-emerald-700'
                        : comp.deltaStatus === 'met'
                        ? 'text-stone-700'
                        : 'text-rose-700'
                    }>
                      {comp.variance || comp.deltaStatus}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* WHAT ADM LEARNED & FUTURE IMPACT */}
      <section className="bg-gradient-to-br from-[#FAF0E6] to-[#FAF7F2] border border-[#E2D5C3] rounded-xl p-5 sm:p-6 shadow-2xs space-y-4">
        <div className="flex items-center justify-between border-b border-[#E5DDD2] pb-3">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-[#522912] text-amber-200 flex items-center justify-center">
              <Lightbulb className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-stone-900 tracking-tight">
                What ADM Learned
              </h3>
              <span className="text-[11px] text-stone-500">
                Systemic insight integrated into persistent organizational memory
              </span>
            </div>
          </div>

          <span className="text-[11px] font-mono text-[#B45309] uppercase font-bold">
            MEMORY SYNCED
          </span>
        </div>

        <div className="space-y-4">
          <div className="p-4 rounded-xl bg-white border border-[#E7DFD5] shadow-2xs">
            <span className="text-[11px] font-bold uppercase tracking-wider text-[#9A3412] block mb-1">
              Synthesized Rule
            </span>
            <p className="text-sm sm:text-base font-semibold text-stone-900 leading-snug">
              "{outcome.admLearned}"
            </p>
          </div>

          <div className="p-4 rounded-xl bg-white border border-[#E7DFD5] shadow-2xs">
            <span className="text-[11px] font-bold uppercase tracking-wider text-stone-700 block mb-1">
              Why this matters for future decisions
            </span>
            <p className="text-xs sm:text-sm text-stone-700 leading-relaxed">
              {outcome.futureDecisionImpact}
            </p>
          </div>
        </div>

        {onAskAdmAboutThis && (
          <div className="pt-2 flex justify-end">
            <button
              onClick={() => onAskAdmAboutThis(outcome.vendorName)}
              className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-white bg-[#B45309] hover:bg-[#9A3412] rounded-lg transition-colors shadow-2xs"
            >
              <Compass className="w-3.5 h-3.5" />
              <span>Query Memory for Next Decision</span>
            </button>
          </div>
        )}
      </section>

      {/* Factual Narrative Breakdown */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Actual Outcome Narrative */}
        <div className="bg-white border border-[#E7DFD5] rounded-xl p-5 shadow-2xs space-y-2">
          <h4 className="text-xs font-bold text-stone-900 uppercase tracking-wider border-b border-[#F2ECE3] pb-2">
            Actual Outcome Narrative
          </h4>
          <p className="text-xs text-stone-700 leading-relaxed pt-1">
            {outcome.actualOutcomeDescription}
          </p>
        </div>

        {/* Retained Lesson */}
        <div className="bg-white border border-[#E7DFD5] rounded-xl p-5 shadow-2xs space-y-2">
          <h4 className="text-xs font-bold text-stone-900 uppercase tracking-wider border-b border-[#F2ECE3] pb-2">
            Retained Lesson
          </h4>
          <p className="text-xs text-stone-700 leading-relaxed pt-1 font-medium">
            "{outcome.lesson}"
          </p>
        </div>

        {/* What Went Well */}
        <div className="bg-white border border-[#E7DFD5] rounded-xl p-5 shadow-2xs space-y-2">
          <h4 className="text-xs font-bold text-emerald-800 uppercase tracking-wider border-b border-[#F2ECE3] pb-2">
            What Went Well
          </h4>
          <p className="text-xs text-stone-600 leading-relaxed pt-1">
            {outcome.whatWentWell || 'Delivered per specifications.'}
          </p>
        </div>

        {/* What Went Wrong */}
        <div className="bg-white border border-[#E7DFD5] rounded-xl p-5 shadow-2xs space-y-2">
          <h4 className="text-xs font-bold text-rose-800 uppercase tracking-wider border-b border-[#F2ECE3] pb-2">
            What Went Wrong / Friction
          </h4>
          <p className="text-xs text-stone-600 leading-relaxed pt-1">
            {outcome.whatWentWrong || 'No critical failures observed.'}
          </p>
        </div>
      </div>
    </div>
  );
};
