import React, { useState, useEffect } from "react";
import axios from "axios";
import '../vehicle.css';

function SearchBar() {
    const [search, setSearch] = useState('');
    const [team, setTeam] = useState([]);
    const [filteredData, setFilteredData] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:4800/team/')
            .then((response) => {
                setTeam(response.data);
            })
    }, [])

    useEffect(() => {
        setFilteredData(
            team.filter((team) => team.name.toLowerCase().includes(search.toLowerCase())) ||
            team.filter((team) => team.id.toLowerCase().includes(search.toLowerCase()))
        )
    }, [search], team)


    return (
        <div className="addvehiclePage">
            <br />
            <div className='container' id="searchVehicleForm">
                <h3 className="searchRegisterVaccineTitle">SEARCH EMPLOYEE DETAILS</h3>
                <br /><br />
                <h5>Enter Member Name to view Details </h5>
                <br />
                <input className="searchBar" type="text" placeholder="Search Team Member" onChange={(e) => {
                    setSearch(e.target.value);
                }} />
                <br /><br />
                <table className="table">
                    <thead className="thead-light">
                        <tr>
                            <th>Team Member Details</th>
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