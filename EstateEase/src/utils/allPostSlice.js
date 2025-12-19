import { createSlice } from "@reduxjs/toolkit";

const allPostSlice = createSlice({
  name: "allPost",
  initialState: [],
  reducers: {
    addAllPost: (state, action) => {
      return action.payload;
    },
    removeAllPost: (state, action) => {
      return [];
    },
  },
});

export const {addAllPost, removeAllPost} = allPostSlice.actions;
export default allPostSlice.reducer;