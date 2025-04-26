import React from 'react';
import { formatCurrency, formatPercentage } from '../utils/formatters';
import type { Investment } from '../types/investment';

interface CalculatorSummaryProps {
  investment: Investment;
}

export const CalculatorSummary: React.FC<CalculatorSummaryProps> = ({
  investment,
}) => {
  const finalYearData = investment.yearlyData[investment.yearlyData.length - 1];
  const initialInvestment = investment.yearlyData[0].totalInvested;
  const totalInvested = finalYearData.totalInvested;
  const totalInterest = finalYearData.interestEarned;
  const totalValue = finalYearData.totalValue;
  const years = investment.yearlyData.length;
  const roi = (totalInterest / totalInvested) * 100;
  const annualizedReturn = Math.pow(totalValue / initialInvestment, 1 / years) - 1;

  return (
    <div className="rounded-xl shadow-lg p-6 bg-slate-800 border border-slate-700 transition-all hover:shadow-xl h-full">
      <h2 className="text-2xl font-bold mb-6 text-white">Investment Summary</h2>
      
      <div className="space-y-4">
        <div className="p-4 bg-slate-700/50 rounded-lg">
          <p className="text-sm text-gray-400">Total Investment</p>
          <p className="text-2xl font-bold text-white">{formatCurrency(totalInvested)}</p>
        </div>
        
        <div className="p-4 bg-blue-900/20 rounded-lg border border-blue-800/30">
          <p className="text-sm text-blue-300">Total Interest Earned</p>
          <p className="text-2xl font-bold text-blue-400">{formatCurrency(totalInterest)}</p>
        </div>
        
        <div className="p-4 bg-green-900/20 rounded-lg border border-green-800/30">
          <p className="text-sm text-green-300">Final Amount</p>
          <p className="text-2xl font-bold text-green-400">{formatCurrency(totalValue)}</p>
        </div>
        
        <div className="grid grid-cols-2 gap-4">
          <div className="p-4 bg-slate-700/50 rounded-lg">
            <p className="text-sm text-gray-400">ROI</p>
            <p className="text-xl font-bold text-white">{formatPercentage(roi)}</p>
          </div>
          
          <div className="p-4 bg-slate-700/50 rounded-lg">
            <p className="text-sm text-gray-400">Annual Return</p>
            <p className="text-xl font-bold text-white">{formatPercentage(annualizedReturn * 100)}</p>
          </div>
        </div>
        
        <div className="p-4 bg-slate-700/30 rounded-lg">
          <p className="text-sm text-gray-400">Investment Breakdown</p>
          <div className="mt-2 h-4 bg-slate-700 rounded-full overflow-hidden">
            <div 
              className="h-full bg-blue-600" 
              style={{ width: `${(totalInvested / totalValue) * 100}%` }}
            ></div>
          </div>
          <div className="flex justify-between mt-1 text-xs">
            <span className="text-blue-400">Principal ({formatPercentage((totalInvested / totalValue) * 100)})</span>
            <span className="text-green-400">Interest ({formatPercentage((totalInterest / totalValue) * 100)})</span>
          </div>
        </div>
      </div>
    </div>
  );
};