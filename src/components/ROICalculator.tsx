import React, { useState } from 'react';
import type { IncidentMetrics, ROIResults } from '../types/calculator';
import { calculateROI } from '../utils/calculations';

export const ROICalculator: React.FC = () => {
  const [metrics, setMetrics] = useState<IncidentMetrics>({
    averageIncidentsPerMonth: 10,
    averageDowntimePerIncident: 120,
    averageEngineersPerIncident: 3,
    averageCustomerImpact: 1000,
    engineerHourlyRate: 150,
    revenuePerMinute: 500,
  });

  const [results, setResults] = useState<ROIResults | null>(null);

  const handleInputChange = (field: keyof IncidentMetrics, value: string) => {
    const numValue = parseFloat(value) || 0;
    setMetrics(prev => ({ ...prev, [field]: numValue }));
  };

  const handleCalculate = () => {
    const calculatedResults = calculateROI(metrics);
    setResults(calculatedResults);
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
    <div className="max-w-6xl mx-auto p-6">
      <h1 className="text-4xl font-bold text-gray-900 mb-8">Incident Management ROI Calculator</h1>
      
      <div className="grid md:grid-cols-2 gap-8">
        <div className="space-y-6">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">Current Incident Metrics</h2>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Average Incidents Per Month
              </label>
              <input
                type="number"
                value={metrics.averageIncidentsPerMonth}
                onChange={(e) => handleInputChange('averageIncidentsPerMonth', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Average Downtime Per Incident (minutes)
              </label>
              <input
                type="number"
                value={metrics.averageDowntimePerIncident}
                onChange={(e) => handleInputChange('averageDowntimePerIncident', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Average Engineers Per Incident
              </label>
              <input
                type="number"
                value={metrics.averageEngineersPerIncident}
                onChange={(e) => handleInputChange('averageEngineersPerIncident', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Engineer Hourly Rate ($)
              </label>
              <input
                type="number"
                value={metrics.engineerHourlyRate}
                onChange={(e) => handleInputChange('engineerHourlyRate', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Revenue Per Minute ($)
              </label>
              <input
                type="number"
                value={metrics.revenuePerMinute}
                onChange={(e) => handleInputChange('revenuePerMinute', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <button
              onClick={handleCalculate}
              className="w-full bg-blue-600 text-white py-3 px-4 rounded-md hover:bg-blue-700 transition-colors font-medium"
            >
              Calculate ROI
            </button>
          </div>
        </div>

        {results && (
          <div className="space-y-6">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">ROI Analysis</h2>
            
            <div className="bg-gray-50 p-6 rounded-lg space-y-4">
              <h3 className="text-lg font-semibold text-gray-700">Current Monthly Cost</h3>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-gray-600">Engineering Cost:</span>
                  <span className="font-medium">{formatCurrency(results.currentCost.engineeringCost)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Revenue Loss:</span>
                  <span className="font-medium">{formatCurrency(results.currentCost.revenueLoss)}</span>
                </div>
                <div className="flex justify-between border-t pt-2">
                  <span className="font-semibold">Total:</span>
                  <span className="font-bold text-red-600">{formatCurrency(results.currentCost.totalCost)}</span>
                </div>
              </div>
            </div>

            <div className="bg-blue-50 p-6 rounded-lg space-y-4">
              <h3 className="text-lg font-semibold text-blue-900">With Incident Management</h3>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-blue-700">Engineering Cost:</span>
                  <span className="font-medium">{formatCurrency(results.withIncidentManagement.engineeringCost)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-blue-700">Revenue Loss:</span>
                  <span className="font-medium">{formatCurrency(results.withIncidentManagement.revenueLoss)}</span>
                </div>
                <div className="flex justify-between border-t border-blue-200 pt-2">
                  <span className="font-semibold">Total:</span>
                  <span className="font-bold text-blue-600">{formatCurrency(results.withIncidentManagement.totalCost)}</span>
                </div>
              </div>
            </div>

            <div className="bg-green-50 p-6 rounded-lg space-y-4">
              <h3 className="text-lg font-semibold text-green-900">Savings & ROI</h3>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-green-700">Monthly Savings:</span>
                  <span className="font-bold text-green-600">{formatCurrency(results.savings.monthlySavings)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-green-700">Annual Savings:</span>
                  <span className="font-bold text-green-600">{formatCurrency(results.savings.annualSavings)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-green-700">Cost Reduction:</span>
                  <span className="font-medium">{results.savings.percentageReduction.toFixed(1)}%</span>
                </div>
                <div className="flex justify-between border-t border-green-200 pt-2">
                  <span className="text-green-700">Payback Period:</span>
                  <span className="font-medium">
                    {results.roi.paybackPeriodMonths === Infinity 
                      ? 'N/A' 
                      : `${results.roi.paybackPeriodMonths.toFixed(1)} months`}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-green-700">3-Year ROI:</span>
                  <span className="font-bold text-green-600">{results.roi.threeYearROI.toFixed(0)}%</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};