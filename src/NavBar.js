import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import { TextField, useTheme, Box } from "@material-ui/core";
import InputAdornment from "@material-ui/core/InputAdornment";
import SearchIcon from "@material-ui/icons/Search";
import logo from "./images/logo.png";
import CreatableSelect from "react-select/creatable";
import { useCookies } from "react-cookie";
import { searchBook } from "./service";

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
}));

export default function NavBar(props) {
  const classes = useStyles();
  const { isFocused = false } = props;

  const theme = useTheme();
  const [cookies, setCookies, removeCookies] = useCookies(["recentSearches"]);

  const recentSearchesOptions = (cookies.recentSearches || []).map((x) => ({
    label: x,
    value: x,
  }));
  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            edge="start"
            className={classes.menuButton}
            style={{ color: theme.palette.common.white }}
            aria-label="menu"
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
              options={recentSearchesOptions}
              onChange={(selectedOption) =>
                selectedOption &&
                searchBook(selectedOption.value)
                  .then((res) => console.log(res))
                  .catch((err) => console.error(err))
              }
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
    </div>
  );
}
