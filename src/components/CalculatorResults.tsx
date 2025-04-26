import React from 'react';
import { ArrowUpRight, Download } from 'lucide-react';
import { formatCurrency, formatPercentage } from '../utils/formatters';
import type { Investment } from '../types/investment';

interface CalculatorResultsProps {
  investment: Investment;
}

export const CalculatorResults: React.FC<CalculatorResultsProps> = ({
  investment,
}) => {
  const handleExport = () => {
    const data = investment.yearlyData.map((year, index) => ({
      year: index + 1,
      totalInvested: year.totalInvested,
      interestEarned: year.interestEarned,
      totalValue: year.totalValue,
    }));

    const csvContent =
      'data:text/csv;charset=utf-8,' +
      'Year,Total Invested (₹),Interest Earned (₹),Total Value (₹)\n' +
      data
        .map((row) => {
          return `${row.year},${row.totalInvested},${row.interestEarned},${row.totalValue}`;
        })
        .join('\n');

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', 'roi_calculation.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="rounded-xl shadow-lg p-6 bg-slate-800 border border-slate-700 transition-all hover:shadow-xl">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-white">Detailed Results</h2>
        <button
          onClick={handleExport}
          className="flex items-center px-3 py-1 bg-slate-700 hover:bg-slate-600 text-white rounded-md text-sm transition-colors"
        >
          <Download size={14} className="mr-1" />
          Export
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-slate-700">
          <thead>
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                Year
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                Total Invested
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                Interest Earned
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                Total Value
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                Growth
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-700">
            {investment.yearlyData.map((yearData, index) => (
              <tr key={index} className="hover:bg-slate-700/50 transition-colors">
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-200">
                  {index + 1}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-200">
                  {formatCurrency(yearData.totalInvested)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-200">
                  {formatCurrency(yearData.interestEarned)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-white">
                  {formatCurrency(yearData.totalValue)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm">
                  <div className="flex items-center">
                    <ArrowUpRight size={14} className="text-green-500 mr-1" />
                    <span className="text-green-500">
                      {formatPercentage(
                        (yearData.interestEarned / yearData.totalInvested) * 100
                      )}
                    </span>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};