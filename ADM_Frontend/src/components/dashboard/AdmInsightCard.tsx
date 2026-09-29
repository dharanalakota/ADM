import React from 'react';
import { HistoricalInsight } from '../../types/adm';
import { Lightbulb, Database, ArrowRight, ShieldAlert, Sparkles } from 'lucide-react';

interface AdmInsightCardProps {
  insight: HistoricalInsight;
  onExploreEvidence: (insight: HistoricalInsight) => void;
  onAskAboutInsight?: (insight: HistoricalInsight) => void;
}

export const AdmInsightCard: React.FC<AdmInsightCardProps> = ({
  insight,
  onExploreEvidence,
  onAskAboutInsight
}) => {
  return (
    <div className="bg-gradient-to-br from-white to-[#FDFBF7] border border-[#E2D5C3] rounded-xl p-5 shadow-2xs relative overflow-hidden">
      {/* Decorative subtle Sahara sand texture accent */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-[#D97706]/5 rounded-bl-full pointer-events-none" />

      {/* Card kicker */}
      <div className="flex items-center justify-between gap-3 pb-3 border-b border-[#F0E6D8]">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg bg-[#FAF0E6] border border-[#E7DFD5] flex items-center justify-center text-[#B45309]">
            <Lightbulb className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-[#9A3412]">
              What ADM Learned
            </h3>
            <span className="text-[11px] text-stone-500 font-medium">
              Autonomous pattern synthesized from historical outcomes
            </span>
          </div>
        </div>

        <span className="text-xs text-stone-500 font-mono">
          {insight.category}
        </span>
      </div>

      {/* Main Insight Prose */}
      <div className="mt-4">
        <blockquote className="text-base sm:text-lg font-semibold text-stone-900 leading-snug tracking-tight">
          "{insight.summary}"
        </blockquote>

        <p className="mt-2.5 text-xs text-stone-600 leading-relaxed">
          {insight.keyLesson}
        </p>

        {insight.riskWarning && (
          <div className="mt-3 flex items-start gap-2 p-2.5 rounded-lg bg-[#FEF3C7]/40 border border-[#FDE68A] text-xs text-amber-900">
            <ShieldAlert className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
            <div>
              <span className="font-semibold text-amber-950">Identified Risk: </span>
              <span>{insight.riskWarning}</span>
            </div>
          </div>
        )}
      </div>

      {/* Footer: Evidence backing + Action Buttons */}
      <div className="mt-5 pt-3.5 border-t border-[#F0E6D8] flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex items-center gap-2 text-xs text-stone-600">
          <Database className="w-3.5 h-3.5 text-[#B45309]" />
          <span className="font-medium text-stone-800">
            Based on {insight.evidenceDecisionsCount} historical decisions
          </span>
          <span className="text-stone-300" aria-hidden="true">·</span>
          <span className="text-stone-500 font-mono text-[11px]">Empirical correlation</span>
        </div>

        <div className="flex items-center gap-2">
          {onAskAboutInsight && (
            <button
              onClick={() => onAskAboutInsight(insight)}
              className="px-3 py-1.5 text-xs font-medium text-stone-700 hover:text-stone-900 bg-white border border-[#E3DCD2] hover:bg-[#FAF7F2] rounded-lg transition-colors whitespace-nowrap"
            >
              Ask ADM More
            </button>
          )}

          <button
            onClick={() => onExploreEvidence(insight)}
            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-semibold text-white bg-[#B45309] hover:bg-[#9A3412] rounded-lg transition-colors shadow-2xs whitespace-nowrap"
          >
            <span>Explore Evidence</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
};
