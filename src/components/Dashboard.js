import React from 'react'
import './Dashboard.css'; 
import { Link } from 'react-router-dom';
import { NavLink } from 'react-router-dom';
import homeImage from '../images/dashboard.jpg' 

function Home() {  
    return (
        <div className='home'> 

            <div className='row' style={{textAlign:"center"}}>
            <img className="logo-image" style={{ maxWidth: '90px', marginRight:'320px', marginLeft:'40px' }} src="../uploads/logo12.png" />
                        <div className='col-1 buttons'>
                            <Link to="/cvehicle" type="button" className="btn btn-warning">
                            View Vehicle
                            </Link>
                            <br />
                        </div> 
                        <div className='col-1 buttons'>
                            <Link to="/customerOffer" type="button" className="btn btn-warning">
                            View Offers
                            </Link>
                            <br />
                        </div>
                        <div className='col-1 buttons'>
                            <Link to="/customerFaq" type="button" className="btn btn-warning">
                            View Our FAQ
                            </Link>
                            <br />
                        </div> 
                        <div className='col-1 buttons'>
                            <Link to="/customer-contact-list" type="button" className="btn btn-warning">
                            Contact Us
                            </Link>
                            <br />
                        </div>
                        <div className='col-1 buttons'>
                            <Link to="/viewc" type="button" className="btn btn-warning">
                            View About Us
                            </Link>
                            <br />
                        </div>
                        </div>
            
                        <img class='homeImage' src={homeImage} alt="home image" />
                       
        </div >
        
    ); 
}

export default Home;