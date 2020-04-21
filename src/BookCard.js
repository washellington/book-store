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
import { Fab, Paper, Typography, useTheme, Button } from "@material-ui/core";
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
    height: "44vw",
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
    "& img": {
      maxWidth: "100%",
    },
  },
  fab: {
    alignSelf: "flex-end",
    width: "14vw",
    height: "14vw",
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
  },
  fabContainer: {
    display: "flex",
    justifyContent: "flex-end",
  },
  expandLink: {
    float: "right",
  },
}));

export default function BookCard(props) {
  const { onAdd, book, open, onClose } = props;
  const wishList = useSelector((state) => state.wishList);
  const classes = useStyles();
  const history = useHistory();
  const theme = useTheme();
  const { data, loading, error } = usePalette(book.imageUrl);

  return (
    <Dialog
      classes={{ paper: classes.dialogContainer }}
      onClose={onClose}
      aria-labelledby="simple-dialog-title"
      open={open}
    >
      <DialogTitle
        style={{
          color: data.vibrant,
          backgroundColor: data.lightMuted,
          zIndex: 1000,
        }}
        id="simple-dialog-title"
      >
        <IconButton
          aria-label="close"
          className={classes.closeButton}
          onClick={onClose}
          style={{ color: theme.palette.text.primary }}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <div
        className={classes.colorSwatch}
        style={{
          color: data.vibrant,
          backgroundColor: data.lightMuted,
        }}
      ></div>
      <div className={`${classes.bookHeader} ${classes.headerSection}`}>
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
          <ClampLines
            text={book.title}
            id="title-clamp-id"
            ellipsis="..."
            moreText="Expand"
            lessText="Collapse"
            className="clampLinesSummary"
            innerElement="h2"
          />
          <ClampLines
            text={book.author}
            id="author-clamp-id"
            ellipsis="..."
            moreText="Expand"
            lessText="Collapse"
            className="clampLinesSummary"
            innerElement="h3"
          />
          <Fab color="secondary" className={classes.fab}>
            <AddIcon />
          </Fab>
        </div>
      </div>
      <div>
        <ClampLines
          className={classes.summary}
          text={book.summary}
          id="summary-clamp-id"
          lines={4}
          ellipsis="..."
          moreText="Expand"
          lessText="Collapse"
          className="clampLinesSummary"
          innerElement="p"
          buttons={false}
        />
        <Button
          onClick={() => {
            history.push("/book");
          }}
          color="secondary"
          className={classes.expandLink}
        >
          EXPAND
        </Button>
      </div>
    </Dialog>
  );
}
