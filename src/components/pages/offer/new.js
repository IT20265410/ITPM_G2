import React, { Component } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "../vehicle.css";

const formValid = (formErrors) => {
  let valid = true;
  Object.values(formErrors).forEach((val) => {
    val.length > 0 && (valid = false);
  });
  return valid;
};

export default class New extends Component {
  constructor(props) {
    super(props);

    //binding data to the methods
    //this.onChangeOfferId = this.onChangeOfferId.bind(this);
    //this.onChangeOfferName = this.onChangeOfferName.bind(this);
    //this.onChangeOfferCode = this.onChangeOfferCode.bind(this);
    //this.onChangeOfferDescription = this.onChangeOfferDescription.bind(this);
    //this.onChangeSpecialNotice = this.onChangeSpecialNotice.bind(this);
    //this.onChangeStartingDate = this.onChangeStartingDate.bind(this);
    //this.onChangeEndingDate = this.onChangeEndingDate.bind(this);
    //this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      offerId: "",
      offerName: "",
      offerCode: "",
      offerDescription: "",
      specialNotice: "",
      startingDate: new Date(),
      endingDate: new Date(),

      formErrors: {
        offerId: "",
        offerName: "",
        offerCode: "",
        offerDescription: "",
        specialNotice: "",
        startingDate: new Date(),
        endingDate: new Date(),
      },
    };
  }

  // onChangeOfferId(e) {
  //   this.setState({
  //     offerId: e.target.value,
  //   });
  // }

  // onChangeOfferName(e) {
  //   this.setState({
  //     offerName: e.target.value,
  //   });
  // }

  // onChangeOfferCode(e) {
  //   this.setState({
  //     offerCode: e.target.value,
  //   });
  // }

//   onChangeOfferDescription(e) {
//     this.setState({
//       offerDescription: e.target.value,
//     });
//   }

//   onChangeSpecialNotice(e) {
//     this.setState({
//       specialNotice: e.target.value,
//     });
//   }

//   onChangeStartingDate(date) {
//     this.setState({
//       startingDate: date,
//     });
//   }

//   onChangeEndingDate(date) {
//     this.setState({
//       endingDate: date,
//     });
//   }

  handleInputChange = (e) => {
    const { name, value } = e.target;
    let formErrors = this.state.formErrors;
    switch (name) {
      case "offerId":
        formErrors.offerId =
          value.length < 5 || value.length > 6
            ? "Offer ID should have characters between 4 to 6"
            : "";
        break;
      case "offerName":
        formErrors.offerName =
          value.length < 5 ? "Minimum characters length must be 5" : "";
        break;
      case "offerCode":
        formErrors.offerCode =
          value.length < 8 ? "Offer code should have 8 characters" : "";
        break;
      case "offerDescription":
        formErrors.offerDescription =
          value.length < 15 ? "Minimum characters length must be 15" : "";
        break;
      case "specialNotice":
        formErrors.specialNotice =
          value.length < 10 ? "Minimum characters length must be 10" : "";
        break;
      default:
        break;
    }
    this.setState({ formErrors, [name]: value }, () =>
      console.log(this.state)
    );

    this.setState({
      ...this.state,
      [name]: value,
    });
  };

  onSubmit(e) {
    e.preventDefault();

    if (formValid(this.state.formErrors)) {
      const {
        offerId,
        offerName,
        offerCode,
        offerDescription,
        specialNotice,
        startingDate,
        endingDate,
      } = this.state;

      const offer = {
        offerId: offerId,
        offerName: offerName,
        offerCode: offerCode,
        offerDescription: offerDescription,
        specialNotice: specialNotice,
        startingDate: startingDate,
        endingDate: endingDate,
      };
      console.log(offer);
      axios.post("http://localhost:5000/offers/add", offer).then((res) => {
        if (res.offer.success) {
          toast(`New Offer Added `, {
            type: toast.TYPE.SUCCESS,
            autoClose: 4000,
          });
          this.setState({
            offerId: "",
            offerName: "",
            offerCode: "",
            offerDescription: "",
            specialNotice: "",
            startingDate: new Date(),
            endingDate: new Date(),
          });
        }
      });
    } else {
      toast(`You are Inserting a blank! `, {
        type: toast.TYPE.ERROR,
        autoClose: 4000,
      });
    }

    // const offer = {
    //   offerId: this.state.offerId,
    //   offerName: this.state.offerName,
    //   offerCode: this.state.offerCode,
    //   offerDescription: this.state.offerDescription,
    //   specialNotice: this.state.specialNotice,
    //   startingDate: this.state.startingDate,
    //   endingDate: this.state.endingDate,
    // };

    //sumbit offer to the database
    // console.log(offer);

    // axios
    //   .post("http://localhost:5000/offers/add", offer)
    //   .then((res) => console.log(res.data));

    // alert("Offer Added Succesfully!");
    // window.location = "/";
  }

  displayOffer = (value) => () => {
    console.log(value);
  };

  render() {
    const { formErrors } = this.state;
    return (
      <div className="addCovidPage">
        <br />
        <div className="container" id="addRegisterForm">
          <h3 className="addcovidTitle">ADD NEW OFFER</h3>
          <ToastContainer />
          <form className="needs-validation" noValidate>
            <div className="form-group">
              <label className="textColour">Offer ID: </label>
              <input
                type="text"
                required
                name="offerId"
                minLength="4"
                maxLength="6"
                className="form-control"
                value={this.state.offerId}
                onChange={this.handleInputChange}
                placeholder="Eg: OF001"
              />
              {formErrors.offerId.length < 4 ||
                (formErrors.offerId.length > 6 && (
                  <span style={{ color: "red" }} className="errorMessage">
                    {formErrors.offerId}
                  </span>
                ))}
            </div>
            <div className="form-group">
              <label className="textColour">Offer Name: </label>
              <input
                type="text"
                required
                name="offerName"
                className="form-control"
                value={this.state.offerName}
                onChange={this.handleInputChange}
                placeholder="Eg: New Year Sale"
              />
              {formErrors.offerName.length > 5 && (
                <span style={{ color: "red" }} className="errorMessage">
                  {formErrors.offerName}
                </span>
              )}
            </div>
            <div className="form-group">
              <label className="textColour">Offer Code: </label>
              <input
                type="text"
                required
                name="offerCode"
                maxLength={8}
                className="form-control"
                value={this.state.offerCode}
                onChange={this.handleInputChange}
                placeholder="Eg: OFFER333"
              />
              {formErrors.offerCode.length > 8 && (
                <span style={{ color: "red" }} className="errorMessage">
                  {formErrors.offerCode}
                </span>
              )}
            </div>
            <div className="form-group">
              <label className="textColour">Offer Description: </label>
              <textarea
                required
                className="form-control"
                rows="3"
                name="offerDescription"
                value={this.state.offerDescription}
                onChange={this.handleInputChange}
                placeholder="Eg: Shop with us and get up to 25% in this mid year. Click on the 'Contact Us' for more details. "
              />
              {formErrors.offerDescription.length > 15 && (
                <span style={{ color: "red" }} className="errorMessage">
                  {formErrors.offerDescription}
                </span>
              )}
            </div>

            <div className="form-group">
              <label className="textColour">Special Notice: </label>
              <input
                type="text"
                required
                name="specialNotice"
                className="form-control"
                value={this.state.specialNotice}
                onChange={this.handleInputChange}
                placeholder="Eg: Be the among first 10 callers and get 5% off"
              />
              {formErrors.specialNotice.length > 5 && (
                <span style={{ color: "red" }} className="errorMessage">
                  {formErrors.specialNotice}
                </span>
              )}
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

            <div>
              <button
                type="submit"
                className="btn btn-primary sub_btn"
                onClick={this.onSubmit}
              >
                Add Offer
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  }
}