import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import CreateOffer from "./components/pages/createOffer";

function App() {
  return (
    <Router>
      <CreateOffer />
    </Router>
  );
}

export default App;
