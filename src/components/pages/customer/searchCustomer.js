import React, { useState, useEffect } from "react";
import axios from "axios";
import './customer.css';

function SearchBar() {
    const [search, setSearch] = useState('');
    const [customers, setCustomers] = useState([]);
    const [filteredData, setFilteredData] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:4800/customers/')
            .then((response) => {
                setCustomers(response.data);
            })
    }, [])

    useEffect(() => {
        setFilteredData(
            customers.filter((customers) => customers.cname.toLowerCase().includes(search.toLowerCase()))||
            customers.filter((customers) => customers.id.toLowerCase().includes(search.toLowerCase()))
        )
    }, [search], customers)

    return (
        <div className="searchMadicinePage">
            <br />
            <div className='container' id="searchMadicinForm">
                <h2 className="searchMadicinTitle">SEARCH CUSTOMER DETAILS</h2>
                <br />
                <h5 >Enter Customer Name To View Customer Name And Details </h5>
                <br />
                <input className="searchBar" type="text" placeholder="Search..." onChange={(e) => {
                    setSearch(e.target.value); 
                }} />
                <br /><br />
                <table className="table">
                    <thead className="thead-light">
                        <tr>
                            <th>Customer Details</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredData.map((val) => {
                            return <div key={val.id}>
                                <td>{val.cname}</td>
                                <td>{val.cemail}</td>
                                <td>{val.caddress}</td>
                                <td>{val.nic}</td>
                                <td>{val.gender}</td>
                                <td>{val.mobileno}</td>
                            </div>
                        })}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default SearchBar;