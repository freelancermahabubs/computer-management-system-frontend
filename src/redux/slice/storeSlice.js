import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  storeId: localStorage.getItem('storeId'),
};

export const storeSlice = createSlice({
  name: "store",
  initialState,
  reducers: {
    updateStore: (state, action) => {
      state.storeId = action.payload;
    },
  },
});

export const { updateStore } = storeSlice.actions;

export default storeSlice.reducer;
