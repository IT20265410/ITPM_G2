import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import swl from "sweetalert";
import { jsPDF } from "jspdf";
import "jspdf-autotable";
import * as FaIcons from 'react-icons/fa';

const Offer = (props) => (
  <tr>
    <td>{props.offer.offerId}</td>
    <td>{props.offer.offerName}</td>
    <td>{props.offer.offerCode}</td>
    <td>{props.offer.offerDescription}</td>
    <td>{props.offer.specialNotice}</td>
    <td>{props.offer.startingDate.substring(0, 10)}</td>
    <td>{props.offer.endingDate.substring(0, 10)}</td>
    <td>
      <center>
        <Link
          to={"/updateOffer/" + props.offer._id}
          type="button"
          className="btn btn-secondary"
        >
          <i className="far fa-edit"></i> &nbsp;&nbsp;Edit
        </Link>
        <br />

        <button
          onClick={() => {
            props.deleteOffer(props.offer._id);
          }}
          className="btn btn-danger"
          style={{ position: "relative", top:"2px" }}
        >
          <FaIcons.FaTrash /> &nbsp;&nbsp;Delete
        </button>
      </center>
    </td>
  </tr>
);

export default class ViewOffer extends Component {
  constructor(props) {
    super(props);

    this.deleteOffer = this.deleteOffer.bind(this);

    this.state = { offers: [] };
  }

  exportPDF = () => {
    const unit = "pt";
    const size = "A4"; // Use A1, A2, A3 or A4

    const marginLeft = 40;
    const doc = new jsPDF("landscape", unit, size);

    doc.setFontSize(15);

    const title = "Offers Details";
    const headers = [
      [
        "ID",
        "Name",
        "Code",
        "Description",
        "Special Notice",
        "Starting Date",
        "Ending Date",
      ],
    ];

    const offer = this.state.offers.map((elt) => [
      elt.offerId,
      elt.offerName,
      elt.offerCode,
      elt.offerDescription,
      elt.specialNotice,
      elt.startingDate.substring(0, 10),
      elt.endingDate.substring(0, 10),
    ]);

    let content = {
      startY: 50,
      head: headers,
      body: offer,
    };

    doc.text(title, marginLeft, 40);
    doc.autoTable(content);
    doc.save("Offers.pdf");
  };

  componentDidMount() {
    axios
      .get("http://localhost:4800/offers/")
      .then((response) => {
        this.setState({ offers: response.data });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  deleteOffer = (id) => {
    swl({
      title: "Are you sure?",
      text: "Once deleted, you will not be able to recover this file!",
      icon: "warning",
      buttons: ["Cancel", "Delete"],
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        axios.delete(`http://localhost:4800/offers/${id}`).then((res) => {
          swl("Offer Deleted Succesfully.", {
            icon: "success",
          });
          this.setState({
            offers: this.state.offers.filter((el) => el._id !== id),
          });
        });
      }
    });
  };

  offerList() {
    return this.state.offers.map((currentoffer) => {
      return (
        <Offer
          offer={currentoffer}
          deleteOffer={this.deleteOffer}
          key={currentoffer._id}
        />
      );
    });
  }

  render() {
    return (
      <div className="addvehiclePage">
        <div className="container">
          <br />
          <center>
            <h3> Offer Details </h3>
          </center>
          <div className="row">
            <div className="col-2 buttons">
              <Link to="/createOffer" type="button" className="btn btn-primary">
                <i className="far fa-plus-square"></i> &nbsp;&nbsp;Add Offer
              </Link>
              <br />
            </div>
            <div className="col-3 buttons2">
              <Link
                onClick={() => this.exportPDF()}
                className="btn btn-warning"
              >
                <FaIcons.FaFilePdf />
                &nbsp;&nbsp;Genarate Report
              </Link>
              <br />
              <br />
            </div>
            <div className="col-6 buttons2">
              <div className="col-4 buttons" style={{ marginLeft: "500px" }}>
                <Link
                  to="/searchOffer"
                  type="button"
                  className="btn btn-success"
                >
                  <FaIcons.FaSearch />
                  &nbsp;&nbsp; Search an Offer
                </Link>
                <br />
              </div>
            </div>
          </div>
          <br />

          <table
            className="table"
            style={{ marginLeft: "-80px", width: "116%" }}
          >
            <thead className="thead-light">
              <tr>
                <th style={{ width: "90px" }}>Offer ID</th>
                <th style={{ width: "120px" }}>Offer Name</th>
                <th style={{ width: "130px" }}>Offer Code</th>
                <th style={{ width: "280px" }}>Offer Description</th>
                <th style={{ width: "240px" }}>Special Notice</th>
                <th style={{ width: "140px" }}>Starting Date</th>
                <th style={{ width: "140px" }}>Ending Date</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>{this.offerList()}</tbody>
          </table>
        </div>
      </div>
    );
  }
}
