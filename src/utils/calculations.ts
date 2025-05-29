import type { IncidentMetrics, ROIResults } from '../types/calculator';

// Based on industry research and real-world data
const IMPROVEMENTS = {
  // MTTR improvements
  MTTR_REDUCTION: 0.5, // 50% reduction in mean time to recovery
  
  // MTTA improvements
  MTTA_REDUCTION: 0.85, // 85% reduction (from 36 min to <5 min industry average)
  
  // Incident volume improvements
  INCIDENT_REDUCTION: 0.35, // 35% reduction in incident frequency
  NOISE_REDUCTION: 0.98, // 98% reduction in alert noise (incident.io case study)
  
  // Efficiency improvements
  AUTOMATION_FACTOR: 0.4, // 40% reduction in manual work
  ON_CALL_BURDEN_REDUCTION: 0.6, // 60% reduction in on-call stress
  
  // Business impact
  CUSTOMER_IMPACT_REDUCTION: 0.7, // 70% reduction in customer-facing incidents
  SLA_BREACH_REDUCTION: 0.8, // 80% reduction in SLA violations
};


export function calculateROI(metrics: IncidentMetrics): ROIResults {
  // Calculate current state costs
  const monthlyIncidentMinutes = metrics.averageIncidentsPerMonth * metrics.averageDowntimePerIncident;
  
  // Direct costs - Engineering time
  const monthlyEngineeringHours = (monthlyIncidentMinutes * metrics.averageEngineersPerIncident) / 60;
  const currentEngineeringCost = monthlyEngineeringHours * metrics.engineerHourlyRate;
  
  // Direct costs - Revenue loss
  const currentRevenueLoss = monthlyIncidentMinutes * metrics.revenuePerMinute;
  
  // Indirect costs - Customer impact and reputation
  const customerImpactCost = (metrics.averageCustomerImpact / 10000) * currentRevenueLoss * 0.2; // Churn risk
  const reputationCost = currentRevenueLoss * 0.4; // 40% reputation damage multiplier
  
  // Opportunity costs - Time spent firefighting vs. innovation
  const opportunityCost = currentEngineeringCost * 0.3; // 30% of engineering time could be on innovation
  
  // Total current costs
  const currentTotalDirectCosts = currentEngineeringCost + currentRevenueLoss;
  const currentTotalIndirectCosts = customerImpactCost + reputationCost + opportunityCost;
  const currentTotalCost = currentTotalDirectCosts + currentTotalIndirectCosts;
  
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
  
  // Reduced indirect costs
  const improvedCustomerImpactCost = customerImpactCost * (1 - IMPROVEMENTS.CUSTOMER_IMPACT_REDUCTION);
  const improvedReputationCost = reputationCost * (1 - IMPROVEMENTS.SLA_BREACH_REDUCTION);
  const improvedOpportunityCost = opportunityCost * (1 - IMPROVEMENTS.ON_CALL_BURDEN_REDUCTION);
  
  // Platform costs (based on typical incident management platform pricing)
  const platformMonthlyCost = calculatePlatformCost(metrics);
  
  // Total improved costs
  const improvedTotalDirectCosts = improvedEngineeringCost + improvedRevenueLoss;
  const improvedTotalIndirectCosts = improvedCustomerImpactCost + improvedReputationCost + improvedOpportunityCost;
  const improvedTotalCost = improvedTotalDirectCosts + improvedTotalIndirectCosts + platformMonthlyCost;
  
  // Calculate savings and ROI
  const monthlySavings = currentTotalCost - improvedTotalCost;
  const annualSavings = monthlySavings * 12;
  const percentageReduction = ((currentTotalCost - improvedTotalCost) / currentTotalCost) * 100;
  
  // ROI calculations
  const paybackPeriodMonths = monthlySavings > 0 ? platformMonthlyCost / monthlySavings : Infinity;
  const threeYearSavings = (monthlySavings * 36) - (platformMonthlyCost * 36);
  const threeYearROI = (threeYearSavings / (platformMonthlyCost * 36)) * 100;
  
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
      reputationProtection: reputationCost - improvedReputationCost,
      customerRetention: customerImpactCost - improvedCustomerImpactCost,
      innovationTime: opportunityCost - improvedOpportunityCost,
    },
  };
}

function calculatePlatformCost(metrics: IncidentMetrics): number {
  // Typical incident management platform pricing tiers
  const engineers = metrics.averageEngineersPerIncident * 5; // Assume 5x engineers in org vs per incident
  
  if (engineers <= 10) {
    return 1500; // Small team
  } else if (engineers <= 50) {
    return 5000; // Medium team
  } else if (engineers <= 200) {
    return 15000; // Large team
  } else {
    return 30000; // Enterprise
  }
}