import { useState } from "react";
import { useDispatch } from "react-redux";
import { v4 as uuidv4 } from "uuid";
import { addBook } from "../../redux/books/actionCreators";
import booksData from "../../data/book.json";
import "./BookForm.css";

const BookForm = () => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const dispatch = useDispatch();

  const handleAddRandomeBook = () => {
    const data = booksData[Math.floor(Math.random() * booksData.length)];
    const book = {
      title: data.title,
      author: data.author,
      id: uuidv4(),
    };
    dispatch(addBook(book));
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (title && author) {
      const book = {
        title,
        author,
        id: uuidv4(),
      };
      dispatch(addBook(book));
      setTitle("");
      setAuthor("");
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
        <button onClick={() => handleAddRandomeBook()}>Add Random</button>
      </form>
    </div>
  );
};

export default BookForm;
