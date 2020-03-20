import React, { Component } from "react";

export default class NotFound extends Component {
  render() {
    return (
      <div>
        <div class="noise"></div>
        <div class="overlay"></div>
        <div class="terminal">
          <h1>
            Error <span class="errorcode">404</span>
          </h1>
          <p class="output">
            The page you are looking for might have been removed, had its name
            changed or is temporarily unavailable.
          </p>
          <p class="output">
            <a href="/">return to the homepage</a>.
          </p>
          <p class="output">Good luck.</p>
        </div>
      </div>
    );
  }
}
