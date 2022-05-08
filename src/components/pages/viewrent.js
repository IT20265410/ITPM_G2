import React, { Component } from 'react';
import axios from 'axios';
import { Link, Redirect } from "react-router-dom";
import swl from "sweetalert";
import { jsPDF } from "jspdf";
import "jspdf-autotable";

import './vehicle.css';

const Rentv = props => (
    <tr>
        
        <td>{props.rentv.vid}</td>
        <td>{props.rentv.cname}</td>
        <td>{props.rentv.idate.substring(0,10)}</td>
        <td>{props.rentv.ddate.substring(0,10)}</td>
        <td>{props.rentv.status}</td>

        <td>
            <Link to={"/editrent/" + props.rentv._id}>edit</Link> | <a href="#" onClick={() => { props.deleteRentv(props.rentv._id) }}>delete</a>
        </td>
    </tr>

    
)



export default class Viewrent extends Component {
    constructor(props) {
        super(props);

        this.deleteRentv = this.deleteRentv.bind(this);

        this.state = { rentv: [] };
    }

    exportPDF = () => {
        const unit = "pt";
        const size = "A4"; // Use A1, A2, A3 or A4
    
        const marginLeft = 40;
        const doc = new jsPDF("landscape", unit, size);
    
        doc.setFontSize(15);
    
        const title = "Vehicles Rent on Details";
        const headers = [
          [
            "Vehicle ID",
            "Customer Name",
            "Issue Date",
            "Due Date",
            "Status",
          ],
        ];
    
        const rentv = this.state.rentv.map((elt) => [
          elt.vid,
          elt.cname,
          elt.idate,
          elt.ddate,
          elt.status,
          
        ]);
    
        let content = {
          startY: 50,
          head: headers,
          body: rentv,
        };
    
        doc.text(title, marginLeft, 40);
        doc.autoTable(content);
        doc.save("Rent_details.pdf");
      };

    componentDidMount() {
        axios.get('http://localhost:4800/rentv/')
            .then(response => {
                this.setState({ rentv: response.data })
            })
            .catch((error) => {
                console.log(error);
            })
    }


    deleteRentv = (id) => {
        swl({
            title: "Are you sure?",
            text: "Once deleted, you will not be able to recover this file!",
            icon: "warning",
            buttons: ["Cancel", "Delete"],

            dangerMode: true,
        }).then((willDelete) => {
            if (willDelete) {
                axios.delete(`http://localhost:4800/rentv/${id}`).then((res) => {
                    swl("Rent Details Deleted Succesfully.", {
                        icon: "success",
                    });
                    this.setState({
                        rentv: this.state.rentv.filter((el) => el._id !== id),
                    });
                });
            }
        });
    };


    rentvDetailsList() {
        return this.state.rentv.map(currentrentv => {
            return <Rentv rentv={currentrentv} deleteRentv={this.deleteRentv} key={currentrentv._id} />;
        })
    }


   

    render() {
        return (
            <div id='addCovidPage' className='viewTfee'>
                <br />
                <div className='container'>
                    <div id='covidbar' >
                       
                        <center><h3 className="addcovid1Title">Rent on Vehicles</h3></center>

                        <div className='row'>
                        <div className='col-2 buttons'>
                            <Link to="/" type="button" className="btn-secondary">
                                Search Vehicle details
                            </Link>
                            <br />
                        </div>

              <div className='col-2 buttons'>
                            <Link to="/rentv" type="button" className="btn-primary">
                             ADD VEHICLE
                            </Link>
                            <br />
                        </div></div>

                        <br/>


                        <div className="col-4 buttons2">
            <Link onClick={() => this.exportPDF()} className="btn-warning">
              &nbsp;&nbsp;Genarate Report
            </Link>
            <br />
            <br /></div>
        

                        <table className="table">
                            <thead className="thead-light">
                                <tr>
                                    <th>Vehicle ID</th>
                                    <th>Customer Name</th>
                                    <th>Issue Date</th>
                                    <th>Due Date</th>
                                    <th>Status</th>
                                    <th></th>
                                    
                                </tr>
                            </thead>
                            <tbody>
                                {this.rentvDetailsList()}
                            </tbody>
                        </table>
                    </div>
                </div></div>
        )
    }
}