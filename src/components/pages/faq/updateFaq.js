import React, { Component } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import axios from "axios";
import "../vehicle.css";
import swal from "sweetalert";

export default class UpdateFaq extends Component {
  constructor(props) {
    super(props);

    //binding data to the methods
    this.onChangeQuestion = this.onChangeQuestion.bind(this);
    this.onChangeAnswer = this.onChangeAnswer.bind(this);
    this.onChangeAddDate = this.onChangeAddDate.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      questionId: "",
      question: "",
      answer: "",
      addDate: new Date(),
    };
  }

  componentDidMount() {
    axios
      .get("http://localhost:4800/faqs/" + this.props.match.params.id)
      .then((response) => {
        this.setState({
          questionId: response.data.questionId,
          question: response.data.question,
          answer: response.data.answer,
          addDate: new Date(response.data.addDate),
        });
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  onChangeQuestionId(e) {
    this.setState({
      questionId: e.target.value,
    });
  }

  onChangeQuestion(e) {
    this.setState({
      question: e.target.value,
    });
  }

  onChangeAnswer(e) {
    this.setState({
      answer: e.target.value,
    });
  }

  onChangeAddDate(date) {
    this.setState({
      addDate: date,
    });
  }

  onSubmit(e) {
    e.preventDefault();

    const faq = {
      questionId: this.state.questionId,
      question: this.state.question,
      answer: this.state.answer,
      addDate: this.state.addDate,
    };

    //sumbit faq details to the database
    console.log(faq);

    axios
      .put(
        "http://localhost:4800/faqs/update/" + this.props.match.params.id,
        faq
      )
      .then((res) => console.log(res.data));

    swal("FAQ Details Updated Succesfully");
    window.location = "/viewFaq";
  }

  render() {
    return (
      <div className="addvehiclePage">
        <br />
        <div className="container" id="addRegisterForm">
          <h3 className="addvehicleTitle">UPDATE FAQ DETAILS</h3>
          <form onSubmit={this.onSubmit}>
            <div className="form-group">
              <label className="textColour">Question ID: </label>
              <input
                type="text"
                disabled
                className="form-control"
                value={this.state.questionId}
                onChange={this.onChangeQuestionId}
              />
            </div>
            <div className="form-group">
              <label className="textColour">Question: </label>
              <input
                type="text"
                required
                className="form-control"
                value={this.state.question}
                onChange={this.onChangeQuestion}
                placeholder="Eg: What is the contact number?"
                pattern="[A-Za-z0-9' '?%.@#,]{10,}"
                title="Minimum characters length must be 10"
              />
            </div>
            <div className="form-group">
              <label className="textColour">Answer: </label>
              <input
                type="text"
                required
                className="form-control"
                value={this.state.answer}
                onChange={this.onChangeAnswer}
                placeholder="Eg: You can check the contact us details page"
                pattern="[A-Za-z0-9' '?%.@#,]{8,}"
                title="Minimum characters length must be 8"
              />
            </div>

            <div className="form-group">
              <label className="textColour">Question Added Date: </label>
              <div>
                <DatePicker
                  selected={this.state.addDate}
                  onChange={this.onChangeAddDate}
                  minDate={new Date()}
                />
              </div>
            </div>
            <br />
            <div className="form-group">
              <input
                type="submit"
                value="Update FAQ"
                className="btn btn-primary"
              />
            </div>
          </form>
        </div>
      </div>
    );
  }
}
