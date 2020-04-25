import React from "react";
import { makeStyles } from "@material-ui/core/styles";

import { Chip, Button } from "@material-ui/core";
import { useSelector, useDispatch } from "react-redux";
import emptyList from "./images/empty_book_list.png";
import { useHistory } from "react-router";
import { setBook } from "./actions";
import { NO_IMAGE_AVAILABLE } from "./BookSearchList";
import { searchVolume } from "./service";

const useStyles = makeStyles((theme) => ({
  image: {
    maxWidth: "100%",
  },
}));

export default function Book(props) {
  const { book } = props;
  const classes = useStyles();
  const dispatch = useDispatch();
  return (
    <div
      onClick={() => {
        searchVolume(book.id)
          .then((res) => {
            book.summary = res.data.volumeInfo.description;
            book.title = res.data.volumeInfo.title;
            book.author = res.data.volumeInfo.authors.join(",");
            dispatch(setBook(book));
          })
          .catch((err) => {
            console.error(err);
          });
      }}
    >
      {book.imageUrl === NO_IMAGE_AVAILABLE ? (
        <div>{NO_IMAGE_AVAILABLE}</div>
      ) : (
        <img className={classes.image} src={book.imageUrl} />
      )}
    </div>
  );
}
