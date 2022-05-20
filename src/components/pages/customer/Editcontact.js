import React, { Component } from 'react';
import axios from 'axios';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import './customer.css';
export default class EditCus extends Component {
  constructor(props) {
    super(props);

    this.onChangeNate = this.onChangeNate.bind(this);
    this.onChangeNatn = this.onChangeNatn.bind(this);
    this.onChangePrte = this.onChangePrte.bind(this);
    this.onChangePrtn = this.onChangePrtn.bind(this);
    this.onChangeRvote = this.onChangeRvote.bind(this);
    this.onChangeRvotn = this.onChangeRvotn.bind(this);
    this.onChangeBde = this.onChangeBde.bind(this);
    this.onChangeBdn = this.onChangeBdn.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      nate:'',
      natn:'',
      prte:'',
      prtn:'',
      rvote:'',
      rvotn:'',
      bde:'',
      bdn:'',
      users: []
    }
  }

  componentDidMount() {
    axios.get('http://localhost:4800/contacts/' + this.props.match.params.id)
      .then(response => {
        this.setState({
          nate:  response.data.nate,
          natn:  response.data.natn,
          prte:  response.data.prte,
          prtn:  response.data.prtn,
          rvote: response.data.rvote, 
          rvotn:  response.data.rvotn,
          bde: response.data.bde, 
          bdn:  response.data.bdn

        })
      })
      .catch(function (error) {
        console.log(error);
      })

  }
  onChangeNate(e) {
    this.setState({
      nate: e.target.value
    })
  }
  onChangeNatn(e) {
    this.setState({
      natn: e.target.value
    })
  }
  onChangePrte(e) {
    this.setState({
      prte: e.target.value
    })
  }
  onChangePrtn(e) {
    this.setState({
      prtn: e.target.value
    })
  }
  onChangeRvote(e) {
    this.setState({
      rvote: e.target.value
    })
  }
  onChangeRvotn(e) {
    this.setState({
      rvotn: e.target.value
    })
  }
  onChangeBde(e) {
    this.setState({
      bde: e.target.value
    })
  }
  onChangeBdn(e) {
    this.setState({
      bdn: e.target.value
    })
  }
  onSubmit(e) {
    e.preventDefault();

    const contact = {
      nate: this.state.nate,
      natn: this.state.natn,
      prte: this.state.prte,
      prtn: this.state.prtn,
      rvote: this.state.rvote,
      rvotn: this.state.rvotn,
      bde: this.state.bde,
      bdn: this.state.bdn,
    }

    console.log(contact);

    axios.post('http://localhost:4800/contacts/update/' + this.props.match.params.id, contact)
      .then(res => console.log(res.data));

      alert("Contact Details Updated !")
      window.location = '/contact-list';
  }

  render() {
    return (
      <div className='editCustomerPage'>
        <br />
        <div className='container' id="editCustomerForm">
          <h3 className="addStaffTitle">EDIT CONTACT DETAILS</h3>
          <br/>
          <form onSubmit={this.onSubmit}> 
          <div className="form-group"> 
            <label>National Advertising Team Email: </label>
            <input  type="text"
                required 
                pattern="[a-z0-9._%+-]+@[a-z0-9]+\.[a-z]{2,3}"
                className="form-control"
                value={this.state.nate}
                onChange={this.onChangeNate} 
                />
          </div> 
          <div className="form-group"> 
            <label>National Advertising Team Number: </label>
            <input  type="text"
                pattern="[0-9]*"
                maxLength="10"
                minLength="10"
                required
                className="form-control"
                value={this.state.natn}
                onChange={this.onChangeNatn} 
                />
          </div>  
          <div className="form-group"> 
            <label>Public Relations Team Email: </label>
            <input  type="text"
                required 
                pattern="[a-z0-9._%+-]+@[a-z0-9]+\.[a-z]{2,3}"
                className="form-control"
                value={this.state.prte}
                onChange={this.onChangePrte} 
                />
          </div> 
          <div className="form-group"> 
            <label>Public Relations Team Number: </label>
            <input  type="text"
                pattern="[0-9]*"
                maxLength="10"
                minLength="10"
                required
                className="form-control"
                value={this.state.prtn}
                onChange={this.onChangePrtn} 
                />
          </div>
          <div className="form-group"> 
            <label>Rath Vahana.lk Offices Team Email: </label>
            <input  type="text"
                required 
                pattern="[a-z0-9._%+-]+@[a-z0-9]+\.[a-z]{2,3}"
                className="form-control"
                value={this.state.rvote}
                onChange={this.onChangeRvote} 
                />
          </div> 
          <div className="form-group"> 
            <label>Rath Vahana.lk Offices Team Number: </label>
            <input  type="text"
                pattern="[0-9]*"
                maxLength="10"
                minLength="10"
                required
                className="form-control"
                value={this.state.rvotn}
                onChange={this.onChangeRvotn} 
                />
          </div> 
          <div className="form-group"> 
            <label>Billing Department Email: </label>
            <input  type="text"
                required 
                pattern="[a-z0-9._%+-]+@[a-z0-9]+\.[a-z]{2,3}"
                className="form-control"
                value={this.state.bde}
                onChange={this.onChangeBde} 
                />
          </div> 
          <div className="form-group"> 
            <label>Billing Department Number: </label>
            <input  type="text"
                pattern="[0-9]*"
                maxLength="10"
                minLength="10"
                required
                className="form-control"
                value={this.state.bdn}
                onChange={this.onChangeBdn} 
                />
          </div>
      <br />
        <div className="form-group">
          <input type="Submit" value="UPDATE" className="btn btn-success" />
        </div>
      </form>
        </div>
      </div>
    )
  }
}