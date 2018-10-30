import React, { Component, useState, useEffect } from "react";
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

// fetch("/index.html").then(d => {
//   d.json().then(v => {
//     console.log(v);
//   });
// });

// caches.keys().then(function(cacheNames) {
//   cacheNames.forEach(function(cacheName) {
//     console.log(`updating index cache for ${cacheName}`);
//     caches.open(cacheName).then(function(cache) {
//       fetch("/?t=" + nanoid()).then(function(response) {
//         cache.put("/index.html", response);
//       });
//     });
//   });
// });

// fetch("/index.html?hfdsfh=werwsdfmkl")
//   .then(function(response) {
//     return response.text();
//   })
//   .then(function(myJson) {
//     console.log(myJson);
//   });

function usePwaUpdateChecker(props) {
  let [updated, setUpdated] = useState(false);
  const [checked, setChecked] = useState(false);

  useEffect(async () => {
    if (checked) return;
    try {
      const serverRequest = "/?t=" + nanoid();
      const [serverRoot, clientRoot] = await Promise.all([
        fetch(serverRequest),
        fetch("/index.html")
      ]);
      if (!serverRoot || serverRoot.status !== 200)
        throw new Error("Error could not connect to server");
      const [serverHtml, clientHtml] = await Promise.all([
        serverRoot.text(),
        clientRoot.text()
      ]);
      if (serverHtml === clientHtml) {
        console.log("no updated needed");
        setChecked(true);
        return;
      }
      console.log("eupdating server caches...");
      const cacheNames = await caches.keys();
      for (const cacheName of cacheNames) {
        console.log(`updating index cache for ${cacheName}`);
        const cache = await caches.open(cacheName);
        const newRoot = await fetch(serverRequest);
        cache.put("/index.html", newRoot.clone());
      }
      setChecked(true);
      setUpdated(true);
    } catch (err) {
      console.log("Error occurred while checking for updates..");
      console.error(err);
      setChecked(true);
    }
  });

  return { updated };
}

function PwaStatus() {
  const { updated } = usePwaUpdateChecker();
  return <div>{updated ? "Updated!!!!!" : "qweww :("}</div>;
}

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
          <PwaStatus />
          {/* <div style={{ maxWidth: 300 }}>
            <p style={{ whiteSpace: "pre-wrap" }}>{longData}</p>
          </div> */}
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
