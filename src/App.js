import React, { useEffect } from 'react';
import './App.css';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import "bootstrap/dist/css/bootstrap.min.css";


import Dashboard from "./components/Dashboard";
//import NavMain from "./components/layout/NavMain";
import Landing from "./components/layout/Landing";
// import Login from "./components/auth/Login";
// import Register from "./components/auth/Register";
// import PrivateRoute from "./routing/PrivateRoute";
// import NotFound from "./components/NotFound";
// import setAuthToken from "./utils/setAuthToken";
// import store from "./store";
// import { loadUser } from "./actions/auth";




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


import Addvehicle from "./components/pages/addvehicle"
import Viewvehicle from "./components/pages/viewvehicle"
import Editvehicle from './components/pages/editvehicle';
import Searchvehicle from "./components/pages/searchvehicle";
import Rentv from "./components/pages/rentv";
import Viewrent from "./components/pages/viewrent";
import Editrent from './components/pages/editrent';



import Searchemployee from "./components/pages/searchemployee";
import Searchteam from "./components/pages/searchteam";
import Editp from "./components/pages/editp";
import Edita from "./components/pages/edita";
import Editm from "./components/pages/editm";
import Viewp from "./components/pages/viewp";
import Viewa from "./components/pages/viewa";
import RegisterVaccine from "./components/pages/registerVaccine";
import AboutUs from "./components/pages/aboutUs";
import RegisterTeam from "./components/pages/registerTeam";
import Viewm from "./components/pages/viewm";
import Viewc from "./components/pages/viewc";
import Viewcm from "./components/pages/viewcm";


import AddCustomer from "./components/pages/create";
import ViewCustomer from "./components/pages/customer-list";
import EditCustomer from "./components/pages/Editcustomer";
import SearchCustomer from './components/pages/searchCustomer';
import AddContacts from './components/pages/create-contacts';  
import ViewContact from './components/pages/contact-list';
import EditContact from './components/pages/Editcontact';
import SearchContact from "./components/pages/searchContact";  
import ViewCustomerContact from './components/pages/customer-contact-list'


// if (localStorage.token) {
//   setAuthToken(localStorage.token);
// }


function App() {
  //   useEffect(() => {
  //   store.dispatch(loadUser());
  // }, []);
  return (
	//<>
  //<div className="App">
    <Router>
 
	{/* <NavMain /> */}

	{/* <Switch>
            <Route exact path="/" component={Landing} />
            <Route exact path="/register" component={Register} />
            <Route exact path="/login" component={Login} />
         <div> */}

      <Navbar />
      {/* <PrivateRoute exact path="/dashboard" component={Dashboard} /> */}
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
       <Route path="/viewc" component={Viewc} />
       <Route path="/viewcm" component={Viewcm} />




              <Route path="/create" component={AddCustomer} />
              <Route path="/customer-list" component={ViewCustomer} /> 
              <Route path="/Editcustomer/:id" component={EditCustomer} />
              <Route path='/searchCustomer' component={SearchCustomer} />
              
              <Route path="/create-contacts" component={AddContacts} />
              <Route path='/contact-list' component={ViewContact} /> 
              <Route path='/Editcontact' component={EditContact} /> 
              <Route path='/searchContact' component={SearchContact} /> 

              <Route path='/customer-contact-list' component={ViewCustomerContact} />  

              {/* </div>
          </Switch> */}
        </Router>
    //   </div>
    // </>
  );
}

export default App;