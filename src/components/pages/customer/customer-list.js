import React, { Component, useState, useEffect } from 'react'
import { Link } from 'react-router-dom';
import axios from 'axios';
import "./customer.css";
import { jsPDF } from "jspdf";
import "jspdf-autotable";

const Customers = props => (
    <tr>
        <td>{props.customers.cname}</td>
    <td>{props.customers.cemail}</td>
    <td>{props.customers.caddress}</td>
    <td>{props.customers.nic.substring(0,12)}</td>
    <td>{props.customers.gender}</td>
    <td>{props.customers.mobileno.substring(0,15)}</td>

        <td>
            <Link to={"/editcustomer/" + props.customers._id}>edit</Link> | <a href="customer-list" onClick={() => { props.deleteCustomers(props.customers._id) }}>delete</a>
        </td>
    </tr>
)


export default class ViewCustomers extends Component {
    constructor(props) {
        super(props);

        this.deleteCustomers = this.deleteCustomers.bind(this);

        this.state = { customers: [] };
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
    
        const customers = this.state.customers.map((elt) => [
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
          body: customers,
        };
    
        doc.text(title, marginLeft, 40);
        doc.autoTable(content);
        doc.save("customer.pdf");
      };


    componentDidMount() {
        axios.get('http://localhost:4800/customers/')
            .then(response => {
                this.setState({ customers: response.data })
            })
            .catch((error) => {
                console.log(error);
            })
    }

    deleteCustomers(id) {
        axios.delete('http://localhost:4800/customers/' + id)
            .then(res => console.log(res.data));

        this.setState({
            customers: this.state.customers.filter(sml => sml._id !== id)
        })
        alert("Delete Customer Details?")
    }

    customersList() {
        return this.state.customers.map(currentcustomers => {
            return <Customers customers={currentcustomers} deleteCustomers={this.deleteCustomers} key={currentcustomers._id} />;
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
                <i className="far fa-edit"></i> &nbsp;&nbsp;Add Customer
              </Link>
              <br />
            </div>
            <div className="col-3 buttons2">
              <Link
                onClick={() => this.exportPDF()}
                className="btn btn-warning"
              >
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
                >
                  Search Customer Details
                </Link>
                <br />
              </div>
            </div>
          </div>
          <br /> 
                    <table className="table">
                        <thead className="thead-light">
                            <tr>
                            <th>Customer Name</th> 
                        <th>Email</th> 
                        <th>Address</th> 
                        <th>NIC</th> 
                        <th>Gender</th> 
                        <th>MobileNo</th> 
                        <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.customersList()}
                        </tbody>
                    </table>
             
                    
                </div>
            </div>
        )
    }
}