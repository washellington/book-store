import {
  SET_BOOKS,
  SET_BOOK,
  SET_SEARCH_RESULTS,
  SET_LOADING,
  SET_SEARCH_TEXT,
  SET_SEARCH_INDEX,
  SET_SEARCH,
  REMOVE_BOOK,
  RESET_SEARCH_RESULTS,
} from "./actions";

const initialState = {
  wishList: [],
  searchResults: [],
  loading: false,
  selectedBook: undefined,
  searchText: "",
  totalSearchResults: 0,
};

export default function bookStore(state = initialState, action) {
  switch (action.type) {
    case REMOVE_BOOK:
      return {
        ...state,
        wishList: state.wishList.filter((x) => x.id !== action.book.id),
      };
    case SET_SEARCH:
      return {
        ...state,
        searchText: action.search.searchTerm,
        totalSearchResults: action.search.totalNumOfResults,
      };
    case RESET_SEARCH_RESULTS:
      return {
        ...state,
        searchResults: [],
      };
    case SET_SEARCH_TEXT:
      return {
        ...state,
        searchText: action.text,
      };
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
        searchResults: [...state.searchResults, ...action.results],
      };
    default:
      return initialState;
  }
}
