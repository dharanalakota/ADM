/**
 * ADM — Adaptive Decision Memory Service Layer
 *
 * Formal Frontend/Backend Contract:
 * - record_decision(...)
 * - record_outcome(...)
 * - ask_adm(...)
 *
 * The frontend keeps its local UI state for fast navigation,
 * while the real organizational memory is persisted through
 * the FastAPI backend into Hindsight.
 */

import {
  Decision,
  Outcome,
  HistoricalInsight,
  MemoryStats,
  CreateDecisionInput,
  CreateOutcomeInput,
  AdmQueryInput,
  AdmQueryResult,
  VendorProfile,
  MemoryLoopStage,
  MetricComparison
} from '../types/adm';

const STORAGE_KEY_DECISIONS = 'adm_memory_decisions_v2';
const STORAGE_KEY_OUTCOMES = 'adm_memory_outcomes_v2';
const STORAGE_KEY_INSIGHTS = 'adm_memory_insights_v2';

const BACKEND_URL = 'http://localhost:8000';

/* -------------------------------------------------------------------------- */
/* INITIAL OUTCOMES                                                           */
/* -------------------------------------------------------------------------- */

const INITIAL_OUTCOMES: Outcome[] = [
  {
    id: 'out_acme_01',
    decisionId: 'dec_acme_01',
    vendorName: 'Acme Logistics',
    recordedDate: '2026-09-27',
    recordedBy: 'Sarah Chen (Logistics Director)',
    result: 'Partially Successful',
    performanceRatings: {
      delivery: 2,
      quality: 4,
      costBudget: 3,
      support: 3,
      overall: 3
    },
    actualOutcomeDescription:
      'Shipment arrived 2 business days later than guaranteed transit window for the Hyderabad regional distribution hub. Temperature control was maintained throughout transit, but customer launch was delayed.',
    whatWentWell:
      'Temperature telemetry remained within the safe 2°C–8°C window. Cold-chain integrity documentation was submitted cleanly.',
    whatWentWrong:
      'Local fleet dispatch bottleneck in Hyderabad caused a 48-hour delay. Route re-prioritization notification was delayed by 14 hours.',
    lesson:
      'For time-sensitive regional launches, guaranteed transit buffers and dedicated route dispatcher contacts must be explicitly written into the contract.',
    comparisons: [
      {
        metric: 'Delivery Transit Time',
        expected: '3 business days',
        actual: '5 business days (2 days late)',
        deltaStatus: 'missed',
        variance: '+66% delay'
      },
      {
        metric: 'Budget Variance',
        expected: '$18,500 fixed cost',
        actual: '$19,980 ($1,480 fuel adjustment)',
        deltaStatus: 'missed',
        variance: '+8.0%'
      },
      {
        metric: 'Cold Chain Compliance',
        expected: '100% temp compliance',
        actual: '100% temp maintained',
        deltaStatus: 'met',
        variance: '0.0%'
      },
      {
        metric: 'Support Responsiveness',
        expected: '< 30 min updates',
        actual: '14 hr delay on dispatch notice',
        deltaStatus: 'missed',
        variance: 'Delayed'
      }
    ],
    admLearned:
      'For time-sensitive logistics decisions, previous outcomes show that delivery reliability and regional fleet ownership mattered more than lower freight quotes.',
    futureDecisionImpact:
      'Require dedicated fleet verification and contract penalty clauses for any transit window under 72 hours.'
  },
  {
    id: 'out_apex_01',
    decisionId: 'dec_apex_01',
    vendorName: 'Apex Cloud Services',
    recordedDate: '2026-09-12',
    recordedBy: 'Marcus Brody (VP Infrastructure)',
    result: 'Successful',
    performanceRatings: {
      delivery: 5,
      quality: 5,
      costBudget: 4,
      support: 5,
      overall: 5
    },
    actualOutcomeDescription:
      'Data residency migration completed 4 days ahead of scheduled compliance audit. Zero unexpected downtime during cutover.',
    whatWentWell:
      'Dedicated technical account manager held daily syncs; automated Terraform modules simplified VPC deployment.',
    whatWentWrong:
      'Initial billing setup had confusing egress pricing calculation that took 3 days to clarify with their finance team.',
    lesson:
      'Pre-negotiated egress caps prevent billing surprises even with high-performing cloud vendors.',
    comparisons: [
      {
        metric: 'Cutover Timeline',
        expected: '14 calendar days',
        actual: '10 calendar days (4 days early)',
        deltaStatus: 'exceeded',
        variance: '-28.5%'
      },
      {
        metric: 'System Uptime',
        expected: '99.9% target',
        actual: '100.0% during migration',
        deltaStatus: 'exceeded',
        variance: '+0.1%'
      },
      {
        metric: 'Budget Variance',
        expected: '$42,000 monthly',
        actual: '$41,200 actual',
        deltaStatus: 'met',
        variance: '-1.9%'
      }
    ],
    admLearned:
      'Vendor-provided Terraform infrastructure modules and direct TAM involvement reduce cloud migration project risk by over 80%.',
    futureDecisionImpact:
      'Standardize TAM requirement in future infrastructure RFP evaluations.'
  },
  {
    id: 'out_omni_01',
    decisionId: 'dec_omni_01',
    vendorName: 'OmniPackaging Solutions',
    recordedDate: '2026-09-01',
    recordedBy: 'Elena Rostova (Procurement Lead)',
    result: 'Partially Successful',
    performanceRatings: {
      delivery: 4,
      quality: 5,
      costBudget: 2,
      support: 4,
      overall: 3
    },
    actualOutcomeDescription:
      'Biodegradable secondary packaging exceeded drop-test and tensile strength expectations. However, custom die-tooling surcharges led to a 12% budget overrun.',
    whatWentWell:
      'Zero packaging failure rate during 1,000 unit warehouse stress trials; eco-certification paperwork was immaculate.',
    whatWentWrong:
      'Unclear mold setup and tooling fee schedule resulted in $6,400 unexpected invoice surcharge.',
    lesson:
      'Packaging agreements must explicitly cap custom tooling and plate calibration costs before committing to production runs.',
    comparisons: [
      {
        metric: 'Unit Strength',
        expected: 'Drop test 1.5m',
        actual: 'Passed 2.0m stress test',
        deltaStatus: 'exceeded',
        variance: '+33%'
      },
      {
        metric: 'Total Cost',
        expected: '$53,000 all-in',
        actual: '$59,400 (+ tooling fee)',
        deltaStatus: 'missed',
        variance: '+12.1%'
      },
      {
        metric: 'Sample Lead Time',
        expected: '10 business days',
        actual: '11 business days',
        deltaStatus: 'met',
        variance: '+1 day'
      }
    ],
    admLearned:
      'Sustainable packaging vendors often exclude initial calibration and tooling plates from top-line quotes.',
    futureDecisionImpact:
      'Introduce mandatory "all-in tooling lock" clause in future sustainable packaging tenders.'
  },
  {
    id: 'out_vanguard_01',
    decisionId: 'dec_vanguard_01',
    vendorName: 'Vanguard Security Auditing',
    recordedDate: '2026-08-25',
    recordedBy: 'David Kim (Chief Information Security Officer)',
    result: 'Successful',
    performanceRatings: {
      delivery: 5,
      quality: 5,
      costBudget: 5,
      support: 5,
      overall: 5
    },
    actualOutcomeDescription:
      'SOC 2 Type II readiness audit finished 1 week early with zero material discrepancies. Remediation tracker was crystal clear.',
    whatWentWell:
      'Auditor team had deep domain familiarity with cloud-native SaaS; very minimal engineering fatigue.',
    whatWentWrong:
      'None. Minor documentation reformatting requested on day 3 was completed in 2 hours.',
    lesson:
      'Domain-specialized compliance firms require 50% fewer engineering support hours than generalist accounting giants.',
    comparisons: [
      {
        metric: 'Audit Duration',
        expected: '6 weeks',
        actual: '5 weeks',
        deltaStatus: 'exceeded',
        variance: '-16.6%'
      },
      {
        metric: 'Remediation Velocity',
        expected: '14 days post-audit',
        actual: '3 days post-audit',
        deltaStatus: 'exceeded',
        variance: '-78%'
      },
      {
        metric: 'Fixed Fee Quote',
        expected: '$35,000',
        actual: '$35,000 exactly',
        deltaStatus: 'met',
        variance: '0.0%'
      }
    ],
    admLearned:
      'Boutique security auditors specializing strictly in multi-tenant cloud architectures deliver higher quality reports faster than Big 4 generalists.',
    futureDecisionImpact:
      'Prioritize niche domain specialization over generic firm brand recognition for security audits.'
  }
];

/* -------------------------------------------------------------------------- */
/* INITIAL DECISIONS                                                          */
/* -------------------------------------------------------------------------- */

const INITIAL_DECISIONS: Decision[] = [
  {
    id: 'dec_acme_01',
    vendorName: 'Acme Logistics',
    vendorCategory: 'Logistics & Freight',
    projectRequirement: 'Hyderabad regional cold-chain delivery launch',
    location: 'Hyderabad, India (Regional Hub)',
    decisionType: 'Selected',
    decisionDate: '2026-09-24',
    recordedBy: 'Sarah Chen (Logistics Director)',
    evaluationFactors: [
      {
        id: 'f1',
        name: 'Price',
        selected: true,
        score: 4,
        note: 'Quote was 7% below closest competitor'
      },
      {
        id: 'f2',
        name: 'Delivery',
        selected: true,
        score: 3,
        note: 'Promised 3-day transit'
      },
      {
        id: 'f3',
        name: 'Reliability',
        selected: true,
        score: 3,
        note: 'Regional track record limited'
      },
      {
        id: 'f4',
        name: 'Quality',
        selected: true,
        score: 4,
        note: 'State of the art refrigerated fleet'
      },
      {
        id: 'f5',
        name: 'Compliance',
        selected: true,
        score: 5,
        note: 'ISO 9001 and cold chain verified'
      },
      {
        id: 'f6',
        name: 'Support',
        selected: false
      },
      {
        id: 'f7',
        name: 'Technical capability',
        selected: true,
        score: 4,
        note: 'API GPS tracking available'
      }
    ],
    contextGoal:
      'Establish reliable temperature-controlled pharmaceutical transit from Bangalore manufacturing hub to 14 Hyderabad regional clinics.',
    contextAlternatives:
      'Evaluated RapidShip (rejected due to missing continuous telemetry) and BlueDart Priority (higher baseline tariff by 18%).',
    reasoning:
      'Selected Acme Logistics because their dedicated refrigerated fleet meets ISO 9001 specs, and their quoted rate was 7% lower than BlueDart. We assumed their promised 3-day SLA would hold despite their newly opened Hyderabad terminal.',
    expectedOutcome:
      'Complete delivery within 3 business days, zero thermal excursions, transit cost strictly under $18,500.',
    confidence: 'High',
    status: 'Completed',
    outcomeId: 'out_acme_01',
    outcome: INITIAL_OUTCOMES[0],
    budget: '$18,500',
    contractDuration: 'Single project pilot',
    createdAt: '2026-09-24T10:30:00Z'
  },
  {
    id: 'dec_novatech_01',
    vendorName: 'NovaTech Supplies',
    vendorCategory: 'Hardware & Infrastructure',
    projectRequirement:
      'Bangalore edge-computing server cluster procurement',
    location: 'Bangalore, India',
    decisionType: 'Selected',
    decisionDate: '2026-09-21',
    recordedBy: 'Rohan Mehra (IT Operations Lead)',
    evaluationFactors: [
      {
        id: 'f1',
        name: 'Price',
        selected: true,
        score: 4,
        note: 'Hardware volume discount of 11%'
      },
      {
        id: 'f2',
        name: 'Delivery',
        selected: true,
        score: 4,
        note: 'Guaranteed 2-week delivery'
      },
      {
        id: 'f3',
        name: 'Reliability',
        selected: true,
        score: 4,
        note: 'OEM authorized distributor'
      },
      {
        id: 'f4',
        name: 'Quality',
        selected: true,
        score: 5,
        note: 'Enterprise tier Supermicro chassis'
      },
      {
        id: 'f5',
        name: 'Compliance',
        selected: true,
        score: 4,
        note: 'Full BIS safety compliance'
      },
      {
        id: 'f6',
        name: 'Support',
        selected: true,
        score: 4,
        note: '3-year 24/7 onsite warranty'
      },
      {
        id: 'f7',
        name: 'Technical capability',
        selected: true,
        score: 5,
        note: 'Pre-racked and cable-labeled'
      }
    ],
    contextGoal:
      'Upgrade local edge processing capacity for real-time video analytics cluster.',
    contextAlternatives:
      'Dell Direct (4 weeks longer lead time), SysCare India (5% cheaper but refused onsite warranty).',
    reasoning:
      'NovaTech Supplies offered immediate stock availability and committed to pre-racking hardware at their facility before delivery, reducing internal technician installation hours.',
    expectedOutcome:
      'Delivery of 8 server units within 14 calendar days; turnkey rack-mounting in server room within 48 hours of arrival.',
    confidence: 'Medium',
    status: 'Awaiting Outcome',
    budget: '$64,000',
    contractDuration: '3-year hardware warranty included',
    createdAt: '2026-09-21T14:15:00Z'
  },
  {
    id: 'dec_rapidship_01',
    vendorName: 'RapidShip',
    vendorCategory: 'Logistics & Freight',
    projectRequirement: 'Urgent Mumbai express distribution',
    location: 'Mumbai, India',
    decisionType: 'Rejected',
    decisionDate: '2026-09-18',
    recordedBy: 'Sarah Chen (Logistics Director)',
    evaluationFactors: [
      {
        id: 'f1',
        name: 'Price',
        selected: true,
        score: 5,
        note: 'Lowest cost quote submitted'
      },
      {
        id: 'f2',
        name: 'Delivery',
        selected: true,
        score: 4,
        note: 'Aggressive 24-hr transit claim'
      },
      {
        id: 'f3',
        name: 'Reliability',
        selected: true,
        score: 2,
        note: 'High frequency of missed dispatch times reported in industry'
      },
      {
        id: 'f4',
        name: 'Quality',
        selected: true,
        score: 2,
        note: 'Lacks IoT real-time temperature loggers'
      },
      {
        id: 'f5',
        name: 'Compliance',
        selected: false
      },
      {
        id: 'f6',
        name: 'Support',
        selected: true,
        score: 3,
        note: 'Call center only, no dedicated account manager'
      },
      {
        id: 'f7',
        name: 'Technical capability',
        selected: true,
        score: 2,
        note: 'No automated API webhook updates'
      }
    ],
    contextGoal:
      'Same-day cold chain delivery evaluation for time-critical distribution in Mumbai metropolitan area.',
    contextAlternatives:
      'Acme Logistics, DHL Express Freight.',
    reasoning:
      'Rejected despite being the lowest bidder by 15%. RapidShip could not verify continuous sensor data logging in vehicle cargo bays, which violates our strict GDP (Good Distribution Practice) guidelines.',
    expectedOutcome:
      'Avoided risk of cargo spoilage and regulatory non-compliance penalty.',
    confidence: 'High',
    status: 'Closed',
    budget: '$12,000 quote rejected',
    contractDuration: 'None',
    createdAt: '2026-09-18T09:00:00Z'
  },
  {
    id: 'dec_apex_01',
    vendorName: 'Apex Cloud Services',
    vendorCategory: 'Cloud Infrastructure',
    projectRequirement:
      'EU GDPR compliance & localized failover cluster',
    location: 'Frankfurt / Dublin',
    decisionType: 'Selected',
    decisionDate: '2026-09-04',
    recordedBy: 'Marcus Brody (VP Infrastructure)',
    evaluationFactors: [
      {
        id: 'f1',
        name: 'Price',
        selected: true,
        score: 4,
        note: 'Reserved instance pricing commitment'
      },
      {
        id: 'f2',
        name: 'Delivery',
        selected: true,
        score: 5,
        note: 'Automated infrastructure deployment'
      },
      {
        id: 'f3',
        name: 'Reliability',
        selected: true,
        score: 5,
        note: '99.99% uptime guarantee with SLA credits'
      },
      {
        id: 'f4',
        name: 'Quality',
        selected: true,
        score: 5,
        note: 'SOC 2, ISO 27001, C5 certified'
      },
      {
        id: 'f5',
        name: 'Compliance',
        selected: true,
        score: 5,
        note: 'Full European data sovereignty compliance'
      },
      {
        id: 'f6',
        name: 'Support',
        selected: true,
        score: 5,
        note: 'Enterprise TAM assigned'
      },
      {
        id: 'f7',
        name: 'Technical capability',
        selected: true,
        score: 5,
        note: 'Terraform modules pre-certified'
      }
    ],
    contextGoal:
      'Establish compliant European data residency infrastructure for incoming enterprise fintech clients.',
    contextAlternatives:
      'AWS Frankfurt (higher cost margin), Hetzner (lower compliance support).',
    reasoning:
      'Apex provided pre-certified BSI C5 and GDPR compliance envelopes with a dedicated Technical Account Manager and guaranteed maximum latency under 15ms across Western Europe.',
    expectedOutcome:
      'Migration within 14 calendar days, zero downtime, budget strictly within $42,000/month.',
    confidence: 'High',
    status: 'Completed',
    outcomeId: 'out_apex_01',
    outcome: INITIAL_OUTCOMES[1],
    budget: '$42,000/mo',
    contractDuration: '12-month commitment',
    createdAt: '2026-09-04T11:00:00Z'
  },
  {
    id: 'dec_omni_01',
    vendorName: 'OmniPackaging Solutions',
    vendorCategory: 'Packaging & Materials',
    projectRequirement:
      'Eco-certified biodegradable product packaging trial',
    location: 'Pune, India',
    decisionType: 'Selected',
    decisionDate: '2026-08-19',
    recordedBy: 'Elena Rostova (Procurement Lead)',
    evaluationFactors: [
      {
        id: 'f1',
        name: 'Price',
        selected: true,
        score: 3,
        note: 'Competitive unit cost, tooling terms ambiguous'
      },
      {
        id: 'f2',
        name: 'Delivery',
        selected: true,
        score: 4,
        note: 'Standard 2-week production lead'
      },
      {
        id: 'f3',
        name: 'Reliability',
        selected: true,
        score: 4,
        note: 'Strong domestic manufacturing capacity'
      },
      {
        id: 'f4',
        name: 'Quality',
        selected: true,
        score: 5,
        note: 'ASTM D6400 compostable certified'
      },
      {
        id: 'f5',
        name: 'Compliance',
        selected: true,
        score: 5,
        note: 'FSSAI food contact approved'
      },
      {
        id: 'f6',
        name: 'Support',
        selected: true,
        score: 4,
        note: 'Sampling studio in Pune'
      },
      {
        id: 'f7',
        name: 'Technical capability',
        selected: true,
        score: 4,
        note: 'Custom molded pulp capability'
      }
    ],
    contextGoal:
      'Replace plastic blister packaging across consumer electronics line with compostable molded pulp.',
    contextAlternatives:
      'EcoPack Global (higher shipping carbon footprint from Vietnam), PackWell (non-certified).',
    reasoning:
      'OmniPackaging has a local certified plant in Pune, reducing carbon miles and offering rapid custom prototype tooling.',
    expectedOutcome:
      'Full batch test of 1,000 units meeting drop-test specs, delivery by end of August, budget $53,000.',
    confidence: 'Medium',
    status: 'Completed',
    outcomeId: 'out_omni_01',
    outcome: INITIAL_OUTCOMES[2],
    budget: '$53,000',
    contractDuration: 'Batch production order',
    createdAt: '2026-08-19T15:30:00Z'
  },
  {
    id: 'dec_vanguard_01',
    vendorName: 'Vanguard Security Auditing',
    vendorCategory: 'Security & Compliance',
    projectRequirement:
      'Annual SOC 2 Type II and ISO 27001 surveillance audit',
    location: 'Remote / Singapore',
    decisionType: 'Selected',
    decisionDate: '2026-08-02',
    recordedBy: 'David Kim (Chief Information Security Officer)',
    evaluationFactors: [
      {
        id: 'f1',
        name: 'Price',
        selected: true,
        score: 4,
        note: 'Fixed fee, no hourly overage clauses'
      },
      {
        id: 'f2',
        name: 'Delivery',
        selected: true,
        score: 5,
        note: '6-week audit timeline guaranteed'
      },
      {
        id: 'f3',
        name: 'Reliability',
        selected: true,
        score: 5,
        note: '100% on-time audit delivery track record'
      },
      {
        id: 'f4',
        name: 'Quality',
        selected: true,
        score: 5,
        note: 'AICPA accredited'
      },
      {
        id: 'f5',
        name: 'Compliance',
        selected: true,
        score: 5,
        note: 'Global recognized accreditation'
      },
      {
        id: 'f6',
        name: 'Support',
        selected: true,
        score: 5,
        note: 'Dedicated auditor Slack channel'
      },
      {
        id: 'f7',
        name: 'Technical capability',
        selected: true,
        score: 5,
        note: 'Direct AWS/GCP API evidence collection'
      }
    ],
    contextGoal:
      'Obtain clean SOC 2 Type II report required for enterprise customer renewals and tender filings.',
    contextAlternatives:
      'PwC Enterprise Risk (3.2x higher price tag), Schellman (booking lead time was 4 months out).',
    reasoning:
      'Vanguard specializes exclusively in cloud software vendors, integrates directly with our cloud audit logs, and agreed to a strict 6-week fixed-fee audit schedule.',
    expectedOutcome:
      'Completion of field work in 6 weeks, clear corrective guidance, audit cost locked at $35,000.',
    confidence: 'High',
    status: 'Completed',
    outcomeId: 'out_vanguard_01',
    outcome: INITIAL_OUTCOMES[3],
    budget: '$35,000',
    contractDuration: 'Annual audit engagement',
    createdAt: '2026-08-02T08:45:00Z'
  }
];

/* -------------------------------------------------------------------------- */
/* INITIAL INSIGHTS                                                           */
/* -------------------------------------------------------------------------- */

const INITIAL_INSIGHTS: HistoricalInsight[] = [
  {
    id: 'ins_01',
    title:
      'Delivery Reliability Overrides Minor Price Advantages in Regional Logistics',
    category: 'Logistics & Freight',
    summary:
      'For time-sensitive logistics decisions, previous outcomes show that delivery reliability mattered more than small differences in price.',
    evidenceDecisionsCount: 7,
    evidenceDecisionIds: ['dec_acme_01', 'dec_rapidship_01'],
    keyLesson:
      'Vendors quoting 5%–10% below market average in regional distribution corridors exhibited an average delay frequency of 28% due to outsourced local last-mile dispatch.',
    riskWarning:
      'Beware of regional hubs with newly opened facilities lacking established fleet ownership.',
    recommendedAction:
      'Always enforce tiered liquidated damages clauses for delays exceeding 4 hours on perishable or launch-critical freight.',
    createdDate: '2026-09-27',
    impactScore: 'High'
  },
  {
    id: 'ins_02',
    title:
      'Custom Tooling & Calibration Costs Excluded from Packaging Base Quotes',
    category: 'Packaging & Materials',
    summary:
      'Across 4 past packaging vendor engagements, actual invoices exceeded initial contract quotes by an average of 11.4% due to secondary mold adjustments.',
    evidenceDecisionsCount: 4,
    evidenceDecisionIds: ['dec_omni_01'],
    keyLesson:
      'Material certifications and unit sample quality do not correlate with billing transparency around die-casting and plate calibration fees.',
    riskWarning:
      'Open-ended calibration clauses consistently lead to budget friction.',
    recommendedAction:
      'Mandate "Guaranteed Maximum Tooling Fee" caps in the initial purchase agreement.',
    createdDate: '2026-09-03',
    impactScore: 'Medium'
  },
  {
    id: 'ins_03',
    title:
      'Boutique Specialized Compliance Partners Outperform Big 4 in Time-to-Audit',
    category: 'Security & Compliance',
    summary:
      'Cloud-native compliance auditors achieved readiness 24% faster than multi-disciplinary accounting firms, requiring 65% less internal engineering effort.',
    evidenceDecisionsCount: 5,
    evidenceDecisionIds: ['dec_vanguard_01'],
    keyLesson:
      'Direct API integrations for evidence gathering eliminate tedious screenshot compilation and engineer context switching.',
    recommendedAction:
      'Prioritize automated evidence collectors over manual audit workflows in all future compliance vendor reviews.',
    createdDate: '2026-08-26',
    impactScore: 'High'
  }
];

/* -------------------------------------------------------------------------- */
/* MEMORY LOOP SCENARIOS                                                      */
/* -------------------------------------------------------------------------- */

const MEMORY_LOOP_SCENARIOS: MemoryLoopStage[] = [
  {
    id: 'stage_acme',
    title: 'Regional Cold-Chain Freight',
    vendorName: 'Acme Logistics',
    decisionText:
      'Selected Acme Logistics for the Hyderabad regional delivery project based on a 7% cost discount.',
    outcomeText:
      'Delivery arrived 2 business days late due to regional dispatch bottlenecks, costing $1,480 in fuel adjustments.',
    memoryText:
      'ADM recorded delivery reliability concerns in regional transit hubs when initial quotes are under market baseline.',
    insightText:
      'For time-sensitive regional routes, delivery reliability and dedicated fleet ownership matter more than minor price discounts.',
    nextDecisionText:
      'New Bangalore-Hyderabad corridor RFP mandates guaranteed SLA penalties for transit delays exceeding 4 hours.',
    outcomeResult: 'Partially Successful'
  },
  {
    id: 'stage_apex',
    title: 'European Cloud Residency',
    vendorName: 'Apex Cloud Services',
    decisionText:
      'Selected Apex Cloud Services for EU GDPR data residency migration with dedicated TAM support.',
    outcomeText:
      'Migration completed 4 days early with zero downtime; actual monthly billing came in 1.9% under budget.',
    memoryText:
      'ADM recorded high correlation between vendor-provided Terraform modules and zero-downtime migrations.',
    insightText:
      'Pre-certified infrastructure modules and dedicated Technical Account Managers eliminate 80% of migration risk.',
    nextDecisionText:
      'Future APAC infrastructure tender explicitly mandates vendor-supported automation modules and assigned TAM.',
    outcomeResult: 'Successful'
  },
  {
    id: 'stage_omni',
    title: 'Sustainable Packaging Trial',
    vendorName: 'OmniPackaging Solutions',
    decisionText:
      'Selected OmniPackaging for compostable molded pulp packaging to hit corporate sustainability target.',
    outcomeText:
      'Material passed all drop tests with flying colors, but custom mold setup incurred an unbudgeted 12.1% tooling fee.',
    memoryText:
      'ADM recorded recurring hidden tooling fees in sustainable packaging category despite accurate per-unit prices.',
    insightText:
      'Packaging suppliers frequently omit calibration and setup charges from top-line promotional quotes.',
    nextDecisionText:
      'Procurement contract template now includes a mandatory "All-In Tooling & Mold Cost Lock" clause.',
    outcomeResult: 'Partially Successful'
  }
];

/* -------------------------------------------------------------------------- */
/* STORAGE HELPERS                                                            */
/* -------------------------------------------------------------------------- */

function loadFromStorage<T>(key: string, fallback: T): T {
  try {
    const item = localStorage.getItem(key);

    if (!item) {
      return fallback;
    }

    return JSON.parse(item);
  } catch {
    return fallback;
  }
}

function saveToStorage<T>(key: string, data: T): void {
  try {
    localStorage.setItem(key, JSON.stringify(data));
  } catch (e) {
    console.error('ADM Storage error:', e);
  }
}

/* -------------------------------------------------------------------------- */
/* ADM SERVICE                                                                */
/* -------------------------------------------------------------------------- */

class AdmService {
  private decisions: Decision[];
  private outcomes: Outcome[];
  private insights: HistoricalInsight[];

  constructor() {
    this.outcomes = loadFromStorage<Outcome[]>(
      STORAGE_KEY_OUTCOMES,
      INITIAL_OUTCOMES
    );

    this.decisions = loadFromStorage<Decision[]>(
      STORAGE_KEY_DECISIONS,
      INITIAL_DECISIONS
    );

    this.insights = loadFromStorage<HistoricalInsight[]>(
      STORAGE_KEY_INSIGHTS,
      INITIAL_INSIGHTS
    );

    this.syncDecisionsAndOutcomes();
  }

  private syncDecisionsAndOutcomes(): void {
    const outcomeMap = new Map(
      this.outcomes.map(outcome => [outcome.decisionId, outcome])
    );

    this.decisions = this.decisions.map(decision => {
      const outcome = outcomeMap.get(decision.id);

      if (outcome) {
        return {
          ...decision,
          outcomeId: outcome.id,
          outcome,
          status: 'Completed'
        };
      }

      return decision;
    });
  }

  /* ------------------------------------------------------------------------ */
  /* CONTRACT METHOD 1 — RECORD DECISION                                      */
  /* ------------------------------------------------------------------------ */

  public async recordDecision(
    input: CreateDecisionInput
  ): Promise<Decision> {
    const id = `dec_${Date.now()}`;

    const newDecision: Decision = {
      id,
      vendorName: input.vendorName.trim(),
      vendorCategory: input.vendorCategory,
      projectRequirement: input.projectRequirement.trim(),
      location: input.location.trim() || 'Unspecified',
      decisionType: input.decisionType,
      decisionDate:
        input.decisionDate || new Date().toISOString().split('T')[0],
      recordedBy: 'Enterprise User (You)',
      evaluationFactors: input.evaluationFactors,
      contextGoal: input.contextGoal.trim(),
      contextAlternatives: input.contextAlternatives.trim(),
      reasoning: input.reasoning.trim(),
      expectedOutcome: input.expectedOutcome.trim(),
      confidence: input.confidence,
      status:
        input.decisionType === 'Rejected'
          ? 'Closed'
          : 'Awaiting Outcome',
      budget: input.budget?.trim(),
      contractDuration: input.contractDuration?.trim(),
      createdAt: new Date().toISOString()
    };

    /*
     * Keep frontend history working immediately.
     */
    this.decisions = [newDecision, ...this.decisions];
    saveToStorage(STORAGE_KEY_DECISIONS, this.decisions);

    /*
     * Persist the decision in real ADM organizational memory.
     */
    const response = await fetch(`${BACKEND_URL}/api/decisions`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        decision_id: id,
        vendor: newDecision.vendorName,
        situation: [
          `Vendor category: ${newDecision.vendorCategory}`,
          `Location: ${newDecision.location}`,
          `Decision type: ${newDecision.decisionType}`,
          `Project goal: ${newDecision.contextGoal}`
        ].join('\n'),
        requirements: newDecision.projectRequirement,
        options_considered: newDecision.contextAlternatives,
        reason_for_selection: newDecision.reasoning,
        expected_outcome: newDecision.expectedOutcome
      })
    });

    if (!response.ok) {
      const errorText = await response.text();

      throw new Error(
        `ADM memory write failed (${response.status}): ${errorText}`
      );
    }

    return newDecision;
  }

  /* ------------------------------------------------------------------------ */
  /* CONTRACT METHOD 2 — RECORD OUTCOME                                      */
  /* ------------------------------------------------------------------------ */

  public async recordOutcome(
    input: CreateOutcomeInput
  ): Promise<Outcome> {
    const decision = this.decisions.find(
      currentDecision => currentDecision.id === input.decisionId
    );

    if (!decision) {
      throw new Error(
        `Decision with ID ${input.decisionId} not found.`
      );
    }

    const outcomeId = `out_${Date.now()}`;

    const comparisons: MetricComparison[] =
      input.comparisons && input.comparisons.length > 0
        ? input.comparisons
        : [
            {
              metric: 'Primary Expected Outcome',
              expected:
                decision.expectedOutcome ||
                'Deliver target project results on schedule',
              actual:
                input.actualOutcomeDescription.slice(0, 80) + '...',
              deltaStatus:
                input.result === 'Successful' ? 'met' : 'missed',
              variance:
                input.result === 'Successful'
                  ? 'In line with forecast'
                  : 'Discrepancy identified'
            },
            {
              metric: 'Overall Performance',
              expected: `${decision.confidence} Confidence Target`,
              actual: `${input.performanceRatings.overall}/5 Star Rating`,
              deltaStatus:
                input.performanceRatings.overall >= 4
                  ? 'met'
                  : 'missed',
              variance:
                input.performanceRatings.overall >= 4
                  ? 'High performance'
                  : 'Performance shortfall'
            }
          ];

    let admLearned = '';
    let futureImpact = '';

    if (input.result === 'Successful') {
      admLearned = `When evaluating ${
        decision.vendorCategory
      }, decisions prioritizing ${decision.evaluationFactors
        .filter(factor => factor.selected)
        .map(factor => factor.name)
        .slice(0, 2)
        .join(' and ')} achieved superior results. ${input.lesson}`;

      futureImpact = `Reinforce weightings for verified track records and strong SLA guarantees in future ${decision.vendorCategory} requirements.`;
    } else if (input.result === 'Partially Successful') {
      admLearned = `Initial evaluation for ${decision.vendorName} underestimated operational risks: ${input.whatWentWrong.slice(
        0,
        100
      )}. ${input.lesson}`;

      futureImpact = `Include explicit verification milestones and contractual buffer terms for similar ${decision.vendorCategory} projects.`;
    } else {
      admLearned = `Critical divergence between expected outcome and reality in ${decision.vendorCategory}. Core breakdown: ${input.whatWentWrong.slice(
        0,
        120
      )}. ${input.lesson}`;

      futureImpact = `Flag future decisions in ${decision.vendorCategory} sharing similar risk profiles for mandatory secondary review.`;
    }

    const newOutcome: Outcome = {
      id: outcomeId,
      decisionId: input.decisionId,
      vendorName: decision.vendorName,
      recordedDate: new Date().toISOString().split('T')[0],
      recordedBy: 'Enterprise User (You)',
      result: input.result,
      performanceRatings: input.performanceRatings,
      actualOutcomeDescription:
        input.actualOutcomeDescription.trim(),
      whatWentWell: input.whatWentWell.trim(),
      whatWentWrong: input.whatWentWrong.trim(),
      lesson: input.lesson.trim(),
      comparisons,
      admLearned,
      futureDecisionImpact: futureImpact
    };

    /*
     * Keep frontend outcome history working locally.
     */
    this.outcomes = [newOutcome, ...this.outcomes];
    saveToStorage(STORAGE_KEY_OUTCOMES, this.outcomes);

    this.decisions = this.decisions.map(currentDecision => {
      if (currentDecision.id === input.decisionId) {
        return {
          ...currentDecision,
          outcomeId: newOutcome.id,
          outcome: newOutcome,
          status: 'Completed'
        };
      }

      return currentDecision;
    });

    saveToStorage(STORAGE_KEY_DECISIONS, this.decisions);

    /*
     * Create the frontend insight as before.
     */
    if (input.lesson.length > 20) {
      const newInsight: HistoricalInsight = {
        id: `ins_${Date.now()}`,
        title: `Outcome Pattern: ${decision.vendorName} in ${decision.vendorCategory}`,
        category: decision.vendorCategory,
        summary: input.lesson,
        evidenceDecisionsCount: 1,
        evidenceDecisionIds: [decision.id],
        keyLesson: input.lesson,
        riskWarning: input.whatWentWrong
          ? input.whatWentWrong.slice(0, 140)
          : undefined,
        recommendedAction: futureImpact,
        createdDate: new Date().toISOString().split('T')[0],
        impactScore:
          input.result === 'Unsuccessful' ? 'High' : 'Medium'
      };

      this.insights = [newInsight, ...this.insights];
      saveToStorage(STORAGE_KEY_INSIGHTS, this.insights);
    }

    /*
     * Persist the real outcome in Hindsight.
     */
    const response = await fetch(`${BACKEND_URL}/api/outcomes`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        decision_id: input.decisionId,
        vendor: decision.vendorName,
        actual_outcome: newOutcome.actualOutcomeDescription,
        consequences: [
          `Result: ${newOutcome.result}`,
          `What went well: ${newOutcome.whatWentWell}`,
          `What went wrong: ${newOutcome.whatWentWrong}`,
          `ADM learned: ${newOutcome.admLearned}`,
          `Future decision impact: ${newOutcome.futureDecisionImpact}`
        ].join('\n'),
        lesson: newOutcome.lesson
      })
    });

    if (!response.ok) {
      const errorText = await response.text();

      throw new Error(
        `ADM outcome memory write failed (${response.status}): ${errorText}`
      );
    }

    return newOutcome;
  }

  /* ------------------------------------------------------------------------ */
  /* CONTRACT METHOD 3 — ASK ADM                                             */
  /* ------------------------------------------------------------------------ */

  public async askAdm(
    input: AdmQueryInput
  ): Promise<AdmQueryResult> {
    const response = await fetch(`${BACKEND_URL}/api/ask`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        current_decision: input.query
      })
    });

    if (!response.ok) {
      const errorText = await response.text();

      throw new Error(
        `ADM backend request failed (${response.status}): ${errorText}`
      );
    }

    const data = await response.json();

    if (!data.result) {
      throw new Error(
        'ADM backend returned an empty decision-support result.'
      );
    }

    const result = data.result;

    const historicalExperience: string[] =
      Array.isArray(result.historical_experience)
        ? result.historical_experience
        : [];

    const previousOutcomes: string[] =
      Array.isArray(result.what_happened_previously)
        ? result.what_happened_previously
        : [];

    const lessons: string[] =
      Array.isArray(result.lessons_from_memory)
        ? result.lessons_from_memory
        : [];

    const considerations: string[] =
      Array.isArray(result.considerations)
        ? result.considerations
        : [];

    const conflicts: string[] =
      Array.isArray(result.conflicts)
        ? result.conflicts
        : [];

    const synthesisParts: string[] = [];

    if (historicalExperience.length > 0) {
      synthesisParts.push(
        `Historical experience:\n${historicalExperience
          .map(item => `• ${item}`)
          .join('\n')}`
      );
    }

    if (previousOutcomes.length > 0) {
      synthesisParts.push(
        `What happened previously:\n${previousOutcomes
          .map(item => `• ${item}`)
          .join('\n')}`
      );
    }

    if (lessons.length > 0) {
      synthesisParts.push(
        `Lessons from organizational memory:\n${lessons
          .map(item => `• ${item}`)
          .join('\n')}`
      );
    }

    if (conflicts.length > 0) {
      synthesisParts.push(
        `Mixed historical evidence:\n${conflicts
          .map(item => `• ${item}`)
          .join('\n')}`
      );
    }

    const synthesis =
      synthesisParts.length > 0
        ? synthesisParts.join('\n\n')
        : 'No relevant historical organizational experience was found.';

    const recommendation =
      considerations.length > 0
        ? `Considerations for the current decision:\n${considerations
            .map(item => `• ${item}`)
            .join('\n')}`
        : 'No additional considerations were generated.';

    return {
      query: input.query,
      synthesis,
      recommendation,

      historicalExperience,
      whatHappenedPreviously: previousOutcomes,
      lessonsFromMemory: lessons,
      considerations,

      memoryStatus:
        result.memory_status || 'unknown',

      conflicts,

      humanDecisionRequired:
        result.human_decision_required === true,

      /*
       * Kept empty intentionally.
       *
       * The old UI expected complete Decision objects here,
       * but Hindsight returns historical memory records.
       * We do not fabricate Decision objects.
       */
      evidenceDecisions: [],

      correlatedSuccessFactors: lessons,
      identifiedRisks: conflicts,
      contractChecklist: considerations
    };
  }

  /* ------------------------------------------------------------------------ */
  /* READ-ONLY UI HELPERS                                                     */
  /* ------------------------------------------------------------------------ */

  public getDecisions(): Decision[] {
    return [...this.decisions];
  }

  public getDecisionById(
    id: string
  ): Decision | undefined {
    return this.decisions.find(
      decision => decision.id === id
    );
  }

  public getOutcomes(): Outcome[] {
    return [...this.outcomes];
  }

  public getOutcomeById(
    id: string
  ): Outcome | undefined {
    return this.outcomes.find(
      outcome => outcome.id === id
    );
  }

  public getInsights(): HistoricalInsight[] {
    return [...this.insights];
  }

  public getMemoryLoopScenarios(): MemoryLoopStage[] {
    return MEMORY_LOOP_SCENARIOS;
  }

  public getMemoryStats(): MemoryStats {
    const total = this.decisions.length;
    const outcomesCount = this.outcomes.length;
    const successfulCount = this.outcomes.filter(
      outcome => outcome.result === 'Successful'
    ).length;
    const insightsCount = this.insights.length;

    return {
      totalDecisions:
        128 + (total - INITIAL_DECISIONS.length),

      outcomesRecorded:
        96 + (outcomesCount - INITIAL_OUTCOMES.length),

      successfulOutcomes:
        71 + (successfulCount - 2),

      historicalInsights:
        43 + (insightsCount - INITIAL_INSIGHTS.length),

      averageConfidence: 'High (78%)',

      outcomeRatePercent:
        Math.round(
          (outcomesCount / (total || 1)) * 100
        )
    };
  }

  public getVendors(): VendorProfile[] {
    const vendorMap = new Map<
      string,
      {
        name: string;
        category: any;
        decisions: Decision[];
        outcomes: Outcome[];
      }
    >();

    for (const decision of this.decisions) {
      if (!vendorMap.has(decision.vendorName)) {
        vendorMap.set(decision.vendorName, {
          name: decision.vendorName,
          category: decision.vendorCategory,
          decisions: [],
          outcomes: []
        });
      }

      const entry = vendorMap.get(
        decision.vendorName
      )!;

      entry.decisions.push(decision);

      if (decision.outcome) {
        entry.outcomes.push(decision.outcome);
      }
    }

    return Array.from(vendorMap.values()).map(vendor => {
      const successful = vendor.outcomes.filter(
        outcome => outcome.result === 'Successful'
      ).length;

      const successRate =
        vendor.outcomes.length > 0
          ? Math.round(
              (successful / vendor.outcomes.length) * 100
            )
          : 0;

      const ratings = vendor.outcomes.map(
        outcome => outcome.performanceRatings.overall
      );

      const avgRating =
        ratings.length > 0
          ? Number(
              (
                ratings.reduce(
                  (a, b) => a + b,
                  0
                ) / ratings.length
              ).toFixed(1)
            )
          : 4.0;

      let keyStrengths = [
        'Competitive pricing',
        'Responsive initial proposal'
      ];

      let recurringRisks = [
        'Requires explicit SLA terms'
      ];

      if (vendor.name.includes('Acme')) {
        keyStrengths = [
          'ISO 9001 cold chain compliance',
          'Refrigerated vehicle telemetry'
        ];

        recurringRisks = [
          'Regional last-mile transit delays',
          'Fuel surcharge discrepancies'
        ];
      } else if (vendor.name.includes('Apex')) {
        keyStrengths = [
          'Zero-downtime migrations',
          'Certified Terraform modules',
          'Proactive TAM'
        ];

        recurringRisks = [
          'Complex initial egress billing models'
        ];
      } else if (vendor.name.includes('Omni')) {
        keyStrengths = [
          'High structural drop-test rating',
          'Biodegradable ASTM certifications'
        ];

        recurringRisks = [
          'Unquoted custom mold & tooling fees'
        ];
      } else if (vendor.name.includes('Vanguard')) {
        keyStrengths = [
          'Rapid 5-week audit cycle',
          'Direct API evidence gathering',
          'Zero engineering disruption'
        ];

        recurringRisks = [
          'Requires early booking slot'
        ];
      }

      return {
        name: vendor.name,
        category: vendor.category,
        decisionsCount: vendor.decisions.length,
        outcomesCount: vendor.outcomes.length,
        successRate,
        averageRating: avgRating,
        keyStrengths,
        recurringRisks,
        lastDecisionDate:
          vendor.decisions[0]?.decisionDate ||
          '2026-09-24'
      };
    });
  }

  public resetToDefaultData(): void {
    localStorage.removeItem(
      STORAGE_KEY_DECISIONS
    );

    localStorage.removeItem(
      STORAGE_KEY_OUTCOMES
    );

    localStorage.removeItem(
      STORAGE_KEY_INSIGHTS
    );

    this.outcomes = [
      ...INITIAL_OUTCOMES
    ];

    this.decisions = [
      ...INITIAL_DECISIONS
    ];

    this.insights = [
      ...INITIAL_INSIGHTS
    ];

    this.syncDecisionsAndOutcomes();
  }
}

export const admService = new AdmService();