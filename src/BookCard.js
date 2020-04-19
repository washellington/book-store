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

const useStyles = makeStyles((theme) => ({
  dialogTitle: {},
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
}));

export default function BookCard(props) {
  const { onAdd, book, open, onClose } = props;
  const wishList = useSelector((state) => state.wishList);
  const classes = useStyles();
  const history = useHistory();
  const { data, loading, error } = usePalette(book.imageUrl);

  console.log(book.imageUrl);
  return (
    <Dialog onClose={onClose} aria-labelledby="simple-dialog-title" open={open}>
      <DialogTitle
        style={{
          color: data.lightMuted,
          backgroundColor: data.darkMuted,
          zIndex: 1000,
        }}
        id="simple-dialog-title"
      >
        <IconButton
          aria-label="close"
          className={classes.closeButton}
          onClick={onClose}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <div
        className={classes.colorSwatch}
        style={{
          color: data.vibrant,
          backgroundColor: data.darkMuted,
        }}
      ></div>
      <div className={classes.bookHeader}>
        <img src={book.imageUrl} />
        <div>
          <h2>{book.title}</h2>
          <h3>{book.author}</h3>
        </div>
      </div>
      <p>{book.summary}</p>
    </Dialog>
  );
}
