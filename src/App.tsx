import React from "react";
import { HashRouter } from "react-router-dom";
import Navigation from "./Navigator/Navigation";
import Store from "./State/Store";




function App() {
  return (
    <HashRouter>
        <Store>
          <Navigation />
        </Store>
      </HashRouter>
  );
}

export default App;
