import React, { useState } from 'react';
import type { IncidentMetrics, ROIResults } from '../types/calculator';
import { calculateROI } from '../utils/calculations';

export const ROICalculator: React.FC = () => {
  const [metrics, setMetrics] = useState<IncidentMetrics>({
    averageIncidentsPerMonth: 8,
    averageDowntimePerIncident: 90,
    averageEngineersPerIncident: 2,
    averageCustomerImpact: 500,
    engineerHourlyRate: 120,
    revenuePerMinute: 100,
  });

  const [results, setResults] = useState<ROIResults | null>(null);
  const [isCalculating, setIsCalculating] = useState(false);
  const [showResults, setShowResults] = useState(false);

  const handleInputChange = (field: keyof IncidentMetrics, value: string) => {
    const numValue = parseFloat(value) || 0;
    setMetrics(prev => ({ ...prev, [field]: numValue }));
  };

  const handleCalculate = () => {
    setIsCalculating(true);
    setShowResults(false);
    
    setTimeout(() => {
      const calculatedResults = calculateROI(metrics);
      setResults(calculatedResults);
      setIsCalculating(false);
      setShowResults(true);
    }, 800);
  };

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value);
  };

  return (
    <div className="min-h-screen bg-cream-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 py-12">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-4">
              Incident ROI Calculator
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Discover how much you could save with proper incident management
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid lg:grid-cols-2 gap-12">
          {/* Input Section */}
          <div>
            <div className="bg-white rounded-2xl border border-gray-200 p-8 shadow-sm">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                Current Incident Metrics
              </h2>
              
              <div className="space-y-6">
                {[
                  { key: 'averageIncidentsPerMonth', label: 'Incidents Per Month', description: 'How many incidents do you have monthly?', suffix: '' },
                  { key: 'averageDowntimePerIncident', label: 'Average Downtime (minutes)', description: 'Typical resolution time per incident', suffix: 'min' },
                  { key: 'averageEngineersPerIncident', label: 'Engineers Per Incident', description: 'How many engineers typically respond?', suffix: '' },
                  { key: 'engineerHourlyRate', label: 'Engineer Hourly Rate', description: 'Fully loaded cost including benefits', suffix: '$' },
                  { key: 'revenuePerMinute', label: 'Revenue Per Minute', description: 'Business impact during downtime', suffix: '$' },
                ].map((field) => (
                  <div key={field.key}>
                    <label className="block text-sm font-semibold text-gray-900 mb-1">
                      {field.label}
                    </label>
                    <p className="text-sm text-gray-600 mb-3">{field.description}</p>
                    <div className="relative">
                      {field.suffix === '$' && (
                        <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500">$</span>
                      )}
                      <input
                        type="number"
                        value={metrics[field.key as keyof IncidentMetrics]}
                        onChange={(e) => handleInputChange(field.key as keyof IncidentMetrics, e.target.value)}
                        className={`w-full ${field.suffix === '$' ? 'pl-10' : 'px-4'} pr-12 py-3 border border-gray-300 rounded-lg 
                          text-gray-900 focus:outline-none focus:ring-2 focus:ring-alarmalade-500 focus:border-transparent 
                          transition-all duration-200`}
                      />
                      {field.suffix && field.suffix !== '$' && (
                        <span className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500">{field.suffix}</span>
                      )}
                    </div>
                  </div>
                ))}

                <button
                  onClick={handleCalculate}
                  disabled={isCalculating}
                  className={`w-full py-4 px-6 rounded-lg font-semibold text-white transition-all duration-300
                    ${isCalculating 
                      ? 'bg-gray-400 cursor-not-allowed' 
                      : 'bg-alarmalade-500 hover:bg-alarmalade-600 transform hover:scale-[1.02] active:scale-[0.98]'
                    } shadow-lg`}
                >
                  {isCalculating ? (
                    <span className="flex items-center justify-center gap-2">
                      <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                      </svg>
                      Calculating...
                    </span>
                  ) : (
                    'Calculate ROI'
                  )}
                </button>
              </div>
            </div>
          </div>

          {/* Results Section */}
          <div className={`transition-all duration-700 ${showResults ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            {results && (
              <div className="space-y-6">
                {/* Key Metrics Cards */}
                <div className="grid grid-cols-1 gap-4">
                  <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="text-sm font-medium text-gray-600 mb-1">Monthly Savings</div>
                        <div className="text-3xl font-bold text-alarmalade-500">{formatCurrency(results.savings.monthlySavings)}</div>
                      </div>
                      <div className="text-right">
                        <div className="text-sm font-medium text-gray-600 mb-1">Current Cost</div>
                        <div className="text-2xl font-semibold text-gray-900">{formatCurrency(results.currentCost.totalCost)}</div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* ROI Breakdown */}
                <div className="bg-white rounded-xl border border-gray-200 p-8 shadow-sm">
                  <h3 className="text-2xl font-bold text-gray-900 mb-6">
                    ROI Analysis
                  </h3>

                  {/* Cost Comparison */}
                  <div className="space-y-4 mb-8">
                    <div>
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-sm font-medium text-gray-600">Current State</span>
                        <span className="text-lg font-semibold text-gray-900">{formatCurrency(results.currentCost.totalCost)}/mo</span>
                      </div>
                      <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                        <div className="h-full bg-red-500 rounded-full" style={{ width: '100%' }} />
                      </div>
                    </div>
                    
                    <div>
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-sm font-medium text-gray-600">With Incident Management</span>
                        <span className="text-lg font-semibold text-gray-900">{formatCurrency(results.withIncidentManagement.totalCost)}/mo</span>
                      </div>
                      <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-green-500 rounded-full transition-all duration-1000" 
                          style={{ width: `${(results.withIncidentManagement.totalCost / results.currentCost.totalCost) * 100}%` }} 
                        />
                      </div>
                    </div>
                  </div>

                  {/* Key Metrics Grid */}
                  <div className="grid grid-cols-2 gap-6">
                    <div className="text-center p-4 bg-green-50 rounded-lg">
                      <div className="text-3xl font-bold text-green-600">
                        {results.savings.percentageReduction.toFixed(0)}%
                      </div>
                      <div className="text-sm font-medium text-gray-600">Cost Reduction</div>
                    </div>
                    <div className="text-center p-4 bg-blue-50 rounded-lg">
                      <div className="text-3xl font-bold text-blue-600">
                        {formatCurrency(results.savings.annualSavings)}
                      </div>
                      <div className="text-sm font-medium text-gray-600">Annual Savings</div>
                    </div>
                    <div className="text-center p-4 bg-orange-50 rounded-lg">
                      <div className="text-3xl font-bold text-orange-600">
                        {results.roi.paybackPeriodMonths === Infinity 
                          ? 'Immediate' 
                          : `${results.roi.paybackPeriodMonths.toFixed(1)} mo`}
                      </div>
                      <div className="text-sm font-medium text-gray-600">Payback Period</div>
                    </div>
                    <div className="text-center p-4 bg-purple-50 rounded-lg">
                      <div className="text-3xl font-bold text-purple-600">
                        {results.roi.threeYearROI.toFixed(0)}%
                      </div>
                      <div className="text-sm font-medium text-gray-600">3-Year ROI</div>
                    </div>
                  </div>
                </div>

                {/* Explanation Section */}
                <div className="bg-white rounded-xl border border-gray-200 p-8 shadow-sm">
                  <h3 className="text-2xl font-bold text-gray-900 mb-6">
                    How We Calculated Your Savings
                  </h3>

                  <div className="space-y-6 text-gray-700">
                    {/* Current Costs Breakdown */}
                    <div>
                      <h4 className="text-lg font-semibold text-gray-900 mb-3">Current Monthly Costs</h4>
                      <div className="space-y-2 bg-gray-50 rounded-lg p-4">
                        <div className="flex justify-between">
                          <span>Engineering time: {((metrics.averageIncidentsPerMonth * metrics.averageDowntimePerIncident * metrics.averageEngineersPerIncident) / 60).toFixed(1)} hours × ${metrics.engineerHourlyRate}/hr</span>
                          <span className="font-semibold">{formatCurrency(results.currentCost.engineeringCost)}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Revenue loss: {(metrics.averageIncidentsPerMonth * metrics.averageDowntimePerIncident).toFixed(0)} minutes × ${metrics.revenuePerMinute}/min</span>
                          <span className="font-semibold">{formatCurrency(results.currentCost.revenueLoss)}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Process inefficiencies and coordination overhead</span>
                          <span className="font-semibold">{formatCurrency(results.currentCost.totalCost - results.currentCost.engineeringCost - results.currentCost.revenueLoss)}</span>
                        </div>
                      </div>
                    </div>

                    {/* Improvements Explanation */}
                    <div>
                      <h4 className="text-lg font-semibold text-gray-900 mb-3">Expected Improvements</h4>
                      <div className="space-y-3">
                        <div className="flex items-start gap-3">
                          <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                          <div>
                            <span className="font-semibold text-green-600">30% faster resolution</span> - Better runbooks, automation, and team coordination
                          </div>
                        </div>
                        <div className="flex items-start gap-3">
                          <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                          <div>
                            <span className="font-semibold text-green-600">20% fewer incidents</span> - Proactive monitoring and post-incident learnings
                          </div>
                        </div>
                        <div className="flex items-start gap-3">
                          <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                          <div>
                            <span className="font-semibold text-green-600">25% less manual work</span> - Automated workflows, notifications, and escalations
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Conservative Note */}
                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                      <p className="text-sm text-blue-800">
                        <span className="font-semibold">Conservative Estimates:</span> These calculations use industry-conservative improvement rates. 
                        Many organizations see greater benefits, but we've used modest assumptions to provide realistic expectations.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Call to Action */}
                <div className="bg-alarmalade-500 rounded-xl p-8 text-center text-white">
                  <h3 className="text-2xl font-bold mb-2">
                    Start saving {formatCurrency(results.savings.monthlySavings)} every month
                  </h3>
                  <p className="text-alarmalade-100 mb-6">
                    Get started with incident.io and transform your incident response
                  </p>
                  <button className="px-8 py-3 bg-white text-alarmalade-500 rounded-lg font-semibold hover:bg-gray-100 transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98]">
                    Get Started Today
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};