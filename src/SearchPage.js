import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import NavBar from "./NavBar";
import { useSelector, useDispatch } from "react-redux";
import BookSearchList from "./BookSearchList";
import { setBook, setBooks, removeBook } from "./actions";
import BookCard from "./BookCard";

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
            dispatch(setBooks([selectedBook]));
          }}
          onRemove={() => {
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
