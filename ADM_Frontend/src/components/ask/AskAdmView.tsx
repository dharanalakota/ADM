import React, { useState, useEffect } from 'react';
import { AdmQueryResult, VendorCategory, Decision } from '../../types/adm';
import { admService } from '../../services/admService';
import { 
  Compass, 
  Search, 
  Sparkles, 
  Database, 
  ArrowRight, 
  ShieldAlert, 
  CheckCircle2, 
  AlertCircle, 
  Clock, 
  FileCheck, 
  Layers,
  ChevronRight,
  Filter
} from 'lucide-react';

interface AskAdmViewProps {
  initialQuery?: string;
  onSelectDecision: (decisionId: string) => void;
  onRecordNewDecision: () => void;
}

const QUESTION_STARTERS = [
  'What have we learned from previous logistics vendors?',
  'What risks appeared in similar vendor decisions?',
  'What factors were associated with successful outcomes?',
  'What should I consider before selecting this vendor?',
  'Show me similar decisions and what happened.'
];

export const AskAdmView: React.FC<AskAdmViewProps> = ({
  initialQuery = '',
  onSelectDecision,
  onRecordNewDecision
}) => {
  const [query, setQuery] = useState(initialQuery);
  const [categoryFilter, setCategoryFilter] = useState<string>('All');
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<AdmQueryResult | null>(null);

  useEffect(() => {
    if (initialQuery) {
      handleSearch(initialQuery);
    }
  }, [initialQuery]);

  const handleSearch = async (queryString?: string) => {
    const q = queryString || query;
    if (!q.trim()) return;

    setIsLoading(true);
    try {
      const res = await admService.askAdm({
        query: q,
        categoryFilter: categoryFilter === 'All' ? undefined : categoryFilter
      });
      setResult(res);
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleStarterClick = (starter: string) => {
    setQuery(starter);
    handleSearch(starter);
  };

  return (
    <div className="max-w-5xl mx-auto space-y-6 pb-16">
      {/* Workspace Header */}
      <div>
        <div className="flex items-center gap-2 mb-1">
          <div className="w-6 h-6 rounded-md bg-[#522912] text-amber-200 flex items-center justify-center">
            <Compass className="w-3.5 h-3.5" />
          </div>
          <h2 className="text-2xl font-bold text-stone-900 tracking-tight">
            Ask ADM
          </h2>
        </div>
        <p className="text-sm text-stone-600">
          Ask what your past decisions can teach you about the next one. ADM retrieves historical experience and evidence to support forward-looking choices.
        </p>
      </div>

      {/* Query Search Card */}
      <section className="bg-white border border-[#E7DFD5] rounded-xl p-5 shadow-2xs space-y-4">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSearch();
          }}
          className="space-y-3"
        >
          <div className="relative flex items-center">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-stone-400" />
            <input
              type="text"
              placeholder="Ask ADM about a decision (e.g. 'What risks should we look out for in logistics vendors?')..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="w-full pl-12 pr-28 py-3 text-sm sm:text-base bg-white border border-[#E3DCD2] rounded-xl text-stone-900 placeholder:text-stone-400 focus:outline-hidden focus:ring-2 focus:ring-[#B45309] shadow-2xs"
            />
            <button
              type="submit"
              disabled={isLoading || !query.trim()}
              className="absolute right-2 top-1/2 -translate-y-1/2 inline-flex items-center gap-1.5 px-4 py-2 text-xs sm:text-sm font-semibold text-white bg-[#B45309] hover:bg-[#9A3412] disabled:opacity-50 rounded-lg transition-colors shadow-2xs"
            >
              {isLoading ? (
                <>
                  <Clock className="w-4 h-4 animate-spin" />
                  <span>Synthesizing...</span>
                </>
              ) : (
                <>
                  <span>Consult</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </>
              )}
            </button>
          </div>

          {/* Category Filter Pills */}
          <div className="flex items-center gap-2 pt-1 overflow-x-auto text-xs">
            <span className="text-stone-400 font-medium shrink-0 flex items-center gap-1">
              <Filter className="w-3 h-3" />
              <span>Scope:</span>
            </span>
            {[
              'All',
              'Logistics & Freight',
              'Hardware & Infrastructure',
              'Cloud Infrastructure',
              'Packaging & Materials',
              'Security & Compliance'
            ].map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setCategoryFilter(cat)}
                className={`px-2.5 py-1 rounded-md whitespace-nowrap transition-colors ${
                  categoryFilter === cat
                    ? 'bg-[#EFE8DF] text-[#7C2D12] font-semibold border border-[#E5DDD2]'
                    : 'text-stone-600 hover:text-stone-900 hover:bg-[#F4EFEA]'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </form>

        {/* QUESTION STARTERS */}
        <div className="pt-2 border-t border-[#F2ECE3]">
          <span className="text-[11px] font-bold uppercase tracking-wider text-stone-400 block mb-2">
            Suggested Decision Inquiries
          </span>
          <div className="flex flex-wrap gap-2">
            {QUESTION_STARTERS.map((starter, idx) => (
              <button
                key={idx}
                onClick={() => handleStarterClick(starter)}
                className="text-xs text-stone-700 bg-[#FAF7F2] border border-[#E7DFD5] hover:border-[#B45309]/50 hover:bg-white hover:text-[#7C2D12] px-3 py-1.5 rounded-lg text-left transition-all"
              >
                "{starter}"
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* SYNTHESIZED RESULTS WORKSPACE */}
      {result && (
        <div className="space-y-6 animate-in fade-in duration-200">
          {/* Main Strategic Recommendation Card */}
          <section className="bg-gradient-to-br from-white to-[#FDFBF7] border border-[#E2D5C3] rounded-xl p-5 sm:p-6 shadow-2xs space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-[#F0E6D8] pb-3">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-lg bg-[#522912] text-amber-200 flex items-center justify-center">
                  <Sparkles className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-stone-900 tracking-tight">
                    ADM Strategic Synthesis
                  </h3>
                  <span className="text-[11px] text-stone-500">
                  {result.historicalExperience.length} historical memories retrieved from ADM persistent memory
                  </span>
                </div>
              </div>
<div className="flex items-center gap-2 self-start sm:self-auto">
  <span className="text-xs font-mono font-semibold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
    {result.memoryStatus === 'candidate_memories_retrieved'
      ? 'Hindsight Memory Found'
      : 'No Relevant Memory'}
  </span>
</div>
             
            </div>

            {/* Synthesis Prose */}
            <div className="space-y-3">
              <p className="text-sm text-stone-800 leading-relaxed">
                {result.synthesis}
              </p>

              <div className="p-4 rounded-xl bg-[#FAF0E6] border border-[#E7DFD5] text-stone-900 space-y-1">
                <span className="text-[11px] font-bold uppercase tracking-wider text-[#9A3412] block">
                  Actionable Recommendation
                </span>
                <p className="text-xs sm:text-sm font-semibold text-stone-900 leading-snug">
                  {result.recommendation}
                </p>
              </div>
            </div>

            {/* Quick Record Decision CTA with this insight */}
            <div className="pt-2 flex justify-end">
              <button
                onClick={onRecordNewDecision}
                className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-white bg-[#B45309] hover:bg-[#9A3412] rounded-lg transition-colors shadow-2xs"
              >
                <span>Record New Decision Using This Evidence</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </section>

          {/* TWO-COLUMN MATRIX: Correlated Success Factors & Identified Risks */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Column 1: Factors Associated with Success */}
            <div className="bg-white border border-[#E7DFD5] rounded-xl p-5 shadow-2xs space-y-3">
              <div className="flex items-center gap-2 border-b border-[#F2ECE3] pb-2 text-emerald-800">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <h4 className="text-xs font-bold uppercase tracking-wider">
                  Factors Correlated with Success
                </h4>
              </div>
              <ul className="space-y-2 text-xs text-stone-700">
                {result.correlatedSuccessFactors.map((factor, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span className="text-emerald-600 font-bold mt-0.5">•</span>
                    <span>{factor}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Column 2: Recurring Risks & Pitfalls */}
            <div className="bg-white border border-[#E7DFD5] rounded-xl p-5 shadow-2xs space-y-3">
              <div className="flex items-center gap-2 border-b border-[#F2ECE3] pb-2 text-[#9A3412]">
                <ShieldAlert className="w-4 h-4 text-[#B45309]" />
                <h4 className="text-xs font-bold uppercase tracking-wider">
                  Historical Failure Modes & Warnings
                </h4>
              </div>
              <ul className="space-y-2 text-xs text-stone-700">
                {result.identifiedRisks.map((risk, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span className="text-[#B45309] font-bold mt-0.5">•</span>
                    <span>{risk}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* RECOMMENDED CONTRACT CHECKLIST FOR NEXT DECISION */}
          <section className="bg-white border border-[#E7DFD5] rounded-xl p-5 shadow-2xs space-y-3">
            <div className="flex items-center gap-2 border-b border-[#F2ECE3] pb-2">
              <FileCheck className="w-4 h-4 text-[#B45309]" />
              <h4 className="text-xs font-bold uppercase tracking-wider text-stone-900">
                Recommended RFP & Contract Clauses
              </h4>
            </div>
            <p className="text-xs text-stone-500">
              Specific contractual protections suggested by past outcome variances:
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {result.contractChecklist.map((item, idx) => (
                <div key={idx} className="p-3 rounded-lg bg-[#FAF7F2] border border-[#E7DFD5] text-xs space-y-1">
                  <span className="font-mono text-[10px] text-stone-400 font-semibold">CLAUSE {idx + 1}</span>
                  <p className="text-stone-800 font-medium leading-relaxed">{item}</p>
                </div>
              ))}
            </div>
          </section>

          {/* HISTORICAL MEMORY EVIDENCE */}
<section className="bg-white border border-[#E7DFD5] rounded-xl shadow-2xs overflow-hidden">
  <div className="p-4 sm:p-5 border-b border-[#F2ECE3] flex items-center justify-between">
    <div>
      <h4 className="text-sm font-bold text-stone-900 uppercase tracking-wider">
        Supporting Historical Evidence
      </h4>
      <p className="text-xs text-stone-500">
        Historical experience retrieved from ADM persistent memory
      </p>
    </div>

    <span className="text-xs text-stone-500 font-mono">
      {result.historicalExperience.length} Memories Retrieved
    </span>
  </div>

  <div className="divide-y divide-[#F5EFE8]">
    {result.historicalExperience.length > 0 ? (
      result.historicalExperience.map((memory, idx) => (
        <div
          key={idx}
          className="p-4 sm:p-5 hover:bg-[#FAF7F2] transition-colors"
        >
          <div className="flex items-center gap-2 mb-2">
            <span className="w-6 h-6 rounded-md bg-[#FAF0E6] text-[#9A3412] flex items-center justify-center text-[10px] font-bold">
              {idx + 1}
            </span>

            <span className="text-xs font-bold uppercase tracking-wider text-stone-700">
              Historical Memory
            </span>
          </div>

          <p className="text-sm text-stone-700 leading-relaxed">
            {memory}
          </p>
        </div>
      ))
    ) : (
      <div className="p-5 text-sm text-stone-500">
        No relevant historical organizational experience was found.
      </div>
    )}
  </div>

  {result.whatHappenedPreviously.length > 0 && (
    <div className="p-4 sm:p-5 border-t border-[#F2ECE3] bg-[#FDFBF7]">
      <h5 className="text-xs font-bold uppercase tracking-wider text-stone-800 mb-3">
        What Happened Previously
      </h5>

      <div className="space-y-2">
        {result.whatHappenedPreviously.map((item, idx) => (
          <div
            key={idx}
            className="flex items-start gap-2 text-xs text-stone-700"
          >
            <span className="text-[#B45309] font-bold mt-0.5">•</span>
            <span>{item}</span>
          </div>
        ))}
      </div>
    </div>
  )}
</section>
        </div>
      )}
    </div>
  );
};
