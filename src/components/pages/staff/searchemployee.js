import React, { useState, useEffect } from "react";
import axios from "axios";
import '../vehicle.css';

function SearchBar() {
    const [search, setSearch] = useState('');
    const [register, setRegister] = useState([]);
    const [filteredData, setFilteredData] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:4800/register/')
            .then((response) => {
                setRegister(response.data);
            })
    }, [])

    useEffect(() => {
        setFilteredData(
            register.filter((register) => register.name.toLowerCase().includes(search.toLowerCase())) ||
            register.filter((register) => register.id.toLowerCase().includes(search.toLowerCase()))
        )
    }, [search], register)


    return (
        <div className="addvehiclePage">
            <br />
            <div className='container' id="searchVehicleForm">
                <h3 className="searchRegisterEmployeeTitle">SEARCH EMPLOYEE DETAILS</h3>
                <br /><br />
                <h5>Enter Employee Name to view Details </h5>
                <br />
                <input className="searchBar" type="text" placeholder="Search employee" onChange={(e) => {
                    setSearch(e.target.value);
                }} />
                <br /><br />
                <table className="table">
                    <thead className="thead-light">
                        <tr>
                            <th>Employee Details</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredData.map((val) => {
                            return <div key={val.id}>
                                <td>{val._id}</td>
                                <td>{val.name}</td>
                                <td>{val.email}</td>
                                <td>{val.nic}</td>
                            </div>
                        })}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default SearchBar;