import {
  setTitleFilter,
  selectTitleFiter,
  setAuthorFilter,
  selectAuthorFilter,
  setOnlyFavoriteFilter,
  selectOnlyFavoriteFilter,
} from "../../redux/slices/filterSlice";
import { useDispatch, useSelector } from "react-redux";

import "./Filter.css";

const Filter = () => {
  const dispatch = useDispatch();
  const titleFilter = useSelector(selectTitleFiter);
  const handleTitleFilterChange = (e) => {
    dispatch(setTitleFilter(e.target.value));
  };
  const clearTitleFilterChange = () => {
    dispatch(setTitleFilter(""));
    dispatch(setAuthorFilter(""));
    if (onlyFavoriteFilter === true) {
      dispatch(setOnlyFavoriteFilter());
    }
  };
  const authorFilter = useSelector(selectAuthorFilter);
  const handleAuthorFilterChange = (e) => {
    dispatch(setAuthorFilter(e.target.value));
  };

  const onlyFavoriteFilter = useSelector(selectOnlyFavoriteFilter);
  const handleOnlyFavoriteFilterChange = () => {
    dispatch(setOnlyFavoriteFilter());
  };
  return (
    <div className="app-block filter">
      <div className="filter-row">
        <div className="filter-group">
          <input
            type="text"
            value={titleFilter}
            placeholder="Filter by title"
            onChange={handleTitleFilterChange}
          />
        </div>
        <div className="filter-group">
          <input
            type="text"
            value={authorFilter}
            placeholder="Filter by author"
            onChange={handleAuthorFilterChange}
          />
        </div>
        <div className="filter-group">
          <label>
            <input
              type="checkbox"
              checked={onlyFavoriteFilter}
              onChange={handleOnlyFavoriteFilterChange}
            />
            Only Favorite
          </label>
        </div>
        <button onClick={() => clearTitleFilterChange()}>Clear</button>
      </div>
    </div>
  );
};

export default Filter;
