import React, { Component } from 'react'
import axios from 'axios';
import { Link, Redirect } from "react-router-dom";
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";

export default class Rentv extends Component{
    constructor(props) {
        super(props);

        this.onChangeCid = this.onChangeCid.bind(this);
        this.onChangeCname = this.onChangeCname.bind(this);
        this.onChangeVid = this.onChangeVid.bind(this);
        this.onChangeVname = this.onChangeVname.bind(this);
        this.onChangeIdate = this.onChangeIdate.bind(this);
        this.onChangeDdate = this.onChangeDdate.bind(this);
        this.onChangeStatus = this.onChangeStatus.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
       

        this.state = {
            cid: '',
            cname: '',
            vid: '',
            vname: '',
            idate: new Date(),
            ddate: new Date(),
            status: '',
        }
    }

    onChangeCid(e) {
        this.setState({
            cid: e.target.value
        });
    }

    onChangeCname(e) {
        this.setState({
            cname: e.target.value
        });
    }

    onChangeVid(e) {
        this.setState({
            vid: e.target.value
        });
    }

    onChangeVname(e) {
        this.setState({
            vname: e.target.value
        });
    }

    onChangeIdate(date) {
        this.setState({
            idate: date
        })
    }

    onChangeDdate(date) {
        this.setState({
            ddate: date
        })
    }

    onChangeStatus(e) {
        this.setState({
            status: e.target.value
        });
    }

    onSubmit(e) {
        e.preventDefault();

        const rentv = {
            cid: this.state.cid,
            cname: this.state.cname,
            vid: this.state.vid,
            vname: this.state.vname,
            idate: this.state.idate,
            ddate: this.state.ddate,
            status: this.state.status
        }

        console.log(rentv);

        axios.post('http://localhost:4800/rentv/add', rentv)
            .then(res => console.log(res.data));

            alert("Vehicle rent details Added!");
            window.location = '/viewrent';
        }
    
        displayRentv = value => () => {
            console.log(value);
        };

    render() {
            

    return(
        <div className='addvehiclePage'>
        <br />
        <div className='container' id="addRegisterForm">
        <h3 className="addvehicleTitle">RENT ON VEHICLES</h3>
        <form onSubmit={this.onSubmit} >
        <div className="form-group">
                        <label className="textColour">Customer ID: </label>
                        <input type="text"
                            required
                            className="form-control"
                            value={this.state.cid}
                            onChange={this.onChangeCid}
                            placeholder="Enter patientID"
                        />
             </div>           

            <div className="form-group">
                <label className="textColour">Customer Name: </label>
                <input type="text"
                    required
                    className="form-control"
                    value={this.state.cname}
                    onChange={this.onChangeCname}
                    placeholder="Enter patientName"
                />
            </div>

            <div className="form-group">
                        <label className="textColour">Vehicle ID: </label>
                        <input type="text"
                            required
                            className="form-control"
                            value={this.state.vid}
                            onChange={this.onChangeVid}
                            placeholder="Enter patientID"
                        />
             </div>           

            <div className="form-group">
                <label className="textColour">Vehicle Name: </label>
                <input type="text"
                    required
                    className="form-control"
                    value={this.state.vname}
                    onChange={this.onChangeVname}
                    placeholder="Enter patientName"
                />
            </div>



            <div className="form-group">
                        <label className="textColour">Issue Date: </label>
                        <div>
                            <DatePicker
                                className="form-control"
                                selected={this.state.idate}
                                onChange={this.onChangeIdate}
                                minDate={new Date()}
                            />
                        </div>
                    </div>

                    <div className="form-group">
                        <label className="textColour">Due Date: </label>
                        <div>
                            <DatePicker
                                className="form-control"
                                selected={this.state.ddate}
                                onChange={this.onChangeDdate}
                                minDate={new Date()}
                            />
                        </div>
                    </div>


<div class="form-group">
    <label for="validationCustom04" class="form-label" className="textColour">Status</label>
    <select class="form-select" id="validationCustom04" required value={this.state.status}  onChange={this.onChangeStatus}>
      <option selected disabled value=""></option>
      <option className="cor">Rent</option>
      <option className="cor1">Return</option>
      
     
    </select></div>

        
<br/>
<div className="form-group">
           <center> <input type="submit" value="ADD" className="btn btn-primary" /></center>
                    </div>
                </form>
                
                <br />
            </div></div>


)
    
    }
}
