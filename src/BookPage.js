import React, { useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Palette from "react-palette";
import DialogTitle from "@material-ui/core/DialogTitle";
import Dialog from "@material-ui/core/Dialog";
import { useSelector } from "react-redux";
import { useHistory } from "react-router";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import { usePalette } from "react-palette";
import { Fab, Paper, Typography, useTheme } from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import ClampLines from "react-clamp-lines";
import NavBar from "./NavBar";
import BookInfo from "./BookInfo";

const useStyles = makeStyles((theme) => ({}));

export default function BookPage() {
  const classes = useStyles();
  const book = useSelector((state) => state.selectedBook);

  useEffect(() => {
    window.scrollTo(0, 0);
  });
  return (
    <div>
      <NavBar />
      {book && <BookInfo />}
    </div>
  );
}
