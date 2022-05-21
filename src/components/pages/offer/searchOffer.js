import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import '../vehicle.css';
import * as FaIcons from "react-icons/fa";

function SearchBar() {
    const [search, setSearch] = useState('');
    const [offers, setOffer] = useState([]);
    const [filteredData, setFilteredData] = useState([]);

    useEffect(() => {
        axios.get("http://localhost:4800/offers/").then((response) => {
          setOffer(response.data);
        });
    }, [])

    useEffect(
      () => {
        setFilteredData(
          offers.filter((offers) =>
            offers.offerName.toLowerCase().includes(search.toLowerCase())
          ) ||
            offers.filter((offers) =>
              offers.offerId.toLowerCase().includes(search.toLowerCase())
            )
        );
      },
      [search],
      offers
    );


    return (
      <div className="addvehiclePage">
        <br />
        <div className="container" id="searchVehicleForm">
          <h3 className="searchRegisterVaccineTitle">SEARCH OFFER DETAILS</h3>
          <br />
          <div>
            <div>
              <Link to="/viewOffer" type="button" className="btn btn-primary">
                <FaIcons.FaAngleLeft />
                &nbsp;&nbsp; Back
              </Link>
              <br />
            </div>
          </div>
          <br />
          <h5>Enter offer name to view details </h5>
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
                <th>Offer Details</th>
              </tr>
            </thead>
            <tbody>
              {filteredData.map((val) => {
                return (
                  <div key={val.id}>
                    <td>{val.offerId}</td>
                    <td>{val.offerName}</td>
                    <td>{val.offerCode}</td>
                    <td>{val.offerDescription}</td>
                    <td>{val.specialNotice}</td>
                    <td>{val.startingDate.substring(0, 10)}</td>
                    <td>{val.endingDate.substring(0, 10)}</td>
                  </div>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    );
}

export default SearchBar;