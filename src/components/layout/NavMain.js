import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { logout } from "../../actions/auth";
import './Landing.css';



const NavMain = ({ auth: { isAuthenticated, loading }, logout }) => {
    const authLinks = (
        <ul className="navMain-links" style={{marginLeft:"1300px", marginTop:"-50px", marginBottom:"0px" }}>
           
            
            <li>
                <Link to="/dashboard">
                    <i className="fas fa-user"></i>{" "}
                    <span className="hide-sm">Dashboard</span>
                </Link>
            </li>
            <li >
                <Link onClick={logout} to="/" replace>
                    <i className="fas fa-sign-out-alt"></i>{" "}
                    <span className="hide-sm" >Logout</span>
                </Link>
            </li>
        </ul>
    );
    
    const guestLinks = (
        <ul className="navMain-links" style={{marginLeft:"1370px", marginTop:"-55px", marginBottom:"0px", position: "relative", top:"-22px"}}>
            <li>
                <Link to="/register" className="navMainlink1" >Register</Link>
                <i className="fas fa-sign-out-alt"></i>{" "}
            </li>
            <li>
                <Link to="/login" className="navMainlink2">Login</Link>
            </li>
        </ul>
    );

    return (
        <nav className="navMain bg-dark">
            <h1>
                <p className="homeLink"><Link to="/">RATHAWAHANA.LK</Link></p>
            </h1>
           <center><p className="keyw">(rent on a car with smile)</p></center> 
            {!loading && (
                <Fragment>{isAuthenticated ? authLinks : guestLinks}</Fragment>
            )}
        </nav>
    );
};

NavMain.propTypes = {
    logout: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
    auth: state.auth,
});

export default connect(mapStateToProps, { logout })(NavMain);