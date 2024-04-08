import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { addTransaction, setErrorState, updateTransaction } from "../redux/slices/transactionSlice";

const TransactionForm = ({ isTransactionEditForm, selectedTransaction }) => {
    const [amount, setAmount] = useState(0);
    const [description, setDescription] = useState("");
    const [paymentType, setPaymentType] = useState("");
    const [category, setCategory] = useState("");
    const [expenseDate, setExpenseDate] = useState("");
    const dispatch = useDispatch();
    const history = useRouter();

    const handleAddEditExpense = () => {
        if (amount && description && paymentType && category && expenseDate) {
            isTransactionEditForm
                ? dispatch(updateTransaction(
                    {
                        transactionId: selectedTransaction._id,
                        amount: parseFloat(amount),
                        description,
                        paymentType,
                        category,
                        date: expenseDate
                    }))
                : dispatch(addTransaction(
                    {
                        amount: parseFloat(amount),
                        description,
                        paymentType,
                        category,
                        date: expenseDate
                    }));
        } else {
            dispatch(setErrorState());
        }
    };

    useEffect(() => {
        if (selectedTransaction) {
            setAmount(selectedTransaction.amount);
            setDescription(selectedTransaction.description);
            setPaymentType(selectedTransaction.paymentType);
            setCategory(selectedTransaction.category);
            setExpenseDate(new Date(Number(selectedTransaction.date)).toLocaleDateString('en-CA'));
        }
    }, [selectedTransaction]);

    return <div className="max-w-[700px] gap-5 flex flex-col flex-wrap justify-center items-center">
        <div className="flex flex-wrap justify-center">
            <label className={`input input-bordered flex items-center gap-2 w-full max-w-xs m-2 
                        ${isTransactionEditForm ? 'input-primary' : 'input-secondary'}`}
            >
                <input
                    type="number"
                    placeholder="Amount"
                    className="w-full"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                />
            </label>
            <label className={`input input-bordered flex items-center gap-2 w-full max-w-xs m-2 
                    ${isTransactionEditForm ? 'input-primary' : 'input-secondary'}`}
            >
                <input
                    type="text"
                    placeholder="Description"
                    className="w-full"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                />
            </label>
            <select
                className={`select select-bordered w-full max-w-xs m-2 
                    ${isTransactionEditForm ? 'select-primary' : 'select-secondary'}`}
                value={paymentType}
                onChange={(e) => setPaymentType(e.target.value)}
            >
                <option value={""} disabled>Payment Type</option>
                <option value={"creditcard"}>Credit Card</option>
                <option value={"bankaccount"}>Bank Account</option>
                <option value={"cash"}>Cash</option>
            </select>
            <select
                className={`select select-bordered w-full max-w-xs m-2 
                    ${isTransactionEditForm ? 'select-primary' : 'select-secondary'}`}
                value={category}
                onChange={(e) => setCategory(e.target.value)}
            >
                <option value={""} disabled>Category</option>
                <option value={"saving"}>Saving</option>
                <option value={"expense"}>Expense</option>
                <option value={"investment"}>Investment</option>
            </select>
            <input
                type="date"
                className={`input input-bordered w-full max-w-xs m-2
                    ${isTransactionEditForm ? 'input-primary' : 'input-secondary'}`}
                placeholder="Select Date"
                value={expenseDate}
                onChange={(e) => setExpenseDate(e.target.value)}
            />
        </div>
        <div className="flex flex-row flex-wrap justify-center w-full">
            <button
                onClick={handleAddEditExpense}
                className={`btn btn-primary text-base w-full max-w-xs m-4 
                    ${isTransactionEditForm ? 'border-primary' : 'border-secondary'}`}
            >
                {isTransactionEditForm ? 'Update Expense' : 'Add Expense'}
            </button>
            {isTransactionEditForm && <button
                onClick={() => history.push('/dashboard')}
                className="btn btn-link text-base w-full max-w-xs m-4"
            >
                Dashboard
            </button>}
        </div>
    </div>
};

export default TransactionForm;