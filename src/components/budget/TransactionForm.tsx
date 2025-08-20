import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useToast } from "@/components/ui/use-toast";
import { Category, Transaction } from "@/types/budget";

const inputClass =
  "border p-2 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-500";
const errorClass = "text-red-500 text-xs mt-1 min-h-[16px]";

const validationSchema = Yup.object({
  type: Yup.string().required("Transaction type is required"),
  amount: Yup.number().typeError("Must be a number").positive("Must be positive").required("Amount is required"),
  category: Yup.string().required("Category is required"),
  date: Yup.date().required("Date is required"),
  description: Yup.string().required("Description is required"),
});

interface TransactionFormProps {
  categories: Category[];
  onAddTransaction: (transaction: Transaction) => void;
}

interface TransactionFormValues {
  type: 'income' | 'expense';
  amount: string;
  category: string;
  date: string;
  description: string;
}

export default function TransactionForm({ categories, onAddTransaction }: TransactionFormProps) {
  const { toast } = useToast();
  return (
    <Formik
      initialValues={{
        type: "expense",
        amount: "",
        category: "",
        date: "",
        description: "",
      }}
      validationSchema={validationSchema}
      onSubmit={(values, { resetForm }) => {
        const transaction: Transaction = {
          id: Date.now().toString(),
          type: values?.type,
          amount: parseFloat(values.amount),
          description: values.description,
          category: values.category,
          date: values.date,
          createdAt: new Date(),
        };
        onAddTransaction(transaction);
        toast({
          title: 'Transaction Added',
          description: `${values.type === 'income' ? 'Income' : 'Expense'} of $${values.amount} has been recorded.`,
        });
        resetForm();
      }}
    >
      {() => (
        <Form className="p-4 bg-white rounded-2xl shadow-lg w-full max-w-sm">
          <h3 className="font-bold mb-4 text-lg">+ Add New Transaction</h3>

          {/* Transaction Type */}
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">Transaction Type</label>
            <Field as="select" name="type" className={`${inputClass} bg-gray-50`}>
              <option value="income" className="rounded-lg bg-green-100">Income</option>
              <option value="expense" className="rounded-lg bg-red-100">Expense</option>
            </Field>
            <ErrorMessage name="type">
              {msg => <div className={errorClass}>{msg}</div>}
            </ErrorMessage>
          </div>

          {/* Amount */}
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">Amount ($)</label>
            <Field type="number" name="amount" className={inputClass} />
            <ErrorMessage name="amount">
              {msg => <div className={errorClass}>{msg}</div>}
            </ErrorMessage>
          </div>

          {/* Category */}
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">Category</label>
            <Field as="select" name="category" className={`${inputClass} bg-gray-50`}>
              <option value="" className="rounded-lg bg-gray-100">
                Select a category
              </option>
              {categories.map((cat) => (
                <option key={cat.id} value={cat.name} className="rounded-lg bg-gray-100">
                  {cat.name}
                </option>
              ))}
            </Field>
            <ErrorMessage name="category">
              {msg => <div className={errorClass}>{msg}</div>}
            </ErrorMessage>
          </div>

          {/* Date */}
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">Date</label>
            <Field type="date" name="date" className={inputClass} />
            <ErrorMessage name="date">
              {msg => <div className={errorClass}>{msg}</div>}
            </ErrorMessage>
          </div>

          {/* Description */}
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">Description</label>
            <Field as="textarea" name="description" rows={3} className={inputClass} />
            <ErrorMessage name="description">
              {msg => <div className={errorClass}>{msg}</div>}
            </ErrorMessage>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors w-full font-semibold"
          >
            + Add Transaction
          </button>
        </Form>
      )}
    </Formik>
  );
}
