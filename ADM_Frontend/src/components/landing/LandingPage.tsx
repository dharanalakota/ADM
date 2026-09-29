import React, { useState, useEffect } from 'react';
import { 
  ArrowRight, 
  CheckCircle2, 
  Clock, 
  Database, 
  Lightbulb, 
  Compass, 
  Sparkles, 
  Layers, 
  ShieldAlert, 
  ChevronRight, 
  TrendingUp, 
  Check, 
  X, 
  RotateCcw,
  Building2,
  FileText,
  History,
  Star
} from 'lucide-react';
import { BrandLogo } from '../common/BrandLogo';
import { NavPage } from '../layout/Sidebar';

interface LandingPageProps {
  onEnterApp: (page?: NavPage) => void;
}

export const LandingPage: React.FC<LandingPageProps> = ({ onEnterApp }) => {
  // Animation / interaction step for the hero decision-memory visualization
  const [activeHeroNode, setActiveHeroNode] = useState<number>(0);
  const [pulseCount, setPulseCount] = useState<number>(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveHeroNode((prev) => (prev + 1) % 3);
      setPulseCount((c) => c + 1);
    }, 4500);
    return () => clearInterval(timer);
  }, []);

  const heroDecisions = [
    {
      vendor: 'Acme Logistics',
      category: 'Logistics',
      decision: 'Selected for regional delivery',
      outcome: '2 days late (terminal bottleneck)',
      outcomeResult: 'Partially Successful',
      memory: 'Delivery reliability overestimated for regional hubs without owned fleet',
      admInsight: 'Enforce dedicated fleet verification & SLA penalties for transit < 72h',
      stat: 'Delay penalty applied'
    },
    {
      vendor: 'Apex Cloud Services',
      category: 'Cloud Infrastructure',
      decision: 'Selected for EU data residency',
      outcome: 'Cutover finished 4 days early; zero downtime',
      outcomeResult: 'Successful',
      memory: 'Vendor-provided Terraform automation & dedicated TAM eliminated 80% risk',
      admInsight: 'Standardize TAM requirement across all upcoming infrastructure RFPs',
      stat: '100% SLA met'
    },
    {
      vendor: 'OmniPackaging Solutions',
      category: 'Packaging',
      decision: 'Selected for biodegradable trial',
      outcome: 'Tensile quality pristine; +12% tooling surcharge',
      outcomeResult: 'Partially Successful',
      memory: 'Secondary mold setup and plate calibration excluded from base quote',
      admInsight: 'Include mandatory "All-In Tooling & Mold Cost Lock" in contract template',
      stat: 'Hidden fee detected'
    }
  ];

  const currentHero = heroDecisions[activeHeroNode];

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-[#FAF7F2] text-[#1C1917] selection:bg-[#E8D7C3] selection:text-[#522912] font-sans">
      {/* ============================================================ */}
      {/* TOP NAVIGATION BAR                                            */}
      {/* ============================================================ */}
      <header className="sticky top-0 z-50 w-full border-b border-[#E7DFD5] bg-[#FAF7F2]/90 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between">
          {/* Brand Wordmark */}
          <div className="flex items-center gap-3">
            <BrandLogo size="md" />
          </div>

          {/* Navigation Links */}
          <nav className="hidden md:flex items-center gap-8 text-xs font-semibold text-stone-600">
            <button 
              onClick={() => scrollToSection('problem')} 
              className="hover:text-stone-900 transition-colors"
            >
              The Problem
            </button>
            <button 
              onClick={() => scrollToSection('how-it-learns')} 
              className="hover:text-stone-900 transition-colors"
            >
              How It Learns
            </button>
            <button 
              onClick={() => scrollToSection('memory-in-action')} 
              className="hover:text-stone-900 transition-colors"
            >
              Memory in Action
            </button>
            <button 
              onClick={() => scrollToSection('preview')} 
              className="hover:text-stone-900 transition-colors"
            >
              Product Preview
            </button>
          </nav>

          {/* Primary Action Button */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => onEnterApp('overview')}
              className="inline-flex items-center gap-2 px-4 sm:px-5 py-2 text-xs sm:text-sm font-semibold text-white bg-[#B45309] hover:bg-[#9A3412] active:bg-[#7C2D12] rounded-lg shadow-xs transition-colors whitespace-nowrap"
            >
              <span>Enter ADM</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </header>

      {/* ============================================================ */}
      {/* SECTION 1: HERO SECTION                                      */}
      {/* ============================================================ */}
      <section className="relative overflow-hidden pt-12 pb-20 md:pt-20 md:pb-28 border-b border-[#E7DFD5]">
        {/* Subtle decorative desert contour backdrop */}
        <div className="absolute inset-0 pointer-events-none opacity-40">
          <div className="absolute top-0 right-1/4 w-96 h-96 bg-[#D97706]/5 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-1/3 w-[30rem] h-[30rem] bg-[#C26732]/5 rounded-full blur-3xl" />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
            
            {/* Left Column: Headlines & Actions */}
            <div className="lg:col-span-6 space-y-6">
              {/* Badge */}
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FAF0E6] border border-[#E7DFD5] text-[11px] font-semibold text-[#7C2D12]">
                <Database className="w-3.5 h-3.5 text-[#B45309]" />
                <span>Persistent Decision Memory</span>
              </div>

              {/* Main Headline */}
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-stone-900 leading-[1.08] text-balance">
                Your decisions have a memory.
              </h1>

              {/* Supporting Headline */}
              <p className="text-base sm:text-lg text-stone-600 leading-relaxed max-w-xl text-pretty">
                ADM remembers what you decided, what happened next, and brings that historical experience into your next decision.
              </p>

              {/* Microcopy Quote */}
              <div className="p-3.5 rounded-xl bg-white border border-[#E7DFD5] shadow-2xs max-w-lg space-y-1">
                <div className="text-xs font-semibold text-stone-900">
                  ADM remembers the experience behind every decision.
                </div>
                <div className="text-[11px] text-stone-500 font-mono">
                  Past decisions + real outcomes → contextual decision support
                </div>
              </div>

              {/* Primary Actions */}
              <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                <button
                  onClick={() => onEnterApp('overview')}
                  className="inline-flex items-center justify-center gap-2 px-6 py-3.5 text-sm font-semibold text-white bg-[#B45309] hover:bg-[#9A3412] active:bg-[#7C2D12] rounded-xl shadow-xs transition-colors"
                >
                  <span>Enter ADM</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <button
                  onClick={() => scrollToSection('how-it-learns')}
                  className="inline-flex items-center justify-center gap-2 px-5 py-3.5 text-sm font-semibold text-stone-700 hover:text-stone-900 bg-white border border-[#E3DCD2] hover:bg-[#FAF7F2] rounded-xl transition-colors shadow-2xs"
                >
                  <span>See How It Learns</span>
                </button>
              </div>

              {/* Proof Indicator */}
              <div className="pt-2 flex items-center gap-6 text-xs text-stone-500">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>128 Decisions Indexed</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>Verified Outcomes Loop</span>
                </div>
              </div>
            </div>

            {/* Right Column: SOPHISTICATED DECISION-MEMORY VISUALIZATION */}
            <div className="lg:col-span-6 relative">
              <div className="relative bg-white border border-[#E2D5C3] rounded-2xl p-6 sm:p-8 shadow-sm">
                
                {/* Visual Header / Kicker */}
                <div className="flex items-center justify-between pb-4 border-b border-[#F2ECE3]">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#B45309] animate-pulse" />
                    <span className="text-xs font-bold uppercase tracking-wider text-stone-500">
                      Organizational Memory Stream
                    </span>
                  </div>

                  {/* Scenario Toggle */}
                  <div className="flex items-center gap-1">
                    {heroDecisions.map((h, i) => (
                      <button
                        key={i}
                        onClick={() => setActiveHeroNode(i)}
                        className={`w-6 h-6 rounded-md text-[11px] font-mono font-bold transition-all ${
                          activeHeroNode === i
                            ? 'bg-[#522912] text-amber-200'
                            : 'bg-[#F4EFEA] text-stone-600 hover:bg-[#ECE4DA]'
                        }`}
                        title={h.vendor}
                      >
                        0{i + 1}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Animated Decision -> Outcome Flow */}
                <div className="mt-6 space-y-4 relative">
                  
                  {/* Stage 1: Recorded Decision */}
                  <div className="p-4 rounded-xl bg-[#FAF7F2] border border-[#E7DFD5] transition-all duration-300">
                    <div className="flex items-center justify-between text-xs text-stone-500 font-mono mb-1">
                      <span className="font-bold text-[#7C2D12] uppercase tracking-wider text-[10px]">
                        01 / Recorded Decision
                      </span>
                      <span>{currentHero.category}</span>
                    </div>
                    <div className="text-sm font-bold text-stone-900">
                      {currentHero.vendor}
                    </div>
                    <p className="text-xs text-stone-600 mt-0.5">
                      {currentHero.decision}
                    </p>
                  </div>

                  {/* Flow Arrow */}
                  <div className="flex justify-center -my-2 relative z-10">
                    <div className="w-6 h-6 rounded-full bg-white border border-[#DACFC0] flex items-center justify-center text-[#B45309] shadow-2xs">
                      ↓
                    </div>
                  </div>

                  {/* Stage 2: Captured Outcome */}
                  <div className="p-4 rounded-xl bg-white border border-[#E7DFD5] transition-all duration-300">
                    <div className="flex items-center justify-between text-xs font-mono mb-1">
                      <span className="font-bold text-amber-800 uppercase tracking-wider text-[10px]">
                        02 / Real-World Outcome
                      </span>
                      <span className="text-[11px] font-semibold text-amber-800">
                        {currentHero.outcomeResult}
                      </span>
                    </div>
                    <div className="text-xs font-bold text-stone-900">
                      {currentHero.outcome}
                    </div>
                  </div>

                  {/* Flow Arrow */}
                  <div className="flex justify-center -my-2 relative z-10">
                    <div className="w-6 h-6 rounded-full bg-white border border-[#DACFC0] flex items-center justify-center text-[#B45309] shadow-2xs">
                      ↓
                    </div>
                  </div>

                  {/* Stage 3: Central Connected ADM Memory Node */}
                  <div className="relative p-5 rounded-xl bg-[#522912] text-white border border-[#3E1E0D] shadow-sm overflow-hidden transition-all duration-300">
                    <div className="absolute top-0 right-0 w-28 h-28 bg-[#D97706]/10 rounded-bl-full pointer-events-none" />

                    <div className="flex items-center gap-2 mb-2">
                      <div className="w-6 h-6 rounded-lg bg-[#D97706] text-stone-950 flex items-center justify-center font-bold text-xs">
                        <Database className="w-3.5 h-3.5" />
                      </div>
                      <span className="text-xs font-mono font-bold tracking-wider text-amber-200 uppercase">
                        03 / ADM Retained Memory
                      </span>
                    </div>

                    <p className="text-xs text-stone-200 leading-relaxed font-normal">
                      "{currentHero.memory}"
                    </p>

                    <div className="mt-3 pt-3 border-t border-white/15 flex items-center justify-between text-[11px] text-amber-200">
                      <span>Synthesized into decision rules</span>
                      <span className="font-mono text-emerald-400 font-semibold">{currentHero.stat}</span>
                    </div>
                  </div>

                  {/* Flow Arrow */}
                  <div className="flex justify-center -my-2 relative z-10">
                    <div className="w-6 h-6 rounded-full bg-white border border-[#DACFC0] flex items-center justify-center text-[#B45309] shadow-2xs">
                      ↓
                    </div>
                  </div>

                  {/* Stage 4: Future Decision Support */}
                  <div className="p-4 rounded-xl bg-[#FAF0E6] border border-[#E2D5C3] transition-all duration-300">
                    <div className="flex items-center gap-1.5 text-xs text-[#9A3412] font-bold uppercase tracking-wider text-[10px] mb-1">
                      <Sparkles className="w-3 h-3 text-[#B45309]" />
                      <span>04 / Next Decision Support</span>
                    </div>
                    <p className="text-xs font-semibold text-stone-900 leading-snug">
                      "{currentHero.admInsight}"
                    </p>
                  </div>
                </div>

                {/* Sub-Card Indicator */}
                <div className="mt-5 pt-3 border-t border-[#F2ECE3] flex items-center justify-between text-[11px] text-stone-500">
                  <span>Cycle dynamically adapting</span>
                  <button
                    onClick={() => onEnterApp('ask-adm')}
                    className="text-[#B45309] hover:text-[#7C2D12] font-semibold inline-flex items-center gap-1"
                  >
                    <span>Try In Workspace</span>
                    <ArrowRight className="w-3 h-3" />
                  </button>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* SECTION 2: THE PROBLEM                                       */}
      {/* ============================================================ */}
      <section id="problem" className="py-20 bg-white border-b border-[#E7DFD5]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center space-y-4">
            <span className="text-xs font-bold uppercase tracking-wider text-[#B45309]">
              The Problem
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-stone-900 leading-tight">
              Most organizations remember the decision.<br />
              <span className="text-[#9A3412]">They forget the lesson.</span>
            </h2>
            <p className="text-sm sm:text-base text-stone-600 leading-relaxed max-w-2xl mx-auto">
              Every quarter, critical business decisions are executed. Yet the actual post-contract realities stay stranded in silos.
            </p>
          </div>

          {/* Three Cards */}
          <div className="mt-14 grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Card 1 */}
            <div className="p-6 rounded-2xl bg-[#FAF7F2] border border-[#E7DFD5] shadow-2xs space-y-3">
              <div className="w-10 h-10 rounded-xl bg-white border border-[#E5DDD2] flex items-center justify-center font-bold text-sm text-[#7C2D12]">
                01
              </div>
              <h3 className="text-base font-bold text-stone-900">
                The Decision
              </h3>
              <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
                Teams choose vendors, suppliers, technologies, and partners every day, making assumptions based on optimistic proposals.
              </p>
            </div>

            {/* Card 2 */}
            <div className="p-6 rounded-2xl bg-[#FAF7F2] border border-[#E7DFD5] shadow-2xs space-y-3">
              <div className="w-10 h-10 rounded-xl bg-white border border-[#E5DDD2] flex items-center justify-center font-bold text-sm text-[#B45309]">
                02
              </div>
              <h3 className="text-base font-bold text-stone-900">
                The Outcome
              </h3>
              <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
                Weeks or months later, the actual result—delays, unbudgeted tooling fees, SLA breaches, or stellar triumphs—is disconnected from the original file.
              </p>
            </div>

            {/* Card 3 */}
            <div className="p-6 rounded-2xl bg-[#FAF7F2] border border-[#E7DFD5] shadow-2xs space-y-3">
              <div className="w-10 h-10 rounded-xl bg-white border border-[#E5DDD2] flex items-center justify-center font-bold text-sm text-stone-800">
                03
              </div>
              <h3 className="text-base font-bold text-stone-900">
                The Lesson
              </h3>
              <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
                The experience stays buried in Slack threads, email chains, and people's heads instead of becoming reusable corporate knowledge.
              </p>
            </div>
          </div>

          {/* Ending Callout */}
          <div className="mt-12 text-center">
            <div className="inline-flex items-center gap-3 px-5 py-2.5 rounded-full bg-[#FAF0E6] border border-[#E2D5C3] text-sm font-bold text-[#7C2D12]">
              <Database className="w-4 h-4 text-[#B45309]" />
              <span>ADM closes that loop.</span>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* SECTION 3: HOW ADM LEARNS                                    */}
      {/* ============================================================ */}
      <section id="how-it-learns" className="py-20 bg-[#FAF7F2] border-b border-[#E7DFD5]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center space-y-3">
            <span className="text-xs font-bold uppercase tracking-wider text-[#B45309]">
              The Mechanism
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-stone-900">
              From decisions to institutional memory.
            </h2>
            <p className="text-sm sm:text-base text-stone-600 leading-relaxed">
              Four connected stages that transform isolated transactions into compounding decision intelligence.
            </p>
          </div>

          {/* 4 Connected Stages */}
          <div className="mt-14 grid grid-cols-1 md:grid-cols-4 gap-6 relative">
            {[
              {
                num: '01',
                title: 'Record',
                desc: 'Capture the decision, business context, reasoning, assumptions, and expected outcome baseline.'
              },
              {
                num: '02',
                title: 'Observe',
                desc: 'Record what actually happened after delivery: factual timelines, metric variance, and what went wrong.'
              },
              {
                num: '03',
                title: 'Remember',
                desc: 'ADM retains the exact relationship between the initial decision and the subsequent physical outcome.'
              },
              {
                num: '04',
                title: 'Support',
                desc: 'When a similar decision appears again, ADM brings relevant historical experience into the conversation.'
              }
            ].map((step, idx) => (
              <div 
                key={idx} 
                className="relative bg-white border border-[#E7DFD5] rounded-2xl p-6 shadow-2xs flex flex-col justify-between"
              >
                <div>
                  <span className="text-xs font-mono font-bold text-[#B45309] block mb-3">
                    STAGE {step.num}
                  </span>
                  <h3 className="text-lg font-bold text-stone-900 mb-2">
                    {step.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
                    {step.desc}
                  </p>
                </div>

                <div className="mt-6 pt-3 border-t border-[#F2ECE3] flex items-center text-[11px] font-semibold text-stone-400">
                  <span>Continuous loop</span>
                </div>
              </div>
            ))}
          </div>

          {/* Continuous Loop Accent */}
          <div className="mt-8 text-center">
            <p className="text-xs text-stone-500 font-medium">
              A continuous organizational loop — not a one-time workflow.
            </p>
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* SECTION 4: MEMORY IN ACTION                                  */}
      {/* ============================================================ */}
      <section id="memory-in-action" className="py-20 bg-white border-b border-[#E7DFD5]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center space-y-3">
            <span className="text-xs font-bold uppercase tracking-wider text-[#B45309]">
              The Value of Experience
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-stone-900">
              The answer changes when the system remembers.
            </h2>
            <p className="text-sm sm:text-base text-stone-600 leading-relaxed">
              Witness the difference between an assistant that merely generates text versus a system grounded in your organization’s real outcomes.
            </p>
          </div>

          {/* Two Panels Comparison */}
          <div className="mt-14 grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
            
            {/* Panel 1: WITHOUT HISTORICAL MEMORY (Generic) */}
            <div className="rounded-2xl border border-stone-200 bg-stone-50/60 p-6 sm:p-8 flex flex-col justify-between">
              <div className="space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-stone-200">
                  <span className="text-xs font-bold uppercase tracking-wider text-stone-400">
                    Without Historical Memory
                  </span>
                  <span className="text-xs font-mono text-stone-400 bg-stone-200/60 px-2 py-0.5 rounded">
                    Generic context
                  </span>
                </div>

                <div className="text-xs font-medium text-stone-500 italic">
                  Prompt: "What should I look out for when selecting our regional logistics vendor?"
                </div>

                <blockquote className="text-sm sm:text-base text-stone-600 leading-relaxed italic bg-white p-4 rounded-xl border border-stone-200">
                  "Consider cost, quality, delivery time, and reliability when evaluating vendors. Request references, review service level agreements, and ensure insurance coverage is up to date."
                </blockquote>

                <p className="text-xs text-stone-400 leading-relaxed">
                  Generic textbook recommendations that could apply to any company in the world. No awareness of your company's actual past vendors or lessons.
                </p>
              </div>

              <div className="mt-8 pt-4 border-t border-stone-200 text-xs text-stone-400 font-mono">
                Historical Grounding: None (0 decisions referenced)
              </div>
            </div>

            {/* Panel 2: WITH ADM MEMORY */}
            <div className="rounded-2xl border-2 border-[#B45309] bg-gradient-to-br from-white to-[#FAF0E6] p-6 sm:p-8 shadow-sm flex flex-col justify-between relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-[#D97706]/10 rounded-bl-full pointer-events-none" />

              <div className="space-y-4 relative">
                <div className="flex items-center justify-between pb-3 border-b border-[#E2D5C3]">
                  <span className="text-xs font-bold uppercase tracking-wider text-[#9A3412] flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-[#B45309]" />
                    <span>With ADM Memory</span>
                  </span>
                  <span className="text-xs font-mono font-semibold text-emerald-800 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded">
                    Evidence-grounded
                  </span>
                </div>

                <div className="text-xs font-medium text-stone-700">
                  Prompt: "What should I look out for when selecting our regional logistics vendor?"
                </div>

                <blockquote className="text-sm sm:text-base font-semibold text-stone-900 leading-relaxed bg-white p-5 rounded-xl border border-[#E7DFD5] shadow-2xs">
                  "In similar time-sensitive logistics decisions (e.g. Acme Logistics, RapidShip), delivery reliability was repeatedly associated with successful outcomes. Previous vendor outcomes also showed that small cost advantages (&lt;10%) did not compensate for delivery delays. Enforce dedicated fleet verification and contract liquidated damages for transit &gt; 4 hours."
                </blockquote>

                {/* Evidence Metrics */}
                <div className="p-3.5 rounded-xl bg-[#522912] text-white space-y-2">
                  <span className="text-[10px] font-mono uppercase tracking-wider text-amber-200 font-bold block">
                    Based on historical decision and outcome evidence
                  </span>
                  <div className="grid grid-cols-3 gap-2 text-center">
                    <div className="p-2 rounded bg-white/10">
                      <div className="text-base font-mono font-bold text-amber-200">7</div>
                      <div className="text-[10px] text-stone-300">Relevant Decisions</div>
                    </div>
                    <div className="p-2 rounded bg-white/10">
                      <div className="text-base font-mono font-bold text-amber-200">5</div>
                      <div className="text-[10px] text-stone-300">Outcomes Recorded</div>
                    </div>
                    <div className="p-2 rounded bg-white/10">
                      <div className="text-base font-mono font-bold text-emerald-400">3</div>
                      <div className="text-[10px] text-stone-300">Recurring Patterns</div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-8 pt-4 border-t border-[#E2D5C3] flex items-center justify-between text-xs text-[#7C2D12]">
                <span className="font-semibold">Contextual organizational memory applied</span>
                <button
                  onClick={() => onEnterApp('ask-adm')}
                  className="font-bold underline hover:text-[#9A3412]"
                >
                  Query Memory →
                </button>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* SECTION 5: THE ADM EXPERIENCE (APP PREVIEW)                   */}
      {/* ============================================================ */}
      <section id="preview" className="py-20 bg-[#FAF7F2] border-b border-[#E7DFD5]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center space-y-3">
            <span className="text-xs font-bold uppercase tracking-wider text-[#B45309]">
              Product Experience
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-stone-900">
              Decision intelligence, not generic chat.
            </h2>
            <p className="text-sm sm:text-base text-stone-600 leading-relaxed">
              A serious operations workspace with structured evidence, matched historical records, and explicit contractual guidance.
            </p>
          </div>

          {/* Large Dashboard Mockup Card */}
          <div className="mt-14 max-w-4xl mx-auto bg-white border border-[#E2D5C3] rounded-2xl shadow-md overflow-hidden">
            {/* Top Workspace Header */}
            <div className="bg-[#FAF7F2] border-b border-[#E7DFD5] px-6 py-4 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-rose-400" />
                <div className="w-3 h-3 rounded-full bg-amber-400" />
                <div className="w-3 h-3 rounded-full bg-emerald-400" />
                <span className="ml-3 text-xs font-mono text-stone-500 font-semibold">
                  ADM Workspace / Ask ADM Console
                </span>
              </div>
              <span className="text-xs font-mono text-stone-500">Live Memory Sync</span>
            </div>

            {/* Mock Content */}
            <div className="p-6 sm:p-8 space-y-6">
              {/* Question */}
              <div className="p-4 rounded-xl bg-[#FAF7F2] border border-[#E7DFD5] flex items-start gap-3">
                <div className="w-7 h-7 rounded-lg bg-[#522912] text-amber-200 flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">
                  Q
                </div>
                <div>
                  <span className="text-[11px] font-bold uppercase tracking-wider text-stone-400 block mb-0.5">
                    Query Injected
                  </span>
                  <p className="text-sm font-semibold text-stone-900">
                    What should I consider when selecting a vendor for a time-sensitive project?
                  </p>
                </div>
              </div>

              {/* Historical Pattern */}
              <div className="p-4 rounded-xl bg-[#FAF0E6] border border-[#E7DFD5] space-y-1">
                <div className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#9A3412]">
                  <Lightbulb className="w-3.5 h-3.5 text-[#B45309]" />
                  <span>Synthesized Historical Pattern</span>
                </div>
                <p className="text-xs sm:text-sm font-semibold text-stone-900 leading-relaxed">
                  Delivery reliability appeared frequently in successful outcomes. Previous vendor delays resulted in launch slippage that cost 3.2x more than the original price savings.
                </p>
              </div>

              {/* Relevant Decisions Table Preview */}
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-stone-500 block mb-3">
                  Relevant Past Decisions Retrieved
                </span>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {/* Item 1 */}
                  <div className="p-3.5 rounded-xl border border-[#E7DFD5] bg-[#FAF7F2]">
                    <div className="flex items-center justify-between text-xs mb-1">
                      <span className="font-bold text-stone-900">Acme Logistics</span>
                      <span className="text-[10px] font-bold text-amber-700 bg-amber-50 px-1.5 py-0.5 rounded">Mixed</span>
                    </div>
                    <p className="text-[11px] text-stone-600">
                      2 days late on Hyderabad transit due to regional fleet handoff.
                    </p>
                  </div>

                  {/* Item 2 */}
                  <div className="p-3.5 rounded-xl border border-[#E7DFD5] bg-[#FAF7F2]">
                    <div className="flex items-center justify-between text-xs mb-1">
                      <span className="font-bold text-stone-900">RapidShip</span>
                      <span className="text-[10px] font-bold text-rose-700 bg-rose-50 px-1.5 py-0.5 rounded">Unsuccessful</span>
                    </div>
                    <p className="text-[11px] text-stone-600">
                      Late delivery & lack of cold-chain real-time GPS telemetry.
                    </p>
                  </div>

                  {/* Item 3 */}
                  <div className="p-3.5 rounded-xl border border-[#E7DFD5] bg-[#FAF7F2]">
                    <div className="flex items-center justify-between text-xs mb-1">
                      <span className="font-bold text-stone-900">Apex Cloud</span>
                      <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-1.5 py-0.5 rounded">Successful</span>
                    </div>
                    <p className="text-[11px] text-stone-600">
                      Delivered 4 days early with zero downtime and direct TAM support.
                    </p>
                  </div>
                </div>
              </div>

              {/* Actionable Considerations */}
              <div className="p-4 rounded-xl border border-[#E7DFD5] bg-white space-y-2">
                <span className="text-xs font-bold uppercase tracking-wider text-stone-700 block">
                  ADM Recommendations for Next Decision
                </span>
                <ul className="space-y-1.5 text-xs text-stone-700">
                  <li className="flex items-center gap-2">
                    <Check className="w-3.5 h-3.5 text-emerald-600" />
                    <span>Validate regional delivery reliability and owned fleet infrastructure</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-3.5 h-3.5 text-emerald-600" />
                    <span>Compare actual historical outcomes rather than sales RFP commitments</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-3.5 h-3.5 text-emerald-600" />
                    <span>Consider whether lower cost truly justifies critical delivery risk</span>
                  </li>
                </ul>
              </div>

              {/* Footer inside Mockup */}
              <div className="pt-2 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs border-t border-[#F2ECE3]">
                <div className="text-stone-500 font-mono">
                  Based on 7 historical decisions · 94% empirical match
                </div>
                <button
                  onClick={() => onEnterApp('ask-adm')}
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#B45309] hover:text-[#7C2D12]"
                >
                  <span>Open Interactive Console</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* SECTION 6: THE MEMORY LOOP (DARK CONTRAST SECTION)            */}
      {/* ============================================================ */}
      <section className="py-24 bg-[#1C1917] text-white border-b border-stone-800 relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none opacity-30">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[32rem] h-[32rem] bg-[#C26732]/15 rounded-full blur-3xl" />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="max-w-3xl mx-auto text-center space-y-3">
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-amber-400">
              The Compounding Flywheel
            </span>
            <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white leading-tight">
              Every outcome makes the next decision richer.
            </h2>
            <p className="text-sm sm:text-base text-stone-300 leading-relaxed max-w-xl mx-auto">
              The system doesn't just answer questions. It learns from what actually happened.
            </p>
          </div>

          {/* Circular Flow Architecture */}
          <div className="mt-16 max-w-3xl mx-auto">
            <div className="grid grid-cols-1 sm:grid-cols-5 gap-3 items-center">
              {[
                { title: 'DECISION', desc: 'Context & expectation recorded' },
                { title: 'OUTCOME', desc: 'Physical result observed' },
                { title: 'MEMORY', desc: 'Retained as evidence' },
                { title: 'INSIGHT', desc: 'Pattern extracted' },
                { title: 'NEXT DECISION', desc: 'Evidence-guided choice' }
              ].map((item, idx) => (
                <div key={idx} className="flex flex-col items-center text-center p-4 rounded-xl bg-white/5 border border-white/10 hover:border-amber-400/50 transition-colors">
                  <span className="text-[10px] font-mono text-amber-400 font-bold mb-1">
                    0{idx + 1}
                  </span>
                  <div className="text-xs font-bold text-white tracking-wide">
                    {item.title}
                  </div>
                  <p className="text-[10px] text-stone-400 mt-1 leading-snug">
                    {item.desc}
                  </p>
                </div>
              ))}
            </div>

            {/* Central Node Badge */}
            <div className="mt-8 p-6 rounded-2xl bg-white/5 border border-white/15 text-center max-w-md mx-auto space-y-1">
              <div className="text-base font-bold text-amber-200">
                ADM — Adaptive Decision Memory
              </div>
              <p className="text-xs text-stone-300">
                Decisions shouldn't be forgotten. Outcomes should make the next decision smarter.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* SECTION 7: WHY ADM (4 FEATURE CARDS)                         */}
      {/* ============================================================ */}
      <section className="py-20 bg-white border-b border-[#E7DFD5]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center space-y-3">
            <span className="text-xs font-bold uppercase tracking-wider text-[#B45309]">
              Core Capabilities
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-stone-900">
              Engineered for organizational longevity.
            </h2>
            <p className="text-sm sm:text-base text-stone-600 leading-relaxed">
              Built specifically for procurement, operations, and leadership teams that make high-stakes commitments.
            </p>
          </div>

          <div className="mt-14 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Feature 1 */}
            <div className="p-6 rounded-2xl bg-[#FAF7F2] border border-[#E7DFD5] space-y-3">
              <div className="w-9 h-9 rounded-xl bg-white border border-[#E5DDD2] flex items-center justify-center text-[#B45309]">
                <Database className="w-4 h-4" />
              </div>
              <h3 className="text-base font-bold text-stone-900">
                Persistent Memory
              </h3>
              <p className="text-xs text-stone-600 leading-relaxed">
                Decisions and outcomes become reusable historical context instead of getting lost in archives or employee turnover.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="p-6 rounded-2xl bg-[#FAF7F2] border border-[#E7DFD5] space-y-3">
              <div className="w-9 h-9 rounded-xl bg-white border border-[#E5DDD2] flex items-center justify-center text-[#B45309]">
                <Compass className="w-4 h-4" />
              </div>
              <h3 className="text-base font-bold text-stone-900">
                Evidence-Based Support
              </h3>
              <p className="text-xs text-stone-600 leading-relaxed">
                ADM surfaces relevant past experiences and real metrics instead of relying only on generic textbook advice.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="p-6 rounded-2xl bg-[#FAF7F2] border border-[#E7DFD5] space-y-3">
              <div className="w-9 h-9 rounded-xl bg-white border border-[#E5DDD2] flex items-center justify-center text-[#B45309]">
                <CheckCircle2 className="w-4 h-4" />
              </div>
              <h3 className="text-base font-bold text-stone-900">
                Outcome Awareness
              </h3>
              <p className="text-xs text-stone-600 leading-relaxed">
                The system connects what was expected with what actually happened, highlighting hidden costs and calibration gaps.
              </p>
            </div>

            {/* Feature 4 */}
            <div className="p-6 rounded-2xl bg-[#FAF7F2] border border-[#E7DFD5] space-y-3">
              <div className="w-9 h-9 rounded-xl bg-white border border-[#E5DDD2] flex items-center justify-center text-[#B45309]">
                <TrendingUp className="w-4 h-4" />
              </div>
              <h3 className="text-base font-bold text-stone-900">
                Continuous Learning
              </h3>
              <p className="text-xs text-stone-600 leading-relaxed">
                Every completed decision permanently contributes to future decision support, compounding institutional advantage.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* SECTION 8: FINAL CTA                                         */}
      {/* ============================================================ */}
      <section className="py-20 bg-[#FAF7F2] border-b border-[#E7DFD5]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
          <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-stone-900 leading-tight">
            Make your next decision with the memory of your last one.
          </h2>

          <p className="text-sm sm:text-base text-stone-600 leading-relaxed max-w-xl mx-auto">
            Record decisions. Capture outcomes. Build organizational memory.
          </p>

          <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3">
            <button
              onClick={() => onEnterApp('overview')}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 text-sm font-semibold text-white bg-[#B45309] hover:bg-[#9A3412] active:bg-[#7C2D12] rounded-xl shadow-xs transition-colors"
            >
              <span>Enter ADM</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              onClick={() => onEnterApp('decision-history')}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 text-sm font-semibold text-stone-700 hover:text-stone-900 bg-white border border-[#E3DCD2] hover:bg-[#FAF7F2] rounded-xl transition-colors shadow-2xs"
            >
              <span>Explore the Decision History</span>
            </button>
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* FOOTER                                                       */}
      {/* ============================================================ */}
      <footer className="bg-white py-12 border-t border-[#E7DFD5]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex flex-col items-center md:items-start">
              <BrandLogo size="md" />
              <p className="mt-2 text-xs text-stone-500 font-mono">
                Decision → Outcome → Memory → Insight
              </p>
            </div>

            <nav className="flex flex-wrap items-center justify-center gap-6 text-xs font-semibold text-stone-600">
              <button 
                onClick={() => onEnterApp('overview')}
                className="hover:text-stone-900 transition-colors"
              >
                Overview
              </button>
              <button 
                onClick={() => onEnterApp('new-decision')}
                className="hover:text-stone-900 transition-colors"
              >
                New Decision
              </button>
              <button 
                onClick={() => onEnterApp('decision-history')}
                className="hover:text-stone-900 transition-colors"
              >
                Decision History
              </button>
              <button 
                onClick={() => onEnterApp('outcomes')}
                className="hover:text-stone-900 transition-colors"
              >
                Outcomes
              </button>
              <button 
                onClick={() => onEnterApp('ask-adm')}
                className="hover:text-stone-900 transition-colors"
              >
                Ask ADM
              </button>
            </nav>
          </div>

          <div className="mt-8 pt-8 border-t border-[#F2ECE3] flex flex-col sm:flex-row items-center justify-between text-[11px] text-stone-400">
            <span>© {new Date().getFullYear()} ADM (Adaptive Decision Memory). All rights reserved.</span>
            <span className="font-mono mt-2 sm:mt-0">Enterprise Decision Intelligence</span>
          </div>
        </div>
      </footer>
    </div>
  );
};
