import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { jsPDF } from "jspdf";
import "jspdf-autotable";

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

    exportPDF = () => {
        const unit = "pt";
        const size = "A4"; // Use A1, A2, A3 or A4
    
        const marginLeft = 40;
        const doc = new jsPDF("landscape", unit, size);
    
        doc.setFontSize(15);
    
        const title = "Vehicle Details";
        const headers = [
          [
            
            "Vehicle Model",
          
            "Rent Price",
            "Description",
          ],
        ];
    
        const addvehicle = this.state.addvehicle.map((elt) => [
         
          elt.name,
         
          elt.price,
          elt.description,
          
        ]);
    
        let content = {
          startY: 50,
          head: headers,
          body: addvehicle,
        };
    
        doc.text(title, marginLeft, 40);
        doc.autoTable(content);
        doc.save("vehicle.pdf");
      };



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
              <h3 style={{ color: "red" }}>
                <i>Car rental service with smiling prices..!</i>
              </h3>
            </marquee> <br />
                        <div className='row'>
                        <div className='col-3 buttons'>
                            <Link to="/searchvehicle" type="button" className="btn btn-secondary">
                                Search Vehicle Details
                            </Link>
                            <br />
                        </div>
                        

                       </div>

                        <br/>


                        <div className="col-3 buttons2">
            <Link onClick={() => this.exportPDF()} className="btn btn-warning">
              &nbsp;&nbsp;Download Vehicle List
            </Link>
            <br />
            <br />
          </div>

                        
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