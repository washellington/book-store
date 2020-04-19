import { Provider } from "react-redux";

export const SET_BOOKS = "SET_BOOKS";
export const SET_BOOK = "SET_BOOK";
export const SET_LOADING = "SET_LOADING";
export const SET_SEARCH_RESULTS = "SET_SEARCH_RESULTS";

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
