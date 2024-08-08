import { useSelector, useDispatch } from "react-redux";
import { deleteBook, changeBookmark } from "../../redux/books/actionCreators";
import { BsBookmarkStarFill, BsBookmarkStar } from "react-icons/bs";
import { selectTitleFiter } from "../../redux/slices/filterSlice";
import "./BookList.css";

const BookList = () => {
  const books = useSelector((state) => state.books);
  const filterTitle = useSelector(selectTitleFiter);
  const filtertedBooks = books.filter((e) =>
    e.title.toLowerCase().includes(filterTitle)
  );
  const dispatch = useDispatch();
  const handleDeleteBook = (id) => {
    dispatch(deleteBook(id));
  };
  const handleChangeBookmark = (id) => {
    dispatch(changeBookmark(id));
  };

  return (
    <div className="app-block book-list">
      <h2>BookList</h2>
      {books.length === 0 ? (
        <p>No books</p>
      ) : (
        <ul>
          {filtertedBooks.map((book, i) => (
            <li key={book.id}>
              <div className="book-info">
                {++i}. {book.title} by <strong>{book.author}</strong>{" "}
              </div>
              <div className="book-actions">
                <span onClick={() => handleChangeBookmark(book.id)}>
                  {book.favorite ? (
                    <BsBookmarkStarFill className="star-icon" />
                  ) : (
                    <BsBookmarkStar className="star-icon" />
                  )}
                </span>
                <button onClick={() => handleDeleteBook(book.id)}>
                  delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default BookList;
