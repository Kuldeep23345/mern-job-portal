import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  singleCompany: null,
  companies:[]
};

export const companySlice = createSlice({
  name: "company",
  initialState,
  reducers: {
    setSingleCompany: (state, action) => {
      state.singleCompany = action.payload;
    },
    setCompanies: (state, action) => {
      state.companies = action.payload;
    },
  },
});

export const { setSingleCompany ,setCompanies} = companySlice.actions;
export default companySlice.reducer;
