import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Route } from "react-router-dom";

import { ScoreboardList } from "./components/ScoreboardList";
import { Scoreboard } from "./components/Scoreboard";

import "./components/styles/Index.scss";

const App = () => {
  return (
    <Router>
      <div>
        <Route exact path="/" component={ScoreboardList} />
        <Route path="/scoreboard/:scoreboardId" component={Scoreboard} />
      </div>
    </Router>
  );
};

ReactDOM.render(<App />, document.getElementById("index"));
