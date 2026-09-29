import React, { useState } from 'react';
import { MemoryLoopStage } from '../../types/adm';
import { 
  ArrowRight, 
  ArrowDown, 
  Layers, 
  CheckCircle2, 
  Database, 
  Lightbulb, 
  Compass, 
  Sparkles,
  ChevronRight
} from 'lucide-react';

interface MemoryLoopProps {
  scenarios: MemoryLoopStage[];
  onExploreScenario?: (stage: MemoryLoopStage) => void;
}

export const MemoryLoop: React.FC<MemoryLoopProps> = ({ 
  scenarios = [],
  onExploreScenario 
}) => {
  const [selectedScenarioId, setSelectedScenarioId] = useState<string>(scenarios[0]?.id || 'stage_acme');
  const [activeStep, setActiveStep] = useState<number>(0);

  const current = scenarios.find(s => s.id === selectedScenarioId) || scenarios[0];

  if (!current) {
    return null;
  }

  const steps = [
    {
      num: 1,
      name: 'Decision',
      icon: Layers,
      headline: current.vendorName,
      body: current.decisionText,
      tag: 'Recorded Context',
      bgTone: 'bg-white',
      accentColor: 'text-[#B45309]',
      borderColor: 'border-[#E7DFD5]'
    },
    {
      num: 2,
      name: 'Outcome',
      icon: CheckCircle2,
      headline: current.outcomeResult,
      body: current.outcomeText,
      tag: 'Actual Results',
      bgTone: 'bg-white',
      accentColor: current.outcomeResult === 'Successful' ? 'text-emerald-700' : 'text-[#B45309]',
      borderColor: 'border-[#E7DFD5]'
    },
    {
      num: 3,
      name: 'Historical Memory',
      icon: Database,
      headline: 'Retained Evidence',
      body: current.memoryText,
      tag: 'Pattern Stored',
      bgTone: 'bg-[#FAF4EB]',
      accentColor: 'text-[#7C2D12]',
      borderColor: 'border-[#E2D5C3]'
    },
    {
      num: 4,
      name: 'ADM Insight',
      icon: Lightbulb,
      headline: 'Learned Rule',
      body: current.insightText,
      tag: 'Synthesized Intelligence',
      bgTone: 'bg-[#FAF0E6]',
      accentColor: 'text-[#9A3412]',
      borderColor: 'border-[#DFCBB8]'
    },
    {
      num: 5,
      name: 'Next Decision',
      icon: Compass,
      headline: 'Evidence-Backed Support',
      body: current.nextDecisionText,
      tag: 'Behavior Changed',
      bgTone: 'bg-[#522912] text-white',
      accentColor: 'text-[#D97706]',
      borderColor: 'border-[#522912]'
    }
  ];

  return (
    <section className="bg-white border border-[#E7DFD5] rounded-xl p-5 shadow-2xs">
      {/* Header and Scenario Selector */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-[#F2ECE3]">
        <div>
          <div className="flex items-center gap-2">
            <span className="flex items-center justify-center w-6 h-6 rounded-md bg-[#FAF0E6] text-[#B45309]">
              <Sparkles className="w-3.5 h-3.5" />
            </span>
            <h2 className="text-base font-bold text-stone-900 tracking-tight">
              The Memory Loop in Action
            </h2>
          </div>
          <p className="mt-1 text-xs text-stone-600">
            Witness how recording actual outcomes permanently shifts ADM’s advice for subsequent business decisions.
          </p>
        </div>

        {/* Scenario Switcher Tabs */}
        <div className="flex items-center gap-1.5 p-1 bg-[#F4EFEA] rounded-lg border border-[#E5DDD2] self-start md:self-auto overflow-x-auto max-w-full">
          {scenarios.map((scenario) => {
            const isSelected = scenario.id === selectedScenarioId;
            return (
              <button
                key={scenario.id}
                onClick={() => {
                  setSelectedScenarioId(scenario.id);
                  setActiveStep(0);
                }}
                className={`px-3 py-1.5 text-xs font-medium rounded-md whitespace-nowrap transition-all ${
                  isSelected
                    ? 'bg-white text-stone-900 shadow-2xs font-semibold'
                    : 'text-stone-600 hover:text-stone-900 hover:bg-white/50'
                }`}
              >
                {scenario.title}
              </button>
            );
          })}
        </div>
      </div>

      {/* Visual Sequence Chain */}
      <div className="mt-5">
        {/* Step indicator breadcrumbs on mobile / tablet */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-3 relative">
          {steps.map((step, idx) => {
            const isLast = idx === steps.length - 1;
            const Icon = step.icon;
            const isHighlighted = activeStep === idx;
            const isNextDecision = idx === 4;

            return (
              <div 
                key={idx} 
                className="flex flex-col relative group cursor-pointer"
                onClick={() => setActiveStep(idx)}
              >
                <div
                  className={`flex flex-col justify-between h-full p-3.5 rounded-xl border transition-all duration-150 ${step.bgTone} ${step.borderColor} ${
                    isHighlighted ? 'ring-2 ring-[#B45309] shadow-sm' : 'hover:border-[#CBBDA9]'
                  }`}
                >
                  {/* Step kicker & header */}
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-1.5">
                        <span className={`text-[10px] font-mono font-bold px-1.5 py-0.5 rounded ${
                          isNextDecision ? 'bg-[#7C2D12] text-[#FDF4ED]' : 'bg-[#EAE4D7] text-stone-700'
                        }`}>
                          0{step.num}
                        </span>
                        <span className={`text-xs font-bold uppercase tracking-wider ${
                          isNextDecision ? 'text-amber-200' : 'text-stone-500'
                        }`}>
                          {step.name}
                        </span>
                      </div>
                      <Icon className={`w-3.5 h-3.5 ${step.accentColor}`} />
                    </div>

                    <div className={`text-xs font-semibold mb-1 line-clamp-1 ${
                      isNextDecision ? 'text-white' : 'text-stone-900'
                    }`}>
                      {step.headline}
                    </div>

                    <p className={`text-xs leading-relaxed ${
                      isNextDecision ? 'text-stone-200 font-normal' : 'text-stone-600'
                    }`}>
                      {step.body}
                    </p>
                  </div>

                  {/* Step status tag */}
                  <div className={`mt-3 pt-2 border-t text-[10px] font-medium flex items-center justify-between ${
                    isNextDecision ? 'border-white/15 text-amber-200' : 'border-stone-100 text-stone-500'
                  }`}>
                    <span>{step.tag}</span>
                    <ChevronRight className={`w-3 h-3 ${isNextDecision ? 'text-amber-300' : 'text-stone-400'}`} />
                  </div>
                </div>

                {/* Arrow connector for desktop */}
                {!isLast && (
                  <div className="hidden md:flex absolute -right-2 top-1/2 -translate-y-1/2 z-10 w-4 h-4 items-center justify-center rounded-full bg-white border border-[#DACFC0] text-stone-400 shadow-2xs">
                    <ArrowRight className="w-2.5 h-2.5 text-[#B45309]" />
                  </div>
                )}

                {/* Arrow connector for mobile */}
                {!isLast && (
                  <div className="md:hidden flex justify-center py-1">
                    <ArrowDown className="w-3.5 h-3.5 text-[#B45309]" />
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Explanatory Banner below the sequence */}
      <div className="mt-4 p-3 bg-[#FAF7F2] border border-[#E7DFD5] rounded-lg flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
        <div className="flex items-center gap-2 text-stone-700">
          <span className="font-semibold text-stone-900">Key Takeaway:</span>
          <span>Because outcome #2 was captured, ADM automatically upgraded the RFP criteria for the next decision.</span>
        </div>

        {onExploreScenario && (
          <button
            onClick={() => onExploreScenario(current)}
            className="text-xs font-semibold text-[#B45309] hover:text-[#7C2D12] inline-flex items-center gap-1 shrink-0 self-end sm:self-auto"
          >
            <span>View Decision Timeline</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        )}
      </div>
    </section>
  );
};
