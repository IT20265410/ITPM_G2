import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import "bootstrap/dist/css/bootstrap.min.css";
import './App.css';
import Navbar from "./components/pages/navbar";
import Addvehicle from "./components/pages/addvehicle"
import Viewvehicle from "./components/pages/viewvehicle"
import Editvehicle from './components/pages/editvehicle';
import Searchvehicle from "./components/pages/searchvehicle";



function App() {
  return (
    <>
    <Router>
      
    <Navbar />
        
    
    <Route exact path="/addvehicle" component={Addvehicle} />
    <Route exact path="/viewvehicle" component={Viewvehicle} />
    <Route path="/editvehicle/:id" component={Editvehicle} />
    <Route path='/searchvehicle' component={Searchvehicle} />

        

  
     
    </Router>
    </>
  );
}

export default App;
