import { Provider } from "react-redux";

export const SET_BOOKS = "SET_BOOKS";

export const setBooks = (books) => {
  return {
    type: SET_BOOKS,
    books,
  };
};
