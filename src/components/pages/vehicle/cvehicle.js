import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import * as FaIcons from 'react-icons/fa';

import '../vehicle.css';

const Addvehicle = props => (
    <tr>
       
        <td>{props.addvehicle.name}</td>
       
        <td>{props.addvehicle.price}</td>
        <td>{props.addvehicle.description}</td>

        


       
    </tr>
)

export default class Viewvehicle extends Component {
    constructor(props) {
        super(props);

        

        this.state = { addvehicle: [] };
    }

    


    componentDidMount() {
        axios.get('http://localhost:4800/addvehicle/')
            .then(response => {
                this.setState({ addvehicle: response.data })
            })
            .catch((error) => {
                console.log(error);
            })
    }


    addvehicleMembersList() {
        return this.state.addvehicle.map(currentaddvehicle => {
            return <Addvehicle addvehicle={currentaddvehicle} deleteAddvehicle={this.deleteAddvehicle} key={currentaddvehicle._id} />;
        })
    }


    render() {
        return (
            <div className='addRentPage' id="viewTable">
                <br />
                <div className='container'>
                    <div id='rentbar2' >

                    <center><h2 id="addrent1Title">Rent On Vehicles</h2></center>
                   
                    <marquee>
              <h3 style={{ color: "#FFA07A" }}>
                <i>Car rental service with smiling prices..!</i>
              </h3>
            </marquee> <br />
                        <div className='row'>
                        <div className='col-3 buttons'>
                            <Link to="/searchvehicle" type="button" className="btn btn-secondary">
                            <FaIcons.FaSearch /> 
                             &nbsp;&nbsp;
                                Search Vehicle Details
                            </Link>
                            <br />
                        </div>
                        

                       </div>

                        <br/>


                        
                        <table id="carTable">
                            <thead className="thead-light">
                                <tr>
                                    
                                    <th>Vehicle Model</th>
                                    <th>Rent Price</th>
                                    <th>Description</th>
                    


                                </tr>
                            </thead>
                            <tbody>
                                {this.addvehicleMembersList()}
                            </tbody>
                        </table>
                    </div></div></div>
        )
    }
}