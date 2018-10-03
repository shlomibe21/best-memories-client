import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import Home from "./home/home";
import Navbar from "./common/navbar";
import Footer from "./common/footer";
import Dashboard from "./albums/dashboard";
import Album from "./albums/album";
import NewAlbum from "./albums/new-album";
import EditAlbum from "./albums/edit-album";
import DeleteAlbum from "./albums/delete-album";
import EditMedia from "./albums/edit-media";

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
