const { createSlice, createAsyncThunk } = require("@reduxjs/toolkit");
import graphQlClientRequest from "@/app/utility/graphQlClientRequest";
import { addTransactionMutation, deleteTransactionMutation, getAllTransactionMutation, updateTransactionMutation } from "@/app/utility/mutations";

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

export const updateTransaction = createAsyncThunk('update/transaction', async (transaction) => {
    try {
        const data = await graphQlClientRequest.request(updateTransactionMutation, transaction);
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

export const deleteTransaction = createAsyncThunk('delete/transaction', async (transactionId) => {
    try {
        const data = await graphQlClientRequest.request(deleteTransactionMutation, { transactionId });
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
        allTransaction: [],
        isTransactionUpdateSucess: false,
        isTransactionPostSucess: false,
        isTransactionDeleteSucess: false,
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
        resetTransactionToastState: (state) => {
            state.isTransactionUpdateSucess = false;
            state.isTransactionPostSucess = false;
            state.isTransactionDeleteSucess = false;
        }
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
            .addCase(getAllTransaction.rejected, (state) => {
                state.isLoading = false;
                state.isError = true;
                state.errorMessage = 'Something went wrong';
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
                        state.isTransactionPostSucess = true;
                    }
                }
            })
            .addCase(addTransaction.rejected, (state) => {
                state.isLoading = false;
                state.isError = true;
                state.errorMessage = 'Something went wrong';
            })
            .addCase(updateTransaction.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(updateTransaction.fulfilled, (state, action) => {
                state.isLoading = false;
                if (action.payload?.message) {
                    state.isError = true;
                    state.errorMessage = action.payload.message;
                } else {
                    if (action.payload?.updateTransaction) {
                        state.allTransaction = state.allTransaction.map((item) => {
                            return item._id === action.payload.updateTransaction._id
                                ? action.payload.updateTransaction
                                : item
                        });
                        state.isTransactionUpdateSucess = true;
                    }
                }
            })
            .addCase(updateTransaction.rejected, (state) => {
                state.isLoading = false;
                state.isError = true;
                state.errorMessage = 'Something went wrong';
            })
            .addCase(deleteTransaction.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(deleteTransaction.fulfilled, (state, action) => {
                state.isLoading = false;
                if (action.payload?.message) {
                    state.isError = true;
                    state.errorMessage = action.payload.message;
                } else {
                    if (action.payload?.deleteTransaction) {
                        state.allTransaction = state.allTransaction.filter((item) => item._id !== action.payload.deleteTransaction._id);
                        state.isTransactionDeleteSucess = true;
                    }
                }
            })
            .addCase(deleteTransaction.rejected, (state) => {
                state.isLoading = false;
                state.isError = true;
                state.errorMessage = 'Something went wrong';
            })
    }
});

export const { resetErrorState, setErrorState, resetTransactionToastState } = transactionSlice.actions;

export default transactionSlice.reducer;