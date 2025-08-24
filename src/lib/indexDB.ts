import { openDB } from 'idb';
import { Transaction, Category } from '@/types/budget';

const DB_NAME = 'budget_tracker';
const DB_VERSION = 1;

export const initDB = async () => {
    return openDB(DB_NAME, DB_VERSION, {
        upgrade(db) {
            if (!db.objectStoreNames.contains('transactions')) {
                db.createObjectStore('transactions', { keyPath: 'id' });
            }
            if (!db.objectStoreNames.contains('categories')) {
                db.createObjectStore('categories', { keyPath: 'id' });
            }
        },
    });
};

// ---------- Transactions ----------
export const getTransactionsDB = async (): Promise<Transaction[]> => {
    const db = await initDB();
    return (await db.getAll('transactions')) as Transaction[];
};

export const saveTransactionDB = async (transaction: Transaction) => {
    const db = await initDB();
    await db.put('transactions', transaction);
};

export const deleteTransactionDB = async (id: string) => {
    const db = await initDB();
    await db.delete('transactions', id);
};

// ---------- Categories ----------
export const getCategoriesDB = async (): Promise<Category[]> => {
    const db = await initDB();
    const categories = (await db.getAll('categories')) as Category[];
    return categories.length ? categories : []; // Return [] if empty
};

export const saveCategoryDB = async (category: Category) => {
    const db = await initDB();
    await db.put('categories', category);
};

export const deleteCategoryDB = async (id: string) => {
    const db = await initDB();
    await db.delete('categories', id);
};
