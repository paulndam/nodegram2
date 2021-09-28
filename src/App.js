import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Home from "./components/Home/Home";
import User from "./components/Users/User";
import SignUp from "./components/Users/SignUp";
import SignIn from "./components/Users/SignIn";
import Profile from "./components/Users/Profile";
import NotFound from "./pages/NotFound/NotFound";
import { ThemeProvider as MuiThemeProvider } from "@material-ui/core/styles";
import { createTheme } from "@material-ui/core/styles";
import pink from "material-ui/colors/pink";
import indigo from "material-ui/colors/indigo";
import PrivateRoute from "./auth/PrivateRoute";
import EditProfile from "./components/Users/EditProfile";
import SearchResult from "./components/Search/SearchResult";
import { CssBaseline } from "@material-ui/core";

const theme = createTheme({
  palette: {
    primary: {
      light: "#00352c",
      //main: "#004d40",
      //main: "#8e24aa",
      main: "#161D6F",
      dark: "#337066",
      contrastText: "#fff",
    },
    secondary: {
      light: "#87103f",
      main: "#c2185b",
      //main: "#ef5350",
      dark: "#ce467b ",
      contrastText: "#000",
    },
    background: {
      // paper: "#212121",
    },

    openTitle: indigo["400"],
    protectedTitle: pink["400"],
    type: "light",
  },
});

function App() {
  return (
    <div className="App">
      <CssBaseline />
      <BrowserRouter>
        <MuiThemeProvider theme={theme}>
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/search-results" component={SearchResult} />
            <Route exact path="/user-list" component={User} />
            <Route exact path="/signup" component={SignUp} />
            <Route exact path="/signin" component={SignIn} />
            <PrivateRoute path="/user/edit/:userId" component={EditProfile} />
            <PrivateRoute exact path="/user/:userId" component={Profile} />
            <Route exact path="/*" component={NotFound} />
          </Switch>
        </MuiThemeProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
