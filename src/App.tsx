import React from "react";
import { HashRouter, Routes, Route } from "react-router-dom";

import Cluster from "./Maps/cluster";
import { FieldWorkers } from "./fieldWorkers";
import ActionDetails from "./Screens/ActionDetails"
import 'bootstrap/dist/css/bootstrap.min.css';
import Reports from "./Screens/Reports";
import ReportResults from "./Screens/ReportResults";
import { GrillDownData } from "./grillDownData";
import { GetReports } from './getReports';
import  GetReportDetails  from './getReportDetails';
function App() {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<FieldWorkers />} />
        <Route path="/details" element={<Cluster />} />
        <Route path="/actions" element={<ActionDetails />} />
        <Route path="/reports" element={<Reports />} />
        <Route path="/reportresults" element={<ReportResults />} />
        <Route path="/get-assembly-grill-down-data" element={<GrillDownData />} />
        <Route path="/get-reports" element={<GetReports />} />
        <Route path="/get-report-details" element={<GetReportDetails />} />
      </Routes>
    </HashRouter>
  );
}

export default App;
