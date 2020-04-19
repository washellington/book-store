import {
  SET_BOOKS,
  SET_BOOK,
  SET_SEARCH_RESULTS,
  SET_LOADING,
} from "./actions";

const initialState = {
  wishList: [],
  searchResults: [],
  loading: false,
  selectedBook: undefined,
};

export default function bookStore(state = initialState, action) {
  switch (action.type) {
    case SET_BOOK:
      return {
        ...state,
        selectedBook: action.book,
      };
    case SET_LOADING:
      return {
        ...state,
        loading: action.loading,
      };
    case SET_BOOKS:
      return {
        ...state,
        wishList: [...state.wishList, ...action.books],
      };
    case SET_SEARCH_RESULTS:
      return {
        ...state,
        searchResults: [...state.searchResults, action.results],
      };
    default:
      return initialState;
  }
}
