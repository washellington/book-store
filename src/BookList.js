import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Book from "./Book";
import { Chip, Button } from "@material-ui/core";
import { useSelector, useDispatch } from "react-redux";
import emptyList from "./images/empty_book_list.png";
import { useHistory } from "react-router";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import BookCard from "./BookCard";
import { useCookies } from "react-cookie";
import { setBook, resetSearchResults } from "./actions";

const useStyles = makeStyles((theme) => ({
  emptyList: {
    opacity: ".1",
  },
  appContainer: {
    padding: "0 10px",
    flex: 1,
    display: "flex",
    flexDirection: "column",
  },
  content: {
    flex: 1,
    display: "grid",
    gridTemplateRows: "repeat(3,1fr)",
  },
  emptyContent: {
    display: "flex",
    flexDirection: "column",
    gridRow: "2/3",
    alignItems: "center",
  },
  paper: {
    height: "35vw",
    width: "25vw",
    overflow: "hidden",
  },
}));

export default function BookList(props) {
  const { selectedBook } = useSelector((state) => {
    return state;
  });

  const { books } = props;
  const classes = useStyles();
  const history = useHistory();
  const dispatch = useDispatch();
  const [cookies, setCookies, removeCookies] = useCookies();

  return (
    <div className={classes.appContainer}>
      {books.length === 0 && (
        <div className={classes.content}>
          <div className={classes.emptyContent}>
            <img
              style={{ opacity: ".1" }}
              src={emptyList}
              alt="Empty wish list"
            />
            <Button
              onClick={() => {
                dispatch(resetSearchResults());
                history.push("/search");
              }}
              color="secondary"
            >
              Add book
            </Button>
          </div>
        </div>
      )}
      <Grid container spacing={2}>
        {books.length > 0 &&
          books.map((x, i) => {
            return (
              <Grid key={`book-${i}`} item xs={4}>
                <Paper className={classes.paper} elevation={3}>
                  <Book
                    book={{
                      id: x.id,
                      imageUrl: x.imageUrl,
                    }}
                  />
                </Paper>
              </Grid>
            );
          })}
      </Grid>
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
          }}
          onRemove={() => {
            let cookieValues = cookies.wishList || [];

            setCookies(
              "wishList",
              cookieValues.filter((x) => x.id !== selectedBook.id)
            );
          }}
          book={selectedBook}
          open={selectedBook !== undefined}
          onClose={() => dispatch(setBook(undefined))}
        />
      )}
    </div>
  );
}
