import React, { Component } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import axios from "axios";
import "../vehicle.css";
import swal from 'sweetalert';

export default class UpdateOffer extends Component {
  constructor(props) {
    super(props);

    //binding data to the methods
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

  componentDidMount() {
    axios
      .get("http://localhost:5000/offers/" + this.props.match.params.id)
      .then((response) => {
        this.setState({
          offerId: response.data.offerId,
          offerName: response.data.offerName,
          offerCode: response.data.offerCode,
          offerDescription: response.data.offerDescription,
          specialNotice: response.data.specialNotice,
          startingDate: new Date(response.data.startingDate),
          endingDate: new Date(response.data.endingDate),
        });
      })
      .catch(function (error) {
        console.log(error);
      });

    // axios
    //   .get("http://localhost:5000/offers/")
    //   .then((response) => {
    //     if (response.data.length > 0) {
    //       this.setState({
    //         offers: response.data.map((offer) => offer.offerId),
    //       })
    //     }
    //   })
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
      .post(
        "http://localhost:5000/offers/update/" + this.props.match.params.id,
        offer
      )
      .then((res) => console.log(res.data));

    swal("Offer Updated Succesfully");
    window.location = "/viewOffer";
  }

  // displayOffer = (value) => () => {
  //   console.log(value);
  // };

  render() {
    return (
      <div className="addCovidPage">
        <br />
        <div className="container" id="addRegisterForm">
          <h3 className="addcovidTitle">UPDATE OFFER DETAILS</h3>
          <form onSubmit={this.onSubmit}>
            <div className="form-group">
              <label className="textColour">Offer ID: </label>
              <input
                type="text"
                disabled
                className="form-control"
                value={this.state.offerId}
                onChange={this.onChangeOfferId}
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
                disabled
              />
            </div>
            <div className="form-group">
              <label className="textColour">Offer Description: </label>
              <input
                style={{ height: "100px" }}
                type="text"
                required
                className="form-control"
                value={this.state.offerDescription}
                onChange={this.onChangeOfferDescription}
              />
            </div>

            <div className="form-group">
              <label className="textColour">Special Notice: </label>
              <input
                type="text"
                className="form-control"
                value={this.state.specialNotice}
                onChange={this.onChangeSpecialNotice}
              />
            </div>

            <div className="form-group">
              <label className="textColour">Starting Date: </label>
              <div>
                <DatePicker
                  selected={this.state.startingDate}
                  onChange={this.onChangeStartingDate}
                />
              </div>
            </div>

            <div className="form-group">
              <label className="textColour">Ending Date: </label>
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
                value="Update Offer"
                className="btn btn-primary"
              />
            </div>
          </form>
        </div>
      </div>
    );
  }
}