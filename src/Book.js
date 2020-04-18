import React from "react";
import { makeStyles } from "@material-ui/core/styles";

import { Chip, Button } from "@material-ui/core";
import { useSelector } from "react-redux";
import emptyList from "./images/empty_book_list.png";
import { useHistory } from "react-router";

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
  header1: {
    color: theme.palette.text.secondary,
    margin: 0,
    textAlign: "left",
    fontSize: 27,
    display: "flex",
    alignItems: "center",
  },
  chipCounter: {
    marginLeft: 10,
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
}));

export default function Book(props) {
  const { imageUrl } = props;
  const wishList = useSelector((state) => state.wishList);
  const classes = useStyles();
  const history = useHistory();
  return (
    <div>
      <img src={imageUrl} />
    </div>
  );
}
