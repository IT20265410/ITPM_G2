import React, { Component } from 'react';
import axios from 'axios'; 
import "react-datepicker/dist/react-datepicker.css";
import './customer.css';
import swl from "sweetalert";

export default class AddContact extends Component {
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

    axios.post('http://localhost:4800/madicines/add', contact)
      .then(res => console.log(res.data));

      swl("Contact Details Added Succesfully.", {
        icon: "success",
    });

    window.location = '/customer-List';
  }

  render() {
    return (
      <div className='addMedicinePage'>
        <br />
        <div className='container' id="addMedicineForm">
          <h3 className="addMedicineTitle">Add New Contact</h3>
          <br />
          <form onSubmit={this.onSubmit}> 
          <div className="form-group"> 
            <label>National Advertising Team Email: </label>
            <input  type="text"
                required 
                pattern="[a-z0-9._%+-]+@[a-z0-9]+\.[a-z]{2,3}"
                className="form-control"
                value={this.state.nate}
                onChange={this.onChangeNate}
                placeholder="eg: kamal@gmail.com"
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
                placeholder="eg: 0773233289"
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
                placeholder="eg: kamal@gmail.com"
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
                placeholder="eg: 0773233289"
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
                placeholder="eg: kamal@gmail.com"
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
                placeholder="eg: 0773233289"
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
                placeholder="eg: kamal@gmail.com"
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
                placeholder="eg: 0773233289"
                />
          </div>
          <br></br>
          <div className="form-group">
            
            <input type="Submit" value="Create Contacts" className="btn btn-primary" onClick={this.getTotal} />
          </div>
        </form>
        </div>
      </div>
    )
  }
}