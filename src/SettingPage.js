import React, { useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { useSelector, useDispatch } from "react-redux";
import NavBar from "./NavBar";
import BookInfo from "./BookInfo";
import { setBooks, removeBook } from "./actions";
import { useCookies } from "react-cookie";
import {
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  IconButton,
  ListSubheader,
  Snackbar,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
} from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";
import ClearIcon from "@material-ui/icons/Clear";

const useStyles = makeStyles((theme) => ({
  settingsOptions: {
    paddingTop: "112px",
  },
  subHeader: {
    color: theme.palette.primary.main,
  },
}));
export default function SettingPage() {
  const dispatch = useDispatch();
  const [cookies, setCookies, removeCookies] = useCookies(["wishList"]);
  const classes = useStyles();
  const [openConfirm, setOpenConfirm] = React.useState(false);
  const [openSnackBar, setOpenSnackBar] = React.useState(false);
  const [snackBarMsg, setSnackBarMsg] = React.useState("");
  const [selectedAction, setSelectedAction] = React.useState();

  const CLEAR_ALL = {
    type: "CLEAR_ALL",
    msg: "clear all data",
  };
  const CLEAR_LIST = {
    type: "CLEAR_LIST",
    msg: "clear wish list",
  };
  const CLEAR_RESULTS = {
    type: "CLEAR_RESULTS",
    msg: "clear recent search history",
  };

  const ACTION = {
    CLEAR_RESULTS,
    CLEAR_LIST,
    CLEAR_ALL,
  };

  const commitAction = (action) => {
    switch (action.type) {
      case "CLEAR_RESULTS":
        setCookies("recentSearches", []);
        break;
      case "CLEAR_LIST":
        setCookies("wishList", []);
        break;
      case "CLEAR_ALL":
        setCookies("recentSearches", []);
        setCookies("wishList", []);
        break;
      default:
        console.log("heelo");
        break;
    }
    setSnackBarMsg(`Successfully ${action.msg}`);
    setOpenSnackBar(true);
  };
  return (
    <div>
      <NavBar />
      <List
        subheader={
          <ListSubheader className={classes.subHeader}>Settings</ListSubheader>
        }
        className={classes.settingsOptions}
      >
        <ListItem>
          <ListItemText>Clear Recent Searches</ListItemText>
          <ListItemSecondaryAction>
            <IconButton
              onClick={() => {
                setOpenConfirm(true);
                setSelectedAction(ACTION.CLEAR_RESULTS);
              }}
            >
              <DeleteIcon color="secondary" />
            </IconButton>
          </ListItemSecondaryAction>
        </ListItem>
        <ListItem>
          <ListItemText>Clear Wish List</ListItemText>
          <ListItemSecondaryAction>
            <IconButton
              onClick={() => {
                setOpenConfirm(true);
                setSelectedAction(ACTION.CLEAR_LIST);
              }}
            >
              <DeleteIcon color="secondary" />
            </IconButton>
          </ListItemSecondaryAction>
        </ListItem>
        <ListItem>
          <ListItemText>Clear All Data</ListItemText>
          <ListItemSecondaryAction>
            <IconButton
              onClick={() => {
                setOpenConfirm(true);
                setSelectedAction(ACTION.CLEAR_ALL);
              }}
            >
              <ClearIcon color="secondary" />
            </IconButton>
          </ListItemSecondaryAction>
        </ListItem>
      </List>
      <ConfirmationDialog
        open={openConfirm}
        action={selectedAction}
        onClose={() => setOpenConfirm(false)}
        onConfirm={() => {
          setOpenConfirm(false);
          commitAction(selectedAction);
        }}
        onCancel={() => setOpenConfirm(false)}
      />
      <Snackbar
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "center",
        }}
        open={openSnackBar}
        autoHideDuration={2000}
        onClose={() => setOpenSnackBar(false)}
        message={snackBarMsg}
      />
    </div>
  );
}

function ConfirmationDialog(props) {
  const { open, action, onClose, onConfirm, onCancel } = props;

  return (
    <Dialog
      open={open}
      onClose={onClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">Please Confirm</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          Are you sure you want to {action && action.msg}?
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={onCancel}>No</Button>
        <Button onClick={() => onConfirm(action)} color="primary" autoFocus>
          Yes
        </Button>
      </DialogActions>
    </Dialog>
  );
}
