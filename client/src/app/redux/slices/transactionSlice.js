const { createSlice, createAsyncThunk } = require("@reduxjs/toolkit");
import graphQlClientRequest from "@/app/utility/graphQlClientRequest";
import { addTransactionMutation, getAllTransactionMutation } from "@/app/utility/mutations";

export const getAllTransaction = createAsyncThunk('get/transaction', async () => {
    try {
        const data = await graphQlClientRequest.request(getAllTransactionMutation);
        return data;
    } catch (error) {
        const firstError = error.response.errors[0];
        const errorObject = {
            message: firstError.message,
            locations: firstError.locations,
            path: firstError.path,
            extensions: firstError.extensions,
        };
        return errorObject;
    }
});

export const addTransaction = createAsyncThunk('post/transaction', async (transaction) => {
    try {
        const data = await graphQlClientRequest.request(addTransactionMutation, transaction);
        return data;
    } catch (error) {
        const firstError = error.response.errors[0];
        const errorObject = {
            message: firstError.message,
            locations: firstError.locations,
            path: firstError.path,
            extensions: firstError.extensions,
        };
        return errorObject;
    }
});

const transactionSlice = createSlice({
    name: 'transaction',
    initialState: {
        isLoading: false,
        isError: false,
        errorMessage: '',
        allTransaction: []
    },
    reducers: {
        resetErrorState: (state) => {
            state.isError = false;
            state.errorMessage = '';
        },
        setErrorState: (state) => {
            state.isError = true;
            state.errorMessage = 'Please enter all required fields';
        },
    },
    extraReducers(builder) {
        builder
            .addCase(getAllTransaction.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getAllTransaction.fulfilled, (state, action) => {
                state.isLoading = false;
                if (action.payload?.message) {
                    state.isError = true;
                    state.errorMessage = action.payload.message;
                } else {
                    if (action.payload?.transactions) {
                        state.allTransaction = [...action.payload?.transactions];
                    }
                }
            })
            .addCase(getAllTransaction.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.errorMessage = action.payload;
            })
            .addCase(addTransaction.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(addTransaction.fulfilled, (state, action) => {
                state.isLoading = false;
                if (action.payload?.message) {
                    state.isError = true;
                    state.errorMessage = action.payload.message;
                } else {
                    if (action.payload?.addTransaction) {
                        state.allTransaction.push(action.payload.addTransaction);
                    }
                }
            })
            .addCase(addTransaction.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.errorMessage = action.payload;
            })
    }
});

export const { resetErrorState, setErrorState } = transactionSlice.actions;

export default transactionSlice.reducer;