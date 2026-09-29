import React from 'react';
import { HistoricalInsight } from '../../types/adm';
import { 
  Lightbulb, 
  Database, 
  Sparkles, 
  ArrowRight, 
  ShieldAlert, 
  TrendingUp,
  BarChart3,
  CheckCircle2,
  AlertTriangle
} from 'lucide-react';

interface InsightsViewProps {
  insights: HistoricalInsight[];
  onExploreEvidence: (insight: HistoricalInsight) => void;
  onAskAboutInsight: (insight: HistoricalInsight) => void;
}

export const InsightsView: React.FC<InsightsViewProps> = ({
  insights,
  onExploreEvidence,
  onAskAboutInsight
}) => {
  return (
    <div className="max-w-6xl mx-auto space-y-6 pb-12">
      {/* Header */}
      <div>
        <div className="flex items-center gap-2 mb-1">
          <div className="w-6 h-6 rounded-md bg-[#522912] text-amber-200 flex items-center justify-center">
            <Lightbulb className="w-3.5 h-3.5" />
          </div>
          <h2 className="text-2xl font-bold text-stone-900 tracking-tight">
            ADM Learned Patterns & Memory Rules
          </h2>
        </div>
        <p className="text-sm text-stone-600">
          Cross-category decision intelligence extracted from post-decision outcomes. These rules actively guide future recommendations in Ask ADM.
        </p>
      </div>

      {/* Overconfidence & Calibration Metric Analysis */}
      <section className="bg-white border border-[#E7DFD5] rounded-xl p-5 shadow-2xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#F2ECE3] pb-4">
          <div>
            <span className="text-[11px] font-bold uppercase tracking-wider text-[#9A3412] block">
              Organizational Decision Calibration
            </span>
            <h3 className="text-base font-bold text-stone-900">
              Confidence Rating vs Physical Outcome Success
            </h3>
          </div>
          <span className="text-xs text-stone-500 font-mono">
            Analyzed across 96 verified outcomes
          </span>
        </div>

        <div className="mt-4 grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="p-4 rounded-xl bg-[#FAF7F2] border border-[#E5DDD2] space-y-1">
            <span className="text-xs font-semibold text-stone-600 block">High Confidence Decisions</span>
            <div className="text-xl font-bold font-mono text-stone-900">79% Success Rate</div>
            <p className="text-[11px] text-stone-500">
              18% resulted in unexpected transit or tooling overruns
            </p>
          </div>

          <div className="p-4 rounded-xl bg-[#FAF7F2] border border-[#E5DDD2] space-y-1">
            <span className="text-xs font-semibold text-stone-600 block">Medium Confidence Decisions</span>
            <div className="text-xl font-bold font-mono text-[#B45309]">64% Success Rate</div>
            <p className="text-[11px] text-stone-500">
              Strongest candidate for upfront ADM contract clause enforcement
            </p>
          </div>

          <div className="p-4 rounded-xl bg-[#FAF7F2] border border-[#E5DDD2] space-y-1">
            <span className="text-xs font-semibold text-stone-600 block">Sole-Sourced Decisions</span>
            <div className="text-xl font-bold font-mono text-rose-800">31% Budget Variance</div>
            <p className="text-[11px] text-stone-500">
              Exhibited 2.4x higher probability of unbudgeted secondary fees
            </p>
          </div>
        </div>
      </section>

      {/* Insights Cards List */}
      <div className="space-y-4">
        {insights.map((insight) => (
          <div
            key={insight.id}
            className="bg-white border border-[#E7DFD5] rounded-xl p-5 sm:p-6 shadow-2xs space-y-4 hover:border-[#DACFC0] transition-colors"
          >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-[#F2ECE3] pb-3">
              <div className="flex items-center gap-2">
                <span className="text-xs font-semibold text-[#9A3412] bg-[#FAF0E6] px-2 py-0.5 rounded border border-[#E7DFD5]">
                  {insight.category}
                </span>
                <span className="text-stone-300" aria-hidden="true">·</span>
                <span className="text-xs text-stone-500 font-mono">
                  Indexed {insight.createdDate}
                </span>
              </div>

              <div className="flex items-center gap-1.5 text-xs text-stone-600">
                <Database className="w-3.5 h-3.5 text-[#B45309]" />
                <span className="font-semibold text-stone-800">
                  {insight.evidenceDecisionsCount} Supporting Decisions
                </span>
              </div>
            </div>

            <div>
              <h4 className="text-base sm:text-lg font-bold text-stone-900 tracking-tight">
                {insight.title}
              </h4>
              <p className="mt-1.5 text-xs sm:text-sm text-stone-700 leading-relaxed font-medium">
                "{insight.summary}"
              </p>
              <p className="mt-2 text-xs text-stone-600 leading-relaxed">
                {insight.keyLesson}
              </p>
            </div>

            {insight.riskWarning && (
              <div className="p-3 bg-[#FEF3C7]/40 border border-[#FDE68A] rounded-lg text-xs text-amber-950 flex items-start gap-2">
                <ShieldAlert className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold">Systemic Warning: </span>
                  <span>{insight.riskWarning}</span>
                </div>
              </div>
            )}

            <div className="p-3 bg-[#FAF7F2] border border-[#E7DFD5] rounded-lg text-xs text-stone-800">
              <span className="font-bold text-[#7C2D12] block mb-0.5">Recommended Future Action:</span>
              <p className="text-stone-700">{insight.recommendedAction}</p>
            </div>

            {/* Actions */}
            <div className="pt-2 flex items-center justify-between">
              <button
                onClick={() => onAskAboutInsight(insight)}
                className="text-xs font-semibold text-stone-600 hover:text-stone-900"
              >
                Consult ADM on this pattern
              </button>

              <button
                onClick={() => onExploreEvidence(insight)}
                className="inline-flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-semibold text-white bg-[#B45309] hover:bg-[#9A3412] rounded-lg transition-colors shadow-2xs"
              >
                <span>Explore Evidence</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
