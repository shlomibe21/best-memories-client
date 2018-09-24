import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import Home from "./home";
import Dashboard from "./dashboard/dashboard";
import Album from "./album/album";
import NewAlbum from "./new-album";

import "./app.css";

export default function App(props) {
  return (
    <Router>
      <div className="app">
        <header role="banner">
          
        </header>
        <main role="main">
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/dashboard/" component={Dashboard} />
            <Route exact path="/album/" component={Album} />
            <Route exact path="/newAlbum/" component={NewAlbum} />
          </Switch>
        </main>
      </div>
    </Router>
  );
}
