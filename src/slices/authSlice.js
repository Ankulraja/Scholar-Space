import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  signupData: null,
  loading: false,
  token: localStorage.getItem("token")
    ? JSON.parse(localStorage.getItem("token"))
    : null,
  error: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState: initialState,
  reducers: {
    setSignupData(state, value) {
      state.signupData = value.payload;
    },
    setLoading(state, value) {
      state.loading = value.payload;
    },
    setToken(state, value) {
      state.token = value.payload;
    },
    setError(state, value) {
      state.error = value.payload;
    },
    clearError(state) {
      state.error = null;
    },
  },
});

export const { setSignupData, setLoading, setToken, setError, clearError } =
  authSlice.actions;
export default authSlice.reducer;
