import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./App.css";

import Header from "./components/header";
import Footer from "./components/footer";

import Main from "./router/main";
import About from "./router/about";
import Search from "./router/search";
import Show from "./router/show";
import History from "./router/history";

class App extends Component {
  render() {
    return (
      <Router>
        <Header />
        <div className="App">
          <Switch>
            <Route exact path="/" component={Main} />
            <Route exact path="/about/" component={About} />
            <Route exact path="/search/" component={Search} />
            <Route exact path="/show/" component={Show} />
            <Route exact path="/history/" component={History} />
          </Switch>
        </div>
        <Footer />
      </Router>
    );
  }
}

export default App;
