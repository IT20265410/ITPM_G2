import React, { Component } from 'react';
import axios from 'axios';
import { Link, Redirect } from "react-router-dom";
import swl from "sweetalert";
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";


export default class Editrent extends Component {

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



    componentDidMount() {

        axios.get('http://localhost:4800/rentv/' + this.props.match.params.id)

            .then(response => {

                this.setState({
                    cid: response.data.cid,
                    cname: response.data.cname,
                    vid: response.data.vid,
                    vname: response.data.vname,
                    idate: new Date(response.data.idate),
                    ddate: new Date(response.data.ddate),
                    status: response.data.status

                })

            })
            .catch(function (error) {
                console.log(error);
            })

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

    onChangeIdate(e) {
        this.setState({
            idate: e.target.value
        });
    }

    onChangeDdate(e) {
        this.setState({
            ddate: e.target.value
        });
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

        axios.post('http://localhost:4800/rentv/update/' + this.props.match.params.id, rentv)
            .then(res => console.log(res.data));

            swl("Rent Details Updated Succesfully.", {
                icon: "success",
            });

        window.location = '/viewrent';
    }


    render() {
        
        return (
            <div className='addCovidPage'>
            <br />
            <div className='container' id="addRegisterForm">
            <h3 className="addcovidTitle">RENT ON VEHICLES</h3>
            <form onSubmit={this.onSubmit} >
            <div className="form-group">
                            <label className="textColour">Customer ID: </label>
                            <input type="text"
                                required
                                className="form-control"
                                value={this.state.cid}
                                onChange={this.onChangeCid}
                                
                            />
                 </div>           
    
                <div className="form-group">
                    <label className="textColour">Customer Name: </label>
                    <input type="text"
                        required
                        className="form-control"
                        value={this.state.cname}
                        onChange={this.onChangeCname}
                        
                    />
                </div>
    
                <div className="form-group">
                            <label className="textColour">Vehicle ID: </label>
                            <input type="text"
                                required
                                className="form-control"
                                value={this.state.vid}
                                onChange={this.onChangeVid}
                               
                            />
                 </div>           
    
                <div className="form-group">
                    <label className="textColour">Vehicle Name: </label>
                    <input type="text"
                        required
                        className="form-control"
                        value={this.state.vname}
                        onChange={this.onChangeVname}
                       
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
    