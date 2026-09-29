/**
 * ADM — Adaptive Decision Memory
 * 
 * Production-quality Decision Intelligence Frontend
 * Built in Sahara corporate branding theme
 */

import React, { useState, useEffect } from 'react';
import { 
  Decision, 
  Outcome, 
  HistoricalInsight, 
  VendorProfile, 
  MemoryStats, 
  MemoryLoopStage 
} from './types/adm';
import { admService } from './services/admService';

// Layout components
import { Sidebar, NavPage } from './components/layout/Sidebar';
import { TopBar } from './components/layout/TopBar';

// Dashboard components
import { KpiCards } from './components/dashboard/KpiCards';
import { MemoryLoop } from './components/dashboard/MemoryLoop';
import { AdmInsightCard } from './components/dashboard/AdmInsightCard';
import { RecentDecisionsTable } from './components/dashboard/RecentDecisionsTable';

// Workflow & Feature components
import { NewDecisionView } from './components/decisions/NewDecisionView';
import { DecisionDetailView } from './components/decisions/DecisionDetailView';
import { DecisionHistoryView } from './components/decisions/DecisionHistoryView';
import { RecordOutcomeView } from './components/outcomes/RecordOutcomeView';
import { OutcomeDetailView } from './components/outcomes/OutcomeDetailView';
import { OutcomesTrackerView } from './components/outcomes/OutcomesTrackerView';
import { AskAdmView } from './components/ask/AskAdmView';
import { VendorsView } from './components/vendors/VendorsView';
import { InsightsView } from './components/insights/InsightsView';

// Modals
import { EvidenceModal } from './components/modals/EvidenceModal';
import { SettingsModal } from './components/modals/SettingsModal';

// Landing Page
import { LandingPage } from './components/landing/LandingPage';

import { Plus, Compass, Sparkles, Database } from 'lucide-react';

export default function App() {
  const [isShowingLanding, setIsShowingLanding] = useState<boolean>(true);
  const [activePage, setActivePage] = useState<NavPage>('overview');
  const [selectedDecisionId, setSelectedDecisionId] = useState<string | null>(null);
  const [recordingOutcomeDecisionId, setRecordingOutcomeDecisionId] = useState<string | null>(null);
  const [viewingOutcomeDecisionId, setViewingOutcomeDecisionId] = useState<string | null>(null);

  const [evidenceInsight, setEvidenceInsight] = useState<HistoricalInsight | null>(null);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const [searchQuery, setSearchQuery] = useState('');
  const [askAdmInitialQuery, setAskAdmInitialQuery] = useState('');

  // Local state synced with ADM service
  const [decisions, setDecisions] = useState<Decision[]>(() => admService.getDecisions());
  const [outcomes, setOutcomes] = useState<Outcome[]>(() => admService.getOutcomes());
  const [insights, setInsights] = useState<HistoricalInsight[]>(() => admService.getInsights());
  const [vendors, setVendors] = useState<VendorProfile[]>(() => admService.getVendors());
  const [stats, setStats] = useState<MemoryStats>(() => admService.getMemoryStats());
  const [loopScenarios, setLoopScenarios] = useState<MemoryLoopStage[]>(() => admService.getMemoryLoopScenarios());

  // Refresh data from ADM Service
  const refreshData = () => {
    setDecisions(admService.getDecisions());
    setOutcomes(admService.getOutcomes());
    setInsights(admService.getInsights());
    setVendors(admService.getVendors());
    setStats(admService.getMemoryStats());
    setLoopScenarios(admService.getMemoryLoopScenarios());
  };

  useEffect(() => {
    refreshData();
  }, []);

  // Navigation handlers
  const handleNavigate = (page: NavPage) => {
    setActivePage(page);
    setSelectedDecisionId(null);
    setRecordingOutcomeDecisionId(null);
    setViewingOutcomeDecisionId(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSelectDecision = (decisionId: string) => {
    setSelectedDecisionId(decisionId);
    setRecordingOutcomeDecisionId(null);
    setViewingOutcomeDecisionId(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleStartRecordOutcome = (decisionId: string) => {
    setRecordingOutcomeDecisionId(decisionId);
    setSelectedDecisionId(null);
    setViewingOutcomeDecisionId(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleViewOutcomeDetail = (decisionId: string) => {
    setViewingOutcomeDecisionId(decisionId);
    setSelectedDecisionId(null);
    setRecordingOutcomeDecisionId(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDecisionCreated = (newDecision: Decision) => {
    refreshData();
    setSelectedDecisionId(newDecision.id);
  };

  const handleOutcomeRecorded = (newOutcome: Outcome) => {
    refreshData();
    setViewingOutcomeDecisionId(newOutcome.decisionId);
    setRecordingOutcomeDecisionId(null);
  };

  const handleEnterApp = (targetPage: NavPage = 'overview') => {
    setIsShowingLanding(false);
    setActivePage(targetPage);
    setSelectedDecisionId(null);
    setRecordingOutcomeDecisionId(null);
    setViewingOutcomeDecisionId(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleReturnToLanding = () => {
    setIsShowingLanding(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleAskAboutVendor = (vendorName: string) => {
    setIsShowingLanding(false);
    setAskAdmInitialQuery(`What have we learned from past decisions involving ${vendorName}?`);
    handleNavigate('ask-adm');
  };

  const handleAskAboutInsight = (insight: HistoricalInsight) => {
    setIsShowingLanding(false);
    setAskAdmInitialQuery(`Tell me more about how "${insight.summary}" should influence our next vendor choice.`);
    handleNavigate('ask-adm');
  };

  // If showing landing page, render LandingPage component
  if (isShowingLanding) {
    return <LandingPage onEnterApp={handleEnterApp} />;
  }

  // Selected decision entity if viewing detail
  const currentDecision = selectedDecisionId 
    ? decisions.find(d => d.id === selectedDecisionId)
    : null;

  // Selected outcome entity if viewing outcome detail
  const currentOutcomeDecision = viewingOutcomeDecisionId
    ? decisions.find(d => d.id === viewingOutcomeDecisionId)
    : null;

  // Decision for which user is recording outcome
  const decisionToRecordOutcome = recordingOutcomeDecisionId
    ? decisions.find(d => d.id === recordingOutcomeDecisionId)
    : null;

  const pendingOutcomesCount = decisions.filter(d => d.status === 'Awaiting Outcome').length;

  return (
    <div className="flex min-h-screen bg-[#FAF7F2] text-[#1C1917] selection:bg-[#E8D7C3] selection:text-[#522912]">
      {/* Sidebar Navigation */}
      <Sidebar
        activePage={activePage}
        onNavigate={handleNavigate}
        onOpenSettings={() => setIsSettingsOpen(true)}
        onGoToLanding={handleReturnToLanding}
        isMobileOpen={isMobileMenuOpen}
        onCloseMobile={() => setIsMobileMenuOpen(false)}
        pendingOutcomesCount={pendingOutcomesCount}
      />

      {/* Main Content Viewport */}
      <div className="flex-1 flex flex-col min-w-0">
        <TopBar
          activePage={activePage}
          onNavigate={handleNavigate}
          onOpenMobileMenu={() => setIsMobileMenuOpen(true)}
          searchQuery={searchQuery}
          onSearchChange={(q) => {
            setSearchQuery(q);
            if (activePage !== 'decision-history' && q.trim().length > 1) {
              setActivePage('decision-history');
            }
          }}
          onSelectDecision={handleSelectDecision}
          onGoToLanding={handleReturnToLanding}
        />

        <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl w-full mx-auto">
          {/* VIEW: RECORD OUTCOME FOR A DECISION */}
          {decisionToRecordOutcome ? (
            <RecordOutcomeView
              decision={decisionToRecordOutcome}
              onOutcomeRecorded={handleOutcomeRecorded}
              onCancel={() => {
                setRecordingOutcomeDecisionId(null);
                setSelectedDecisionId(decisionToRecordOutcome.id);
              }}
            />
          ) : viewingOutcomeDecisionId && currentOutcomeDecision?.outcome ? (
            /* VIEW: OUTCOME DETAIL & COMPARISON */
            <OutcomeDetailView
              outcome={currentOutcomeDecision.outcome}
              decision={currentOutcomeDecision}
              onBack={() => {
                setViewingOutcomeDecisionId(null);
                setSelectedDecisionId(currentOutcomeDecision.id);
              }}
              onAskAdmAboutThis={handleAskAboutVendor}
            />
          ) : currentDecision ? (
            /* VIEW: DECISION TIMELINE DETAIL */
            <DecisionDetailView
              decision={currentDecision}
              onBack={() => setSelectedDecisionId(null)}
              onRecordOutcome={handleStartRecordOutcome}
              onViewOutcomeDetail={handleViewOutcomeDetail}
            />
          ) : activePage === 'new-decision' ? (
            /* VIEW: NEW DECISION WORKFLOW */
            <NewDecisionView
              onDecisionCreated={handleDecisionCreated}
              onCancel={() => handleNavigate('overview')}
            />
          ) : activePage === 'decision-history' ? (
            /* VIEW: DECISION HISTORY */
            <DecisionHistoryView
              decisions={decisions}
              onSelectDecision={handleSelectDecision}
              onRecordNewDecision={() => handleNavigate('new-decision')}
              onRecordOutcome={handleStartRecordOutcome}
            />
          ) : activePage === 'outcomes' ? (
            /* VIEW: OUTCOMES TRACKER */
            <OutcomesTrackerView
              decisions={decisions}
              outcomes={outcomes}
              onSelectDecision={handleSelectDecision}
              onRecordOutcome={handleStartRecordOutcome}
              onViewOutcomeDetail={handleViewOutcomeDetail}
            />
          ) : activePage === 'ask-adm' ? (
            /* VIEW: ASK ADM DECISION INTELLIGENCE */
            <AskAdmView
              initialQuery={askAdmInitialQuery}
              onSelectDecision={handleSelectDecision}
              onRecordNewDecision={() => handleNavigate('new-decision')}
            />
          ) : activePage === 'vendors' ? (
            /* VIEW: VENDORS SCORECARDS */
            <VendorsView
              vendors={vendors}
              onAskAboutVendor={handleAskAboutVendor}
              onFilterVendorDecisions={(vendorName) => {
                setSearchQuery(vendorName);
                handleNavigate('decision-history');
              }}
            />
          ) : activePage === 'insights' ? (
            /* VIEW: HISTORICAL INSIGHTS */
            <InsightsView
              insights={insights}
              onExploreEvidence={(ins) => setEvidenceInsight(ins)}
              onAskAboutInsight={handleAskAboutInsight}
            />
          ) : (
            /* VIEW: DASHBOARD / OVERVIEW (DEFAULT) */
            <div className="space-y-6 pb-12">
              {/* Executive Header */}
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                  <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-stone-900">
                    Decision Intelligence
                  </h1>
                  <p className="mt-1 text-xs sm:text-sm text-stone-600 max-w-2xl">
                    Your decisions become more valuable when the system remembers what happened next.
                  </p>
                </div>

                <div className="flex items-center gap-2 sm:gap-3 shrink-0 self-start md:self-auto">
                  <button
                    onClick={() => handleNavigate('ask-adm')}
                    className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs sm:text-sm font-semibold text-stone-800 bg-white border border-[#E3DCD2] hover:bg-[#FAF7F2] rounded-lg transition-colors shadow-2xs"
                  >
                    <Compass className="w-4 h-4 text-[#B45309]" />
                    <span>Ask ADM</span>
                  </button>

                  <button
                    onClick={() => handleNavigate('new-decision')}
                    className="inline-flex items-center gap-1.5 px-4 py-2 text-xs sm:text-sm font-semibold text-white bg-[#B45309] hover:bg-[#9A3412] active:bg-[#7C2D12] rounded-lg shadow-xs transition-colors"
                  >
                    <Plus className="w-4 h-4" />
                    <span>+ Record Decision</span>
                  </button>
                </div>
              </div>

              {/* KPI Cards */}
              <KpiCards stats={stats} />

              {/* Central Product Loop Component: The Memory Loop */}
              <MemoryLoop
                scenarios={loopScenarios}
                onExploreScenario={(scenario) => {
                  const match = decisions.find(d => d.vendorName.toLowerCase().includes(scenario.vendorName.toLowerCase().split(' ')[0]));
                  if (match) {
                    handleSelectDecision(match.id);
                  }
                }}
              />

              {/* Prominent ADM Insight Card */}
              {insights[0] && (
                <AdmInsightCard
                  insight={insights[0]}
                  onExploreEvidence={(ins) => setEvidenceInsight(ins)}
                  onAskAboutInsight={handleAskAboutInsight}
                />
              )}

              {/* Recent Decisions Table */}
              <RecentDecisionsTable
                decisions={decisions}
                onSelectDecision={handleSelectDecision}
                onRecordOutcome={handleStartRecordOutcome}
                onViewAllDecisions={() => handleNavigate('decision-history')}
              />
            </div>
          )}
        </main>
      </div>

      {/* Explore Evidence Modal */}
      {evidenceInsight && (
        <EvidenceModal
          insight={evidenceInsight}
          decisions={decisions}
          isOpen={Boolean(evidenceInsight)}
          onClose={() => setEvidenceInsight(null)}
          onSelectDecision={handleSelectDecision}
        />
      )}

      {/* Settings Modal */}
      <SettingsModal
        isOpen={isSettingsOpen}
        onClose={() => setIsSettingsOpen(false)}
        onDataReset={refreshData}
      />
    </div>
  );
}
