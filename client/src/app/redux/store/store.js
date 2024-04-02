const { configureStore } = require("@reduxjs/toolkit");
import transactionSlice from "../slices/transactionSlice";
import userSlice from "../slices/userSlice";

const store = configureStore({
    reducer: {
        user: userSlice,
        transaction: transactionSlice,
    }
});

export default store;