import React, { useEffect } from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import "bootstrap/dist/css/bootstrap.min.css";


import Dashboard from "./components/Dashboard";
import NavMain from "./components/layout/NavMain";
import Landing from "./components/Dashboard";
import Login from "./components/auth/Login";
import Register from "./components/auth/Register";
import PrivateRoute from "./routing/PrivateRoute";
import NotFound from "./components/NotFound";
import setAuthToken from "./utils/setAuthToken";
import store from "./store";
import { loadUser } from "./actions/auth";



//Thulya
import CreateOffer from "./components/pages/offer/createOffer";
import UpdateOffer from "./components/pages/offer/updateOffer";
import ViewOffer from "./components/pages/offer/viewOffer";
import CreateFaq from "./components/pages/faq/createFaq";
import ViewFaq from "./components/pages/faq/viewFaq";
import UpdateFaq from "./components/pages/faq/updateFaq";
import CustomerOffer from "./components/pages/offer_cs/customerOffer";
import CustomerFaq from "./components/pages/offer_cs/customerFaq";
import Home from "./components/homepage/home";
import SearchBar from "./components/pages/offer/searchOffer";
import SearchBarFaq from "./components/pages/faq/searchFaq";
import Navbar from "./components/pages/navbar";

//Venura
import Addvehicle from "./components/pages/vehicle/addvehicle"
import Viewvehicle from "./components/pages/vehicle/viewvehicle"
import Editvehicle from './components/pages/vehicle/editvehicle';
import Searchvehicle from "./components/pages/vehicle/searchvehicle";
import Rentv from "./components/pages/vehicle/rentv";
import Viewrent from "./components/pages/vehicle/viewrent";
import Editrent from './components/pages/vehicle/editrent';
import Cvehicle from "./components/pages/vehicle/cvehicle"


//Hansi
import Searchemployee from "./components/pages/staff/searchemployee";
import Searchteam from "./components/pages/team/searchteam";
import Editp from "./components/pages/staff/editp";
import Edita from "./components/pages/aboutUs/edita";
import Editm from "./components/pages/team/editm";
import Viewp from "./components/pages/staff/viewp";
import Viewa from "./components/pages/aboutUs/viewa";
import RegisterVaccine from "./components/pages/staff/registerVaccine";
import AboutUs from "./components/pages/aboutUs/aboutUs";
import RegisterTeam from "./components/pages/team/registerTeam";
import Viewm from "./components/pages/team/viewm";
import Viewc from "./components/pages/aboutUs_cs/viewc";
import Viewcm from "./components/pages/aboutUs_cs/viewcm";

//Naveen
import AddMadicine from "./components/pages/customer/create";
import ViewMadicines from "./components/pages/customer/customer-list";
import EditMadicine from "./components/pages/customer/editcustomer";
import SearchCustomer from './components/pages/customer/searchCustomer';
import AddContacts from './components/pages/customer/create-contacts';  
import ViewContact from './components/pages/customer/contact-list';
import EditContact from './components/pages/customer/Editcontact';
import SearchContact from "./components/pages/customer/searchContact";  
import ViewCustomerContact from './components/pages/customer/customer-contact-list'


if (localStorage.token) {
  setAuthToken(localStorage.token);
}

function App() {
  useEffect(() => {
    store.dispatch(loadUser());
  }, []);
  
  return (
    <>
      <div className="App">
        <Router>
          <NavMain />

          <Switch>
            <Route exact path="/" component={Landing} />
            <Route exact path="/register" component={Register} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/cvehicle" component={Cvehicle} />
            <Route path="/customerOffer" component={CustomerOffer} />
            <Route path="/customerFaq" component={CustomerFaq} />
            <Route path="/viewc" component={Viewc} />
            <Route path='/customer-contact-list' component={ViewCustomerContact} />  
            <Route path="/dashboard" component={Dashboard} />
            <div>
              <Navbar />
          
     
      <Route path="/viewOffer" component={ViewOffer} />
      <Route path="/updateOffer/:id" component={UpdateOffer} />
      <Route path="/createOffer" component={CreateOffer} />
      <Route path="/createFaq" component={CreateFaq} />
      <Route path="/viewFaq" component={ViewFaq} />
      <Route path="/updateFaq/:id" component={UpdateFaq} />
      <Route path="/home" component={Home} />
      <Route path="/searchOffer" component={SearchBar} />
      <Route path="/searchFaq" component={SearchBarFaq} />


       <Route exact path="/addvehicle" component={Addvehicle} />
       <Route exact path="/viewvehicle" component={Viewvehicle} />
       <Route path="/editvehicle/:id" component={Editvehicle} />
       <Route path='/searchvehicle' component={Searchvehicle} />
       <Route exact path="/rentv" component={Rentv} />
       <Route exact path="/viewrent" component={Viewrent} />
       <Route path="/editrent/:id" component={Editrent} />
       
       


       <Route path="/registerVaccine" component={RegisterVaccine} />
       <Route path="/aboutUs" component={AboutUs} />
       <Route path='/searchteam' component={Searchteam} />
       <Route path='/searchemployee' component={Searchemployee} />
       <Route path="/editp/:id" component={Editp} />
       <Route path="/edita/:id" component={Edita} />
       <Route path="/editm/:id" component={Editm} />
       <Route path="/viewp" component={Viewp} />
       <Route path="/viewa" component={Viewa} />
       <Route path="/registerTeam" component={RegisterTeam} />
       <Route path="/viewm" component={Viewm} />
       <Route path="/viewcm" component={Viewcm} />




       <Route path="/create" component={AddMadicine} />
       <Route path="/customer-list" component={ViewMadicines} />      
       <Route path="/editcustomer/:id" component={EditMadicine} />
       <Route path='/searchCustomer' component={SearchCustomer} />
       <Route path="/create-contacts" component={AddContacts} />
       <Route path='/contact-list' component={ViewContact} /> 
       <Route path="/Editcontact" component={EditContact} /> 
       <Route path='/searchContact' component={SearchContact} /> 
       

               </div>
         </Switch>
        </Router>
    //   </div>
    // </>
  );
}

export default App;