import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import Home from "./home";
import Navbar from "./navbar";
import Footer from "./footer";
import Dashboard from "./dashboard/dashboard";
import Album from "./album/album";
import NewAlbum from "./new-album";
import EditAlbum from "./edit-album";
import DeleteAlbum from "./delete-album";
import EditMedia from "./edit-media";

import "./app.css";

export default function App(props) {
  return (
    <Router>
      <div className="app">
        <header role="banner">
          <Navbar />
        </header>
        <main role="main">
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/dashboard/" component={Dashboard} />
            <Route exact path="/album/:index" component={Album} />
            <Route exact path="/newAlbum/" component={NewAlbum} />
            <Route exact path="/edit-album/:index" component={EditAlbum} />
            <Route exact path="/delete-album/:index" component={DeleteAlbum} />
            <Route exact path="/editMedia/:index" component={EditMedia} />
          </Switch>
        </main>
        <Footer />
      </div>
    </Router>
  );
}
