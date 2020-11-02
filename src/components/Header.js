import React, { Component } from "react";

export function setTime(initTime) {
  var now = new Date().getTime();

  var distance = now - initTime.getTime();

  var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
  var seconds = Math.floor((distance % (1000 * 60)) / 1000);

  return `${hours}:${minutes}:${seconds}`;
}

class Header extends Component {
  constructor() {
    super();
    this.state = {
      clock: null,
      init: new Date()
    };
  }

  componentDidMount() {
    this.createTimeLoad();
  }

  createTimeLoad() {
    setInterval(() => {
      this.setState({
        clock: setTime(this.state.init)
      });
    }, 1000);
  }
  render() {
    return (
      <div className="header">
        <div className="row justify-content-between">
          <div className="col-2">
            <h5>Header</h5>
          </div>
          <div className="col-1">
            <h5>{this.state.clock}</h5>
          </div>
        </div>
      </div>
    );
  }
}

export default Header;
