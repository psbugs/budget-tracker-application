import { useState } from 'react';
import { BudgetSummary } from '@/components/budget/BudgetSummary';
import TransactionForm from '@/components/budget/TransactionForm';
import { TransactionList } from '@/components/budget/TransactionList';
import CategoryForm from '@/components/budget/CategoryForm';
import { useBudget } from '@/hooks/useBudget';
import { Wallet, TrendingUp, Target } from 'lucide-react';

const Index = () => {
  const {
    transactions,
    categories,
    loading,
    budgetSummary,
    addTransaction,
    deleteTransaction,
  } = useBudget();

  const [showModal, setShowModal] = useState<null | 'category' | 'transaction'>(null);

  const handleOpenModal = (type: 'category' | 'transaction') => {
    setShowModal(type);
  };

  const handleCloseModal = () => {
    setShowModal(null);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center">
          <Wallet className="h-12 w-12 mx-auto mb-4 text-primary animate-pulse" />
          <p className="text-muted-foreground">Loading your budget...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-card border-b border-border">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="bg-primary p-2 rounded-lg">
                <Wallet className="h-6 w-6 text-primary-foreground" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-foreground">Budget Tracker</h1>
                <p className="text-muted-foreground">Take control of your finances</p>
              </div>
            </div>

            <div className="hidden md:flex items-center gap-6 text-sm">
              <div className="flex items-center gap-2">
                <TrendingUp className="h-4 w-4 text-income" />
                <span className="text-muted-foreground">Smart insights</span>
              </div>
              <div className="flex items-center gap-2">
                <Target className="h-4 w-4 text-primary" />
                <span className="text-muted-foreground">Goal tracking</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main content */}
      <main className="container mx-auto px-4 py-8">
        <BudgetSummary summary={budgetSummary} />

        {/* Action buttons */}
        <div className="flex gap-4 mb-6">
          <button
            onClick={() => handleOpenModal('category')}
            className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
          >
            Add Category
          </button>
          <button
            onClick={() => handleOpenModal('transaction')}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            Add Transaction
          </button>
        </div>

        {/* Transaction List */}
        <TransactionList
          transactions={transactions}
          categories={categories}
          onDeleteTransaction={deleteTransaction}
        />
      </main>

      {/* Modal Overlay */}
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
          <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md relative">
            <button
              onClick={handleCloseModal}
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
            >
              ✕
            </button>

            {showModal === 'category' && (
              <CategoryForm onSubmitComplete={handleCloseModal} />
            )}

            {showModal === 'transaction' && (
              <TransactionForm
                categories={categories}
                onAddTransaction={(t) => {
                  addTransaction(t);
                  handleCloseModal();
                }}
              />
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Index;
