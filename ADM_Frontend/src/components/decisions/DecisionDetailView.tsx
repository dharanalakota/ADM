import React from 'react';
import { Decision } from '../../types/adm';
import { 
  ArrowLeft, 
  Plus, 
  CheckCircle2, 
  Clock, 
  Calendar, 
  MapPin, 
  Building2, 
  Database, 
  Lightbulb, 
  ArrowUpRight,
  TrendingUp,
  AlertCircle
} from 'lucide-react';

interface DecisionDetailViewProps {
  decision: Decision;
  onBack: () => void;
  onRecordOutcome: (decisionId: string) => void;
  onViewOutcomeDetail?: (decisionId: string) => void;
}

export const DecisionDetailView: React.FC<DecisionDetailViewProps> = ({
  decision,
  onBack,
  onRecordOutcome,
  onViewOutcomeDetail
}) => {
  const hasOutcome = Boolean(decision.outcome);

  return (
    <div className="max-w-4xl mx-auto space-y-6 pb-12">
      {/* Top Navigation Back button */}
      <div>
        <button
          onClick={onBack}
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-stone-600 hover:text-stone-900 transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to Decisions</span>
        </button>
      </div>

      {/* Header Banner */}
      <div className="bg-white border border-[#E7DFD5] rounded-xl p-5 sm:p-6 shadow-2xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs text-stone-500 font-medium mb-1">
              <span>{decision.vendorCategory}</span>
              <span aria-hidden="true">·</span>
              <span className="flex items-center gap-1">
                <MapPin className="w-3 h-3 text-stone-400" />
                {decision.location}
              </span>
            </div>
            <h2 className="text-2xl font-bold text-stone-900 tracking-tight">
              {decision.vendorName}
            </h2>
            <p className="mt-1 text-xs sm:text-sm text-stone-600">
              {decision.projectRequirement}
            </p>
          </div>

          <div className="flex flex-col sm:items-end gap-2 shrink-0">
            <div className="flex items-center gap-2">
              <span className={`text-xs font-semibold px-2.5 py-1 rounded-md ${
                decision.decisionType === 'Selected' 
                  ? 'bg-emerald-50 text-emerald-800 border border-emerald-200' 
                  : decision.decisionType === 'Rejected'
                  ? 'bg-stone-100 text-stone-700 border border-stone-200'
                  : 'bg-amber-50 text-amber-800 border border-amber-200'
              }`}>
                {decision.decisionType}
              </span>

              <span className={`text-xs font-medium px-2 py-0.5 rounded ${
                decision.status === 'Completed'
                  ? 'text-emerald-700 bg-emerald-50'
                  : 'text-[#B45309] bg-[#FAF0E6]'
              }`}>
                {decision.status}
              </span>
            </div>

            <span className="text-[11px] text-stone-400 font-mono">
              Recorded {decision.decisionDate} by {decision.recordedBy}
            </span>
          </div>
        </div>
      </div>

      {/* Outcome CTA Banner if Outcome is missing */}
      {!hasOutcome && decision.decisionType !== 'Rejected' && (
        <div className="bg-gradient-to-r from-[#FAF0E6] to-[#FDFBF7] border border-[#E5DDD2] rounded-xl p-5 shadow-2xs">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="space-y-1">
              <div className="flex items-center gap-2 text-[#9A3412] font-bold text-sm">
                <Clock className="w-4 h-4 text-[#B45309]" />
                <span>Outcome Pending</span>
              </div>
              <p className="text-xs text-stone-700 max-w-xl leading-relaxed">
                Recording what actually happened allows ADM to learn from this decision and adjust recommendations for upcoming vendor evaluations.
              </p>
            </div>

            <button
              onClick={() => onRecordOutcome(decision.id)}
              className="inline-flex items-center justify-center gap-2 px-4 py-2.5 text-xs sm:text-sm font-semibold text-white bg-[#B45309] hover:bg-[#9A3412] rounded-lg shadow-xs transition-colors shrink-0 whitespace-nowrap"
            >
              <Plus className="w-4 h-4" />
              <span>Record Outcome</span>
            </button>
          </div>
        </div>
      )}

      {/* Decision Memory Timeline: Visualizes the 4 stages */}
      <section className="bg-white border border-[#E7DFD5] rounded-xl p-5 sm:p-6 shadow-2xs space-y-4">
        <h3 className="text-sm font-bold text-stone-900 uppercase tracking-wider border-b border-[#F2ECE3] pb-3">
          Memory Lifecycle Timeline
        </h3>

        <div className="relative pl-6 sm:pl-8 space-y-6 before:absolute before:left-3 before:top-2 before:bottom-2 before:w-0.5 before:bg-[#E7DFD5]">
          {/* Step 1: Decision Recorded */}
          <div className="relative">
            <div className="absolute -left-6 sm:-left-8 top-0.5 w-6 h-6 rounded-full bg-emerald-100 border-2 border-emerald-600 flex items-center justify-center text-emerald-700">
              <CheckCircle2 className="w-3.5 h-3.5" />
            </div>
            <div>
              <div className="flex items-center gap-2 text-xs">
                <span className="font-bold text-stone-900">Decision Recorded</span>
                <span className="text-stone-400 font-mono text-[11px]">{decision.decisionDate}</span>
              </div>
              <p className="mt-1 text-xs text-stone-700 leading-relaxed">
                {decision.vendorName} was {decision.decisionType.toLowerCase()} for the {decision.projectRequirement.toLowerCase()}.
              </p>
            </div>
          </div>

          {/* Step 2: Expected Outcome */}
          <div className="relative">
            <div className="absolute -left-6 sm:-left-8 top-0.5 w-6 h-6 rounded-full bg-stone-100 border-2 border-stone-400 flex items-center justify-center text-stone-600">
              <Clock className="w-3.5 h-3.5" />
            </div>
            <div>
              <div className="flex items-center gap-2 text-xs">
                <span className="font-bold text-stone-900">Expected Outcome</span>
                <span className="text-[11px] text-stone-400 font-mono">Baseline Target</span>
              </div>
              <p className="mt-1 text-xs text-stone-700 leading-relaxed">
                "{decision.expectedOutcome}"
              </p>
            </div>
          </div>

          {/* Step 3: Actual Outcome */}
          <div className="relative">
            <div className={`absolute -left-6 sm:-left-8 top-0.5 w-6 h-6 rounded-full flex items-center justify-center ${
              hasOutcome 
                ? 'bg-amber-100 border-2 border-[#B45309] text-[#7C2D12]' 
                : 'bg-stone-50 border-2 border-dashed border-stone-300 text-stone-400'
            }`}>
              <CheckCircle2 className="w-3.5 h-3.5" />
            </div>
            <div>
              <div className="flex items-center gap-2 text-xs">
                <span className="font-bold text-stone-900">Actual Outcome</span>
                {hasOutcome ? (
                  <span className="text-xs font-semibold text-emerald-700 font-mono">
                    Recorded {decision.outcome?.recordedDate} ({decision.outcome?.result})
                  </span>
                ) : (
                  <span className="text-xs text-stone-400 font-mono">Not recorded yet</span>
                )}
              </div>
              {hasOutcome ? (
                <div className="mt-1 space-y-2">
                  <p className="text-xs text-stone-700 leading-relaxed">
                    {decision.outcome?.actualOutcomeDescription}
                  </p>
                  {onViewOutcomeDetail && (
                    <button
                      onClick={() => onViewOutcomeDetail(decision.id)}
                      className="text-xs font-semibold text-[#B45309] hover:text-[#7C2D12] inline-flex items-center gap-1"
                    >
                      <span>View Outcome Details & Performance Metrics</span>
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>
              ) : (
                <p className="mt-1 text-xs text-stone-400 italic">
                  Awaiting operational deployment feedback to compare actual metrics against expectations.
                </p>
              )}
            </div>
          </div>

          {/* Step 4: Historical Learning */}
          <div className="relative">
            <div className={`absolute -left-6 sm:-left-8 top-0.5 w-6 h-6 rounded-full flex items-center justify-center ${
              hasOutcome 
                ? 'bg-[#FAF0E6] border-2 border-[#9A3412] text-[#9A3412]' 
                : 'bg-stone-50 border-2 border-dashed border-stone-300 text-stone-400'
            }`}>
              <Lightbulb className="w-3.5 h-3.5" />
            </div>
            <div>
              <div className="flex items-center gap-2 text-xs">
                <span className="font-bold text-stone-900">Historical Learning</span>
                {hasOutcome ? (
                  <span className="text-xs font-mono text-[#9A3412]">Synthesized by ADM</span>
                ) : (
                  <span className="text-xs text-stone-400 font-mono">Not available yet</span>
                )}
              </div>
              {hasOutcome ? (
                <div className="mt-1 p-3 rounded-lg bg-[#FAF0E6] border border-[#E7DFD5] text-xs space-y-1.5">
                  <p className="font-medium text-stone-900 leading-snug">
                    {decision.outcome?.admLearned}
                  </p>
                  <p className="text-stone-600 text-[11px]">
                    <span className="font-semibold text-stone-800">Future Impact: </span>
                    {decision.outcome?.futureDecisionImpact}
                  </p>
                </div>
              ) : (
                <p className="mt-1 text-xs text-stone-400 italic">
                  Once an outcome is recorded, ADM extracts systemic learnings and integrates them into future decision guidance.
                </p>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Grid of Context, Reasoning, and Expectation Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Card 1: Decision Context */}
        <div className="bg-white border border-[#E7DFD5] rounded-xl p-5 shadow-2xs space-y-3">
          <h4 className="text-xs font-bold text-stone-900 uppercase tracking-wider border-b border-[#F2ECE3] pb-2">
            Decision Context
          </h4>

          <div className="space-y-2 text-xs">
            <div className="flex justify-between py-1 border-b border-stone-100">
              <span className="text-stone-500">Confidence Level</span>
              <span className="font-semibold text-stone-900">{decision.confidence} Confidence</span>
            </div>

            <div className="flex justify-between py-1 border-b border-stone-100">
              <span className="text-stone-500">Budget / Contract</span>
              <span className="font-semibold text-stone-900">{decision.budget || 'Not specified'}</span>
            </div>

            <div className="flex justify-between py-1 border-b border-stone-100">
              <span className="text-stone-500">Contract Duration</span>
              <span className="font-semibold text-stone-900">{decision.contractDuration || 'Not specified'}</span>
            </div>

            <div className="pt-2">
              <span className="text-stone-500 block mb-1 font-medium">Evaluation Factors Considered:</span>
              <div className="flex flex-wrap gap-1.5">
                {decision.evaluationFactors.filter(f => f.selected).map(f => (
                  <span
                    key={f.id}
                    className="text-[11px] font-medium bg-[#FAF7F2] border border-[#E5DDD2] text-stone-800 px-2 py-0.5 rounded"
                  >
                    {f.name}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Card 2: Objective & Alternatives */}
        <div className="bg-white border border-[#E7DFD5] rounded-xl p-5 shadow-2xs space-y-3">
          <h4 className="text-xs font-bold text-stone-900 uppercase tracking-wider border-b border-[#F2ECE3] pb-2">
            Target Objective & Alternatives
          </h4>

          <div className="space-y-3 text-xs">
            <div>
              <span className="font-semibold text-stone-800 block mb-0.5">What we aimed to achieve:</span>
              <p className="text-stone-600 leading-relaxed">
                {decision.contextGoal || 'Objective documented in RFP specs.'}
              </p>
            </div>

            <div className="pt-2 border-t border-stone-100">
              <span className="font-semibold text-stone-800 block mb-0.5">Alternatives considered:</span>
              <p className="text-stone-600 leading-relaxed">
                {decision.contextAlternatives || 'Direct sole source based on immediate regional requirements.'}
              </p>
            </div>
          </div>
        </div>

        {/* Card 3: Reasoning (Span 2) */}
        <div className="md:col-span-2 bg-white border border-[#E7DFD5] rounded-xl p-5 shadow-2xs space-y-2">
          <div className="flex items-center justify-between border-b border-[#F2ECE3] pb-2">
            <h4 className="text-xs font-bold text-stone-900 uppercase tracking-wider">
              Why this decision was made
            </h4>
            <span className="text-[11px] text-stone-400 font-mono">Recorded rationale</span>
          </div>

          <p className="text-xs sm:text-sm text-stone-800 leading-relaxed pt-1">
            {decision.reasoning}
          </p>
        </div>

        {/* Card 4: Expectation Card (Span 2) */}
        <div className="md:col-span-2 bg-[#FAF7F2] border border-[#E7DFD5] rounded-xl p-5 shadow-2xs space-y-2">
          <div className="flex items-center justify-between border-b border-[#E5DDD2] pb-2">
            <h4 className="text-xs font-bold text-stone-900 uppercase tracking-wider">
              Expected Outcome Baseline
            </h4>
            <span className="text-[11px] text-[#B45309] font-mono">Benchmark for comparison</span>
          </div>

          <p className="text-xs sm:text-sm text-stone-800 leading-relaxed pt-1 font-medium">
            "{decision.expectedOutcome}"
          </p>
        </div>
      </div>
    </div>
  );
};
