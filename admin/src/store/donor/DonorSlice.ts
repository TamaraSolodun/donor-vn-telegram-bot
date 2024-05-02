import { createSlice } from "@reduxjs/toolkit";

import type { RootState } from "../store";

import { Donor, DonorList } from "../../interfaces/Donor";
import { getDonorsThunk } from "../thunk/donors";

export interface DonorsState {
  loading: boolean;
  donors: DonorList;
  error: string | undefined;
}
const initialState: DonorsState = {
  loading: false,
  donors: [],
  error: undefined,
};

export const DonorsSlice = createSlice({
  name: "donors",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getDonorsThunk.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getDonorsThunk.fulfilled, (state, action) => {
      state.loading = false;
      state.donors = action.payload;
    });
    builder.addCase(getDonorsThunk.rejected, (state, action) => {
      state.loading = false;
      state.donors = [];
      state.error = action.error.message;
    });
  },
});

//export const {} = DonorsSlice.actions;
export const donorsSelector = (state: RootState) => state.donors;
export default DonorsSlice.reducer;
