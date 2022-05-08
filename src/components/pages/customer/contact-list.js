import React, { Component, useState, useEffect } from 'react'
import { Link } from 'react-router-dom';
import axios from 'axios';
import "./pharmacy.css";
import { jsPDF } from "jspdf";
import "jspdf-autotable";

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
        <Link to={"/Editcontact/" + props.contacts._id}>edit</Link> | <a href="contact-list" onClick={() => { props.deleteContacts(props.contacts._id) }}>delete</a>
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
    deleteContacts(id) {
        axios.delete('http://localhost:4800/contacts/' + id)
            .then(res => console.log(res.data));

        this.setState({
            contacts: this.state.contacts.filter(sml => sml._id !== id)
        })
        alert("Delete Contacts Details?")
    } 
    contactsList() {
        return this.state.contacts.map(currentcontacts => {
            return <Contacts contacts={currentcontacts} deleteContacts={this.deleteContacts} key={currentcontacts._id} />;
        })
    } 
    render() {
        return (
            <div className='viewMedicinePage'>
                <br /> 
                <div className='container' id="viewMedicineForm"> 
                        <div className='row'>
                        <div className='col-2 buttons'>
                            <Link to="/searchContact" type="button" className="btn btn-secondary">
                            Search Contacts
                            </Link>
                            <br />
                        </div> 
                        <div className='col-4 buttons'>
                            <Link to="/create" type="button" className="btn btn-primary">
                            Add Contacts
                            </Link>
                            <br />
                        </div></div> 
                        <br/> 
                        <div className="col-3 buttons2">
            <Link onClick={() => this.exportPDF()} className="btn btn-warning">
              &nbsp;&nbsp;Genarate Report
            </Link>
            <br />
            <br />
            </div>
                    <h3 className="viewMedicineTitle">CONTACTS LIST</h3>
                    <br />
                    <table className="table">
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
                        <th>Actions</th>
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