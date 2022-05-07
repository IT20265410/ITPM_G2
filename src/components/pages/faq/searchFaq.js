import React, { useState, useEffect } from "react";
import axios from "axios";
import "../vehicle.css";

function SearchBarFaq() {
  const [search, setSearch] = useState("");
  const [faqs, setFaq] = useState([]);
  const [filteredData, setFilteredData] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:5000/faqs/").then((response) => {
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
    <div className="addCovidPage">
      <br />
      <div className="container" id="searchRegisterVaccineForm">
        <h3 className="searchRegisterVaccineTitle">SEARCH FAQs' DETAILS</h3>
        <br />
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
        <table className="table">
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
