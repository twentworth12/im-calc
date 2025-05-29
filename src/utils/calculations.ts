import type { IncidentMetrics, ROIResults } from '../types/calculator';

// Based on industry research and real-world data - conservative estimates
const IMPROVEMENTS = {
  // MTTR improvements (conservative)
  MTTR_REDUCTION: 0.3, // 30% reduction in mean time to recovery
  
  // Incident volume improvements (conservative)
  INCIDENT_REDUCTION: 0.2, // 20% reduction in incident frequency
  
  // Efficiency improvements (conservative)
  AUTOMATION_FACTOR: 0.25, // 25% reduction in manual work
  
  // Business impact (conservative)
  PROCESS_EFFICIENCY: 0.15, // 15% efficiency gain in incident response
};

export function calculateROI(metrics: IncidentMetrics): ROIResults {
  // Calculate current state costs
  const monthlyIncidentMinutes = metrics.averageIncidentsPerMonth * metrics.averageDowntimePerIncident;
  
  // Direct costs - Engineering time
  const monthlyEngineeringHours = (monthlyIncidentMinutes * metrics.averageEngineersPerIncident) / 60;
  const currentEngineeringCost = monthlyEngineeringHours * metrics.engineerHourlyRate;
  
  // Direct costs - Revenue loss
  const currentRevenueLoss = monthlyIncidentMinutes * metrics.revenuePerMinute;
  
  // Keep indirect costs simple and realistic
  // Only add small percentage for truly indirect costs
  const processInefficiencyCost = currentEngineeringCost * 0.1; // 10% for coordination overhead
  const escalationCost = currentEngineeringCost * 0.05; // 5% for escalations and context switching
  
  // Total current costs (much more conservative)
  const currentTotalCost = currentEngineeringCost + currentRevenueLoss + processInefficiencyCost + escalationCost;
  
  // Calculate improved state with incident management platform
  
  // Reduced incident frequency and duration
  const improvedIncidentsPerMonth = metrics.averageIncidentsPerMonth * (1 - IMPROVEMENTS.INCIDENT_REDUCTION);
  const improvedDowntimePerIncident = metrics.averageDowntimePerIncident * (1 - IMPROVEMENTS.MTTR_REDUCTION);
  const improvedIncidentMinutes = improvedIncidentsPerMonth * improvedDowntimePerIncident;
  
  // Reduced engineering burden through automation and better processes
  const improvedEngineeringHours = (improvedIncidentMinutes * metrics.averageEngineersPerIncident * (1 - IMPROVEMENTS.AUTOMATION_FACTOR)) / 60;
  const improvedEngineeringCost = improvedEngineeringHours * metrics.engineerHourlyRate;
  
  // Reduced revenue loss
  const improvedRevenueLoss = improvedIncidentMinutes * metrics.revenuePerMinute;
  
  // Reduced indirect costs (proportional to improvement)
  const improvedProcessInefficiencyCost = processInefficiencyCost * (1 - IMPROVEMENTS.PROCESS_EFFICIENCY);
  const improvedEscalationCost = escalationCost * (1 - IMPROVEMENTS.PROCESS_EFFICIENCY);
  
  // Platform costs (realistic pricing)
  const platformMonthlyCost = calculatePlatformCost(metrics);
  
  // Total improved costs
  const improvedTotalCost = improvedEngineeringCost + improvedRevenueLoss + improvedProcessInefficiencyCost + improvedEscalationCost + platformMonthlyCost;
  
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
      incidentReduction: IMPROVEMENTS.INCIDENT_REDUCTION * 100,
      automationSavings: IMPROVEMENTS.AUTOMATION_FACTOR * 100,
      mttrImprovement,
    },
    indirectBenefits: {
      reputationProtection: (processInefficiencyCost - improvedProcessInefficiencyCost),
      customerRetention: (escalationCost - improvedEscalationCost),
      innovationTime: (currentEngineeringCost - improvedEngineeringCost) * 0.2, // 20% of saved eng time goes to innovation
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