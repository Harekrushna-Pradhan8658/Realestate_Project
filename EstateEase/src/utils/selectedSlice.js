import { createSlice } from "@reduxjs/toolkit";

const selectedSlice = createSlice({
  name: "selectedPost",
  initialState: null,
  reducers: {
    addSelectedPost : (state, action) => {
      return action.payload;
    },
    removeSelectedPost : (state, action) => {
      return null;
    },
  },
});
export const {addSelectedPost, removeSelectedPost} = selectedSlice.actions;
export default selectedSlice.reducer;