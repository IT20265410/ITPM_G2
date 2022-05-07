import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import CreateOffer from "./components/pages/offer/createOffer";
import UpdateOffer from "./components/pages/offer/updateOffer";
import ViewOffer from "./components/pages/offer/viewOffer";
import CreateFaq from "./components/pages/faq/createFaq";
import ViewFaq from "./components/pages/faq/viewFaq";
import UpdateFaq from "./components/pages/faq/updateFaq";
import CustomerOffer from "./components/pages/customerSide/customerOffer";
import CustomerFaq from "./components/pages/customerSide/customerFaq";
import Home from "./components/homepage/home";
import SearchBar from "./components/pages/offer/searchOffer";
import SearchBarFaq from "./components/pages/faq/searchFaq";
import Navbar from "./components/pages/navbar";

function App() {
  return (
    <Router>
      <Navbar />
      <Route path="/viewOffer" component={ViewOffer} />
      <Route path="/updateOffer/:id" component={UpdateOffer} />
      <Route path="/createOffer" component={CreateOffer} />
      <Route path="/createFaq" component={CreateFaq} />
      <Route path="/viewFaq" component={ViewFaq} />
      <Route path="/updateFaq/:id" component={UpdateFaq} />
      <Route path="/customerOffer" component={CustomerOffer} />
      <Route path="/customerFaq" component={CustomerFaq} />
      <Route path="/home" component={Home} />
      <Route path="/searchOffer" component={SearchBar} />
      <Route path="/searchFaq" component={SearchBarFaq} />
    </Router>
  );
}

export default App;