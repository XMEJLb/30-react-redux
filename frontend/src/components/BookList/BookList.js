import { useSelector, useDispatch } from "react-redux";
import {
  deleteBook,
  changeBookmark,
  selectBooks,
} from "../../redux/slices/booksSlice";
import { BsBookmarkStarFill, BsBookmarkStar } from "react-icons/bs";
import {
  selectTitleFiter,
  selectAuthorFilter,
  selectOnlyFavoriteFilter,
} from "../../redux/slices/filterSlice";
import "./BookList.css";

const BookList = () => {
  const books = useSelector(selectBooks);
  const filterTitle = useSelector(selectTitleFiter);
  const authorFilter = useSelector(selectAuthorFilter);
  const onlyFavoriteFilter = useSelector(selectOnlyFavoriteFilter);
  let filtertedBooks = books.filter((book) => {
    const matchesTitle = book.title
      .toLowerCase()
      .includes(filterTitle.toLowerCase());
    const matchesAuthor = book.author
      .toLowerCase()
      .includes(authorFilter.toLowerCase());
    const matchesFavorite = onlyFavoriteFilter ? book.favorite === true : true;
    return matchesTitle && matchesAuthor && matchesFavorite;
  });

  const dispatch = useDispatch();
  const handleDeleteBook = (id) => {
    dispatch(deleteBook(id));
  };
  const handleChangeBookmark = (id) => {
    dispatch(changeBookmark(id));
  };

  const highliteMatch = (text, filter) => {
    if (!filter) return text;
    const regex = new RegExp(`(${filter})`, "gi");
    return text.split(regex).map((substirng, i) => {
      if (substirng.toLowerCase() === filter.toLowerCase()) {
        return (
          <span key={i} className="highlight">
            {substirng}
          </span>
        );
      }
      return substirng;
    });
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
                {++i}. {highliteMatch(book.title, filterTitle)} by{" "}
                <strong>{highliteMatch(book.author, authorFilter)}</strong>
                {` (${book.source})`}
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
