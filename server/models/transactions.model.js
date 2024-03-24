import mongoose from 'mongoose';

const TransactionSchema = new mongoose.Schema({
    userId: {
        type: String,
        require: true,
        ref: 'Users',
    },
    description: {
        type: String,
        require: true,
    },
    paymentType: {
        type: String,
        require: true,
    },
    category: {
        type: String,
        require: true,
    },
    date: {
        type: Date,
        require: true,
    },
    amount: {
        type: Number,
        require: true,
    },
}, { timestamps: true });

const Transactions = mongoose.model('Transaction', TransactionSchema);

export default Transactions;