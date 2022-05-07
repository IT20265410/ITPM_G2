import React, { Component } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import axios from "axios";
import swal from "sweetalert";
import "bootstrap/dist/css/bootstrap.min.css";
import "../vehicle.css";

export default class CreateOffer extends Component {
  constructor(props) {
    super(props);

    //binding data to the methods
    this.onChangeofferId = this.onChangeofferId.bind(this);
    this.onChangeOfferName = this.onChangeOfferName.bind(this);
    this.onChangeOfferCode = this.onChangeOfferCode.bind(this);
    this.onChangeOfferDescription = this.onChangeOfferDescription.bind(this);
    this.onChangeSpecialNotice = this.onChangeSpecialNotice.bind(this);
    this.onChangeStartingDate = this.onChangeStartingDate.bind(this);
    this.onChangeEndingDate = this.onChangeEndingDate.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      offerId: "",
      offerName: "",
      offerCode: "",
      offerDescription: "",
      specialNotice: "",
      startingDate: new Date(),
      endingDate: new Date(),
    };
  }

  onChangeofferId(e) {
    this.setState({
      offerId: e.target.value,
    });
  }

  onChangeOfferName(e) {
    this.setState({
      offerName: e.target.value,
    });
  }

  onChangeOfferCode(e) {
    this.setState({
      offerCode: e.target.value,
    });
  }

  onChangeOfferDescription(e) {
    this.setState({
      offerDescription: e.target.value,
    });
  }

  onChangeSpecialNotice(e) {
    this.setState({
      specialNotice: e.target.value,
    });
  }

  onChangeStartingDate(date) {
    this.setState({
      startingDate: date,
    });
  }

  onChangeEndingDate(date) {
    this.setState({
      endingDate: date,
    });
  }

  onSubmit(e) {
    e.preventDefault();

    const offer = {
      offerId: this.state.offerId,
      offerName: this.state.offerName,
      offerCode: this.state.offerCode,
      offerDescription: this.state.offerDescription,
      specialNotice: this.state.specialNotice,
      startingDate: this.state.startingDate,
      endingDate: this.state.endingDate,
    };

    //sumbit offer to the database
    console.log(offer);

    axios
      .post("http://localhost:5000/offers/add", offer)
      .then((res) => console.log(res.data));

    swal("Offer Added Succesfully");
    window.location = "/viewOffer";
  }

  displayOffer = (value) => () => {
    console.log(value);
  };

  render() {
    return (
      <div className="addCovidPage">
        <br />
        <div className="container" id="addRegisterForm">
          <h3 className="addcovidTitle">ADD NEW OFFER</h3>
          <form onSubmit={this.onSubmit}>
            <div className="form-group">
              <label className="textColour">Offer ID: </label>
              <input
                type="text"
                required
                className="form-control"
                value={this.state.offerId}
                onChange={this.onChangeofferId}
                pattern="[OFF,0-9]{5,10}"
                title="Must begin with 'OFF' with any numbers (5 to 10 characters must contain)"
                placeholder="Eg: OFF001"
                maxLength={10}
              />
            </div>
            <div className="form-group">
              <label className="textColour">Offer Name: </label>
              <input
                type="text"
                required
                className="form-control"
                value={this.state.offerName}
                onChange={this.onChangeOfferName}
                pattern="[A-Za-z' ']{8,}"
                title="Minimum characters length must be 8"
                placeholder="Eg: New Year Sale"
              />
            </div>
            <div className="form-group">
              <label className="textColour">Offer Code: </label>
              <input
                type="text"
                required
                className="form-control"
                value={this.state.offerCode}
                onChange={this.onChangeOfferCode}
                pattern="[A-Za-z0-9]{6,8}"
                title="Offer code must contain 6 to 8 characters"
                placeholder="Eg: NEW0415"
                maxLength={8}
              />
            </div>
            <div className="form-group">
              <label className="textColour">Offer Description: </label>
              <input style={{height: "100px"}}
                type="text"
                required
                className="form-control"
                value={this.state.offerDescription}
                onChange={this.onChangeOfferDescription}
                pattern="[A-Za-z0-9' '%./@]{10,}"
                title="Minimum characters length must be 10"
                placeholder="Eg: Shop with us and get up to 25% in this mid year. Click on the 'Contact Us' for more details. "
              />
            </div>
            <div className="form-group">
              <label className="textColour">Special Notice: </label>
              <input
                type="text"
                className="form-control"
                value={this.state.specialNotice}
                onChange={this.onChangeSpecialNotice}
                pattern="[A-Za-z0-9' '%./@]{10,}"
                title="Minimum characters length must be 10"
                placeholder="Eg: Be the among first 10 callers and get 5% off"
              />
            </div>
            <div className="form-group">
              <label className="textColour">Starting Date: </label>
              <div>
                <DatePicker
                  selected={this.state.startingDate}
                  onChange={this.onChangeStartingDate}
                  minDate={new Date()}
                />
              </div>
            </div>

            <div className="form-group">
              <label className="textColour">Ending Date: </label>
              <div>
                <DatePicker
                  selected={this.state.endingDate}
                  onChange={this.onChangeEndingDate}
                  minDate={new Date()}
                />
              </div>
            </div>

            <br />
            <div className="form-group">
              <input
                style={{ border: "2px blue" }}
                type="submit"
                value="Add Offer"
                className="btn btn-primary"
              />
            </div>
          </form>
        </div>
      </div>
    );
  }
}
