import React from "react";
import { HashRouter, Routes, Route } from "react-router-dom";

import Cluster from "./Maps/cluster";
import { FieldWorkers } from "./fieldWorkers";
import ActionDetails from "./Screens/ActionDetails"
import 'bootstrap/dist/css/bootstrap.min.css';
function App() {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<FieldWorkers />} />
        <Route path="/details" element={<Cluster />} />
        <Route path="/actions" element={<ActionDetails />} />
      </Routes>
    </HashRouter>
  );
}

export default App;
