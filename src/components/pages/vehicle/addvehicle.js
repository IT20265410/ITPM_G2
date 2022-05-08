import React, { Component, useState } from 'react'
import axios from 'axios';
import '../vehicle.css';
import swl from "sweetalert";


export default class Addvehicle extends Component {
    constructor(props) {
        super(props);

        this.onChangeID = this.onChangeID.bind(this);
        this.onChangeName = this.onChangeName.bind(this);
        this.onChangeVehicleImage = this.onChangeVehicleImage.bind(this);
        this.onChangePrice = this.onChangePrice.bind(this);
        this.onChangeDescription = this.onChangeDescription.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        

        this.state = {
            _id: '',
            name: '',
            vehicleImage: '',
            price: '',
            description: '',
        }
    }

    onChangeID(e) {
        this.setState({
            _id: e.target.value
        });
    }

    onChangeName(e) {
        this.setState({
            name: e.target.value
        });
    }

    onChangeVehicleImage(e) {
        this.setState({
            vehicleImage: e.target.value
        });
    }

    onChangePrice(e) {
        this.setState({
            price: e.target.value
        });
    }

    onChangeDescription(e) {
        this.setState({
            description: e.target.value
        });
    }


    onSubmit(e) {
        e.preventDefault();

        const addvehicle = {
            _id: this.state._id,
            name: this.state.name,
            vehicleImage: this.state.vehicleImage,
            price: this.state.price,
            description: this.state.description
        }

        console.log(addvehicle);

        axios.post('http://localhost:4800/addvehicle/add', addvehicle)
            .then(res => console.log(res.data));

            swl("Vehicle Added Succesfully.", {
                icon: "success",
            });
        window.location = '/viewvehicle';
    }

    displayAddvehicle = value => () => {
        console.log(value);
    };


    render() {

        return (
            <div className='addvehiclePage'>
                <br />
                <div className='container' id="addRegisterForm">
                   <h3 className="addvehicleTitle">ADD NEW VEHICLE</h3> 
                   <hr /><br/>
                    <form onSubmit={this.onSubmit}>
                        <div className="form-group">
                            <label className="textColour">Vehicle ID: </label>
                            <input type="text"
                                required
                                pattern="[V,0-9]*"
                                className="form-control"
                                value={this.state._id}
                                onChange={this.onChangeID}
                                placeholder="eg: V001"
                            />
                        </div>
                        <div className="form-group">
                            <label className="textColour">Vehicle Name: </label>
                            <input type="text"
                                required
                                className="form-control"
                                value={this.state.name}
                                onChange={this.onChangeName}
                                placeholder="eg: Suzuki Alto"
                            />
                        </div>
                        <div className="form-group">
                            <label className="textColour">Image: </label>
                            <input type="file"
                                required
                                className="form-control"
                                value={this.state.vehicleImage}
                                onChange={this.onChangeVehicleImage}
                            />
                        </div>
                        <div className="form-group">
                            <label className="textColour">Rent Price: </label>
                            <input
                                type="text"
                                pattern="[0-9]*"
                                className="form-control"
                                value={this.state.price}
                                onChange={this.onChangePrice}
                                placeholder="eg: 340000.00"
                            />
                        </div>


                        <div className="form-group">
                            <label className="textColour">Vehicle Description: </label>
                            <textarea
                                type="text"
                                maxLength="1000"
                                minLength="20"
                                class="form-control"
                                rows= "3"
                                value={this.state.description}
                                onChange={this.onChangeDescription}
                                placeholder="eg: SUZUKI ALTO for rent 
                                                 Auto transmission 
                                                 300 Km per day"
                            />
                        </div>
                        
                       
                        <br />
                        <div className="form-group" id="but13">
                       
                            <div className='row'>
                            <input type="submit" value="ADD" className="btn btn-primary" />
                        </div></div>
                    </form>
                </div></div>
        )
    }
}