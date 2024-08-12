import { useState } from "react";
import { useDispatch } from "react-redux";
import axios from "axios";
import { addBook } from "../../redux/slices/booksSlice";
import createBookWithId from "../../utils/createBookWithId";
import booksData from "../../data/book.json";
import "./BookForm.css";

const BookForm = () => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const dispatch = useDispatch();

  const handleAddRandomeBook = () => {
    const data = booksData[Math.floor(Math.random() * booksData.length)];
    dispatch(addBook(createBookWithId(data, "random")));
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (title && author) {
      dispatch(addBook(createBookWithId({ title, author }, "manual")));
      setTitle("");
      setAuthor("");
    }
  };

  const handleAddRandomViaApi = async () => {
    try {
      const res = await axios.get("http://localhost:4000/random-book");
      if (res?.data?.title && res?.data?.author) {
        dispatch(addBook(createBookWithId(res.data, "API")));
      }
    } catch (error) {
      console.log("error fetching");
    }
  };

  return (
    <div className="app-block book-form">
      <h2>Add a new book</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="title">Title:</label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <label htmlFor="author">Author:</label>
          <input
            type="text"
            id="author"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
          />
        </div>
        <button type="submit">Add book</button>
        <button onClick={handleAddRandomeBook}>Add Random</button>
        <button onClick={handleAddRandomViaApi}>Add Random via API</button>
      </form>
    </div>
  );
};

export default BookForm;
