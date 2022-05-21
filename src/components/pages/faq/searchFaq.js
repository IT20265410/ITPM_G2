import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "../vehicle.css";
import * as FaIcons from "react-icons/fa";

function SearchBarFaq() {
  const [search, setSearch] = useState("");
  const [faqs, setFaq] = useState([]);
  const [filteredData, setFilteredData] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:4800/faqs/").then((response) => {
      setFaq(response.data);
    });
  }, []);

  useEffect(
    () => {
      setFilteredData(
        faqs.filter((faqs) =>
          faqs.question.toLowerCase().includes(search.toLowerCase())
        ) ||
          faqs.filter((faqs) =>
            faqs.answer.toLowerCase().includes(search.toLowerCase())
          )
      );
    },
    [search],
    faqs
  );

  return (
    <div className="addvehiclePage">
      <br />
      <div className="container" id="searchVehicleForm">
        <h3 className="searchRegisterVaccineTitle">SEARCH FAQ DETAILS</h3>
        <br />
        <div>
          <div>
            <Link to="/viewFaq" type="button" className="btn btn-primary">
              <FaIcons.FaAngleLeft />
              &nbsp;&nbsp; Back
            </Link>
            <br />
          </div>
        </div>
        <br />
        <h5>Enter question to view details </h5>
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
        <table id="offerTable" style={{ fontSize: "14pt" }}>
          <thead className="thead-light">
            <tr>
              <th>Freaquently Asked Questions Details</th>
            </tr>
          </thead>
          <tbody>
            {filteredData.map((val) => {
              return (
                <div key={val.id}>
                  <td>{val.question}</td>
                  <td>{val.answer}</td>
                </div>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default SearchBarFaq;
