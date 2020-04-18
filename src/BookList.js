import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Book from "./Book";
import { Chip, Button } from "@material-ui/core";
import { useSelector } from "react-redux";
import emptyList from "./images/empty_book_list.png";
import { useHistory } from "react-router";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";

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
    marginBottom: 15,
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
  paper: {
    height: "35vw",
    width: "25vw",
    overflow: "hidden",
  },
}));

export default function BookList() {
  const wishList = useSelector((state) => {
    return state.wishList;
  });
  const classes = useStyles();
  const history = useHistory();

  return (
    <div className={classes.appContainer}>
      <h1 className={classes.header1}>
        Wish List
        <Chip
          className={classes.chipCounter}
          color="secondary"
          label={wishList.length}
        />
      </h1>
      {wishList.length === 0 && (
        <div className={classes.content}>
          <div className={classes.emptyContent}>
            <img
              style={{ opacity: ".1" }}
              src={emptyList}
              alt="Empty wish list"
            />
            <Button onClick={() => history.push("/search")} color="secondary">
              Add book
            </Button>
          </div>
        </div>
      )}
      <Grid container className={classes.root} spacing={2}>
        {wishList.length > 0 &&
          wishList.map((x, i) => {
            return (
              <Grid key={`book-${i}`} item xs={4}>
                <Paper className={classes.paper} elevation={3}>
                  <Book imageUrl={x.imageUrl} />
                </Paper>
              </Grid>
            );
          })}
      </Grid>
    </div>
  );
}
