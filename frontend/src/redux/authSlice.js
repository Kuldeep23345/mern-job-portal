// authSlice.js
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loading: false,
  user: null,
  // Add more fields as needed:
  // user: null,
  // isAuthenticated: false,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setUser: (state, action) => {
      state.user = action.payload;
    },
  },
});

export const { setLoading,setUser } = authSlice.actions;

export default authSlice.reducer;
