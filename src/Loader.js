import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import "./Loader.css";

const useStyles = makeStyles((theme) => ({
  image: {
    maxWidth: "100%",
  },
  root: {
    display: "flex",
    justifyContent: "center",
  },
}));

export default function Loader(props) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <div class="lds-ellipsis">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>
  );
}
