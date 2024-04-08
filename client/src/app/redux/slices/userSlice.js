
const { createSlice, createAsyncThunk } = require("@reduxjs/toolkit");
import graphQlClientRequest from "@/app/utility/graphQlClientRequest";
import { loginMutation, logoutMutation, signUpMutation } from "@/app/utility/mutations";

export const loginUser = createAsyncThunk('auth/login', async (userCredentials) => {
    try {
        const data = await graphQlClientRequest.request(loginMutation, userCredentials);
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

export const signUpUser = createAsyncThunk('auth/signup', async (userCredentials) => {
    try {
        const data = await graphQlClientRequest.request(signUpMutation, userCredentials);
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

export const logoutUser = createAsyncThunk('auth/logout', async () => {
    try {
        const data = await graphQlClientRequest.request(logoutMutation);
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
        setUserAuthState: (state, action) => {
            state.userAuthenticated = true;
            state.userInfo = action.payload;
        },
        resetUserSlice: (state) => {
            state.userAuthenticated = false;
            state.userInfo = null;
            state.isLoading = false;
            state.isError = false;
            state.errorMessage = '';
        },
        setErrorState: (state) => {
            state.isError = true;
            state.errorMessage = 'Please enter all required fields';
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
                    state.errorMessage = action.payload.message;
                } else {
                    if (action.payload?.login) {
                        state.userAuthenticated = true;
                        state.userInfo = action.payload.login;
                    }
                }
            })
            .addCase(loginUser.rejected, (state) => {
                state.isLoading = false;
                state.isError = true;
                state.errorMessage = 'Something went wrong';
            })
            .addCase(signUpUser.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(signUpUser.fulfilled, (state, action) => {
                state.isLoading = false;
                if (action.payload?.message) {
                    state.isError = true;
                    state.errorMessage = action.payload.message;
                } else {
                    if (action.payload?.signup) {
                        state.userAuthenticated = true;
                        state.userInfo = action.payload.signup;
                    }
                }
            })
            .addCase(signUpUser.rejected, (state) => {
                state.isLoading = false;
                state.isError = true;
                state.errorMessage = 'Something went wrong';
            })
            .addCase(logoutUser.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(logoutUser.fulfilled, (state, action) => {
                state.isLoading = false;
                if (action.payload?.message) {
                    state.isError = true;
                    state.errorMessage = action.payload.message;
                } else {
                    if (action.payload?.logout?.isUserLoggedOut) {
                        state.userAuthenticated = false;
                        state.userInfo = null;
                        state.isLoading = false;
                        state.isError = false;
                        state.errorMessage = '';
                    }
                }
            })
            .addCase(logoutUser.rejected, (state) => {
                state.isLoading = false;
                state.isError = true;
                state.errorMessage = 'Something went wrong';
            })
    }
});

export const { setUserAuthState, resetUserSlice, setErrorState, resetErrorState } = userSlice.actions;

export default userSlice.reducer;