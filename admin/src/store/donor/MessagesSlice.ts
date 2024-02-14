import { createSlice } from "@reduxjs/toolkit";

import type { RootState } from "../store";
import { sendMessages } from "../../services/donorsService";

interface MessagesState {
  loading: boolean;
  error: string | null;
}

const initialState: MessagesState = {
  loading: false,
  error: null,
};

export const MessagesSlice = createSlice({
  name: "messages",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(sendMessages.pending, (state) => {
        state.loading = true;
        state.error = null; // Clear previous errors
      })
      .addCase(sendMessages.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(sendMessages.rejected, (state, action) => {
        state.loading = false;
        state.error = typeof action.payload === 'string' ? action.payload : null;
      });
  },
});

//export const {} = DonorsSlice.actions;
export const messagesSelector = (state: RootState) => state.messages;
export default MessagesSlice.reducer;