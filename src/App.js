import React from "react";
import logo from "./logo.svg";
import "./App.css";
import NavBar from "./NavBar";
import BookList from "./BookList";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  app: {
    display: "flex",
    flexDirection: "column",
  },
}));

function App() {
  const classes = useStyles();

  return (
    <div className={classes.app}>
      <NavBar />
      <BookList />
    </div>
  );
}

export default App;
