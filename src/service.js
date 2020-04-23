import axios from "axios";

export const api = axios.create({
  baseURL: "https://www.googleapis.com",
  timeout: 5000,
  withCredentials: false,
  responseType: "json",
});

export const MAX_RESULTS = 12;

const BOOK_SEARCH = "books/v1/volumes";

export const searchBook = (searchText, startIndex) => {
  return api.get(BOOK_SEARCH, {
    params: {
      q: searchText,
      startIndex: startIndex,
      maxResults: MAX_RESULTS,
      filter: "ebooks",
      key: process.env.REACT_APP_GOOGLE_BOOKS_API_KEY,
    },
  });
};
