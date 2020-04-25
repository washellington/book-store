import React from "react";
import logo from "./logo.svg";
import "./App.css";
import NavBar from "./NavBar";
import BookList from "./BookList";
import { makeStyles } from "@material-ui/core/styles";
import { Chip, Button } from "@material-ui/core";
import { useSelector } from "react-redux";
import emptyList from "./images/empty_book_list.png";
import { useHistory } from "react-router";
import { useCookies } from "react-cookie";
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
    paddingTop: 112,
  },
}));

function App() {
  const classes = useStyles();
  const history = useHistory();
  const [cookies, setCookies, removeCookies] = useCookies(["wishList"]);

  const { wishList } = useSelector((state) => {
    return state;
  });

  return (
    <div className={classes.app}>
      <NavBar />
      <div className={classes.mainContent}>
        <h1 className={classes.header1}>
          Wish List
          <Chip
            className={classes.chipCounter}
            color="secondary"
            label={cookies.wishList.length}
          />
        </h1>
        <BookList books={cookies.wishList || []} />
      </div>
    </div>
  );
}

export default App;
