export interface Transaction {
  id: string;
  type: string;
  amount: number;
  description: string;
  category: string;
  date: string;
  createdAt: Date;
}

export interface Category {
  id: string;
  name: string;
  type: string;
  icon: string;
  color: string;
}

export interface BudgetSummary {
  totalIncome: number;
  totalExpenses: number;
  balance: number;
  transactionCount: number;
}