import { createSlice } from "@reduxjs/toolkit";

const matchingPostSlice = createSlice({
  name: "matchingPost",
  initialState: null,
  reducers: {
    addMatchingPost: (state, action) => {
      return action.payload;
    },
    removeMatchingPost: (state, action) => {
      return null;
    },
  },
});

export const { addMatchingPost, removeMatchingPost } = matchingPostSlice.actions;
export default matchingPostSlice.reducer;
