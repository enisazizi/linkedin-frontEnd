import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Home from "./pages/Home";
import AppNavBar from "./components/AppNavBar";
import Footer from "./pages/Footer";
import Profile from "./pages/Profile";
import Login from "./pages/Login";
import SignUp from "./pages/Signup";
import Welcome from "./pages/Welcome";
// import PostModal from "./components/PostModal";
import "bootstrap/dist/css/bootstrap.min.css";

class App extends React.Component {
  state = { searchQuery: "" };
  searchHandler = (e) => {
    e.preventDefault();
    this.setState({ query: e.target.value });
  };
  render() {
    return (
      <Router>
        <Route
          path={["/user/:id", "/home"]}
          render={() => (
            <AppNavBar
              query={this.state.query}
              searchHandler={this.searchHandler}
            />
          )}
        />
        <Route
          path={"/home"}
          exact
          render={(props) => <Home title="Homepage" {...props} />}
        />
        <Route
          path={"/user/:id"}
          exact
          render={(props) => (
            <Profile
              {...props}
              query={this.state.searchQuery}
              searchHandler={this.searchHandler}
            />
          )}
        />
        <Route path={"/"} exact render={() => <Welcome />} />
        <Route path={"/login"} render={() => <Login />} />
        <Route path={"/signup"} render={() => <SignUp />} />
        <Route path={["/user/:id", "/home"]} component={Footer} />
      </Router>
    );
  }
}

export default App;
