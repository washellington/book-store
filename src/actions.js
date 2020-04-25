import { Provider } from "react-redux";

export const SET_BOOKS = "SET_BOOKS";
export const SET_BOOK = "SET_BOOK";
export const SET_LOADING = "SET_LOADING";
export const SET_SEARCH_RESULTS = "SET_SEARCH_RESULTS";
export const SET_SEARCH_TEXT = "SET_SEARCH_TEXT";
export const SET_SEARCH_INDEX = "SET_SEARCH_INDEX";
export const SET_SEARCH = "SET_SEARCH";
export const REMOVE_BOOK = "REMOVE_BOOK";
export const RESET_SEARCH_RESULTS = "RESET_SEARCH_RESULTS";

export const resetSearchResults = () => {
  return {
    type: RESET_SEARCH_RESULTS,
  };
};

export const removeBook = (book) => {
  return {
    type: REMOVE_BOOK,
    book,
  };
};

export const setSearch = (searchTerm, totalNumOfResults) => {
  return {
    type: SET_SEARCH,
    search: {
      searchTerm,
      totalNumOfResults,
    },
  };
};

export const setSearchText = (text) => {
  return {
    type: SET_SEARCH_TEXT,
    text,
  };
};

export const setLoading = (loading) => {
  return {
    type: SET_LOADING,
    loading,
  };
};

export const setBooks = (books) => {
  return {
    type: SET_BOOKS,
    books,
  };
};

export const setBook = (book) => {
  return {
    type: SET_BOOK,
    book,
  };
};

export const setSearchResults = (results) => {
  return {
    type: SET_SEARCH_RESULTS,
    results: results,
  };
};
