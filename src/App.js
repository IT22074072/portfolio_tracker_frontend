import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Dashboard from "./pages/dashboard";
import StockForm from "./pages/stockForm";
import StockTable from "./pages/stockTable";

import Navbar from "./components/Navbar";
import SideNav from "./components/SideNav";

const App = () => {
  return (
    <Router>
      <div style={{ display: "flex", flexDirection: "column" }}>
        <Navbar />
        <div style={{ display: "flex", flexGrow: 1 }}>
          <SideNav />
          <div style={{ flex: 1, marginTop: "64px", padding: "16px" }}>
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/stockForm" element={<StockForm />} />
              <Route path="/stockTable" element={<StockTable />} />
            </Routes>
          </div>
        </div>
      </div>
    </Router>
  );
};

export default App;
