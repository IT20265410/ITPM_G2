import React, { Component } from 'react'
import axios from 'axios';
//import './registerVaccine.css';
import '../vehicle.css';


export default class RegisterTeam extends Component {
    constructor(props) {
        super(props);

        this.onChangeID = this.onChangeID.bind(this);
        this.onChangeName = this.onChangeName.bind(this);
        this.onChangeAddress = this.onChangeAddress.bind(this);
        this.onChangeAge = this.onChangeAge.bind(this);
        this.onChangeGender = this.onChangeGender.bind(this);
        this.onChangeNIC = this.onChangeNIC.bind(this);
        this.onChangePhone = this.onChangePhone.bind(this);
        this.onChangeEmail = this.onChangeEmail.bind(this);
        this.onChangeUsername = this.onChangeUsername.bind(this);
        this.onChangePassword = this.onChangePassword.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            _id: '',
            name: '',
            address: '',
            age: '',
            gender: '',
            nic: '',
            phone: '',
            email: '',
            username: '',
            password: '',
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

    onChangeAddress(e) {
        this.setState({
            address: e.target.value
        });
    }

    onChangeAge(e) {
        this.setState({
            age: e.target.value
        });
    }

    onChangeGender(e) {
        this.setState({
            gender: e.target.value
        });
    }

    onChangeNIC(e) {
        this.setState({
            nic: e.target.value
        });
    }

    onChangePhone(e) {
        this.setState({
            phone: e.target.value
        });
    }

    onChangeEmail(e) {
        this.setState({
            email: e.target.value
        });
    }

    onChangeUsername(e) {
        this.setState({
            username: e.target.value
        });
    }

    onChangePassword(e) {
        this.setState({
            password: e.target.value
        });
    }

    onSubmit(e) {
        e.preventDefault();

        const registerTeam = {
            _id: this.state._id,
            name: this.state.name,
            address: this.state.address,
            age: this.state.age,
            gender: this.state.gender,
            nic: this.state.nic,
            phone: this.state.phone,
            email: this.state.email,
            username: this.state.username,
            password: this.state.password
        }

        console.log(registerTeam);

        axios.post('http://localhost:4800/team/add', registerTeam)
            .then(res => console.log(res.data));

        alert("team member Added Succesfully!");
        window.location = '/viewm';
    }

    displayTeam = value => () => {
        console.log(value);
    };


    render() {

        return (
            <div className='addCovidPage'>
                <br />
                <div className='container' id="addRegisterForm">
                    <h3 className="addcovidTitle">ADD NEW TEAM MEMBER</h3>
                    <form onSubmit={this.onSubmit}>
                        <div className="form-group">
                            <label className="textColour">Membership ID: </label>
                            <input type="text"
                                required
                                pattern="[T,0-9]*"
                                className="form-control"
                                value={this.state._id}
                                onChange={this.onChangeID}
                                placeholder="eg: T001"
                            />
                        </div>
                        <div className="form-group">
                            <label className="textColour">Member Name: </label>
                            <input type="text"
                                required
                                className="form-control"
                                value={this.state.name}
                                onChange={this.onChangeName}
                                placeholder="eg: Nimal Perera"
                            />
                        </div>
                        
                        <div className="form-group">
                            <label className="textColour">Age: </label>
                            <input
                                type="text"
                                required
                                className="form-control"
                                value={this.state.age}
                                onChange={this.onChangeAge}
                                placeholder="eg: 22"
                            />
                        </div>

                        <div class="form-group">
                            <label for="validationCustom04" class="form-label" className="textColour">Special Position</label>
                            <select class="form-select" id="validationCustom04" required value={this.state.gender} onChange={this.onChangeGender}>
                                <option selected disabled value="">Choose</option>
                                <option>Team Leader</option>
                                <option>Team  Secratary</option>
                                <option>Team Assistant Secratary</option>
                                <option>Team Cordinator</option>
                            </select></div>

                        <div className="form-group">
                            <label className="textColour">NIC: </label>
                            <input
                                type="text"
                                required
                                className="form-control"
                                maxLength="10"
                                minLength="10"
                                value={this.state.nic}
                                onChange={this.onChangeNIC}
                                placeholder="eg: 982728896V"
                            />
                        </div>
                        <div className="form-group">
                            <label className="textColour">Member Contact No: </label>
                            <input
                                type="text"
                                required
                                maxLength="10"
                                minLength="10"
                                className="form-control"
                                value={this.state.phone}
                                onChange={this.onChangePhone}
                                placeholder="eg: 0779937258"
                            />
                        </div>
                        <div className="form-group">
                            <label className="textColour">Email: </label>
                            <input
                                type="email"
                                required
                                className="form-control"
                                value={this.state.email}
                                onChange={this.onChangeEmail}
                                placeholder="eg: kasunei3@gmail.com"
                            />
                        </div>
                        <div className="form-group">
                            <label className="textColour"> Description </label>
                            <input type="text"
                                required
                                className="form-control"
                                value={this.state.address}
                                onChange={this.onChangeAddress}
                                placeholder="eg: He is the team leader...."
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