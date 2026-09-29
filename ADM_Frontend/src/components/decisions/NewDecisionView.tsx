import React, { useState } from 'react';
import { 
  VendorCategory, 
  DecisionType, 
  ConfidenceLevel, 
  EvaluationFactor, 
  CreateDecisionInput,
  Decision
} from '../../types/adm';
import { admService } from '../../services/admService';
import { 
  Building2, 
  FileText, 
  Sliders, 
  HelpCircle, 
  Check, 
  Clock, 
  CheckCircle2, 
  ArrowRight,
  Database,
  AlertCircle
} from 'lucide-react';

interface NewDecisionViewProps {
  onDecisionCreated: (decision: Decision) => void;
  onCancel: () => void;
}

const DEFAULT_FACTORS: EvaluationFactor[] = [
  { id: 'f1', name: 'Price', selected: true, note: '' },
  { id: 'f2', name: 'Quality', selected: true, note: '' },
  { id: 'f3', name: 'Delivery', selected: true, note: '' },
  { id: 'f4', name: 'Reliability', selected: true, note: '' },
  { id: 'f5', name: 'Support', selected: false, note: '' },
  { id: 'f6', name: 'Compliance', selected: false, note: '' },
  { id: 'f7', name: 'Technical capability', selected: true, note: '' },
];

export const NewDecisionView: React.FC<NewDecisionViewProps> = ({
  onDecisionCreated,
  onCancel
}) => {
  const [vendorName, setVendorName] = useState('');
  const [vendorCategory, setVendorCategory] = useState<VendorCategory>('Logistics & Freight');
  const [projectRequirement, setProjectRequirement] = useState('');
  const [location, setLocation] = useState('');
  const [decisionType, setDecisionType] = useState<DecisionType>('Selected');
  const [decisionDate, setDecisionDate] = useState(new Date().toISOString().split('T')[0]);
  const [evaluationFactors, setEvaluationFactors] = useState<EvaluationFactor[]>(DEFAULT_FACTORS);
  const [contextGoal, setContextGoal] = useState('');
  const [contextAlternatives, setContextAlternatives] = useState('');
  const [reasoning, setReasoning] = useState('');
  const [expectedOutcome, setExpectedOutcome] = useState('');
  const [confidence, setConfidence] = useState<ConfidenceLevel>('High');
  const [budget, setBudget] = useState('');
  const [contractDuration, setContractDuration] = useState('');

  // States for submission
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [recordedDecision, setRecordedDecision] = useState<Decision | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [draftSaved, setDraftSaved] = useState(false);

  const toggleFactor = (id: string) => {
    setEvaluationFactors(prev => prev.map(f => {
      if (f.id === id) {
        return { ...f, selected: !f.selected };
      }
      return f;
    }));
  };

  const updateFactorNote = (id: string, note: string) => {
    setEvaluationFactors(prev => prev.map(f => {
      if (f.id === id) {
        return { ...f, note };
      }
      return f;
    }));
  };

  const handleSaveDraft = () => {
    const draft = {
      vendorName,
      vendorCategory,
      projectRequirement,
      location,
      decisionType,
      decisionDate,
      evaluationFactors,
      contextGoal,
      contextAlternatives,
      reasoning,
      expectedOutcome,
      confidence,
      budget,
      contractDuration
    };
    localStorage.setItem('adm_decision_draft', JSON.stringify(draft));
    setDraftSaved(true);
    setTimeout(() => setDraftSaved(false), 3000);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);

    if (!vendorName.trim()) {
      setErrorMsg('Please enter a vendor name.');
      return;
    }
    if (!projectRequirement.trim()) {
      setErrorMsg('Please specify the project or requirement.');
      return;
    }
    if (!reasoning.trim()) {
      setErrorMsg('Please record your decision reasoning. ADM needs this to synthesize future lessons.');
      return;
    }
    if (!expectedOutcome.trim()) {
      setErrorMsg('Please define what you expect to happen so it can be compared with the actual outcome later.');
      return;
    }

    setIsSubmitting(true);

    try {
      const input: CreateDecisionInput = {
        vendorName,
        vendorCategory,
        projectRequirement,
        location,
        decisionType,
        decisionDate,
        evaluationFactors,
        contextGoal,
        contextAlternatives,
        reasoning,
        expectedOutcome,
        confidence,
        budget,
        contractDuration
      };

      // Call service layer contract
      const result = await admService.recordDecision(input);
      localStorage.removeItem('adm_decision_draft');
      setRecordedDecision(result);
    } catch (err: any) {
      setErrorMsg(err.message || 'Failed to record decision');
    } finally {
      setIsSubmitting(false);
    }
  };

  // If successfully recorded, show the post-record confirmation state
  if (recordedDecision) {
    return (
      <div className="max-w-2xl mx-auto py-10 px-4">
        <div className="bg-white border border-[#E2D5C3] rounded-2xl p-8 shadow-sm text-center">
          <div className="w-14 h-14 mx-auto rounded-full bg-emerald-50 border border-emerald-200 flex items-center justify-center text-emerald-700">
            <CheckCircle2 className="w-8 h-8" />
          </div>

          <h2 className="mt-5 text-2xl font-bold text-stone-900 tracking-tight">
            Decision recorded
          </h2>
          <p className="mt-2 text-sm text-stone-600 max-w-md mx-auto">
            This decision is now part of ADM's historical memory. When you later record what actually happened, ADM will extract lessons for your team's next decision.
          </p>

          <div className="mt-6 p-4 rounded-xl bg-[#FAF7F2] border border-[#E7DFD5] text-left text-xs space-y-2">
            <div className="flex justify-between">
              <span className="text-stone-500">Vendor:</span>
              <span className="font-semibold text-stone-900">{recordedDecision.vendorName}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-stone-500">Decision:</span>
              <span className="font-semibold text-stone-900">{recordedDecision.decisionType} ({recordedDecision.confidence} Confidence)</span>
            </div>
            <div className="flex justify-between">
              <span className="text-stone-500">Expected Outcome:</span>
              <span className="text-stone-700 text-right line-clamp-1">{recordedDecision.expectedOutcome}</span>
            </div>
          </div>

          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3">
            <button
              onClick={() => onDecisionCreated(recordedDecision)}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-2.5 text-sm font-semibold text-white bg-[#B45309] hover:bg-[#9A3412] rounded-lg shadow-xs transition-colors"
            >
              <span>View Decision</span>
              <ArrowRight className="w-4 h-4" />
            </button>
            <button
              onClick={() => {
                setRecordedDecision(null);
                setVendorName('');
                setProjectRequirement('');
                setReasoning('');
                setExpectedOutcome('');
              }}
              className="w-full sm:w-auto px-4 py-2.5 text-sm font-medium text-stone-700 hover:text-stone-900 bg-white border border-[#E3DCD2] hover:bg-[#FAF7F2] rounded-lg transition-colors"
            >
              Record Another Decision
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6 pb-12">
      {/* Page Header */}
      <div>
        <h2 className="text-2xl font-bold text-stone-900 tracking-tight">
          Record a Decision
        </h2>
        <p className="mt-1 text-sm text-stone-600">
          Capture the context behind today's decision. ADM will use it as future evidence.
        </p>
      </div>

      {draftSaved && (
        <div className="p-3 bg-[#FEF3C7] border border-[#FDE68A] text-amber-900 rounded-lg text-xs flex items-center gap-2">
          <Check className="w-4 h-4 text-amber-800" />
          <span>Draft saved locally.</span>
        </div>
      )}

      {errorMsg && (
        <div className="p-3.5 bg-rose-50 border border-rose-200 text-rose-800 rounded-lg text-xs flex items-center gap-2">
          <AlertCircle className="w-4 h-4 text-rose-600 shrink-0" />
          <span>{errorMsg}</span>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* SECTION 1: VENDOR */}
        <section className="bg-white border border-[#E7DFD5] rounded-xl p-5 sm:p-6 shadow-2xs space-y-4">
          <div className="flex items-center gap-2 border-b border-[#F2ECE3] pb-3">
            <Building2 className="w-4 h-4 text-[#B45309]" />
            <h3 className="text-sm font-bold text-stone-900 uppercase tracking-wider">
              Vendor Information
            </h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-stone-700 mb-1">
                Vendor Name *
              </label>
              <input
                type="text"
                required
                placeholder="e.g. Acme Logistics, NovaTech Supplies"
                value={vendorName}
                onChange={(e) => setVendorName(e.target.value)}
                className="w-full px-3 py-2 text-xs sm:text-sm bg-white border border-[#E3DCD2] rounded-lg text-stone-900 placeholder:text-stone-400 focus:outline-hidden focus:ring-2 focus:ring-[#B45309]"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-stone-700 mb-1">
                Vendor Category *
              </label>
              <select
                value={vendorCategory}
                onChange={(e) => setVendorCategory(e.target.value as VendorCategory)}
                className="w-full px-3 py-2 text-xs sm:text-sm bg-white border border-[#E3DCD2] rounded-lg text-stone-900 focus:outline-hidden focus:ring-2 focus:ring-[#B45309]"
              >
                <option value="Logistics & Freight">Logistics & Freight</option>
                <option value="Hardware & Infrastructure">Hardware & Infrastructure</option>
                <option value="Cloud Infrastructure">Cloud Infrastructure</option>
                <option value="Packaging & Materials">Packaging & Materials</option>
                <option value="Professional Services">Professional Services</option>
                <option value="Security & Compliance">Security & Compliance</option>
                <option value="Enterprise Software">Enterprise Software</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-stone-700 mb-1">
                Project / Requirement *
              </label>
              <input
                type="text"
                required
                placeholder="e.g. Hyderabad regional cold-chain delivery launch"
                value={projectRequirement}
                onChange={(e) => setProjectRequirement(e.target.value)}
                className="w-full px-3 py-2 text-xs sm:text-sm bg-white border border-[#E3DCD2] rounded-lg text-stone-900 placeholder:text-stone-400 focus:outline-hidden focus:ring-2 focus:ring-[#B45309]"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-stone-700 mb-1">
                Location / Region
              </label>
              <input
                type="text"
                placeholder="e.g. Hyderabad, India (Regional Hub)"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="w-full px-3 py-2 text-xs sm:text-sm bg-white border border-[#E3DCD2] rounded-lg text-stone-900 placeholder:text-stone-400 focus:outline-hidden focus:ring-2 focus:ring-[#B45309]"
              />
            </div>
          </div>
        </section>

        {/* SECTION 2: DECISION */}
        <section className="bg-white border border-[#E7DFD5] rounded-xl p-5 sm:p-6 shadow-2xs space-y-4">
          <div className="flex items-center gap-2 border-b border-[#F2ECE3] pb-3">
            <CheckCircle2 className="w-4 h-4 text-[#B45309]" />
            <h3 className="text-sm font-bold text-stone-900 uppercase tracking-wider">
              Decision & Terms
            </h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-stone-700 mb-1">
                Decision *
              </label>
              <div className="grid grid-cols-4 gap-1.5 p-1 bg-[#F4EFEA] border border-[#E5DDD2] rounded-lg">
                {(['Selected', 'Rejected', 'Shortlisted', 'Deferred'] as DecisionType[]).map((type) => (
                  <button
                    key={type}
                    type="button"
                    onClick={() => setDecisionType(type)}
                    className={`py-1.5 text-xs font-semibold rounded-md transition-all ${
                      decisionType === type
                        ? 'bg-white text-stone-900 shadow-2xs'
                        : 'text-stone-600 hover:text-stone-900'
                    }`}
                  >
                    {type}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-stone-700 mb-1">
                Decision Date *
              </label>
              <input
                type="date"
                required
                value={decisionDate}
                onChange={(e) => setDecisionDate(e.target.value)}
                className="w-full px-3 py-2 text-xs sm:text-sm bg-white border border-[#E3DCD2] rounded-lg text-stone-900 focus:outline-hidden focus:ring-2 focus:ring-[#B45309]"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-stone-700 mb-1">
                Budget / Estimated Cost
              </label>
              <input
                type="text"
                placeholder="e.g. $18,500 fixed cost"
                value={budget}
                onChange={(e) => setBudget(e.target.value)}
                className="w-full px-3 py-2 text-xs sm:text-sm bg-white border border-[#E3DCD2] rounded-lg text-stone-900 placeholder:text-stone-400 focus:outline-hidden focus:ring-2 focus:ring-[#B45309]"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-stone-700 mb-1">
                Contract Duration
              </label>
              <input
                type="text"
                placeholder="e.g. Single project pilot / 12-month commitment"
                value={contractDuration}
                onChange={(e) => setContractDuration(e.target.value)}
                className="w-full px-3 py-2 text-xs sm:text-sm bg-white border border-[#E3DCD2] rounded-lg text-stone-900 placeholder:text-stone-400 focus:outline-hidden focus:ring-2 focus:ring-[#B45309]"
              />
            </div>
          </div>
        </section>

        {/* SECTION 3: EVALUATION FACTORS */}
        <section className="bg-white border border-[#E7DFD5] rounded-xl p-5 sm:p-6 shadow-2xs space-y-4">
          <div className="flex items-center justify-between border-b border-[#F2ECE3] pb-3">
            <div className="flex items-center gap-2">
              <Sliders className="w-4 h-4 text-[#B45309]" />
              <h3 className="text-sm font-bold text-stone-900 uppercase tracking-wider">
                Evaluation Factors
              </h3>
            </div>
            <span className="text-xs text-stone-500">
              Select factors considered in this evaluation
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {evaluationFactors.map((factor) => (
              <div
                key={factor.id}
                className={`p-3 rounded-lg border transition-all ${
                  factor.selected
                    ? 'border-[#B45309]/40 bg-[#FAF4EB]'
                    : 'border-[#E7DFD5] bg-[#FAF7F2]'
                }`}
              >
                <div className="flex items-center justify-between">
                  <label className="flex items-center gap-2 cursor-pointer text-xs font-semibold text-stone-900">
                    <input
                      type="checkbox"
                      checked={factor.selected}
                      onChange={() => toggleFactor(factor.id)}
                      className="rounded text-[#B45309] focus:ring-[#B45309] border-stone-300"
                    />
                    <span>{factor.name}</span>
                  </label>
                  {factor.selected && (
                    <span className="text-[10px] font-mono text-[#B45309] uppercase">
                      ACTIVE FACTOR
                    </span>
                  )}
                </div>

                {factor.selected && (
                  <input
                    type="text"
                    placeholder={`Note for ${factor.name.toLowerCase()} (optional)`}
                    value={factor.note || ''}
                    onChange={(e) => updateFactorNote(factor.id, e.target.value)}
                    className="mt-2 w-full px-2.5 py-1 text-xs bg-white border border-[#E3DCD2] rounded text-stone-800 placeholder:text-stone-400 focus:outline-hidden focus:ring-1 focus:ring-[#B45309]"
                  />
                )}
              </div>
            ))}
          </div>
        </section>

        {/* SECTION 4: CONTEXT */}
        <section className="bg-white border border-[#E7DFD5] rounded-xl p-5 sm:p-6 shadow-2xs space-y-4">
          <div className="flex items-center gap-2 border-b border-[#F2ECE3] pb-3">
            <FileText className="w-4 h-4 text-[#B45309]" />
            <h3 className="text-sm font-bold text-stone-900 uppercase tracking-wider">
              Business Context
            </h3>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-stone-700 mb-1">
                What were you trying to achieve?
              </label>
              <textarea
                rows={2}
                placeholder="Describe the primary operational, technical, or financial objective for this procurement..."
                value={contextGoal}
                onChange={(e) => setContextGoal(e.target.value)}
                className="w-full px-3 py-2 text-xs sm:text-sm bg-white border border-[#E3DCD2] rounded-lg text-stone-900 placeholder:text-stone-400 focus:outline-hidden focus:ring-2 focus:ring-[#B45309]"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-stone-700 mb-1">
                What alternatives did you consider?
              </label>
              <textarea
                rows={2}
                placeholder="Mention rival vendors, internal builds, or alternative routes evaluated and why they were not chosen..."
                value={contextAlternatives}
                onChange={(e) => setContextAlternatives(e.target.value)}
                className="w-full px-3 py-2 text-xs sm:text-sm bg-white border border-[#E3DCD2] rounded-lg text-stone-900 placeholder:text-stone-400 focus:outline-hidden focus:ring-2 focus:ring-[#B45309]"
              />
            </div>
          </div>
        </section>

        {/* SECTION 5: REASONING */}
        <section className="bg-white border border-[#E7DFD5] rounded-xl p-5 sm:p-6 shadow-2xs space-y-3">
          <div className="flex items-center justify-between border-b border-[#F2ECE3] pb-3">
            <div className="flex items-center gap-2">
              <Database className="w-4 h-4 text-[#B45309]" />
              <h3 className="text-sm font-bold text-stone-900 uppercase tracking-wider">
                Reasoning *
              </h3>
            </div>
            <span className="text-[11px] text-stone-400">Core memory driver</span>
          </div>

          <div>
            <label className="block text-xs font-semibold text-stone-800 mb-1">
              Why did you make this decision? *
            </label>
            <p className="text-xs text-stone-500 mb-2">
              Capture the reasoning, trade-offs, constraints, risks, and assumptions behind the decision.
            </p>
            <textarea
              required
              rows={4}
              placeholder="e.g. Selected Acme Logistics because their dedicated refrigerated fleet meets ISO 9001 specs, and their quoted rate was 7% lower than BlueDart. We assumed their promised 3-day SLA would hold despite their newly opened Hyderabad terminal..."
              value={reasoning}
              onChange={(e) => setReasoning(e.target.value)}
              className="w-full px-3 py-2 text-xs sm:text-sm bg-white border border-[#E3DCD2] rounded-lg text-stone-900 placeholder:text-stone-400 focus:outline-hidden focus:ring-2 focus:ring-[#B45309]"
            />
          </div>
        </section>

        {/* SECTION 6: EXPECTED OUTCOME */}
        <section className="bg-white border border-[#E7DFD5] rounded-xl p-5 sm:p-6 shadow-2xs space-y-3">
          <div className="flex items-center justify-between border-b border-[#F2ECE3] pb-3">
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-[#B45309]" />
              <h3 className="text-sm font-bold text-stone-900 uppercase tracking-wider">
                Expected Outcome *
              </h3>
            </div>
            <span className="text-[11px] text-stone-400">Future benchmark</span>
          </div>

          <div>
            <label className="block text-xs font-semibold text-stone-800 mb-1">
              What do you expect to happen? *
            </label>
            <p className="text-xs text-stone-500 mb-2">
              This field is important because later the actual outcome will be compared with this expectation to extract memory lessons.
            </p>
            <textarea
              required
              rows={3}
              placeholder="e.g. Complete delivery within 3 business days, zero thermal excursions, transit cost strictly under $18,500..."
              value={expectedOutcome}
              onChange={(e) => setExpectedOutcome(e.target.value)}
              className="w-full px-3 py-2 text-xs sm:text-sm bg-white border border-[#E3DCD2] rounded-lg text-stone-900 placeholder:text-stone-400 focus:outline-hidden focus:ring-2 focus:ring-[#B45309]"
            />
          </div>
        </section>

        {/* SECTION 7: CONFIDENCE */}
        <section className="bg-white border border-[#E7DFD5] rounded-xl p-5 sm:p-6 shadow-2xs space-y-3">
          <div className="flex items-center justify-between border-b border-[#F2ECE3] pb-3">
            <h3 className="text-sm font-bold text-stone-900 uppercase tracking-wider">
              Decision Confidence
            </h3>
            <span className="text-xs text-stone-500">
              Assesses predictive calibration against real outcomes
            </span>
          </div>

          <div className="max-w-md">
            <label className="block text-xs font-semibold text-stone-700 mb-2">
              How confident are you in this decision?
            </label>
            <div className="grid grid-cols-3 gap-2 p-1 bg-[#F4EFEA] border border-[#E5DDD2] rounded-lg">
              {(['Low', 'Medium', 'High'] as ConfidenceLevel[]).map((lvl) => (
                <button
                  key={lvl}
                  type="button"
                  onClick={() => setConfidence(lvl)}
                  className={`py-2 text-xs font-semibold rounded-md transition-all ${
                    confidence === lvl
                      ? 'bg-white text-stone-900 shadow-2xs'
                      : 'text-stone-600 hover:text-stone-900'
                  }`}
                >
                  {lvl} Confidence
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* Action Controls */}
        <div className="pt-2 flex flex-col-reverse sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-2 w-full sm:w-auto">
            <button
              type="button"
              onClick={onCancel}
              className="px-4 py-2 text-xs sm:text-sm font-medium text-stone-600 hover:text-stone-900 hover:bg-[#F4EFEA] rounded-lg transition-colors"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={handleSaveDraft}
              className="px-4 py-2 text-xs sm:text-sm font-medium text-stone-700 bg-white border border-[#E3DCD2] hover:bg-[#FAF7F2] rounded-lg transition-colors"
            >
              Save Draft
            </button>
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-2.5 text-xs sm:text-sm font-semibold text-white bg-[#B45309] hover:bg-[#9A3412] active:bg-[#7C2D12] disabled:opacity-50 rounded-lg shadow-xs transition-colors"
          >
            {isSubmitting ? (
              <>
                <Clock className="w-4 h-4 animate-spin" />
                <span>Recording decision...</span>
              </>
            ) : (
              <>
                <span>Record Decision</span>
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
};
