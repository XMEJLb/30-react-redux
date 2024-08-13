import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import createBookWithId from "../../utils/createBookWithId";
import axios from "axios";

const initialState = [];

export const fetchBook = createAsyncThunk("books/fetchBook", async () => {
  const res = await axios.get("http://localhost:5000/random-book");
  return res.data;
});

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
  extraReducers: (builder) => {
    builder.addCase(fetchBook.fulfilled, (state, action) => {
      if (action.payload.title && action.payload.author) {
        state.push(createBookWithId(action.payload, "API"));
      }
    });
  },
});

export const { addBook, deleteBook, changeBookmark } = booksSlice.actions;
export const selectBooks = (state) => state.books;

export default booksSlice.reducer;
