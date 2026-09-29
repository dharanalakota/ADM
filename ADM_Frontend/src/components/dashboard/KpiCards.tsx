import React from 'react';
import { MemoryStats } from '../../types/adm';
import { Layers, CheckCircle2, TrendingUp, Sparkles } from 'lucide-react';

interface KpiCardsProps {
  stats: MemoryStats;
}

export const KpiCards: React.FC<KpiCardsProps> = ({ stats }) => {
  const cards = [
    {
      title: 'Total Decisions',
      value: stats.totalDecisions,
      subtext: 'Captured context & reasoning',
      icon: Layers,
      trend: '+12 this quarter',
      color: 'text-stone-900',
      accentBg: 'bg-[#F4EFEA]'
    },
    {
      title: 'Outcomes Recorded',
      value: stats.outcomesRecorded,
      subtext: `${stats.outcomeRatePercent}% closure rate`,
      icon: CheckCircle2,
      trend: '75% coverage',
      color: 'text-stone-900',
      accentBg: 'bg-[#F4EFEA]'
    },
    {
      title: 'Successful Outcomes',
      value: stats.successfulOutcomes,
      subtext: 'Performance met expectations',
      icon: TrendingUp,
      trend: '74% positive variance',
      color: 'text-emerald-800',
      accentBg: 'bg-emerald-50'
    },
    {
      title: 'Historical Insights',
      value: stats.historicalInsights,
      subtext: 'Rules derived from outcomes',
      icon: Sparkles,
      trend: 'Evidence-backed memory',
      color: 'text-[#9A3412]',
      accentBg: 'bg-[#FAF0E6]'
    }
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {cards.map((card, idx) => {
        const Icon = card.icon;
        return (
          <div
            key={idx}
            className="flex flex-col justify-between p-4.5 bg-white border border-[#E7DFD5] rounded-xl shadow-2xs transition-shadow hover:shadow-xs"
          >
            <div className="flex items-center justify-between">
              <span className="text-xs font-medium text-stone-500 tracking-tight">
                {card.title}
              </span>
              <div className={`p-1.5 rounded-lg ${card.accentBg} text-stone-700`}>
                <Icon className="w-4 h-4 text-[#B45309]" />
              </div>
            </div>

            <div className="mt-3">
              <div className={`text-2xl sm:text-3xl font-bold font-mono tabular-nums tracking-tight ${card.color}`}>
                {card.value}
              </div>
              <div className="mt-1 flex items-center justify-between text-xs text-stone-500">
                <span className="truncate">{card.subtext}</span>
              </div>
            </div>

            <div className="mt-3 pt-2.5 border-t border-[#F2ECE3] flex items-center justify-between text-[11px] text-stone-500">
              <span className="font-medium text-stone-600">{card.trend}</span>
              <span className="text-[10px] text-stone-400 font-mono">INDEXED</span>
            </div>
          </div>
        );
      })}
    </div>
  );
};
