import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import loggerMiddleware from "redux-logger";
import thunkMiddleware from "redux-thunk";
import bookStore from "./reducer";
import { createStore, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import { ThemeProvider } from "@material-ui/core";
import { colorPalette } from "./theme";
import { createMuiTheme } from "@material-ui/core/styles";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import SearchPage from "./SearchPage";
import { CookiesProvider } from "react-cookie";

const middlewareEnhancer = applyMiddleware(loggerMiddleware, thunkMiddleware);

const store = createStore(bookStore, undefined, middlewareEnhancer);

const theme = createMuiTheme({
  palette: colorPalette,
});

ReactDOM.render(
  <Provider store={store}>
    <ThemeProvider theme={theme}>
      <CookiesProvider>
        <BrowserRouter>
          <Switch>
            <Route exact path="/" component={App} />
            <Route exact path="/search" component={SearchPage} />
          </Switch>
        </BrowserRouter>
      </CookiesProvider>
    </ThemeProvider>
  </Provider>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
