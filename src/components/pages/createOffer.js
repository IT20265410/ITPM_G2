import React, { Component } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import axios from "axios";

export default class CreateOffer extends Component {
  constructor(props) {
    super(props);

    //binding data to the methods
    this.onChangeOfferId = this.onChangeOfferId.bind(this);
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

  onChangeOfferId(e) {
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

    alert("Offer Added Succesfully!");
    window.location = "/";
  }

  displayOffer = (value) => () => {
    console.log(value);
  };

  render() {
    return (
      <div className="addOffer">
        <br />
        <div className="container" id="">
          <h3 className="addOffer">ADD NEW OFFER</h3>
          <form onSubmit={this.onSubmit}>
            <div className="form-group">
              <label className="textColour">Offer ID: </label>
              <input
                type="text"
                required
                className="form-control"
                value={this.state.offerId}
                onChange={this.onChangeOfferId}
                placeholder="eg: OF001"
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
                placeholder="eg: New Year Sale"
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
                placeholder=""
              />
            </div>
            <div className="form-group">
              <label className="textColour">Offer Description: </label>
              <textarea
                required
                className="form-control"
                rows="3"
                value={this.state.offerDescription}
                onChange={this.onChangeOfferDescription}
                placeholder=""
              />
            </div>

            <div className="form-group">
              <label className="textColour">Special Notice: </label>
              <input
                type="text"
                className="form-control"
                value={this.state.specialNotice}
                onChange={this.onChangeSpecialNotice}
                placeholder=""
              />
            </div>

            <div className="form-group">
              <label>Starting Date: </label>
              <div>
                <DatePicker
                  selected={this.state.startingDate}
                  onChange={this.onChangeStartingDate}
                />
              </div>
            </div>

            <div className="form-group">
              <label>Ending Date: </label>
              <div>
                <DatePicker
                  selected={this.state.endingDate}
                  onChange={this.onChangeEndingDate}
                />
              </div>
            </div>

            <br />
            <div className="form-group">
              <input
                type="submit"
                value="ADD OFFER"
                className="btn btn-primary"
              />
            </div>
          </form>
        </div>
      </div>
    );
  }
}
