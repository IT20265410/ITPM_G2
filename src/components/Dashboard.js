import React from 'react'
import './Dashboard.css'; 
import { Link } from 'react-router-dom';
import { NavLink } from 'react-router-dom';
import homeImage from '../images/dashboard.jpg' 

function Home() {
    return (
        <div className='home'> 

            <div className='row' style={{textAlign:"center"}}>
            <img className="logo-image" style={{ maxWidth: '70px', marginRight:'320px', marginLeft:'40px' }} src="../uploads/logo16.png" />
                        <div className='col-2 buttons'>
                            <Link to="/customer-contact-list" type="button" className="btn btn-warning">
                            View Vehicle
                            </Link>
                            <br />
                        </div> 
                        <div className='col-2 buttons'>
                            <Link to="/create" type="button" className="btn btn-warning">
                            Offers
                            </Link>
                            <br />
                        </div>
                        <div className='col-2 buttons'>
                            <Link to="/create" type="button" className="btn btn-warning">
                            FAQ
                            </Link>
                            <br />
                        </div> 
                        <div className='col-2 buttons'>
                            <Link to="/customer-contact-list" type="button" className="btn btn-warning">
                            Contact Us
                            </Link>
                            <br />
                        </div>
                        </div>
            
                        <img class='homeImage' src={homeImage} alt="home image" />
                       
        </div >
        
    ); 
}

export default Home;