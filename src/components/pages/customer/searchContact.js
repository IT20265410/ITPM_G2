import React, { useState, useEffect } from "react";
import axios from "axios";
import './customer.css';

function SearchBar() {
    const [search, setSearch] = useState('');
    const [contacts, setContacts] = useState([]);
    const [filteredData, setFilteredData] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:4800/contacts/')
            .then((response) => {
                setContacts(response.data);
            })
    }, [])

    useEffect(() => {
        setFilteredData(
            contacts.filter((contacts) => contacts.nate.toLowerCase().includes(search.toLowerCase())) ||
            contacts.filter((contacts) => contacts.prte.toLowerCase().includes(search.toLowerCase())) ||
            contacts.filter((contacts) => contacts.bde.toLowerCase().includes(search.toLowerCase())) ||
            contacts.filter((contacts) => contacts.rvote.toLowerCase().includes(search.toLowerCase()))
        )
    }, [search], contacts)

    return (
        <div className="searchCustomerPage">
            <br />
            <div className='container' id="searchCustomerForm">
                <h3 className="searchCustomerTitle">SEARCH CONTACT DETAILS</h3>
                <h5>Enter Contact Number or Email To View Contact Email And Contact Number </h5>
                <br />
                <input className="searchBar" type="text" placeholder="Search..." onChange={(e) => {
                    setSearch(e.target.value); 
                }} />
                <br /><br />
                <table id="offerTable">
                    <thead className="thead-light" >
                        <tr>
                            <th style={{color:"black"}}>Contact Details</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredData.map((val) => {
                            return <div key={val.id}>
                                <td>{val.nate}</td>
                                <td>{val.natn}</td>
                                <td>{val.prte}</td>
                                <td>{val.prtn}</td>
                                <td>{val.rvote}</td>
                                <td>{val.rvotn}</td>
                                <td>{val.bde}</td>
                                <td>{val.bdn}</td>
                            </div>
                        })}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default SearchBar;