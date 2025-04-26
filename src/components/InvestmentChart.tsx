import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import { formatCurrency } from '../utils/formatters';
import type { Investment } from '../types/investment';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

interface InvestmentChartProps {
  investment: Investment;
  comparison: Investment | null;
  showComparison: boolean;
}

export const InvestmentChart: React.FC<InvestmentChartProps> = ({
  investment,
  comparison,
  showComparison,
}) => {

  
  // const textColor = isDark ? 'rgba(255, 255, 255, 0.7)' : 'rgba(0, 0, 0, 0.7)';
  // const gridColor = isDark ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)';

  const textColor = 'rgba(255, 255, 255, 0.7)' 
  const gridColor = 'rgba(255, 255, 255, 0.1)' 
  const labels = Array.from(
    { length: investment.yearlyData.length },
    (_, i) => `Year ${i + 1}`
  );

  const data = {
    labels,
    datasets: [
      {
        label: 'Current Investment',
        data: investment.yearlyData.map((data) => data.totalValue),
        fill: true,
        backgroundColor: 'rgba(59, 130, 246, 0.2)',
        borderColor: 'rgba(59, 130, 246, 0.8)',
        tension: 0.4,
      },
      ...(!showComparison || !comparison
        ? []
        : [
            {
              label: 'Comparison Investment',
              data: comparison.yearlyData.map((data) => data.totalValue),
              fill: true,
              backgroundColor: 'rgba(16, 185, 129, 0.2)',
              borderColor: 'rgba(16, 185, 129, 0.8)',
              tension: 0.4,
            },
          ]),
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top' as const,
        labels: {
          color: textColor,
        },
      },
      tooltip: {
        callbacks: {
          label: function (context: any) {
            let label = context.dataset.label || '';
            if (label) {
              label += ': ';
            }
            label += formatCurrency(context.parsed.y);
            return label;
          },
        },
      },
    },
    scales: {
      x: {
        grid: {
          color: gridColor,
        },
        ticks: {
          color: textColor,
        },
      },
      y: {
        grid: {
          color: gridColor,
        },
        ticks: {
          color: textColor,
          callback: function (value: number) {
            return formatCurrency(value, { compact: true });
          },
        },
      },
    },
    animation: {
      duration: 800,
      easing: 'easeOutQuart',
    },
  };

  return <Line data={data} options={options} />;
};