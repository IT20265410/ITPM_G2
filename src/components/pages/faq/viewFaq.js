import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import swl from "sweetalert";
import { jsPDF } from "jspdf";
import "jspdf-autotable";

const Faq = (props) => (
  <tr>
    <td>{props.faq.questionId}</td>
    <td>{props.faq.question}</td>
    <td>{props.faq.answer}</td>
    <td>
      <Link to={"/updateFaq/" + props.faq._id}>Edit</Link> |
      <a
        href="#"
        onClick={() => {
          props.deleteFaq(props.faq._id);
        }}
      >
        delete
      </a>
    </td>
  </tr>
);

export default class ViewFaq extends Component {
  constructor(props) {
    super(props);

    this.deleteFaq = this.deleteFaq.bind(this);

    this.state = { faqs: [] };
  }

  exportPDF = () => {
    const unit = "pt";
    const size = "A4"; // Use A1, A2, A3 or A4

    const marginLeft = 40;
    const doc = new jsPDF("landscape", unit, size);

    doc.setFontSize(15);

    const title = "Frequently Asked Questions";
    const headers = [["Question", "Answer"]];

    const faq = this.state.faqs.map((elt) => [elt.question, elt.answer]);

    let content = {
      startY: 50,
      head: headers,
      body: faq,
    };

    doc.text(title, marginLeft, 40);
    doc.autoTable(content);
    doc.save("FAQs.pdf");
  };

  componentDidMount() {
    axios
      .get("http://localhost:5000/faqs/")
      .then((response) => {
        this.setState({ faqs: response.data });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  deleteFaq = (id) => {
    swl({
      title: "Are you sure?",
      text: "Once deleted, you will not be able to recover this file!",
      icon: "warning",
      buttons: ["Cancel", "Delete"],
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        axios.delete(`http://localhost:5000/faqs/${id}`).then((res) => {
          swl("FAQ Details Deleted Succesfully.", {
            icon: "success",
          });
          this.setState({
            faqs: this.state.faqs.filter((el) => el._id !== id),
          });
        });
      }
    });
  };

  // deleteOffer(id) {
  //   axios
  //     .delete("http://localhost:5000/offers/" + id)
  //     .then((res) => console.log(res.data));

  //   this.setState({
  //     offers: this.state.offers.filter((el) => el._id !== id),
  //   });
  // }

  faqList() {
    return this.state.faqs.map((currentfaq) => {
      return (
        <Faq faq={currentfaq} deleteFaq={this.deleteFaq} key={currentfaq._id} />
      );
    });
  }

  render() {
    return (
      <div className="addCovidPage">
        <div className="container">
          <br />
          <center>
            <h3>Frequently Asked Questions List</h3>
          </center>
          <br />
          <div className="row">
            <div className="col-2 buttons">
              <Link to="/createFaq" type="button" className="btn btn-primary">
                <i className="far fa-edit"></i> &nbsp;&nbsp;Add FAQ
              </Link>
              <br />
            </div>
            <div className="col-3 buttons2">
              <Link
                onClick={() => this.exportPDF()}
                className="btn btn-warning"
              >
                &nbsp;&nbsp;Download FAQs'
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
                placeholder="Search an FAQ"
                name="searchQuery"
                onChange={this.handleSearchArea}
              />
            </div>
          </div>
          <br />

          <table className="table">
            <thead className="thead-light">
              <tr>
                <th>Question ID</th>
                <th>Question</th>
                <th>Answer</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>{this.faqList()}</tbody>
          </table>
        </div>
      </div>
    );
  }
}
