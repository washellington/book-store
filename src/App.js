import React, { useEffect } from "react";
import logo from "./logo.svg";
import "./App.css";
import NavBar from "./NavBar";
import BookList from "./BookList";
import { makeStyles } from "@material-ui/core/styles";
import { Chip, Button, Backdrop, useMediaQuery } from "@material-ui/core";
import { useSelector, useDispatch } from "react-redux";
import emptyList from "./images/empty_book_list.png";
import { useHistory } from "react-router";
import { useCookies } from "react-cookie";
import { setSearchText, setBook } from "./actions";
import Loader from "./Loader";
const useStyles = makeStyles((theme) => ({
  app: {
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
    marginBottom: 15,
  },
  chipCounter: {
    marginLeft: 10,
  },
  mainContent: {
    marginTop: 112,
  },
  mainContentWeb: {
    marginTop: 128,
  },
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
  },
}));

function App() {
  const classes = useStyles();
  const history = useHistory();
  const [cookies, setCookies, removeCookies] = useCookies(["wishList"]);

  const { searchText, loading } = useSelector((state) => {
    return state;
  });
  const dispatch = useDispatch();

  const minWidth600 = useMediaQuery("(min-width:600px)");

  const wishList = cookies.wishList || [];

  useEffect(() => {
    dispatch(setSearchText(""));
    dispatch(setBook(undefined));
  }, []);

  console.log("wishlist", cookies.wishList);
  return (
    <div className={classes.app}>
      <NavBar />
      <div
        className={minWidth600 ? classes.mainContentWeb : classes.mainContent}
      >
        <h1 className={classes.header1}>
          Wish List
          <Chip
            className={classes.chipCounter}
            color="secondary"
            label={wishList.length}
          />
        </h1>
        <BookList books={wishList} />
        {loading && (
          <Backdrop className={classes.backdrop} open={loading}>
            <Loader />
          </Backdrop>
        )}
      </div>
    </div>
  );
}

export default App;
