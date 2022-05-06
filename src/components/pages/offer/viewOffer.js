import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import swl from "sweetalert";
import { jsPDF } from "jspdf";
import "jspdf-autotable";

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
      <Link to={"/updateOffer/" + props.offer._id}>Edit</Link> |
      <a
        href="#"
        onClick={() => {
          props.deleteOffer(props.offer._id);
        }}
      >
        delete
      </a>
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
      .get("http://localhost:5000/offers/")
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
        axios.delete(`http://localhost:5000/offers/${id}`).then((res) => {
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

  // filterData(offers, searchKey) {
  //   const result = offers.filter(
  //     (offers) =>
  //       offers.offerId.toLowerCase().includes(searchKey) ||
  //       offers.offerName.toLowerCase().includes(searchKey) ||
  //       offers.offerCode.toLowerCase().includes(searchKey) ||
  //       offers.offerDescription.toLowerCase().includes(searchKey) ||
  //       offers.specialNotice.toLowerCase().includes(searchKey)
  //   );
  //   this.setState({ offers: result });
  // }

  // handleSearchArea = (e) => {
  //   const searchKey = e.currentTarget.value.toLowerCase();
  //   axios.get("http://localhost:5000/offers").then((res) => {
  //     if (res.data.success) {
  //       this.filterData(res.data.existingEmployee, searchKey);
  //     }
  //   });
  // };

  render() {
    return (
      <div className="addCovidPage">
        <div className="container">
          <br />
          <center>
            <h3> Offer Details </h3>
          </center>
          <div className="row">
            <div className="col-2 buttons">
              <Link to="/createOffer" type="button" className="btn btn-primary">
                <i className="far fa-edit"></i> &nbsp;&nbsp;Add Offer
              </Link>
              <br />
            </div>
            <div className="col-3 buttons2">
              <Link
                onClick={() => this.exportPDF()}
                className="btn btn-warning"
              >
                &nbsp;&nbsp;Genarate Report
              </Link>
              <br />
              <br />
            </div>
            <div className="col-3 buttons2" />
            <div
              className="col-3 search position-relative"
              style={{ marginTop: "2px" }}
            >
              <i className="fa fa-search"></i>{" "}
              <input
                className="form-control"
                type="Search"
                placeholder="Search an Offer"
                name="searchQuery"
                onChange={this.handleSearchArea}
              />
            </div>
          </div>
          <br />

          <table
            className="table"
            style={{ marginLeft: "-55px", width: "110%" }}
          >
            <thead className="thead-light">
              <tr>
                <th>Offer ID</th>
                <th style={{ width: "160px" }}>Offer Name</th>
                <th>Offer Code</th>
                <th style={{ width: "290px" }}>Offer Description</th>
                <th style={{ width: "240px" }}>Special Notice</th>
                <th>Starting Date</th>
                <th>Ending Date</th>
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