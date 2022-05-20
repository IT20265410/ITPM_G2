import React, { Component, useState, useEffect } from 'react'
import { Link } from 'react-router-dom';
import axios from 'axios';
import swl from "sweetalert";

import "./customer.css";
import { jsPDF } from "jspdf";
import "jspdf-autotable";
import * as FaIcons from 'react-icons/fa';

const Contacts = props => (
    <tr>
    <td>{props.contacts.nate}</td>
    <td>{props.contacts.natn.substring(0,15)}</td>
    <td>{props.contacts.prte}</td>
    <td>{props.contacts.prtn.substring(0,15)}</td>
    <td>{props.contacts.rvote}</td>
    <td>{props.contacts.rvotn.substring(0,15)}</td>
    <td>{props.contacts.bde}</td>
    <td>{props.contacts.bdn.substring(0,15)}</td> 
    <td>
    <Link to={"/Editcontact/" +  props.contacts._id } type="button" className="btn btn-secondary">
                <i className="far fa-edit"></i> &nbsp;&nbsp;Edit
              </Link>
              <br />
          
            
            <button onClick={() => { props.deleteContacts(props.contacts._id) }} className="btn btn-danger"
            style={{ position: 'relative', top: "8px"}}
>
            <FaIcons.FaTrash /> &nbsp;&nbsp;Delete</button>
    </td>
    </tr>
)
 
export default class ViewContacts extends Component {
    constructor(props) {
        super(props);
        this.deleteContacts = this.deleteContacts.bind(this);
        this.state = { contacts: [] };
    }

    exportPDF = () => {
        const unit = "pt";
        const size = "A4"; // Use A1, A2, A3 or A4
    
        const marginLeft = 40;
        const doc = new jsPDF("landscape", unit, size);
    
        doc.setFontSize(15);
    
        const title = "Contacts Details";
        const headers = [
          [
            "National Advertising Team Email",
            "National Advertising Team Number",
            "Public Relations Team Email",
            "Public Relations Team Number",
            "Rath Vahana.lk Offices Team Email",
            "Rath Vahana.lk Offices Team Number",
            "Billing Department Email",
            "Billing Department Number",
          ],
        ]; 
        const contacts = this.state.contacts.map((elt) => [
          elt._id,
          elt.nate,
          elt.natn,
          elt.prte,
          elt.prtn,
          elt.rvote,
          elt.rvotn,
          elt.bde,
          elt.bdn,

        ]); 
        let content = {
          startY: 50,
          head: headers,
          body: contacts,
        }; 
        doc.text(title, marginLeft, 40);
        doc.autoTable(content);
        doc.save("contacts.pdf");
      }; 
    componentDidMount() {
        axios.get('http://localhost:4800/contacts/')
            .then(response => {
                this.setState({ contacts: response.data })
            })
            .catch((error) => {
                console.log(error);
            })
    } 

    deleteContacts = (id) => {
      swl({
        title: "Are you sure?",
        text: "Once deleted, you will not be able to recover this file!",
        icon: "warning",
        buttons: ["Cancel", "Delete"],
        dangerMode: true,
      }).then((willDelete) => {
        if (willDelete) {
          axios.delete(`http://localhost:4800/contacts/${id}`).then((res) => {
            swl("Contact Deleted Succesfully.", {
              icon: "success",
            });
            this.setState({
              contacts: this.state.contacts.filter((el) => el._id !== id),
            });
          });
        }
      });
    };
  



    contactsList() {
        return this.state.contacts.map(currentcontacts => {
            return <Contacts contacts={currentcontacts} deleteContacts={this.deleteContacts} key={currentcontacts._id} />;
        })
    } 
    render() {
        return (
            <div className='viewCustomerPage'>
                <br /> 
                <h3 className="viewCustomerTitle">CONTACTS LIST</h3>
                    <br />
                <div className='container' id="viewCustomerForm"> 
                <div className="row">
            <div className="col-2 buttons">
              <Link to="/create-contacts" type="button" className="btn btn-primary">
                <i className="far fa-plus-square"></i> &nbsp;&nbsp;Add Contact
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
                  to="/searchContact"
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
                    
                    <table  style={{ marginLeft: "-55px", width: "110%" }} className="table">
                        <thead className="thead-light">
                        <tr>
                        <th>National Advertising Team Email</th> 
                        <th>National Advertising Team Number</th> 
                        <th>Public Relations Team Email</th> 
                        <th>Public Relations Team Number</th> 
                        <th>Rath Vahana.lk Offices Team Email</th> 
                        <th>Rath Vahana.lk Offices Team Number</th>
                        <th>Billing Department Email</th> 
                        <th>Billing Department Number</th> 
                        <th style={{ width: "160px" }}>Actions</th>
                        </tr>
                        </thead>
                        <tbody>
                            {this.contactsList()}
                        </tbody>
                    </table>                
                </div>
            </div>
        )
    }
}