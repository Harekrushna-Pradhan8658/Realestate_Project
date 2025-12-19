import { createSlice } from "@reduxjs/toolkit";

const postSlice = createSlice({
  name: "post",
  initialState: null,
  reducers: {
    addPost : (state, action) => {
      return action.payload;
    },
    removePost : (state, action) => {
      return null;
    },
  },
});

export const {addPost, removePost} = postSlice.actions;

export default postSlice.reducer;