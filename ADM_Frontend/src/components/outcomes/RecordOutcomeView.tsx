import React, { useState } from 'react';
import { Decision, OutcomeResult, CreateOutcomeInput, Outcome } from '../../types/adm';
import { admService } from '../../services/admService';
import { 
  ArrowLeft, 
  CheckCircle2, 
  Clock, 
  Star, 
  HelpCircle, 
  AlertTriangle, 
  Lightbulb, 
  Database,
  ArrowRight,
  TrendingUp
} from 'lucide-react';

interface RecordOutcomeViewProps {
  decision: Decision;
  onOutcomeRecorded: (outcome: Outcome) => void;
  onCancel: () => void;
}

export const RecordOutcomeView: React.FC<RecordOutcomeViewProps> = ({
  decision,
  onOutcomeRecorded,
  onCancel
}) => {
  const [result, setResult] = useState<OutcomeResult>('Successful');
  const [deliveryRating, setDeliveryRating] = useState<number>(4);
  const [qualityRating, setQualityRating] = useState<number>(4);
  const [costBudgetRating, setCostBudgetRating] = useState<number>(4);
  const [supportRating, setSupportRating] = useState<number>(4);
  const [overallRating, setOverallRating] = useState<number>(4);

  const [actualOutcomeDescription, setActualOutcomeDescription] = useState('');
  const [whatWentWell, setWhatWentWell] = useState('');
  const [whatWentWrong, setWhatWentWrong] = useState('');
  const [lesson, setLesson] = useState('');

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [recordedOutcome, setRecordedOutcome] = useState<Outcome | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);

    if (!actualOutcomeDescription.trim()) {
      setErrorMsg('Please describe what actually happened.');
      return;
    }
    if (!lesson.trim()) {
      setErrorMsg('Please capture the key lesson for future decisions.');
      return;
    }

    setIsSubmitting(true);

    try {
      const input: CreateOutcomeInput = {
        decisionId: decision.id,
        result,
        performanceRatings: {
          delivery: deliveryRating,
          quality: qualityRating,
          costBudget: costBudgetRating,
          support: supportRating,
          overall: overallRating
        },
        actualOutcomeDescription,
        whatWentWell,
        whatWentWrong,
        lesson
      };

      const outcome = await admService.recordOutcome(input);
      setRecordedOutcome(outcome);
    } catch (err: any) {
      setErrorMsg(err.message || 'Failed to record outcome');
    } finally {
      setIsSubmitting(false);
    }
  };

  const renderStarRating = (value: number, onChange: (val: number) => void, label: string) => {
    return (
      <div className="flex items-center justify-between py-2 border-b border-stone-100 last:border-b-0">
        <span className="text-xs font-medium text-stone-700">{label}</span>
        <div className="flex items-center gap-1">
          {[1, 2, 3, 4, 5].map((star) => (
            <button
              key={star}
              type="button"
              onClick={() => onChange(star)}
              className={`p-1 rounded-sm transition-colors ${
                star <= value ? 'text-amber-500' : 'text-stone-300 hover:text-stone-400'
              }`}
            >
              <Star className="w-4 h-4 fill-current" />
            </button>
          ))}
          <span className="ml-1 text-xs font-mono font-semibold text-stone-700 min-w-6 text-right">
            {value}/5
          </span>
        </div>
      </div>
    );
  };

  // If submitted successfully, show the transition confirmation
  if (recordedOutcome) {
    return (
      <div className="max-w-2xl mx-auto py-10 px-4">
        <div className="bg-white border border-[#E2D5C3] rounded-2xl p-8 shadow-sm text-center">
          <div className="w-14 h-14 mx-auto rounded-full bg-emerald-50 border border-emerald-200 flex items-center justify-center text-emerald-700">
            <CheckCircle2 className="w-8 h-8" />
          </div>

          <h2 className="mt-5 text-2xl font-bold text-stone-900 tracking-tight">
            Outcome recorded
          </h2>
          <p className="mt-2 text-sm text-stone-600 max-w-md mx-auto">
            ADM can now use this experience when supporting future decisions.
          </p>

          <div className="mt-6 p-4 rounded-xl bg-[#FAF0E6] border border-[#E7DFD5] text-left text-xs space-y-2.5">
            <div className="flex items-center gap-2 text-[#9A3412] font-bold">
              <Lightbulb className="w-4 h-4" />
              <span>What ADM Learned:</span>
            </div>
            <p className="text-stone-800 leading-relaxed font-medium">
              "{recordedOutcome.admLearned}"
            </p>
            <div className="pt-2 border-t border-[#E5DDD2] text-stone-600 text-[11px]">
              <span className="font-semibold text-stone-800">Future Impact: </span>
              {recordedOutcome.futureDecisionImpact}
            </div>
          </div>

          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3">
            <button
              onClick={() => onOutcomeRecorded(recordedOutcome)}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-2.5 text-sm font-semibold text-white bg-[#B45309] hover:bg-[#9A3412] rounded-lg shadow-xs transition-colors"
            >
              <span>View Learning & Comparison</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6 pb-12">
      {/* Back button */}
      <div>
        <button
          onClick={onCancel}
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-stone-600 hover:text-stone-900 transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Cancel & Back</span>
        </button>
      </div>

      {/* Header */}
      <div>
        <h2 className="text-2xl font-bold text-stone-900 tracking-tight">
          Record Outcome
        </h2>
        <p className="mt-1 text-sm text-stone-600">
          What actually happened? Capturing the true result closes the memory loop.
        </p>
      </div>

      {/* Original Decision Banner at Top */}
      <div className="bg-[#FAF7F2] border border-[#E7DFD5] rounded-xl p-4 sm:p-5 text-xs space-y-2">
        <span className="font-bold uppercase tracking-wider text-stone-500 text-[10px] block">
          Original Decision Context
        </span>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div className="font-semibold text-stone-900 text-sm">
            {decision.decisionType} {decision.vendorName} for {decision.projectRequirement}
          </div>
          <span className="text-stone-500 font-mono text-[11px]">
            Decided on {decision.decisionDate} ({decision.confidence} Confidence)
          </span>
        </div>
        <div className="pt-2 border-t border-[#E5DDD2] text-stone-600">
          <span className="font-semibold text-stone-800">Expected Baseline: </span>
          "{decision.expectedOutcome}"
        </div>
      </div>

      {errorMsg && (
        <div className="p-3.5 bg-rose-50 border border-rose-200 text-rose-800 rounded-lg text-xs">
          {errorMsg}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* RESULT SECTION */}
        <section className="bg-white border border-[#E7DFD5] rounded-xl p-5 sm:p-6 shadow-2xs space-y-3">
          <h3 className="text-sm font-bold text-stone-900 uppercase tracking-wider border-b border-[#F2ECE3] pb-2">
            Overall Result *
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {[
              {
                id: 'Successful',
                title: 'Successful',
                desc: 'Met or exceeded expected performance, cost, and timelines.'
              },
              {
                id: 'Partially Successful',
                title: 'Partially Successful',
                desc: 'Delivered core objective, but had delays, cost variances, or operational friction.'
              },
              {
                id: 'Unsuccessful',
                title: 'Unsuccessful',
                desc: 'Failed key expectations, required intervention, or project breached SLAs.'
              }
            ].map((option) => (
              <button
                key={option.id}
                type="button"
                onClick={() => setResult(option.id as OutcomeResult)}
                className={`p-3.5 text-left rounded-xl border transition-all ${
                  result === option.id
                    ? option.id === 'Successful'
                      ? 'border-emerald-600 bg-emerald-50/50 ring-1 ring-emerald-600'
                      : option.id === 'Partially Successful'
                      ? 'border-[#B45309] bg-[#FAF4EB] ring-1 ring-[#B45309]'
                      : 'border-rose-600 bg-rose-50/50 ring-1 ring-rose-600'
                    : 'border-[#E7DFD5] bg-white hover:bg-[#FAF7F2]'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className={`text-xs font-bold ${
                    result === option.id ? 'text-stone-900' : 'text-stone-700'
                  }`}>
                    {option.title}
                  </span>
                  {result === option.id && (
                    <CheckCircle2 className={`w-4 h-4 ${
                      option.id === 'Successful' ? 'text-emerald-700' : option.id === 'Partially Successful' ? 'text-[#B45309]' : 'text-rose-700'
                    }`} />
                  )}
                </div>
                <p className="mt-1 text-[11px] text-stone-500 leading-normal">
                  {option.desc}
                </p>
              </button>
            ))}
          </div>
        </section>

        {/* PERFORMANCE STRUCTURED RATINGS */}
        <section className="bg-white border border-[#E7DFD5] rounded-xl p-5 sm:p-6 shadow-2xs space-y-3">
          <div className="flex items-center justify-between border-b border-[#F2ECE3] pb-2">
            <h3 className="text-sm font-bold text-stone-900 uppercase tracking-wider">
              Performance Breakdown
            </h3>
            <span className="text-xs text-stone-500">1 (Poor) to 5 (Excellent)</span>
          </div>

          <div className="divide-y divide-stone-100">
            {renderStarRating(deliveryRating, setDeliveryRating, 'Delivery & Transit Performance')}
            {renderStarRating(qualityRating, setQualityRating, 'Product / Service Quality')}
            {renderStarRating(costBudgetRating, setCostBudgetRating, 'Cost & Budget Adherence')}
            {renderStarRating(supportRating, setSupportRating, 'Communication & Vendor Support')}
            {renderStarRating(overallRating, setOverallRating, 'Overall Vendor Performance')}
          </div>
        </section>

        {/* WHAT HAPPENED? */}
        <section className="bg-white border border-[#E7DFD5] rounded-xl p-5 sm:p-6 shadow-2xs space-y-3">
          <h3 className="text-sm font-bold text-stone-900 uppercase tracking-wider border-b border-[#F2ECE3] pb-2">
            What actually happened? *
          </h3>
          <p className="text-xs text-stone-500">
            Describe the factual timeline, delivered milestones, delays, or cost variances that occurred.
          </p>
          <textarea
            required
            rows={3}
            placeholder="e.g. Shipment arrived 2 business days later than guaranteed transit window for the Hyderabad regional distribution hub. Temperature control was maintained throughout transit, but customer launch was delayed..."
            value={actualOutcomeDescription}
            onChange={(e) => setActualOutcomeDescription(e.target.value)}
            className="w-full px-3 py-2 text-xs sm:text-sm bg-white border border-[#E3DCD2] rounded-lg text-stone-900 placeholder:text-stone-400 focus:outline-hidden focus:ring-2 focus:ring-[#B45309]"
          />
        </section>

        {/* WHAT WENT WELL & WHAT WENT WRONG */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <section className="bg-white border border-[#E7DFD5] rounded-xl p-5 shadow-2xs space-y-2">
            <h3 className="text-xs font-bold text-emerald-800 uppercase tracking-wider border-b border-[#F2ECE3] pb-2 flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
              <span>What went well?</span>
            </h3>
            <textarea
              rows={3}
              placeholder="e.g. Cold-chain integrity and documentation was clean. Quality was high..."
              value={whatWentWell}
              onChange={(e) => setWhatWentWell(e.target.value)}
              className="w-full px-3 py-2 text-xs bg-white border border-[#E3DCD2] rounded-lg text-stone-900 placeholder:text-stone-400 focus:outline-hidden focus:ring-2 focus:ring-[#B45309]"
            />
          </section>

          <section className="bg-white border border-[#E7DFD5] rounded-xl p-5 shadow-2xs space-y-2">
            <h3 className="text-xs font-bold text-rose-800 uppercase tracking-wider border-b border-[#F2ECE3] pb-2 flex items-center gap-1.5">
              <AlertTriangle className="w-3.5 h-3.5 text-rose-600" />
              <span>What went wrong?</span>
            </h3>
            <textarea
              rows={3}
              placeholder="e.g. Dispatch bottleneck at the regional terminal caused unexpected 48-hr delay..."
              value={whatWentWrong}
              onChange={(e) => setWhatWentWrong(e.target.value)}
              className="w-full px-3 py-2 text-xs bg-white border border-[#E3DCD2] rounded-lg text-stone-900 placeholder:text-stone-400 focus:outline-hidden focus:ring-2 focus:ring-[#B45309]"
            />
          </section>
        </div>

        {/* LESSON FOR SIMILAR DECISIONS */}
        <section className="bg-[#FAF7F2] border border-[#E2D5C3] rounded-xl p-5 sm:p-6 shadow-2xs space-y-3">
          <div className="flex items-center gap-2 border-b border-[#E5DDD2] pb-2">
            <Lightbulb className="w-4 h-4 text-[#B45309]" />
            <h3 className="text-sm font-bold text-stone-900 uppercase tracking-wider">
              Lesson to Remember *
            </h3>
          </div>
          <p className="text-xs text-stone-600">
            What should our organization remember next time someone makes a similar decision in this category?
          </p>
          <textarea
            required
            rows={3}
            placeholder="e.g. For time-sensitive regional routes, transit buffers and dedicated route dispatcher contacts must be explicitly written into the contract. Price discount under 10% was negated by late delivery costs..."
            value={lesson}
            onChange={(e) => setLesson(e.target.value)}
            className="w-full px-3 py-2 text-xs sm:text-sm bg-white border border-[#E3DCD2] rounded-lg text-stone-900 placeholder:text-stone-400 focus:outline-hidden focus:ring-2 focus:ring-[#B45309]"
          />
        </section>

        {/* Submit Actions */}
        <div className="pt-2 flex items-center justify-between">
          <button
            type="button"
            onClick={onCancel}
            className="px-4 py-2 text-xs sm:text-sm font-medium text-stone-600 hover:text-stone-900 hover:bg-[#F4EFEA] rounded-lg transition-colors"
          >
            Cancel
          </button>

          <button
            type="submit"
            disabled={isSubmitting}
            className="inline-flex items-center justify-center gap-2 px-6 py-2.5 text-xs sm:text-sm font-semibold text-white bg-[#B45309] hover:bg-[#9A3412] active:bg-[#7C2D12] disabled:opacity-50 rounded-lg shadow-xs transition-colors"
          >
            {isSubmitting ? (
              <>
                <Clock className="w-4 h-4 animate-spin" />
                <span>Recording outcome...</span>
              </>
            ) : (
              <>
                <span>Record Outcome</span>
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
};
