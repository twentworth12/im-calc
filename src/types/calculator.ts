export interface IncidentMetrics {
  averageIncidentsPerMonth: number;
  averageDowntimePerIncident: number; // in minutes
  averageEngineersPerIncident: number;
  averageCustomerImpact: number; // number of customers affected
  engineerHourlyRate: number;
  revenuePerMinute: number;
}

export interface ROIResults {
  currentCost: {
    engineeringCost: number;
    revenueLoss: number;
    totalCost: number;
  };
  withIncidentManagement: {
    engineeringCost: number;
    revenueLoss: number;
    totalCost: number;
  };
  savings: {
    monthlySavings: number;
    annualSavings: number;
    percentageReduction: number;
  };
  roi: {
    paybackPeriodMonths: number;
    threeYearROI: number;
  };
}