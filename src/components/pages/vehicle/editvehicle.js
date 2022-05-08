import React, { Component } from 'react';
import axios from 'axios';
import '../vehicle.css';
import swl from "sweetalert";

export default class Editvehicle extends Component {
    constructor(props) {
        super(props);


        this.onChangeName = this.onChangeName.bind(this);
       
        this.onChangePrice = this.onChangePrice.bind(this);
        this.onChangeDescription = this.onChangeDescription.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            name: '',
            
            price: '',
            description: '',
        }
    }

    componentDidMount() {
        axios.get('http://localhost:4800/addvehicle/' + this.props.match.params.id)
            .then(response => {
                this.setState({
                    name: response.data.name,
                   
                    price: response.data.price,
                    description: response.data.description
                })
            })
            .catch(function (error) {
                console.log(error);
            })

    }

    onChangeName(e) {
        this.setState({
            name: e.target.value
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
            name: this.state.name,
            
            price: this.state.price,
            description: this.state.description
        }

        console.log(addvehicle);

        axios.post('http://localhost:4800/addvehicle/update/' + this.props.match.params.id, addvehicle)
            .then(res => console.log(res.data));

            swl("Vehicle Added Succesfully.", {
                icon: "success",
            });

        window.location = '/viewvehicle';
    }

    render() {
        return (
            <div className='addCovidPage'>
                <br />
                <div className='container' id="addRegisterForm">
                   <h3 className="addcovidTitle">UPDATE VEHICLE</h3>
                    <form onSubmit={this.onSubmit}>
                        
                        <div className="form-group">
                            <label className="textColour">Vehicle Name: </label>
                            <input type="text"
                                required
                                className="form-control"
                                value={this.state.name}
                                onChange={this.onChangeName}
                                
                            />
                        </div>
                        
                        <div className="form-group">
                            <label className="textColour">Rent Price: </label>
                            <input
                                type="text"
                                className="form-control"
                                value={this.state.price}
                                onChange={this.onChangePrice}
                                
                            />
                        </div>


                        <div className="form-group">
                            <label className="textColour">Vehicle Description: </label>
                            <textarea
                                class="form-control"
                                rows= "3"
                                value={this.state.description}
                                onChange={this.onChangeDescription}
                                
                            />
                        </div>
                        
                       
                        <br />
                        <div className="form-group" id="but12">
                            <input type="submit" value="Update" className="btn btn-success" />
                            
                        </div>
                    </form>
                </div></div>
        )
    }
}