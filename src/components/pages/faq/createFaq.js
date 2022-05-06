import React, { Component } from "react";
import axios from "axios";
import swal from "sweetalert";
import "bootstrap/dist/css/bootstrap.min.css";
import "../vehicle.css";

export default class CreateFaq extends Component {
  constructor(props) {
    super(props);

    //binding data to the methods
    this.onChangeQuestionId = this.onChangeQuestionId.bind(this);
    this.onChangeQuestion = this.onChangeQuestion.bind(this);
    this.onChangeAnswer = this.onChangeAnswer.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      questionId: "",
      question: "",
      answer: "",
    };
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

  onSubmit(e) {
    e.preventDefault();

    const faq = {
      questionId: this.state.questionId,
      question: this.state.question,
      answer: this.state.answer,
    };

    //sumbit faq details to the database
    console.log(faq);

    axios
      .post("http://localhost:5000/faqs/add", faq)
      .then((res) => console.log(res.data));

    swal("FAQ Added Succesfully");
    window.location = "/viewFaq";
  }

  displayFaq = (value) => () => {
    console.log(value);
  };

  render() {
    return (
      <div className="addCovidPage">
        <br />
        <div className="container" id="addRegisterForm">
          <h3 className="addcovidTitle">ADD NEW FAQ</h3>
          <form onSubmit={this.onSubmit}>
            <div className="form-group">
              <label className="textColour">Question ID: </label>
              <input
                type="text"
                required
                className="form-control"
                value={this.state.questionId}
                onChange={this.onChangeQuestionId}
                placeholder="Eg: QU001"
                pattern="[QU,0-9]{5,8}"
                title="Must begin with 'QU' with any numbers (5 to 8 characters must contain)"
                maxLength={8}
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
                pattern="[A-Za-z0-9' '?%.@#]{10,}"
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
                pattern="[A-Za-z0-9' '?%.@#]{8,}"
                title="Minimum characters length must be 8"
              />
            </div>
            <br />
            <div className="form-group">
              <input
                type="submit"
                value="Add FAQ"
                className="btn btn-primary"
              />
            </div>
          </form>
        </div>
      </div>
    );
  }
}
