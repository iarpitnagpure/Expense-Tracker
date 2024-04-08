import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import { MdOutlineModeEdit, MdDateRange, MdDeleteOutline, MdOutlineCurrencyRupee } from "react-icons/md";
import moment from "moment";
import { deleteTransaction } from "../redux/slices/transactionSlice";

const TransactionCard = () => {
    const { allTransaction } = useSelector(state => state.transaction);
    const dispatch = useDispatch();
    const history = useRouter();

    return <div className="flex flex-wrap justify-center mb-4">
        {allTransaction.map((item, index) => {
            return <div
                className={`card w-96 max-w-xs text-primary-content my-2 mx-4 cursor-pointer p-4
                ${item.category === 'investment'
                        ? 'bg-primary'
                        : item.category === 'saving'
                            ? 'bg-success'
                            : 'bg-secondary'}
                `}
                key={index}>
                <div className="card-body p-0">
                    <div className="flex justify-between items-center">
                        <h2 className="card-title">Amount:
                            <span className="flex justify-center items-center">{item.amount}<MdOutlineCurrencyRupee /></span>
                        </h2>
                        <MdOutlineModeEdit size={22} onClick={() => history.push(`/transaction/${item._id}`)} />
                    </div>
                    <p className="card-side">Description: {item.description}</p>
                    <p className="card-side">Payment Type: {
                        item.paymentType === 'bankaccount'
                            ? 'Bank Account'
                            : item.paymentType === 'cash'
                                ? 'Cash'
                                : 'Credit Card'}</p>
                    <div className="card-side flex justify-between items-center">
                        <div className="flex justify-start items-center">
                            <MdDateRange size={22} className="mr-2" />
                            {moment(Number(item.date)).format('D MMM YYYY')}
                        </div>
                        <MdDeleteOutline size={22} onClick={() => dispatch(deleteTransaction(item._id))} />
                    </div>
                </div>
            </div>
        })}
    </div>
};

export default TransactionCard;