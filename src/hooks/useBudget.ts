import { useState, useEffect } from 'react';
import { Transaction, Category, BudgetSummary } from '@/types/budget';
import {
  getTransactionsDB,
  saveTransactionDB,
  deleteTransactionDB,
  getCategoriesDB,
  saveCategoryDB,
  deleteCategoryDB,
} from '@/lib/indexDB';
import { DEFAULT_CATEGORIES } from '@/lib/storage'; // reuse defaults

export const useBudget = () => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);

  // Load data from IndexedDB
  useEffect(() => {
    const loadData = async () => {
      const txns = await getTransactionsDB();
      let cats = await getCategoriesDB();
      // If no categories stored yet, use defaults
      if (cats.length === 0) {
        cats = DEFAULT_CATEGORIES;
        for (const cat of DEFAULT_CATEGORIES) {
          await saveCategoryDB(cat);
        }
      }
      setTransactions(txns);
      setCategories(cats);
      setLoading(false);
    };
    loadData();
  }, []);

  // Calculate budget summary
  const getBudgetSummary = (): BudgetSummary => {
    const totalIncome = transactions
      .filter(t => t.type === 'income')
      .reduce((sum, t) => sum + t.amount, 0);

    const totalExpenses = transactions
      .filter(t => t.type === 'expense')
      .reduce((sum, t) => sum + t.amount, 0);

    return {
      totalIncome,
      totalExpenses,
      balance: totalIncome - totalExpenses,
      transactionCount: transactions.length,
    };
  };

  // Transaction operations
  const addTransaction = async (transaction: Transaction) => {
    await saveTransactionDB(transaction);
    setTransactions(prev => [...prev, transaction]);
  };

  const deleteTransaction = async (id: string) => {
    await deleteTransactionDB(id);
    setTransactions(prev => prev.filter(t => t.id !== id));
  };

  // Category operations
  const addCategory = async (category: Category) => {
    await saveCategoryDB(category);
    setCategories(prev => {
      const existing = prev.find(c => c.id === category.id);
      if (existing) {
        return prev.map(c => c.id === category.id ? category : c);
      }
      return [...prev, category];
    });
  };

  const deleteCategory = async (id: string) => {
    await deleteCategoryDB(id);
    setCategories(prev => prev.filter(c => c.id !== id));
  };

  return {
    transactions,
    categories,
    loading,
    budgetSummary: getBudgetSummary(),
    addTransaction,
    deleteTransaction,
    addCategory,
    deleteCategory,
  };
};
