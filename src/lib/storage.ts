import { Transaction, Category } from '@/types/budget';

export const DEFAULT_CATEGORIES: Category[] = [
  // Income categories
  { id: '1', name: 'Salary', type: 'income', icon: '💼', color: 'income' },
  { id: '2', name: 'Freelance', type: 'income', icon: '💻', color: 'income' },
  { id: '3', name: 'Investment', type: 'income', icon: '📈', color: 'income' },
  { id: '4', name: 'Gift', type: 'income', icon: '🎁', color: 'income' },

  // Expense categories
  { id: '5', name: 'Rent', type: 'expense', icon: '🏠', color: 'expense' },
  { id: '6', name: 'Groceries', type: 'expense', icon: '🛒', color: 'expense' },
  { id: '7', name: 'Transportation', type: 'expense', icon: '🚗', color: 'expense' },
  { id: '8', name: 'Entertainment', type: 'expense', icon: '🎬', color: 'expense' },
  { id: '9', name: 'Utilities', type: 'expense', icon: '⚡', color: 'expense' },
  { id: '10', name: 'Healthcare', type: 'expense', icon: '🏥', color: 'expense' },
  { id: '11', name: 'Shopping', type: 'expense', icon: '🛍️', color: 'expense' },
  { id: '12', name: 'Food & Dining', type: 'expense', icon: '🍽️', color: 'expense' },
];


