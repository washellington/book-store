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
import BookPage from "./BookPage";
import SettingPage from "./SettingPage";
import { CookiesProvider } from "react-cookie";
import { TransitionGroup, Transition } from "react-transition-group";
import gsap from "gsap";
import NavBar from "./NavBar";

const middlewareEnhancer = applyMiddleware(loggerMiddleware, thunkMiddleware);

const store = createStore(bookStore, undefined, middlewareEnhancer);

const theme = createMuiTheme({
  palette: colorPalette,
});

export const play = (pathname, node, appears) => {
  const delay = appears ? 0 : 0.5;
  let timeline;

  switch (pathname) {
    case "/":
      timeline = getHomeTimeline(node, delay);
      break;
    case "/settings":
      timeline = getSettingsTimeline(node, delay);
      break;
    default:
      timeline = gsap.timeline({ paused: true }); //getDefaultTimeline(node, delay);
      break;
  }

  timeline.play();
};

const getDefaultTimeline = (node, delay) => {
  const timeline = gsap.timeline({ paused: true });
  const texts = node.querySelectorAll("h1");
  const emptyBookList = node.querySelectorAll("#emptyContentContainer");
  timeline.from(node, 0.5, { autoAlpha: 0, delay });

  return timeline;
};

const getSettingsTimeline = (node, delay) => {
  const timeline = gsap.timeline({ paused: true });
  const settingsListItems = node.querySelectorAll("#settingsList li");

  timeline.from(settingsListItems, 1, {
    x: -100,
    stagger: 0.1,
    autoAlpha: 0,
    delay,
  });

  return timeline;
};

const getHomeTimeline = (node, delay) => {
  const timeline = gsap.timeline({ paused: true });
  const texts = node.querySelectorAll("h1");
  const emptyBookList = node.querySelectorAll("#emptyContentContainer");
  const books = node.querySelectorAll(".gridBook");

  timeline
    //.from(node, 0, { display: "none", autoAlpha: 0, delay })
    .from(texts, 0.5, { autoAlpha: 0, delay, x: -100, ease: "power1" }, 0.125)
    .from(emptyBookList, 0.25, { y: 100, autoAlpha: 0 })
    .from(books, 0.5, {
      y: 50,
      stagger: 0.1,
      autoAlpha: 0,
    });

  return timeline;
};

ReactDOM.render(
  <Provider store={store}>
    <ThemeProvider theme={theme}>
      <CookiesProvider>
        <BrowserRouter>
          <NavBar />
          <Route
            render={({ location }) => {
              const { pathname, key } = location;

              return (
                <Transition
                  key={key}
                  in
                  appear={true}
                  onEnter={(node, appears) => play(pathname, node, appears)}
                  timeout={{ enter: 0, exit: 0 }}
                >
                  <Switch>
                    <Route exact path="/" component={App} />
                    <Route exact path="/search" component={SearchPage} />
                    <Route exact path="/book" component={BookPage} />
                    <Route exact path="/settings" component={SettingPage} />
                  </Switch>
                </Transition>
              );
            }}
          />
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
