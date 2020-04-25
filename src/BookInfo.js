import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { useSelector } from "react-redux";
import { useHistory } from "react-router";
import { usePalette } from "react-palette";
import { Fab, Paper, useTheme } from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import RemoveIcon from "@material-ui/icons/Remove";
import { useCookies } from "react-cookie";

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
    paddingTop: "112px",
  },
}));

export default function BookInfo(props) {
  const { onAdd, onRemove } = props;
  const [cookies, setCookies, removeCookies] = useCookies(["wishList"]);
  const wishList = cookies.wishList || [];
  const { selectedBook } = useSelector((state) => state);
  const classes = useStyles();
  const history = useHistory();
  const theme = useTheme();
  const { data, loading, error } = usePalette(selectedBook.imageUrl);

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
          <img src={selectedBook.imageUrl} />
        </Paper>
        <div className={`${classes.bookTitleAuthor} ${classes.headerSection}`}>
          <h2>{selectedBook.title}</h2>
          <h3>{selectedBook.author}</h3>
        </div>
      </div>
      <p className={classes.bookSummary}>{selectedBook.summary}</p>
      <Fab
        onClick={() => {
          wishList.find((x) => x.id === selectedBook.id) === undefined
            ? onAdd()
            : onRemove();
        }}
        color="secondary"
        className={classes.fab}
      >
        {wishList.find((x) => x.id === selectedBook.id) === undefined ? (
          <AddIcon />
        ) : (
          <RemoveIcon />
        )}
      </Fab>
    </div>
  );
}
