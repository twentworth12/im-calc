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
    }, 1000);
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
    <div className="min-h-screen relative overflow-hidden">
      {/* Animated gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 animate-gradient" />
      
      {/* Floating orbs for depth */}
      <div className="absolute top-20 left-20 w-72 h-72 bg-purple-500 rounded-full filter blur-3xl opacity-20 animate-float" />
      <div className="absolute bottom-20 right-20 w-96 h-96 bg-blue-500 rounded-full filter blur-3xl opacity-20 animate-float" style={{ animationDelay: '3s' }} />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[40rem] h-[40rem] bg-pink-500 rounded-full filter blur-3xl opacity-10 animate-float" style={{ animationDelay: '6s' }} />

      <div className="relative z-10 container mx-auto px-4 py-12 max-w-7xl">
        {/* Header */}
        <div className="text-center mb-12 animate-slide-down">
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-4 tracking-tight">
            Incident ROI
            <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent"> Calculator</span>
          </h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Discover how much you could save with proper incident management
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Input Section */}
          <div className="animate-slide-up">
            <div className="backdrop-blur-xl bg-white/10 rounded-3xl p-8 border border-white/20 shadow-2xl">
              <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                <span className="p-2 bg-gradient-to-br from-blue-500 to-purple-500 rounded-lg">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                </span>
                Current Metrics
              </h2>
              
              <div className="space-y-6">
                {[
                  { key: 'averageIncidentsPerMonth', label: 'Incidents Per Month', icon: '🚨', suffix: '' },
                  { key: 'averageDowntimePerIncident', label: 'Downtime Per Incident', icon: '⏱️', suffix: 'min' },
                  { key: 'averageEngineersPerIncident', label: 'Engineers Per Incident', icon: '👥', suffix: '' },
                  { key: 'engineerHourlyRate', label: 'Engineer Hourly Rate', icon: '💰', suffix: '$' },
                  { key: 'revenuePerMinute', label: 'Revenue Per Minute', icon: '📈', suffix: '$' },
                ].map((field) => (
                  <div key={field.key} className="group">
                    <label className="block text-sm font-medium text-gray-300 mb-2 group-hover:text-white transition-colors">
                      <span className="mr-2">{field.icon}</span>
                      {field.label}
                    </label>
                    <div className="relative">
                      {field.suffix === '$' && (
                        <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">$</span>
                      )}
                      <input
                        type="number"
                        value={metrics[field.key as keyof IncidentMetrics]}
                        onChange={(e) => handleInputChange(field.key as keyof IncidentMetrics, e.target.value)}
                        className={`w-full ${field.suffix === '$' ? 'pl-10' : 'px-4'} pr-12 py-3 bg-white/5 border border-white/10 rounded-xl 
                          text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 
                          focus:border-transparent transition-all duration-200 hover:bg-white/10`}
                      />
                      {field.suffix && field.suffix !== '$' && (
                        <span className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400">{field.suffix}</span>
                      )}
                    </div>
                  </div>
                ))}

                <button
                  onClick={handleCalculate}
                  disabled={isCalculating}
                  className={`w-full py-4 px-6 rounded-xl font-semibold text-white transition-all duration-300 transform
                    ${isCalculating 
                      ? 'bg-gray-600 cursor-not-allowed' 
                      : 'bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 hover:scale-[1.02] active:scale-[0.98]'
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
                <div className="grid grid-cols-2 gap-4">
                  <div className="backdrop-blur-xl bg-gradient-to-br from-red-500/20 to-orange-500/20 rounded-2xl p-6 border border-white/20">
                    <div className="text-sm text-gray-300 mb-1">Current Monthly Cost</div>
                    <div className="text-2xl font-bold text-white">{formatCurrency(results.currentCost.totalCost)}</div>
                  </div>
                  <div className="backdrop-blur-xl bg-gradient-to-br from-green-500/20 to-blue-500/20 rounded-2xl p-6 border border-white/20">
                    <div className="text-sm text-gray-300 mb-1">Monthly Savings</div>
                    <div className="text-2xl font-bold text-white">{formatCurrency(results.savings.monthlySavings)}</div>
                  </div>
                </div>

                {/* Detailed Breakdown */}
                <div className="backdrop-blur-xl bg-white/10 rounded-3xl p-8 border border-white/20 shadow-2xl">
                  <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                    <span className="p-2 bg-gradient-to-br from-green-500 to-emerald-500 rounded-lg">
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </span>
                    ROI Analysis
                  </h3>

                  {/* Cost Comparison */}
                  <div className="space-y-4 mb-6">
                    <div className="relative">
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-gray-300">Current State</span>
                        <span className="text-white font-semibold">{formatCurrency(results.currentCost.totalCost)}/mo</span>
                      </div>
                      <div className="h-3 bg-white/10 rounded-full overflow-hidden">
                        <div className="h-full bg-gradient-to-r from-red-500 to-orange-500 rounded-full" style={{ width: '100%' }} />
                      </div>
                    </div>
                    
                    <div className="relative">
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-gray-300">With Incident Management</span>
                        <span className="text-white font-semibold">{formatCurrency(results.withIncidentManagement.totalCost)}/mo</span>
                      </div>
                      <div className="h-3 bg-white/10 rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-gradient-to-r from-green-500 to-blue-500 rounded-full transition-all duration-1000" 
                          style={{ width: `${(results.withIncidentManagement.totalCost / results.currentCost.totalCost) * 100}%` }} 
                        />
                      </div>
                    </div>
                  </div>

                  {/* Key Metrics Grid */}
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-white/5 rounded-xl p-4 border border-white/10">
                      <div className="text-3xl font-bold text-transparent bg-gradient-to-r from-green-400 to-blue-400 bg-clip-text">
                        {results.savings.percentageReduction.toFixed(0)}%
                      </div>
                      <div className="text-sm text-gray-300">Cost Reduction</div>
                    </div>
                    <div className="bg-white/5 rounded-xl p-4 border border-white/10">
                      <div className="text-3xl font-bold text-transparent bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text">
                        {formatCurrency(results.savings.annualSavings)}
                      </div>
                      <div className="text-sm text-gray-300">Annual Savings</div>
                    </div>
                    <div className="bg-white/5 rounded-xl p-4 border border-white/10">
                      <div className="text-3xl font-bold text-transparent bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text">
                        {results.roi.paybackPeriodMonths === Infinity 
                          ? 'Immediate' 
                          : `${results.roi.paybackPeriodMonths.toFixed(1)} mo`}
                      </div>
                      <div className="text-sm text-gray-300">Payback Period</div>
                    </div>
                    <div className="bg-white/5 rounded-xl p-4 border border-white/10">
                      <div className="text-3xl font-bold text-transparent bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text">
                        {results.roi.threeYearROI.toFixed(0)}%
                      </div>
                      <div className="text-sm text-gray-300">3-Year ROI</div>
                    </div>
                  </div>
                </div>

                {/* Explanation Section */}
                <div className="backdrop-blur-xl bg-white/5 rounded-3xl p-8 border border-white/10 shadow-2xl">
                  <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                    <span className="p-2 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-lg">
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </span>
                    How We Calculated Your Savings
                  </h3>

                  <div className="space-y-6 text-gray-300">
                    {/* Current Costs Breakdown */}
                    <div>
                      <h4 className="text-lg font-semibold text-white mb-3">Current Monthly Costs</h4>
                      <div className="space-y-2 ml-4">
                        <div className="flex justify-between">
                          <span>• Engineering time: {((metrics.averageIncidentsPerMonth * metrics.averageDowntimePerIncident * metrics.averageEngineersPerIncident) / 60).toFixed(1)} hours × ${metrics.engineerHourlyRate}/hr</span>
                          <span className="text-white font-medium">{formatCurrency(results.currentCost.engineeringCost)}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>• Revenue loss: {(metrics.averageIncidentsPerMonth * metrics.averageDowntimePerIncident).toFixed(0)} minutes × ${metrics.revenuePerMinute}/min</span>
                          <span className="text-white font-medium">{formatCurrency(results.currentCost.revenueLoss)}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>• Process inefficiencies and coordination overhead</span>
                          <span className="text-white font-medium">{formatCurrency(results.currentCost.totalCost - results.currentCost.engineeringCost - results.currentCost.revenueLoss)}</span>
                        </div>
                      </div>
                    </div>

                    {/* Improvements Explanation */}
                    <div>
                      <h4 className="text-lg font-semibold text-white mb-3">Expected Improvements with Incident Management</h4>
                      <div className="space-y-2 ml-4">
                        <div>• <span className="text-green-400 font-medium">30% faster resolution</span> - Better runbooks, automation, and team coordination reduce time to fix issues</div>
                        <div>• <span className="text-green-400 font-medium">20% fewer incidents</span> - Proactive monitoring and post-incident learnings prevent recurring problems</div>
                        <div>• <span className="text-green-400 font-medium">25% less manual work</span> - Automated workflows, notifications, and escalations reduce repetitive tasks</div>
                        <div>• <span className="text-green-400 font-medium">15% process efficiency</span> - Structured incident response eliminates confusion and delays</div>
                      </div>
                    </div>

                    {/* Calculation Logic */}
                    <div>
                      <h4 className="text-lg font-semibold text-white mb-3">The Math</h4>
                      <div className="space-y-2 ml-4">
                        <div>• Reduced incidents: {metrics.averageIncidentsPerMonth} → {(metrics.averageIncidentsPerMonth * 0.8).toFixed(1)} per month</div>
                        <div>• Faster resolution: {metrics.averageDowntimePerIncident} → {(metrics.averageDowntimePerIncident * 0.7).toFixed(0)} minutes average</div>
                        <div>• Total downtime: {(metrics.averageIncidentsPerMonth * metrics.averageDowntimePerIncident).toFixed(0)} → {(metrics.averageIncidentsPerMonth * 0.8 * metrics.averageDowntimePerIncident * 0.7).toFixed(0)} minutes/month</div>
                        <div>• Engineering hours saved: {(((metrics.averageIncidentsPerMonth * metrics.averageDowntimePerIncident) - (metrics.averageIncidentsPerMonth * 0.8 * metrics.averageDowntimePerIncident * 0.7)) * metrics.averageEngineersPerIncident / 60).toFixed(1)} hours/month</div>
                      </div>
                    </div>

                    {/* Conservative Note */}
                    <div className="bg-blue-500/10 rounded-xl p-4 border-l-4 border-blue-500">
                      <p className="text-sm">
                        <span className="font-semibold text-blue-400">Conservative Estimates:</span> These calculations use industry-conservative improvement rates. 
                        Many organizations see greater benefits, but we've used modest assumptions to provide realistic expectations.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Call to Action */}
                <div className="backdrop-blur-xl bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-2xl p-6 border border-white/20 text-center">
                  <p className="text-lg text-white mb-4">
                    Start saving <span className="font-bold">{formatCurrency(results.savings.monthlySavings)}</span> every month
                  </p>
                  <button className="px-8 py-3 bg-white text-gray-900 rounded-xl font-semibold hover:bg-gray-100 transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98]">
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