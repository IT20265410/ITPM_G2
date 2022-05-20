import React, { Component, useState, useEffect } from 'react'
import { Link } from 'react-router-dom';
import axios from 'axios';
import "./pharmacy.css";
import { jsPDF } from "jspdf";
import "jspdf-autotable";
import * as FaIcons from 'react-icons/fa';

const Madicines = props => (
    <tr>
        <td>{props.madicines.cname}</td>
    <td>{props.madicines.cemail}</td>
    <td>{props.madicines.caddress}</td>
    <td>{props.madicines.nic.substring(0,12)}</td>
    <td>{props.madicines.gender}</td>
    <td>{props.madicines.mobileno.substring(0,15)}</td>

        <td>
        <Link to={"/editcustomer/" + props.madicines._id } type="button" className="btn btn-secondary">
                <i className="far fa-edit"></i> &nbsp;&nbsp;Edit
              </Link>
              <br />
          
            
            <button onClick={() => { props.deleteMadicines(props.madicines._id) }} className="btn btn-danger"
            style={{ position: 'relative', top: "-38px", left: "110px"}}
>
            <FaIcons.FaTrash /> &nbsp;&nbsp;Delete</button>
        </td>
    </tr>
)


export default class ViewMadicines extends Component {
    constructor(props) {
        super(props);

        this.deleteMadicines = this.deleteMadicines.bind(this);

        this.state = { madicines: [] };
    }

    exportPDF = () => {
        const unit = "pt";
        const size = "A4"; // Use A1, A2, A3 or A4
    
        const marginLeft = 40;
        const doc = new jsPDF("landscape", unit, size);
    
        doc.setFontSize(15);
    
        const title = "customer Details";
        const headers = [
          [
            "Customer ID",
            "Customer Name",
            "Customer Email",
            "NIC",
            "Gender",
            "Contact No",
          ],
        ];
    
        const madicines = this.state.madicines.map((elt) => [
          elt._id,
          elt.cname,
          elt.cemail,
          elt.nic,
          elt.gender,
          elt.mobileno,
          
        ]);
    
        let content = {
          startY: 50,
          head: headers,
          body: madicines,
        };
    
        doc.text(title, marginLeft, 40);
        doc.autoTable(content);
        doc.save("customer.pdf");
      };


    componentDidMount() {
        axios.get('http://localhost:4800/madicines/')
            .then(response => {
                this.setState({ madicines: response.data })
            })
            .catch((error) => {
                console.log(error);
            })
    }

    deleteMadicines(id) {
        axios.delete('http://localhost:4800/madicines/' + id)
            .then(res => console.log(res.data));

        this.setState({
            madicines: this.state.madicines.filter(sml => sml._id !== id)
        })
        alert("Delete Customer Details?")
    }

    madicinesList() {
        return this.state.madicines.map(currentmadicines => {
            return <Madicines madicines={currentmadicines} deleteMadicines={this.deleteMadicines} key={currentmadicines._id} />;
        })
    }



    render() {
        return (
            <div className='viewMedicinePage'>
                <br />
                
                <div className='container' id="viewMedicineForm">

                <h3 className="viewMedicineTitle">CUSTOMERS LIST</h3>
                    <br />

                    <div className="row">
            <div className="col-2 buttons">
              <Link to="/create" type="button" className="btn btn-primary">
                <i className="far fa-plus-square"></i> &nbsp;&nbsp;Add Customer
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
                  to="/searchCustomer"
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
                            <th style={{ width: "220px" }} className="viewlist">Customer Name</th> 
                        <th className="viewlist">Email</th> 
                        <th className="viewlist">Address</th> 
                        <th className="viewlist">NIC</th> 
                        <th className="viewlist">Gender</th> 
                        <th className="viewlist">MobileNo</th> 
                        <th style={{ width: "320px" }} className="viewlist"></th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.madicinesList()}
                        </tbody>
                    </table>
             
                    
                </div>
            </div>
        )
    }
}