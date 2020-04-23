import axios from "axios";

export const api = axios.create({
  baseURL: "https://www.googleapis.com",
  timeout: 5000,
  withCredentials: false,
  responseType: "json",
});

const BOOK_SEARCH = "books/v1/volumes";

export const searchBook = (searchText, startIndex) => {
  return api.get(BOOK_SEARCH, {
    params: {
      q: searchText,
      startIndex: startIndex,
      maxResults: 10,
      filter: "ebooks",
      key: process.env.REACT_APP_GOOGLE_BOOKS_API_KEY,
    },
  });
};
