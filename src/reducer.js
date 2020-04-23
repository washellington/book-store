import {
  SET_BOOKS,
  SET_BOOK,
  SET_SEARCH_RESULTS,
  SET_LOADING,
  SET_SEARCH_TEXT,
  SET_SEARCH_INDEX,
  SET_SEARCH,
} from "./actions";

const initialState = {
  wishList: [],
  searchResults: [],
  loading: false,
  selectedBook: undefined,
  searchText: "",
  searchIndex: 0,
  totalSearchResults: 0,
};

export default function bookStore(state = initialState, action) {
  switch (action.type) {
    case SET_SEARCH:
      return {
        ...state,
        searchIndex: action.search.searchIndex,
        searchText: action.search.searchTerm,
        totalSearchResults: action.search.totalNumOfResults,
      };
    case SET_SEARCH_INDEX:
      return {
        ...state,
        searchIndex: action.index,
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
