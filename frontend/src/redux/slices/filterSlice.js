import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  title: "",
  author: "",
};

const filterSlice = createSlice({
  name: "filter",
  initialState: initialState,
  reducers: {
    setTitleFilter: (state, action) => {
      state.title = action.payload;
    },
    setAuthorFilter: (state, action) => {
      state.author = action.payload;
    },
  },
});
export const { setTitleFilter, setAuthorFilter } = filterSlice.actions;
export const selectTitleFiter = (state) => state.filter.title;
export const selectAuthorFilter = (state) => state.filter.author;
export default filterSlice.reducer;
