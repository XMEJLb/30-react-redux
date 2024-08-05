import * as a from "./actionTypes";

const initialState = [];
function booksReducer(state = initialState, action) {
  switch (action.type) {
    case a.ADD_BOOK:
      return [...state, action.payload];

    case a.DELETE_BOOK:
      return state.filter((e) => action.payload !== e.id);

    case a.CHANGE_BOOKMARK:
      return state.map((e) =>
        action.payload === e.id ? { ...e, favorite: !e.favorite } : e
      );

    default:
      return state;
  }
}

export default booksReducer;
