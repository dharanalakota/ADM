export type DecisionType = 'Selected' | 'Rejected' | 'Shortlisted' | 'Deferred';

export type ConfidenceLevel = 'Low' | 'Medium' | 'High';

export type OutcomeResult = 'Successful' | 'Partially Successful' | 'Unsuccessful';

export type DecisionStatus = 'Completed' | 'Awaiting Outcome' | 'Closed';

export type VendorCategory = 
  | 'Logistics & Freight'
  | 'Hardware & Infrastructure'
  | 'Cloud Infrastructure'
  | 'Packaging & Materials'
  | 'Professional Services'
  | 'Security & Compliance'
  | 'Enterprise Software';

export interface EvaluationFactor {
  id: string;
  name: string;
  selected: boolean;
  score?: number; // 1-5
  note?: string;
}

export interface MetricComparison {
  metric: string;
  expected: string;
  actual: string;
  deltaStatus: 'met' | 'exceeded' | 'missed';
  variance?: string;
}

export interface Outcome {
  id: string;
  decisionId: string;
  vendorName: string;
  recordedDate: string;
  recordedBy: string;
  result: OutcomeResult;
  performanceRatings: {
    delivery: number; // 1 to 5
    quality: number;
    costBudget: number;
    support: number;
    overall: number;
  };
  actualOutcomeDescription: string;
  whatWentWell: string;
  whatWentWrong: string;
  lesson: string;
  comparisons: MetricComparison[];
  admLearned: string;
  futureDecisionImpact: string;
}

export interface Decision {
  id: string;
  vendorName: string;
  vendorCategory: VendorCategory;
  projectRequirement: string;
  location: string;
  decisionType: DecisionType;
  decisionDate: string;
  recordedBy: string;
  evaluationFactors: EvaluationFactor[];
  contextGoal: string;
  contextAlternatives: string;
  reasoning: string;
  expectedOutcome: string;
  confidence: ConfidenceLevel;
  status: DecisionStatus;
  outcomeId?: string;
  outcome?: Outcome;
  budget?: string;
  contractDuration?: string;
  createdAt: string;
}

export interface HistoricalInsight {
  id: string;
  title: string;
  category: VendorCategory | 'General Procurement';
  summary: string;
  evidenceDecisionsCount: number;
  evidenceDecisionIds: string[];
  keyLesson: string;
  riskWarning?: string;
  recommendedAction: string;
  createdDate: string;
  impactScore?: string;
}

export interface MemoryLoopStage {
  id: string;
  title: string;
  vendorName: string;
  decisionText: string;
  outcomeText: string;
  memoryText: string;
  insightText: string;
  nextDecisionText: string;
  outcomeResult: OutcomeResult;
}

export interface CreateDecisionInput {
  vendorName: string;
  vendorCategory: VendorCategory;
  projectRequirement: string;
  location: string;
  decisionType: DecisionType;
  decisionDate: string;
  evaluationFactors: EvaluationFactor[];
  contextGoal: string;
  contextAlternatives: string;
  reasoning: string;
  expectedOutcome: string;
  confidence: ConfidenceLevel;
  budget?: string;
  contractDuration?: string;
}

export interface CreateOutcomeInput {
  decisionId: string;
  result: OutcomeResult;
  performanceRatings: {
    delivery: number;
    quality: number;
    costBudget: number;
    support: number;
    overall: number;
  };
  actualOutcomeDescription: string;
  whatWentWell: string;
  whatWentWrong: string;
  lesson: string;
  comparisons?: MetricComparison[];
}

export interface AdmQueryInput {
  query: string;
  categoryFilter?: string;
  vendorFilter?: string;
}

export interface EvidenceDecisionMatch {
  decision: Decision;
  outcome?: Outcome;
  relevanceScore: number; // 0-100
  relevanceReason: string;
}

export interface AdmHistoricalMemory {
  decisionId?: string;
  vendor: string;
  memoryTypes: string[];
  content: string[];
  retrievalScores: number[];
}

export interface AdmQueryResult {
  query: string;
  synthesis: string;
  recommendation: string;

  historicalExperience: string[];
  whatHappenedPreviously: string[];
  lessonsFromMemory: string[];
  considerations: string[];
  memoryStatus: string;
  conflicts: string[];
  humanDecisionRequired: boolean;

  // Kept temporarily for compatibility with existing UI code.
  evidenceDecisions: EvidenceDecisionMatch[];

  correlatedSuccessFactors: string[];
  identifiedRisks: string[];
  contractChecklist: string[];
}

export interface VendorProfile {
  name: string;
  category: VendorCategory;
  decisionsCount: number;
  outcomesCount: number;
  successRate: number; // percentage
  averageRating: number;
  keyStrengths: string[];
  recurringRisks: string[];
  lastDecisionDate: string;
}

export interface MemoryStats {
  totalDecisions: number;
  outcomesRecorded: number;
  successfulOutcomes: number;
  historicalInsights: number;
  averageConfidence: string;
  outcomeRatePercent: number;
}
