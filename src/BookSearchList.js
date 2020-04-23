import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Book from "./Book";
import { Chip, Button } from "@material-ui/core";
import { useSelector, useDispatch } from "react-redux";

import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import BookCard from "./BookCard";
import {
  setBook,
  setSearchIndex,
  setLoading,
  setSearch,
  setSearchResults,
} from "./actions";
import InfiniteScroll from "react-infinite-scroller";
import { searchBook, MAX_RESULTS } from "./service";

const useStyles = makeStyles((theme) => ({
  emptyList: {
    opacity: ".1",
  },
  appContainer: {
    padding: "8px 10px",
    flex: 1,
    display: "flex",
    flexDirection: "column",
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

export const NO_IMAGE_AVAILABLE = "No image available";

export default function BookSearchList() {
  const {
    searchResults,
    searchIndex,
    totalSearchResults,
    searchText,
  } = useSelector((state) => {
    return state;
  });

  const classes = useStyles();
  const dispatch = useDispatch();

  const loadSearchResults = (page) => {
    searchBook(searchText, page)
      .then((res) => {
        dispatch(setSearch(page, searchText, res.data.totalItems));
        dispatch(
          setSearchResults(
            res.data.items.map((x) => {
              return {
                id: x.id,
                imageUrl: x.volumeInfo.imageLinks
                  ? x.volumeInfo.imageLinks.thumbnail
                  : NO_IMAGE_AVAILABLE,
                title: x.volumeInfo.title,
                author: x.volumeInfo.authors && x.volumeInfo.authors.join(","),
                summary: x.volumeInfo.description,
              };
            })
          )
        );
      })
      .catch((err) => console.error(err));
  };

  const searchResultsHasMore = () =>
    totalSearchResults > searchIndex * MAX_RESULTS;

  return (
    <div className={classes.appContainer}>
      <InfiniteScroll
        element={"div"}
        className={"MuiGrid-root MuiGrid-container MuiGrid-spacing-xs-4"}
        pageStart={0}
        loadMore={loadSearchResults}
        //search results has more if the total number of results(page * number of results displayed) shown in less then the total number of itmes
        hasMore={searchResultsHasMore}
        loader={
          <div className="loader" key={0}>
            Loading ...
          </div>
        }
      >
        {searchResults.length > 0 &&
          searchResults.map((x, i) => {
            return (
              <Grid key={`book-${i}`} item xs={4}>
                <Paper className={classes.paper} elevation={3}>
                  <Book
                    book={{
                      ...x,
                    }}
                  />
                </Paper>
              </Grid>
            );
          })}
      </InfiniteScroll>
    </div>
  );
}
