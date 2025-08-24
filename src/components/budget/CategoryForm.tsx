import { v4 as uuid } from 'uuid';
import { useBudget } from '@/hooks/useBudget';
import { Category } from '@/types/budget';
import { useToast } from "@/components/ui/use-toast";
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';


const validationSchema = Yup.object({
    name: Yup.string().required('Category name is required'),
    type: Yup.mixed<'income' | 'expense'>()
        .oneOf(['income', 'expense'])
        .required('Category type is required'),
});

export default function CategoryForm({ onSubmitComplete }: { onSubmitComplete: () => void }) {
    const { addCategory } = useBudget();
    const { toast } = useToast();

    const initialValues = {
        name: '',
        type: 'expense',
    };

    return (
        <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={(values, { resetForm }) => {
                const newCategory: Category = {
                    id: uuid(),
                    name: values.name,
                    type: values.type,
                    icon: '🛒',       // keeping your default icon
                    color: values.type, // assuming color matches type
                };
                addCategory(newCategory);

                toast({
                    title: "Category added",
                    description: `"${values.name}" has been added successfully.`,
                    duration: 3000,
                });

                onSubmitComplete();
                resetForm();
            }}
        >
            {({ isSubmitting }) => (
                <Form className="p-4 bg-white rounded-2xl shadow-lg w-full max-w-sm">
                    <h3 className="font-bold mb-4 text-lg">Add New Category</h3>
                    <div className="mb-3">
                        <Field
                            type="text"
                            name="name"
                            placeholder="Category Name"
                            className="border p-2 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        <ErrorMessage
                            name="name"
                            component="div"
                            className="text-red-500 text-sm mt-1"
                        />
                    </div>

                    <div className="mb-3">
                        <Field
                            as="select"
                            name="type"
                            className="border p-2 rounded-lg w-full bg-gray-100 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                            <option value="income" className="bg-white rounded-lg">
                                Income
                            </option>
                            <option value="expense" className="bg-white rounded-lg">
                                Expense
                            </option>
                        </Field>
                        <ErrorMessage
                            name="type"
                            component="div"
                            className="text-red-500 text-sm mt-1"
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={isSubmitting}
                        className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors w-full"
                    >
                        Add Category
                    </button>
                </Form>
            )}
        </Formik>
    );
}
