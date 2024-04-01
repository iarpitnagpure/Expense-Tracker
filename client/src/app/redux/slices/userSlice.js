
const { createSlice, createAsyncThunk } = require("@reduxjs/toolkit");
import graphQlClientRequest from "@/app/utility/graphQlClientRequest";
import { loginMutation } from "@/app/utility/mutations";

export const loginUser = createAsyncThunk('auth/login', async (userCredentials) => {
    try {
        const data = await graphQlClientRequest.request(loginMutation, userCredentials);
        return data;
    } catch (error) {
        return error;
    }
});

const loginErrorMessage = 'Please enter valid username and password';

const userSlice = createSlice({
    name: 'user',
    initialState: {
        userAuthenticated: false,
        userInfo: null,
        isLoading: false,
        isError: false,
        errorMessage: '',
    },
    reducers: {
        resetUserSlice: (state) => {
            state.userAuthenticated = false;
            state.userInfo = null;
            state.isLoading = false;
            state.isError = false;
            state.errorMessage = '';
        },
        setErrorState: (state) => {
            state.isError = true;
            state.errorMessage = loginErrorMessage;
        },
        resetErrorState: (state) => {
            state.isError = false;
            state.errorMessage = '';
        }
    },
    extraReducers(builder) {
        builder
            .addCase(loginUser.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(loginUser.fulfilled, (state, action) => {
                state.isLoading = false;
                if (action.payload?.message) {
                    state.isError = true;
                    state.errorMessage = loginErrorMessage;
                } else {
                    if (action.payload?.login) {
                        state.userAuthenticated = true;
                        state.userInfo = action.payload.login;
                    }
                }
            })
            .addCase(loginUser.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.errorMessage = action.payload;
            })
    }
});

export const { resetUserSlice, setErrorState, resetErrorState } = userSlice.actions;

export default userSlice.reducer;