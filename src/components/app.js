import React from "react";
import { connect } from "react-redux";
import { Route, Switch, withRouter } from "react-router-dom";

import LoginPage from "./authorization/login-page";
import RegistrationPage from "./authorization/registration-page";
import { refreshAuthToken } from "../actions/auth";
import Home from "./home/home";
import Navbar from "./common/navbar";
import Footer from "./common/footer";
import Dashboard from "./albums/dashboard";
import Album from "./albums/album";
import NewAlbum from "./albums/new-album";
import EditAlbum from "./albums/edit-album";
import DeleteAlbum from "./albums/delete-album";
import EditMedia from "./albums/edit-media";
import DeleteMedia from "./albums/delete-media";
import NewFiles from "./albums/new-files";

import "./app.css";

export class App extends React.Component {
  componentDidUpdate(prevProps) {
    if (!prevProps.loggedIn && this.props.loggedIn) {
      // When we are logged in, refresh the auth token periodically
      this.startPeriodicRefresh();
    } else if (prevProps.loggedIn && !this.props.loggedIn) {
      // Stop refreshing when we log out
      this.stopPeriodicRefresh();
    }
  }

  componentWillUnmount() {
    this.stopPeriodicRefresh();
  }

  startPeriodicRefresh() {
    this.refreshInterval = setInterval(
      () => this.props.dispatch(refreshAuthToken()),
      60 * 60 * 1000 // One hour
    );
  }

  stopPeriodicRefresh() {
    if (!this.refreshInterval) {
      return;
    }

    clearInterval(this.refreshInterval);
  }

  render() {
    return (
      <div className="app">
        <header role="banner">
          <Navbar />
        </header>
        <main role="main">
          <Switch>
            <Route exact path="/login/" component={LoginPage} />
            <Route exact path="/" component={Home} />
            <Route exact path="/dashboard/" component={Dashboard} />
            <Route exact path="/album/:index" component={Album} />
            <Route exact path="/new-album/" component={NewAlbum} />
            <Route exact path="/edit-album/:index" component={EditAlbum} />
            <Route exact path="/delete-album/:index" component={DeleteAlbum} />
            <Route exact path="/new-files/:index" component={NewFiles} />
            <Route
              exact
              path="/editMedia/:albumId/:fileId"
              component={EditMedia}
            />
            <Route
              exact
              path="/deleteMedia/:albumId/:fileId"
              component={DeleteMedia}
            />
            <Route exact path="/register" component={RegistrationPage} />
          </Switch>
        </main>
        <Footer />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  hasAuthToken: state.auth.authToken !== null,
  loggedIn: state.auth.currentUser !== null
});

// Deal with update blocking - https://reacttraining.com/react-router/web/guides/dealing-with-update-blocking
export default withRouter(connect(mapStateToProps)(App));
