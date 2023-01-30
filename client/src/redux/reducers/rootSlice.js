import { createSlice } from "@reduxjs/toolkit";

export const rootReducer = createSlice({
  name: "root",
  initialState: {
    loading: true,
  },
  reducers: {
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
  },
});

export const { setLoading } = rootReducer.actions;
export default rootReducer.reducer;
