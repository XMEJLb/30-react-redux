import * as a from "./actionTypes";

const initialState = [];
function booksReducer(state = initialState, action) {
  switch (action.type) {
    case a.ADD_BOOK:
      return [...state, action.payload];

    case a.DELETE_BOOK:
      return state.filter((e) => action.payload !== e.id);

    default:
      return state;
  }
}

export default booksReducer;
