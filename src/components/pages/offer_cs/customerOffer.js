import React, { Component } from "react";
import axios from "axios";
import '../vehicle.css';

const Offer = (props) => (
  <tr>
    <td>{props.offer.offerName}</td>
    <td>{props.offer.offerCode}</td>
    <td>{props.offer.offerDescription}</td>
    <td>{props.offer.specialNotice}</td>
    <td>{props.offer.startingDate.substring(0, 10)}</td>
    <td style={{ color: "red", fontWeight:"Bold" }}>{props.offer.endingDate.substring(0, 10)}</td>
  </tr>
);

export default class CustomerOffer extends Component {
  constructor(props) {
    super(props);

    this.state = { offers: [] };
  }

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


  offerList() {
    return this.state.offers.map((currentoffer) => {
      return (
        <Offer
          offer={currentoffer}
          key={currentoffer._id}
        />
      );
    });
  }

  render() {
    return (
      <div className="CustomerOffer">
        <div className="container">
          <br />
          <div>
            <center>
              <h2>Offers</h2>
            </center>
          </div>
          <br />
          <center>
            <marquee>
              <h3 style={{ color: "maroon" }}>
                <i>Limited time offers...Grab it soon before ends it!!!</i>
              </h3>
            </marquee>
          </center>
          <br />

          <table id="offerTable">
            <thead className="thead-light">
              <tr>
                <th style={{ width: "160px" }}>Offer Name</th>
                <th>Offer Code</th>
                <th style={{ width: "290px" }}>Offer Description</th>
                <th style={{ width: "240px" }}>Special Notice</th>
                <th style={{ width: "150px" }}>Starting Date</th>
                <th style={{ width: "150px" }}>Ending Date</th>
              </tr>
            </thead>
            <tbody>{this.offerList()}</tbody>
          </table>
        </div>
      </div>
    );
  }
}
