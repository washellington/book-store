import React, { useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import DialogTitle from "@material-ui/core/DialogTitle";
import Dialog from "@material-ui/core/Dialog";
import { useSelector } from "react-redux";
import { useHistory } from "react-router";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import { usePalette } from "react-palette";
import {
  Fab,
  Paper,
  useTheme,
  Button,
  useMediaQuery,
  Drawer,
  Slide,
} from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import RemoveIcon from "@material-ui/icons/Remove";
import ClampLines from "react-clamp-lines";
import { useCookies } from "react-cookie";
import { searchVolume } from "./service";

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
  colorSwatchWeb: {
    top: 0,
    right: 0,
    height: "20vw",
    width: "100%",
    zIndex: 1,
    display: "flex",
    alignItems: "flex-end",
    justifyContent: "space-evenly",
  },
  bookHeader: {
    display: "flex",
    zIndex: 1000,
  },
  imagePaperWeb: {
    width: "9vw",
    height: "14vw",
    overflow: "hidden",
    "& img": {
      maxWidth: "100%",
    },
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
  fabWeb: {
    alignSelf: "flex-end",
    marginBottom: -20,
    flex: "none",
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
  drawerContainer: {
    width: "40vw",
  },
  bookSummaryWeb: {
    padding: "0 10px",
  },
}));

export default function BookCard(props) {
  const {
    onAdd,
    book = { title: "", imageUrl: "", author: "", summary: "" },
    open,
    onClose,
    onRemove,
  } = props;
  const [cookies, setCookies, removeCookies] = useCookies(["wishList"]);

  const wishList = cookies.wishList || [];
  const classes = useStyles();
  const history = useHistory();
  const theme = useTheme();
  const { data, loading, error } = usePalette(book.imageUrl);
  const minWidth600 = useMediaQuery("(min-width:600px)");

  console.log("book = ", book, "wishlist= ", wishList);
  if (error) console.warn("Error loading image", error);
  return (
    <>
      {minWidth600 && (
        <Drawer anchor="right" open={open} onClose={onClose}>
          <div className={classes.drawerContainer}>
            <div
              className={
                minWidth600 ? classes.colorSwatchWeb : classes.colorSwatch
              }
              style={{
                color: theme.palette.text.primary,
                backgroundColor: data.lightMuted,
              }}
            >
              <Paper
                elevation={6}
                style={{
                  backgroundColor: data.lightMuted,
                }}
                className={
                  minWidth600 ? classes.imagePaperWeb : classes.imagePaper
                }
              >
                <img
                  style={{
                    width: "100%",
                  }}
                  src={book.imageUrl}
                />
              </Paper>
              <div>
                <h2>{book.title}</h2>
                <h3>{book.author}</h3>
              </div>
              <Fab
                onClick={() => {
                  wishList.find((x) => x.id === book.id) === undefined
                    ? onAdd()
                    : onRemove();
                }}
                color="secondary"
                className={minWidth600 ? classes.fabWeb : classes.fab}
              >
                {wishList.find((x) => x.id === book.id) === undefined ? (
                  <AddIcon />
                ) : (
                  <RemoveIcon />
                )}
              </Fab>
            </div>
            <p className={classes.bookSummaryWeb}>{book.summary}</p>
          </div>
        </Drawer>
      )}
      {!minWidth600 && (
        <Dialog
          classes={{ paper: classes.dialogContainer }}
          onClose={onClose}
          aria-labelledby="simple-dialog-title"
          open={open}
          TransitionComponent={Slide}
          TransitionProps={{
            direction: "up",
          }}
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
              <img
                style={{
                  width: "100%",
                }}
                src={book.imageUrl}
              />
            </Paper>
            <div
              className={`${classes.bookTitleAuthor} ${classes.headerSection}`}
            >
              <ClampLines
                text={`${book.title}`}
                id="title-clamp-id"
                ellipsis="..."
                moreText="Expand"
                lessText="Collapse"
                className="clampLinesSummary"
                innerElement="h2"
              />
              <ClampLines
                text={`${book.author}`}
                id="author-clamp-id"
                ellipsis="..."
                moreText="Expand"
                lessText="Collapse"
                className="clampLinesSummary"
                innerElement="h3"
              />
              <Fab
                onClick={() => {
                  wishList.find((x) => x.id === book.id) === undefined
                    ? onAdd()
                    : onRemove();
                }}
                color="secondary"
                className={classes.fab}
              >
                {wishList.find((x) => x.id === book.id) === undefined ? (
                  <AddIcon />
                ) : (
                  <RemoveIcon />
                )}
              </Fab>
            </div>
          </div>
          <div>
            <ClampLines
              className={classes.summary}
              text={`${book.summary}`}
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
      )}
    </>
  );
}
