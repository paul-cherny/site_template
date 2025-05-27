import React from "react";
import { HashRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./Layout";
import HomePage from "./pages/HomePage";
import SearchPage from "./pages/SearchPage";

function App() {
  return (
    <Router>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="search" element={<SearchPage />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;