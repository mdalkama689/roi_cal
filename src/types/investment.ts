export interface InvestmentInputs {
  initialInvestment: number;
  monthlyContribution: number;
  annualInterestRate: number;
  investmentPeriod: number;
  compoundingFrequency: 'daily' | 'monthly' | 'quarterly' | 'semi-annually' | 'annually';
}

export interface YearlyData {
  totalInvested: number;
  interestEarned: number;
  totalValue: number;
}

export interface Investment {
  initialInvestment: number;
  totalContributions: number;
  totalInterest: number;
  finalValue: number;
  yearlyData: YearlyData[];
}