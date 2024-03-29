"use client";
import Logout from "../components/LogoutButton";
import TransactionChart from "../components/TransactionChart";
import TransactionForm from "../components/TransactionForm";

const Dashboard = () => {
    return <div className="flex flex-col justify-start items-center w-screen h-screen overflow-x-hidden">
        <h3 className="text-6xl font-bold m-5 text-center leading-[68px] border-webkit hover:cursor-pointer">Expense Dashboard</h3>
        <div className="flex flex-wrap w-full justify-center items-center gap-6 m-10">
            <TransactionChart />
            <TransactionForm />
        </div>
        <Logout />
    </div>
};

export default Dashboard;