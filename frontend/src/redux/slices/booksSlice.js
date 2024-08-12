import { createSlice } from "@reduxjs/toolkit";
import createBookWithId from "../../utils/createBookWithId";
import axios from "axios";
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

export const thunkFunction = async (dispatch, getState) => {
  try {
    const res = await axios.get("http://localhost:4000/random-book");
    if (res?.data?.title && res?.data?.author) {
      dispatch(addBook(createBookWithId(res.data, "API")));
    }
  } catch (error) {
    console.log("error fetching");
  }
};

export const { addBook, deleteBook, changeBookmark } = booksSlice.actions;
export const selectBooks = (state) => state.books;

export default booksSlice.reducer;
