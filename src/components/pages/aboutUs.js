import React, { Component } from 'react'
import axios from 'axios';
//import './registerVaccine.css';
import swl from "sweetalert";

export default class AboutUs extends Component {
    constructor(props) {
        super(props);

        this.onChangeID = this.onChangeID.bind(this);
        this.onChangeComDesc = this.onChangeComDesc.bind(this);
        this.onChangeVision = this.onChangeVision.bind(this);
        this.onChangeMission = this.onChangeMission.bind(this);
        this.onChangeLnews = this.onChangeLnews.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            _id: '',
            comDesc: '',
            vision: '',
            mission: '',
            lNews: '',
        }
    }

    onChangeID(e) {
        this.setState({
            _id: e.target.value
        });
    }

    onChangeComDesc(e) {
        this.setState({
            comDesc: e.target.value
        });
    }

    onChangeVision(e) {
        this.setState({
            vision: e.target.value
        });
    }

    onChangeMission(e) {
        this.setState({
            mission: e.target.value
        });
    }

  

    onChangeLnews(e) {
        this.setState({
            lNews: e.target.value
        });
    }

    onSubmit(e) {
        e.preventDefault();

        const aboutUs = {
            _id: this.state._id,
            comDesc: this.state.comDesc,
            vision: this.state.vision,
            mission: this.state.mission,
            lNews: this.state.lNews
        }

        console.log(aboutUs);

        axios.post('http://localhost:4003/aboutUs/add', aboutUs)
            .then(res => console.log(res.data));

            swl("aboutus details Added Succesfully.", {
                icon: "success",
            });
        window.location = '/viewa';
    }

    displayAboutus = value => () => {
        console.log(value);
    };


    render() {

        return (
            <div className='addCovidPage'>
                <br />
                <div className='container' id="addRegisterForm">
                    <h3 className="addcovidTitle">ADD NEW ABOUT US DETAILS</h3>
                    <form onSubmit={this.onSubmit}>
                        <div className="form-group">
                            <label className="textColour">About ID: </label>
                            <input type="text"
                                required
                                pattern="[A,0-9]*"
                                className="form-control"
                                value={this.state._id}
                                onChange={this.onChangeID}
                                placeholder="eg: A001"
                            />
                        </div>
                        <div className="form-group">
                            <label className="textColour">Company Description: </label>
                            <input type="text" 
                        
                                className="form-control"
                                value={this.state.comDesc}
                                onChange={this.onChangeComDesc}
                                placeholder="eg: Our company..."
                            />
                        </div>
                        <div className="form-group">
                            <label className="textColour">Vission: </label>
                            <input type="text"
                               
                                className="form-control"
                                value={this.state.vision}
                                onChange={this.onChangeVision}
                                placeholder="eg: Our vission is..."
                            />
                        </div>
                        <div className="form-group">
                            <label className="textColour">Mission: </label>
                            <input
                                type="text"
                                className="form-control"
                                value={this.state.mission}
                                onChange={this.onChangeMission}
                                placeholder="eg: Our mission is..."
                            />
                        </div>

                        <div className="form-group">
                            <label className="textColour">Latest Nesw: </label>
                            <input
                                type="text"
                                className="form-control"
                                value={this.state.lNews}
                                onChange={this.onChangeLnews}
                                placeholder="eg: In our company..."
                            />
                        </div>
                        <br />
                        <div className="form-group">
                            <input type="submit" value="ADD" className="btn btn-primary" />
                        </div>
                    </form>
                </div></div>
        )
    }
}