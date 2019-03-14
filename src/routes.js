import React from "react";
import { Route, Switch } from "react-router-dom";
import Dashboard from "./component/Dashboard";
import Forum from "./component/Forum";
import Auth from "./component/Auth";
import Account from "./component/Account";
import Post from './component/Post'
import Register from "./component/Register";
import Topic from "./component/Topic";
import NewDiscussion from "./component/NewDiscussion";

export default (
  <Switch>
    <Route path="/forum/newdiscussion" component={NewDiscussion} />
    <Route path="/login" component={Auth} />
    <Route path="/register" component={Register} />
    <Route path="/account" component={Account} />
    <Route path="/forum/:topic/:id" component={Post} />
    <Route exact path="/forum" component={Forum} />
    <Route path="/forum/:topic" component={Topic} />
    <Route exact path="/" exact component={Dashboard} />
  </Switch>
);
