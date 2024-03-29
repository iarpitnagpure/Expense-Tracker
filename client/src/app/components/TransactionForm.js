import { useState } from "react";

const TransactionForm = () => {
    const [amount, setAmount] = useState(0);
    const [description, setDescription] = useState("");
    const [paymentType, setPaymentType] = useState("");
    const [category, setCategory] = useState("");
    const [expenseDate, setExpenseDate] = useState("");

    return <div className="max-w-[700px] gap-5 flex flex-col flex-wrap justify-center items-center">
        <div className="flex flex-wrap justify-center">
            <label className="input input-bordered input-secondary flex items-center gap-2 w-full max-w-xs m-2">
                <input
                    type="number"
                    placeholder="Amount"
                    className="w-full"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                />
            </label>
            <label className="input input-bordered input-secondary flex items-center gap-2 w-full max-w-xs m-2">
                <input
                    type="text"
                    placeholder="Description"
                    className="w-full"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                />
            </label>
            <select
                className="select select-bordered select-secondary w-full max-w-xs m-2"
                value={paymentType}
                onChange={(e) => setPaymentType(e.target.value)}
            >
                <option value={""} disabled>Payment Type</option>
                <option value={"creditcard"}>Credit Card</option>
                <option value={"bankaccount"}>Bank Account</option>
                <option value={"saving"}>Cash</option>
            </select>
            <select
                className="select select-bordered select-secondary w-full max-w-xs m-2"
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
                className="input input-bordered input-secondary w-full max-w-xs max-w-xs m-2"
                placeholder="Select Date"
                value={expenseDate}
                onChange={(e) => setExpenseDate(e.target.value)}
            />
        </div>
        <div className="flex flex-row justify-center w-full">
        <button className="btn btn-primary w-full max-w-xs m-4">Add Expense</button>
        </div>
    </div>
};

export default TransactionForm;