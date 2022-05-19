import React, { Component, useState, useEffect } from 'react'
import { Link } from 'react-router-dom';
import axios from 'axios';
import "./pharmacy.css"; 

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
    </tr>
)
 
export default class ViewContacts extends Component {
    constructor(props) {
        super(props);
        this.deleteContacts = this.deleteContacts.bind(this);
        this.state = { contacts: [] };
    } 
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
            <div className='viewMedicinesPage'>
                <br /> 
                <div className='container' id="viewMedicineForm"> 
                         
                        <br/> 
                         
                    <h3 className="viewMedicineTitle">CONTACTS LIST</h3>
                    <br />
                    <marquee>
                    <h3 style={{ color: "#8B0000" }}>
                    <i>If you have an issue please contact us..!</i>
                    </h3>
                    </marquee> <br />

                    <table id="carTable">
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