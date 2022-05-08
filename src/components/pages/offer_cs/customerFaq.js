import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { jsPDF } from "jspdf";
import "jspdf-autotable";

const Faq = (props) => (
  <tr>
    <td>{props.faq.question}</td>
    <td>{props.faq.answer}</td>
  </tr>
);

export default class CustomerFaq extends Component {
  constructor(props) {
    super(props);

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
      .get("http://localhost:4800/faqs/")
      .then((response) => {
        this.setState({ faqs: response.data });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  faqList() {
    return this.state.faqs.map((currentfaq) => {
      return (
        <Faq faq={currentfaq} deleteFaq={this.deleteFaq} key={currentfaq._id} />
      );
    });
  }

  render() {
    return (
      <div className="CustomerOffer">
        <div className="container">
          <br />
          <center>
            <h3>Frequently Asked Questions List</h3>
          </center>
          <br />
          <div className="row">
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
          </div>
          <br />

          <table id="faqTable">
            <thead className="thead-light">
              <tr>
                <th>Question</th>
                <th>Answer</th>
              </tr>
            </thead>
            <tbody>{this.faqList()}</tbody>
          </table>
        </div>
      </div>
    );
  }
}
