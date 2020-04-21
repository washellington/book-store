import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import NavBar from "./NavBar";

import { Typography, Chip, Button } from "@material-ui/core";
import { useSelector } from "react-redux";
import emptyList from "./images/empty_book_list.png";
import BookList from "./BookList";

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
    paddingTop: "120px",
  },
}));

export default function SearchPage() {
  const wishList = useSelector((state) => state.wishList);
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <NavBar isFocused={true} />
      <div className={wishList.length ? classes.wishList : classes.overlay}>
        <BookList />
      </div>
    </div>
  );
}
