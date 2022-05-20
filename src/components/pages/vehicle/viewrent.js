import React, { Component } from 'react';
import axios from 'axios';
import { Link, Redirect } from "react-router-dom";
import swl from "sweetalert";
import { jsPDF } from "jspdf";
import "jspdf-autotable";
import * as FaIcons from 'react-icons/fa';
import '../vehicle.css';

const Rentv = props => (
    <tr>
        
        <td>{props.rentv.vid}</td>
        <td>{props.rentv.cname}</td>
        <td>{props.rentv.idate.substring(0,10)}</td>
        <td>{props.rentv.ddate.substring(0,10)}</td>
        <td>{props.rentv.status}</td>

        <td>
            <Link to={"/editrent/" + props.rentv._id } type="button" className="btn btn-secondary">
                <i className="far fa-edit"></i> &nbsp;&nbsp;Edit
              </Link>
              <br />
          
            
            <button onClick={() => { props.deleteRentv(props.rentv._id) }} className="btn btn-danger"
            style={{ position: 'relative', top: "-38px", left: "110px"}}
>
            <FaIcons.FaTrash /> &nbsp;&nbsp;Delete</button>
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
            <div id='addvehiclePage' className='viewTfee'>
                <br />
                <div className='container'>
                    <div id='covidbar' >
                       
                        <center><h3 className="addcovid1Title">Rent on Vehicles</h3></center>

                        <div className="row">
            <div className="col-2 buttons">
              <Link to="/rentv" type="button" className="btn btn-primary">
                <i className="far fa-plus-square"></i> &nbsp;&nbsp;Add Rent Details
              </Link>
              <br />
            </div>
            <div className="col-3 buttons2">
              <Link
                onClick={() => this.exportPDF()}
                className="btn btn-warning"
              ><FaIcons.FaFilePdf /> 
                &nbsp;&nbsp;Genarate Report
              </Link>
              <br />
              <br />
            </div>
            <div className="col-6 buttons2">
              <div className="col-4 buttons" style={{ marginLeft: "500px" }}>
                <Link
                  to="/searchrent"
                  type="button"
                  className="btn btn-success"
                ><FaIcons.FaSearch /> 
                &nbsp;&nbsp;
                  Search Details
                </Link>
                <br />
              </div>
            </div>
          </div>
          <br />
        

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