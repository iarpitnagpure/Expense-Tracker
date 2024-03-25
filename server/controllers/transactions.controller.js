import Transactions from '../models/transactions.model.js';

const getAllTransaction = async (req) => {
    const { user } = req;
    if (user && user._id) {
        try {
            const transactions = await Transactions.find({ userId: user._id });
            return transactions;
        } catch (err) {
            throw new Error(err.message || 'Internal server error in transaction controller');
        }
    } else {
        throw new Error('Session is expired, Please login again');
    }
};

const createTransaction = async (payload, req) => {
    const { user } = req;
    const { description, paymentType, category, amount, date } = payload;
    if (user && user._id) {
        try {
            if (description && paymentType && category && amount && date) {
                const transactions = new Transactions(
                    {
                        userId: user._id,
                        amount,
                        category,
                        paymentType,
                        description,
                        date
                    }
                );
                await transactions.save();
                return transactions;
            } else {
                throw new Error('Please enter all required fields')
            }
        } catch (err) {
            throw new Error(err.message || 'Internal server error in transaction controller');
        }
    } else {
        throw new Error('Session is expired, Please login again');
    }
};

const updateTransaction = async (payload, req) => {
    const { user } = req;
    if (user && user._id) {
        try {
            const updatedTransaction = await Transactions.findByIdAndUpdate(payload.transactionId, payload, {
                new: true,
            });
            return updatedTransaction;
        } catch (err) {
            throw new Error(err.message || 'Internal server error in transaction controller');
        }
    } else {
        throw new Error('Session is expired, Please login again');
    }
};

const deleteTransaction = async (payload, req) => {
    const { user } = req;
    if (user && user._id) {
        try {
            const deletedTransaction = await Transactions.findByIdAndDelete(payload.transactionId);
            return deletedTransaction;
        } catch (err) {
            throw new Error(err.message || 'Internal server error in transaction controller');
        }
    } else {
        throw new Error('Session is expired, Please login again');
    }
};

export { getAllTransaction, createTransaction, updateTransaction, deleteTransaction };