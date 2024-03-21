import React, { useState, useEffect } from "react";
import { Helmet } from "react-helmet";
import logo from "./logo.svg";
import "./App.css";

function App() {
  const [pageTitle, setPageTitle] = useState("Default Title");

  useEffect(() => {
    setPageTitle("Dynamic Page Title");
  }, []);

  return (
    <>
      <Helmet>
        <title>{pageTitle}</title>
      </Helmet>
      <div className="App">
        <header className="App-header">
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
        </header>
      </div>
    </>
  );
}

export default App;
