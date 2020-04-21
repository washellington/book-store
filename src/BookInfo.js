import React from "react";
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

const useStyles = makeStyles((theme) => ({
  summary: {
    padding: "0px 10px",
  },
  closeButton: {
    position: "absolute",
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500],
  },
  colorSwatch: {
    position: "absolute",
    top: 0,
    right: 0,
    height: "31vw",
    width: "100%",
    zIndex: 1,
  },
  bookHeader: {
    display: "flex",
    zIndex: 1000,
  },
  imagePaper: {
    width: "28vw",
    height: "38vw",
    overflow: "hidden",
    zIndex: 1,
    paddingLeft: 10,
    paddingTop: 10,
    "& img": {
      maxWidth: "100%",
    },
  },
  fab: {
    position: "fixed",
    bottom: "1em",
    left: "80vw",
  },
  bookTitleAuthor: {
    margin: "0px 10px",
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-end",
    "& h2, & h3": {
      margin: 0,
    },
    "& h2": { fontSize: "1.1em" },
    "& h3": { fontWeight: "normal" },
  },
  dialogContainer: {
    margin: 0,
    width: "89vw",
    padding: "0px 10px",
  },
  headerSection: {
    flex: 1,
    zIndex: 1000,
  },
  fabContainer: {
    display: "flex",
    justifyContent: "flex-end",
  },
  expandLink: {
    float: "right",
  },
  bookSummary: {
    paddingBottom: "4em",
    paddingLeft: 10,
    paddingRight: 10,
  },
  bookInfo: {
    paddingTop: "120px",
  },
}));

export default function BookInfo() {
  const book = useSelector((state) => state.selectedBook);
  const classes = useStyles();
  const history = useHistory();
  const theme = useTheme();
  const { data, loading, error } = usePalette(book.imageUrl);

  return (
    <div className={classes.bookInfo}>
      <div
        style={{
          backgroundColor: data.lightMuted,
        }}
        className={`${classes.bookHeader} ${classes.headerSection}`}
      >
        <Paper
          elevation={6}
          style={{
            backgroundColor: data.lightMuted,
          }}
          className={classes.imagePaper}
        >
          <img src={book.imageUrl} />
        </Paper>
        <div className={`${classes.bookTitleAuthor} ${classes.headerSection}`}>
          <h2>{book.title}</h2>
          <h3>{book.author}</h3>
        </div>
      </div>
      <p className={classes.bookSummary}>{book.summary}</p>
      <Fab color="secondary" className={classes.fab}>
        <AddIcon />
      </Fab>
    </div>
  );
}
