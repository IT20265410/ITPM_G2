import React, { useState, useEffect } from "react";
import axios from "axios";
import '../vehicle.css';

function SearchBar() {
    const [search, setSearch] = useState('');
    const [addvehicle, setAddvehicle] = useState([]);
    const [filteredData, setFilteredData] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:4800/addvehicle/')
            .then((response) => {
                setAddvehicle(response.data);
            })
    }, [])

    useEffect(() => {
        setFilteredData(
            addvehicle.filter((addvehicle) => addvehicle.name.toLowerCase().includes(search.toLowerCase())) ||
            addvehicle.filter((addvehicle) => addvehicle.id.toLowerCase().includes(search.toLowerCase()))
        )
    }, [search], addvehicle)


    return (
        <div className="addvehiclePage">
            <br />
            <div className='container' id="searchVehicleForm">
                <h3 className="searchRegisterVaccineTitle">SEARCH VEHICLES' DETAILS</h3>
                <br /><br />
                <h5>Enter vehicle ID to view name </h5>
                <br />
                <input className="searchBar" type="text" placeholder="Search..." onChange={(e) => {
                    setSearch(e.target.value);
                }} />
                <br /><br />
                <table className="table">
                    <thead className="thead-light">
                        <tr>
                            <th>Vehicle Details</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredData.map((val) => {
                            return <div key={val.id}>
                                <td>{val._id}</td>
                                <td>{val.name}</td>
                                <td>{val.price}</td>
                                <td>{val.description}</td>
                            </div>
                        })}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default SearchBar;