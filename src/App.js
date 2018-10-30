import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.css";
import { Router, Link } from "@reach/router";
import loadable from "loadable-components";
import { longData } from "./lorem";
import RA from "./test-routes/RouteA";
import RB from "./test-routes/RouteB";
import nanoid from "nanoid";
// export const RA = loadable(() => import("./test-routes/RouteA"));
// export const RB = loadable(() => import("./test-routes/RouteB"));

fetch("/index.html").then(d => {
  d.json().then(v => {
    console.log(v);
  });
});
fetch("/?hfdsfh=werwsdfmkl")
  .then(function(response) {
    caches.open("sw-app-precache-https://f1cb2653.ngrok.io/").then(function(cache) {
      cache.put("/", response);
    });
  })
fetch("/index.html?hfdsfh=werwsdfmkl")
  .then(function(response) {
    return response.text();
  })
  .then(function(myJson) {
    console.log(myJson);
  });

class Deflt extends Component {
  componentDidMount() {
    console.log("mountedd " + nanoid());
    window.scrollTo({
      top: 300
    });
  }
  render() {
    return (
      <div>
        <br />
        <br />
        <div style={{ position: "fixed", left: 50, top: 50 }}>
          <Link to="ra">RA</Link>
        </div>
        <button
          onClick={async () => {
            const x = await fetch("/sample-shit.json");
            const xx = await x.json();
            console.log("xx");
            console.log(xx);
          }}
        >
          test
        </button>
        <center>
          <div style={{ maxWidth: 300 }}>
            <p style={{ whiteSpace: "pre-wrap" }}>{longData}</p>
          </div>
        </center>
      </div>
    );
  }
}
class App extends Component {
  render() {
    return (
      <div className="App">
        <Router primary={false}>
          <RA path="ra" />
          <RB path="rb" />
          <Deflt default />
        </Router>
        {/* <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Edit <code>src/App.js</code> and save to reload.
          </p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
        </header> */}
      </div>
    );
  }
}

export default App;
