import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import {
  TextField,
  useTheme,
  List,
  Box,
  Drawer,
  ListItem,
  ListItemText,
  Typography,
} from "@material-ui/core";
import InputAdornment from "@material-ui/core/InputAdornment";
import SearchIcon from "@material-ui/icons/Search";
import logo from "./images/logo.png";
import CreatableSelect from "react-select/creatable";
import { useCookies } from "react-cookie";
import { searchBook } from "./service";
import {
  setBooks,
  setLoading,
  setSearchText,
  setBook,
  setSearch,
  setSearchResults,
  resetSearchResults,
} from "./actions";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";

const useStyles = makeStyles((theme) => ({
  root: {},
  menuButton: {
    marginRight: theme.spacing(2),
    flex: 1,
    display: "flex",
    justifyContent: "flex-start",
    paddingRight: 0,
  },
  title: {
    flexGrow: 1,
  },
  searchField: {
    backgroundColor: theme.palette.common.white,
    width: "19em",
    borderRadius: 4,
  },
  searchFieldContainer: {
    display: "flex",
    justifyContent: "center",
  },
  logoContainer: {
    flex: 2,
    display: "flex",
    justifyContent: "center",
  },
  emptyElement: {
    flex: 1,
  },
  drawerContainer: {
    width: "40vw",
  },
}));

export default function NavBar(props) {
  const classes = useStyles();
  const { isFocused = false } = props;
  const dispatch = useDispatch();
  const history = useHistory();
  const theme = useTheme();
  const [cookies, setCookies, removeCookies] = useCookies(["recentSearches"]);
  const { searchText } = useSelector((state) => state);
  const recentSearchesOptions = (cookies.recentSearches || []).map((x) => ({
    label: x,
    value: x,
  }));
  const [open, setOpen] = React.useState(false);
  return (
    <>
      <AppBar position="fixed">
        <Toolbar>
          <IconButton
            edge="start"
            className={classes.menuButton}
            style={{ color: theme.palette.common.white }}
            aria-label="menu"
            onClick={() => setOpen(true)}
          >
            <MenuIcon />
          </IconButton>
          <div className={classes.logoContainer}>
            <img style={{ width: "3em" }} src={logo} alt="logo" />
          </div>
          <div className={classes.emptyElement} />
        </Toolbar>
        <Toolbar className={classes.searchFieldContainer}>
          <Box boxShadow={3}>
            <CreatableSelect
              className={classes.searchField}
              autoFocus={isFocused}
              value={{ label: searchText, value: searchText }}
              formatGroupLabel={
                <div>
                  <span>Recent Searches</span>
                  <span></span>
                </div>
              }
              options={recentSearchesOptions}
              onChange={(selectedOption) => {
                console.log(selectedOption);
                dispatch(
                  setSearchText(selectedOption ? selectedOption.value : "")
                );

                if (selectedOption) {
                  dispatch(resetSearchResults());
                  dispatch(setBook(undefined));
                  history.push("/search");
                  dispatch(setLoading(true));
                  searchBook(selectedOption.value, 0)
                    .then((res) => {
                      //dispatch set books
                      dispatch(setLoading(false));
                      dispatch(
                        setSearch(selectedOption.value, res.data.totalItems)
                      );
                      dispatch(
                        setSearchResults(
                          res.data.items.map((x) => {
                            return {
                              id: x.id,
                              imageUrl: x.volumeInfo.imageLinks
                                ? x.volumeInfo.imageLinks.thumbnail
                                : "No image available",
                            };
                          })
                        )
                      );
                    })
                    .catch((err) => console.error(err));
                }
              }}
              placeholder=""
              formatCreateLabel={(x) => <>{x}</>}
              isClearable
              onCreateOption={(x) => {
                let cookieValues = cookies.recentSearches || [];
                setCookies("recentSearches", [...cookieValues, x]);
              }}
              noOptionsMessage={() => <>No recent search results</>}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon />
                  </InputAdornment>
                ),
              }}
            />
          </Box>
        </Toolbar>
      </AppBar>
      <Drawer open={open} onClose={() => setOpen(false)}>
        <div className={classes.drawerContainer}>
          <List>
            <ListItem button onClick={() => history.push("/")}>
              <ListItemText>
                <Typography color="secondary">Home</Typography>
              </ListItemText>
            </ListItem>
            <ListItem button onClick={() => history.push("/search")}>
              <ListItemText>
                <Typography color="secondary">Search</Typography>
              </ListItemText>
            </ListItem>
            <ListItem button onClick={() => history.push("/settings")}>
              <ListItemText>
                <Typography color="secondary">Settings</Typography>
              </ListItemText>
            </ListItem>
          </List>
        </div>
      </Drawer>
    </>
  );
}
