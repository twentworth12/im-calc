import type { IncidentMetrics, ROIResults } from '../types/calculator';

const INCIDENT_MANAGEMENT_REDUCTION = 0.4; // 40% reduction in incident resolution time
const MTTR_IMPROVEMENT = 0.5; // 50% improvement in mean time to recovery
const INCIDENT_PREVENTION = 0.25; // 25% reduction in incident frequency
const INCIDENT_MANAGEMENT_MONTHLY_COST = 2500; // Example monthly cost

export function calculateROI(metrics: IncidentMetrics): ROIResults {
  // Current state calculations
  const monthlyIncidentMinutes = metrics.averageIncidentsPerMonth * metrics.averageDowntimePerIncident;
  const monthlyEngineeringHours = (monthlyIncidentMinutes * metrics.averageEngineersPerIncident) / 60;
  const currentEngineeringCost = monthlyEngineeringHours * metrics.engineerHourlyRate;
  const currentRevenueLoss = monthlyIncidentMinutes * metrics.revenuePerMinute;
  const currentTotalCost = currentEngineeringCost + currentRevenueLoss;

  // With incident management
  const improvedIncidentsPerMonth = metrics.averageIncidentsPerMonth * (1 - INCIDENT_PREVENTION);
  const improvedDowntimePerIncident = metrics.averageDowntimePerIncident * (1 - MTTR_IMPROVEMENT);
  const improvedIncidentMinutes = improvedIncidentsPerMonth * improvedDowntimePerIncident;
  const improvedEngineeringHours = (improvedIncidentMinutes * metrics.averageEngineersPerIncident * (1 - INCIDENT_MANAGEMENT_REDUCTION)) / 60;
  
  const improvedEngineeringCost = improvedEngineeringHours * metrics.engineerHourlyRate;
  const improvedRevenueLoss = improvedIncidentMinutes * metrics.revenuePerMinute;
  const improvedTotalCost = improvedEngineeringCost + improvedRevenueLoss + INCIDENT_MANAGEMENT_MONTHLY_COST;

  // Savings calculations
  const monthlySavings = currentTotalCost - improvedTotalCost;
  const annualSavings = monthlySavings * 12;
  const percentageReduction = ((currentTotalCost - improvedTotalCost) / currentTotalCost) * 100;

  // ROI calculations
  const paybackPeriodMonths = monthlySavings > 0 ? INCIDENT_MANAGEMENT_MONTHLY_COST / monthlySavings : Infinity;
  const threeYearSavings = (monthlySavings * 36) - (INCIDENT_MANAGEMENT_MONTHLY_COST * 36);
  const threeYearROI = (threeYearSavings / (INCIDENT_MANAGEMENT_MONTHLY_COST * 36)) * 100;

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
  };
}