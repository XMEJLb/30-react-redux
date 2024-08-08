import {
  setTitleFilter,
  selectTitleFiter,
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
  };

  return (
    <div className="app-block filter">
      <div className="filter-group">
        <input
          type="text"
          value={titleFilter}
          placeholder="Filter by title"
          onChange={handleTitleFilterChange}
        />
        <button onClick={() => clearTitleFilterChange()}>Clear</button>
      </div>
    </div>
  );
};

export default Filter;
