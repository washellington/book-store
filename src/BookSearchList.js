import React, { useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Book from "./Book";
import { Chip, Button, useMediaQuery } from "@material-ui/core";
import { useSelector, useDispatch } from "react-redux";

import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import BookCard from "./BookCard";
import { setSearch, setSearchResults } from "./actions";
import InfiniteScroll from "react-infinite-scroller";
import { searchBook, MAX_RESULTS } from "./service";
import Loader from "./Loader";
import { TransitionGroup, Transition } from "react-transition-group";
import gsap from "gsap";

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
  paperWeb: {
    height: "14vw",
    width: "9vw",
    overflow: "hidden",
  },
}));

export const NO_IMAGE_AVAILABLE = "No image available";

export default function BookSearchList() {
  const { searchResults, totalSearchResults, searchText } = useSelector(
    (state) => {
      return state;
    }
  );

  const classes = useStyles();
  const dispatch = useDispatch();

  const infiniteScrollRef = React.createRef();
  const [scrollPage, setScrollPage] = React.useState(0);

  const minWidth600 = useMediaQuery("(min-width:600px)");

  useEffect(() => {
    console.log("new search");
    if (infiniteScrollRef) infiniteScrollRef.current.pageLoaded = 0;
  }, [searchResults == 0]);

  const loadSearchResults = (page) => {
    searchText &&
      searchBook(searchText, page - 1)
        .then((res) => {
          console.log(searchText);
          dispatch(setSearch(searchText, res.data.totalItems));
          dispatch(
            setSearchResults(
              res.data.items.map((x) => {
                return {
                  id: x.id,
                  imageUrl: x.volumeInfo.imageLinks
                    ? x.volumeInfo.imageLinks.thumbnail
                    : NO_IMAGE_AVAILABLE,
                };
              })
            )
          );
        })
        .catch((err) => console.error(err));
  };

  const searchResultsHasMore = () => totalSearchResults > searchResults.length;

  const animateBookEnter = (node) => {
    const tween = gsap.timeline({ paused: true });
    tween.from(node, 0.5, { autoAlpha: 0, y: 50, delay: 0.5 });
    tween.play();
  };

  const animateBookExit = (node) => {
    console.log("bye");
  };

  return (
    <div className={classes.appContainer}>
      <InfiniteScroll
        ref={infiniteScrollRef}
        element={"div"}
        className={`MuiGrid-root MuiGrid-container MuiGrid-spacing-xs-${
          minWidth600 ? 10 : 4
        }`}
        pageStart={0}
        loadMore={loadSearchResults}
        //search results has more if the total number of results(page * number of results displayed) shown in less then the total number of itmes
        hasMore={searchResultsHasMore}
        loader={<Loader />}
      >
        <TransitionGroup component={null}>
          {searchResults.length > 0 &&
            searchResults.map((x, i) => {
              return (
                <Transition
                  in
                  appear
                  mountOnEnter
                  onEnter={(node) => animateBookEnter(node)}
                  onExit={(node) => animateBookExit(node)}
                  timeout={300}
                  key={`transition-${x.id}`}
                >
                  <Grid key={`book-${x.id}`} item xs={minWidth600 ? 2 : 4}>
                    <Paper
                      className={minWidth600 ? classes.paperWeb : classes.paper}
                      elevation={3}
                    >
                      <Book
                        book={{
                          ...x,
                        }}
                      />
                    </Paper>
                  </Grid>
                </Transition>
              );
            })}
        </TransitionGroup>
      </InfiniteScroll>
    </div>
  );
}
