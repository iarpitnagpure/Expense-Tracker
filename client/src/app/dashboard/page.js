"use client";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import Logout from "../components/LogoutButton";
import TransactionChart from "../components/TransactionChart";
import TransactionForm from "../components/TransactionForm";
import { logoutUser, setUserAuthState } from "../redux/slices/userSlice";

const Dashboard = () => {
    const { userAuthenticated } = useSelector(state => state.user);
    const dispatch = useDispatch();
    const history = useRouter();

    const handleLogoutClick = () => {
        sessionStorage.removeItem('loggedInUser');
        dispatch(logoutUser());
    };

    const verifyUserAuthentication = () => {
        const loggedInUser = JSON.parse(sessionStorage.getItem('loggedInUser'));
        if (userAuthenticated) {

        } else if (loggedInUser?._id) {
            dispatch(setUserAuthState(loggedInUser));
        } else {
            history.push('/login');
        }
    };

    useEffect(() => {
        verifyUserAuthentication();
    }, [userAuthenticated]);

    return <div className="flex flex-col justify-start items-center w-screen h-screen overflow-x-hidden">
        <h3 className="text-6xl font-bold m-5 text-center leading-[68px] border-webkit hover:cursor-pointer">Expense Dashboard</h3>
        <div className="flex flex-wrap w-full justify-center items-center gap-6 m-10">
            <TransactionChart />
            <TransactionForm />
        </div>
        <Logout handleLogoutClick={handleLogoutClick} />
    </div>
};

export default Dashboard;