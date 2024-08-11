import { createSlice } from "@reduxjs/toolkit";

const initialState = [];

const booksSlice = createSlice({
  name: "books",
  initialState: initialState,
  reducers: {
    addBook: (state, action) => {
      state.push(action.payload);
    },
    deleteBook: (state, action) => {
      return state.filter((e) => action.payload !== e.id);
    },
    changeBookmark: (state, action) => {
      return state.forEach((e) =>
        action.payload === e.id ? (e.favorite = !e.favorite) : e
      );
    },
  },
});
export const { addBook, deleteBook, changeBookmark } = booksSlice.actions;
export const selectBooks = (state) => state.books;

export default booksSlice.reducer;
