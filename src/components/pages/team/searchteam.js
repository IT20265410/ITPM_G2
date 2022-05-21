import React, { useState, useEffect } from "react";
import axios from "axios";
import '../vehicle.css';
import * as FaIcons from "react-icons/fa";
import { Link } from "react-router-dom";

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
                <h3 className="searchRegisterTitle">SEARCH TEAM MEMBER DETAILS</h3>
                <br /><br />
                <div>
            <div>
              <Link to="/viewm" type="button" className="btn btn-primary">
                <FaIcons.FaAngleLeft />
                &nbsp;&nbsp; Back
              </Link>
              <br />
            </div>
          </div>
                <h5>Enter Member Name to view Details </h5>
                <br />
                <input
            className="searchBar"
            type="text"
            placeholder="Search..."
            onChange={(e) => {
              setSearch(e.target.value);
            }}
          />
          <br />
          <br />
          <table id="offerTable" style={{ fontSize: "12pt" }}>
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