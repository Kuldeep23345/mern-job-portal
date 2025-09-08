// authSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  loading: false
  // Add more fields as needed:
  // user: null,
  // isAuthenticated: false,
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
  },
});

export const { setLoading } = authSlice.actions;

export default authSlice.reducer;
