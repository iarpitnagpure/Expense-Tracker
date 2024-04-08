'use client';
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import toast, { Toaster } from "react-hot-toast";
import TransactionForm from "@/app/components/TransactionForm";
import { getAllTransaction, resetErrorState } from "@/app/redux/slices/transactionSlice";
import Loader from "@/app/components/Loader";

const EditTransaction = ({ params }) => {
    const [transaction, setTransaction] = useState(null);
    const { allTransaction, isLoading, isError, errorMessage, isTransactionUpdateSucess } = useSelector(state => state.transaction);
    const history = useRouter();
    const dispatch = useDispatch();

    const redirectToDashboard = () => {
        history.push('/dashboard');
    };

    useEffect(() => {
        if (allTransaction.length) {
            const selectedTransaction = allTransaction.find((item) => item._id === params.transactionId);
            console.log(selectedTransaction);
            setTransaction(selectedTransaction);
        } else {
            dispatch(getAllTransaction());
        }
    }, [allTransaction]);

    useEffect(() => {
        if (isTransactionUpdateSucess) {
            toast.success('Expense updated');
            redirectToDashboard();
        }
    }, [isTransactionUpdateSucess]);

    useEffect(() => {
        if (isError) {
            toast.error(errorMessage);
            dispatch(resetErrorState());
        }
    }, [isError]);

    return <div className="flex flex-col flex-wrap w-full justify-center items-center my-4">
        <h3 className="text-4xl font-bold m-5 text-center leading-[68px] border-webkit-1 hover:cursor-pointer">
            Update Transaction
        </h3>
        <TransactionForm selectedTransaction={transaction} isTransactionEditForm />
        {isLoading && <Loader />}
        <Toaster
            position="top-center"
            reverseOrder={false}
        />
    </div>
};

export default EditTransaction;