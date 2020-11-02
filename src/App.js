import React, { Component } from "react";
import "./App.css";
import Header from "./components/Header";
import Body from "./components/Body";

class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="container">
          <div className="row mt-3">
            <div className="col-sm-12 border border-bottom-0 border-secondary p-2">
              <Header />
            </div>
            <div className="col-sm-12 border border-secondary p-2">
              <Body />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
