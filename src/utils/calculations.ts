import type { IncidentMetrics, ROIResults } from '../types/calculator';

// Based on incident.io customer results and industry research
const IMPROVEMENTS = {
  // MTTR improvements - industry standard with modern platforms
  MTTR_REDUCTION: 0.5, // 50% reduction (Forrester study on AIOps)
  
  // Incident noise reduction - incident.io case study (230-250 → 2-5 incidents)
  NOISE_REDUCTION: 0.98, // 98% noise reduction in alerting
  TRUE_INCIDENT_REDUCTION: 0.3, // 30% reduction in actual incidents through better monitoring
  
  // Time savings per incident - incident.io customer testimonial
  DOCUMENTATION_TIME_SAVINGS: 0.6, // 60% reduction in documentation time
  COMMUNICATION_OVERHEAD_REDUCTION: 0.7, // 70% reduction in coordination overhead
  
  // Automation and process improvements
  AUTOMATION_FACTOR: 0.4, // 40% reduction in manual work
  COGNITIVE_LOAD_REDUCTION: 0.5, // 50% reduction in cognitive overhead
  
  // Business impact
  CUSTOMER_RETENTION_IMPROVEMENT: 0.05, // 5% improvement in retention
  TEAM_EFFICIENCY_GAIN: 0.25, // 25% efficiency gain from reduced context switching
};

export function calculateROI(metrics: IncidentMetrics): ROIResults {
  // Calculate current state costs
  const monthlyIncidentMinutes = metrics.averageIncidentsPerMonth * metrics.averageDowntimePerIncident;
  
  // Direct costs - Engineering time
  const monthlyEngineeringHours = (monthlyIncidentMinutes * metrics.averageEngineersPerIncident) / 60;
  const currentEngineeringCost = monthlyEngineeringHours * metrics.engineerHourlyRate;
  
  // Direct costs - Revenue loss
  const currentRevenueLoss = monthlyIncidentMinutes * metrics.revenuePerMinute;
  
  // Additional costs based on incident.io research
  // Documentation and communication overhead - "hours per incident" for documentation
  const documentationCost = (metrics.averageIncidentsPerMonth * 2) * metrics.engineerHourlyRate; // 2 hours per incident
  const communicationOverheadCost = currentEngineeringCost * 0.3; // 30% of engineering time on coordination
  const cognitiveLoadCost = currentEngineeringCost * 0.2; // 20% efficiency loss from context switching
  
  // Customer retention impact - 5% revenue loss from incident-related churn
  const customerRetentionImpact = (currentRevenueLoss * 12) * 0.05 / 12; // Annualized then monthly
  
  // Total current costs with realistic overhead
  const currentTotalCost = currentEngineeringCost + currentRevenueLoss + documentationCost + 
                          communicationOverheadCost + cognitiveLoadCost + customerRetentionImpact;
  
  // Calculate improved state with incident management platform
  
  // Reduced incident frequency and duration - incident.io improvements
  const improvedIncidentsPerMonth = metrics.averageIncidentsPerMonth * (1 - IMPROVEMENTS.TRUE_INCIDENT_REDUCTION);
  const improvedDowntimePerIncident = metrics.averageDowntimePerIncident * (1 - IMPROVEMENTS.MTTR_REDUCTION);
  const improvedIncidentMinutes = improvedIncidentsPerMonth * improvedDowntimePerIncident;
  
  // Reduced engineering burden through automation and better processes
  const improvedEngineeringHours = (improvedIncidentMinutes * metrics.averageEngineersPerIncident * (1 - IMPROVEMENTS.AUTOMATION_FACTOR)) / 60;
  const improvedEngineeringCost = improvedEngineeringHours * metrics.engineerHourlyRate;
  
  // Reduced revenue loss
  const improvedRevenueLoss = improvedIncidentMinutes * metrics.revenuePerMinute;
  
  // Improved overhead costs based on incident.io benefits
  const improvedDocumentationCost = documentationCost * (1 - IMPROVEMENTS.DOCUMENTATION_TIME_SAVINGS);
  const improvedCommunicationCost = communicationOverheadCost * (1 - IMPROVEMENTS.COMMUNICATION_OVERHEAD_REDUCTION);
  const improvedCognitiveLoadCost = cognitiveLoadCost * (1 - IMPROVEMENTS.COGNITIVE_LOAD_REDUCTION);
  const improvedCustomerRetentionImpact = customerRetentionImpact * (1 - IMPROVEMENTS.CUSTOMER_RETENTION_IMPROVEMENT);
  
  // Platform costs (realistic pricing)
  const platformMonthlyCost = calculatePlatformCost(metrics);
  
  // Total improved costs
  const improvedTotalCost = improvedEngineeringCost + improvedRevenueLoss + improvedDocumentationCost + 
                           improvedCommunicationCost + improvedCognitiveLoadCost + improvedCustomerRetentionImpact + platformMonthlyCost;
  
  // Calculate savings and ROI
  const monthlySavings = currentTotalCost - improvedTotalCost;
  const annualSavings = monthlySavings * 12;
  const percentageReduction = ((currentTotalCost - improvedTotalCost) / currentTotalCost) * 100;
  
  // ROI calculations
  const paybackPeriodMonths = monthlySavings > 0 ? platformMonthlyCost / monthlySavings : Infinity;
  const threeYearSavings = (monthlySavings * 36) - (platformMonthlyCost * 36);
  const threeYearROI = threeYearSavings > 0 ? (threeYearSavings / (platformMonthlyCost * 36)) * 100 : -100;
  
  // Additional metrics for display
  const mttrImprovement = metrics.averageDowntimePerIncident - improvedDowntimePerIncident;
  
  return {
    currentCost: {
      engineeringCost: currentEngineeringCost,
      revenueLoss: currentRevenueLoss,
      totalCost: currentTotalCost,
    },
    withIncidentManagement: {
      engineeringCost: improvedEngineeringCost,
      revenueLoss: improvedRevenueLoss,
      totalCost: improvedTotalCost,
    },
    savings: {
      monthlySavings,
      annualSavings,
      percentageReduction,
    },
    roi: {
      paybackPeriodMonths,
      threeYearROI,
    },
    improvements: {
      mttrReduction: IMPROVEMENTS.MTTR_REDUCTION * 100,
      incidentReduction: IMPROVEMENTS.TRUE_INCIDENT_REDUCTION * 100,
      automationSavings: IMPROVEMENTS.AUTOMATION_FACTOR * 100,
      mttrImprovement,
    },
    indirectBenefits: {
      reputationProtection: (documentationCost - improvedDocumentationCost),
      customerRetention: (customerRetentionImpact - improvedCustomerRetentionImpact),
      innovationTime: (cognitiveLoadCost - improvedCognitiveLoadCost), // Time freed from cognitive load
    },
  };
}

function calculatePlatformCost(metrics: IncidentMetrics): number {
  // More realistic incident management platform pricing
  const estimatedTeamSize = metrics.averageEngineersPerIncident * 3; // Conservative team size estimate
  
  if (estimatedTeamSize <= 10) {
    return 500; // Small team - basic plan
  } else if (estimatedTeamSize <= 25) {
    return 1500; // Medium team
  } else if (estimatedTeamSize <= 50) {
    return 3500; // Large team
  } else {
    return 8000; // Enterprise team
  }
}