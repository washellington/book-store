import React, { useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import NavBar from "./NavBar";
import { useSelector, useDispatch } from "react-redux";
import BookSearchList from "./BookSearchList";
import { setBook, setBooks, removeBook } from "./actions";
import BookCard from "./BookCard";
import { useCookies } from "react-cookie";
import Palette from "react-palette";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexDirection: "column",
  },
  overlay: {
    flex: 1,
    backgroundColor: theme.palette.action.disabled,
  },
  wishList: {
    paddingTop: "112px",
  },
}));

export default function SearchPage() {
  const { searchResults, selectedBook } = useSelector((state) => state);
  const classes = useStyles();
  const dispatch = useDispatch();
  const [cookies, setCookies, removeCookies] = useCookies(["wishList"]);

  useEffect(() => {
    dispatch(setBook(undefined));
  }, []);

  return (
    <div className={classes.root}>
      <NavBar isFocused={true} />
      <div
        className={searchResults.length ? classes.wishList : classes.overlay}
      >
        <BookSearchList />
      </div>
      {selectedBook && (
        <BookCard
          onAdd={() => {
            let cookieValues = cookies.wishList || [];

            setCookies("wishList", [
              ...cookieValues,
              {
                imageUrl: selectedBook.imageUrl,
                id: selectedBook.id,
              },
            ]);

            dispatch(setBooks([selectedBook]));
          }}
          onRemove={() => {
            let cookieValues = cookies.wishList || [];

            setCookies(
              "wishList",
              cookieValues.filter((x) => x.id !== selectedBook.id)
            );
            dispatch(removeBook(selectedBook));
          }}
          book={selectedBook}
          open={selectedBook !== undefined}
          onClose={() => dispatch(setBook(undefined))}
        />
      )}
    </div>
  );
}
