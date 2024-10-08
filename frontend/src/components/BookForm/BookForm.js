import { useState } from "react";
import { useDispatch } from "react-redux";
import { addBook, fetchBook } from "../../redux/slices/booksSlice";
import { setError } from "../../redux/slices/errorSlice";
import { FaSpinner } from "react-icons/fa";
import createBookWithId from "../../utils/createBookWithId";
import booksData from "../../data/book.json";
import "./BookForm.css";

const BookForm = () => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [isloading, setIsLoading] = useState(false);
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
    } else {
      dispatch(setError("You must fill title and author"));
    }
  };

  const handleAddRandomViaApi = async () => {
    try {
      setIsLoading(true);
      await dispatch(fetchBook("http://localhost:4000/random-book-delayed"));
    } finally {
      setIsLoading(false);
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
      </form>
      <button type="button" onClick={handleAddRandomeBook}>
        Add Random
      </button>
      <button
        type="button"
        onClick={handleAddRandomViaApi}
        disabled={isloading}
      >
        {isloading ? (
          <>
            <span>Loading book...</span>
            <FaSpinner className="spinner" />
          </>
        ) : (
          "Add Random via API"
        )}
      </button>
    </div>
  );
};

export default BookForm;
