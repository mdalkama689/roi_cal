import React, { useState, useEffect } from 'react';
import { CalculatorForm } from './CalculatorForm';
import { CalculatorResults } from './CalculatorResults';
import { InvestmentChart } from './InvestmentChart';
import { CalculatorSummary } from './CalculatorSummary';
import { calculateInvestmentGrowth } from '../utils/calculations';
import type { Investment, InvestmentInputs } from '../types/investment';


export const Calculator: React.FC = () => {

  const [investmentData, setInvestmentData] = useState<Investment | null>(null);
  const [comparisonData, setComparisonData] = useState<Investment | null>(null);
  const [showComparison, setShowComparison] = useState(false);

  const initialInputs: InvestmentInputs = {
    initialInvestment: 100000,
    monthlyContribution: 10000,
    annualInterestRate: 12,
    investmentPeriod: 10,
    compoundingFrequency: 'monthly',
  };

  const [inputs, setInputs] = useState<InvestmentInputs>(initialInputs);

  useEffect(() => {
    const result = calculateInvestmentGrowth(inputs);
    setInvestmentData(result);
  }, [inputs]);

  const handleInputChange = (
    name: keyof InvestmentInputs,
    value: number | string
  ) => {
    setInputs((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleAddComparison = () => {
    if (investmentData) {
      setComparisonData(investmentData);
      setShowComparison(true);
    }
  };

  const handleRemoveComparison = () => {
    setComparisonData(null);
    setShowComparison(false);
  };

  const handleReset = () => {
    setInputs(initialInputs);
    setComparisonData(null);
    setShowComparison(false);
  };

  return (
    <div className="space-y-8 text-gray-100">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-1">
          <div className="rounded-xl shadow-lg p-6 bg-slate-800 border border-slate-700 transition-all hover:shadow-xl">
            <h2 className="text-2xl font-bold mb-6 text-white">Calculate Your Returns</h2>
            <CalculatorForm
              inputs={inputs}
              onChange={handleInputChange}
              onReset={handleReset}
            />
          </div>
        </div>
        <div className="lg:col-span-2">
          <div className="rounded-xl shadow-lg p-6 bg-slate-800 border border-slate-700 h-full">
            {investmentData && (
              <>
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-2xl font-bold text-white">Investment Growth</h2>
                  <div className="space-x-2">
                    {!showComparison ? (
                      <button
                        onClick={handleAddComparison}
                        className="px-3 py-1 bg-blue-600 hover:bg-blue-700 text-white rounded-md text-sm transition-colors"
                      >
                        + Add Comparison
                      </button>
                    ) : (
                      <button
                        onClick={handleRemoveComparison}
                        className="px-3 py-1 bg-red-600 hover:bg-red-700 text-white rounded-md text-sm transition-colors"
                      >
                        Remove Comparison
                      </button>
                    )}
                  </div>
                </div>
                <div className="h-[300px] mb-6">
                  <InvestmentChart
                    investment={investmentData}
                    comparison={comparisonData}
                    showComparison={showComparison}
                  />
                </div>
              </>
            )}
          </div>
        </div>
      </div>

      {investmentData && (
        <>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <CalculatorResults investment={investmentData} />
            </div>
            <div className="lg:col-span-1">
              <CalculatorSummary investment={investmentData} />
            </div>
          </div>
        </>
      )}
    </div>
  );
};