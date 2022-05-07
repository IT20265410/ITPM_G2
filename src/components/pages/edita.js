import React, { Component } from 'react';
import axios from 'axios';
//import './registerVaccine.css';




export default class Edita extends Component {

    constructor(props) {
        super(props);


        this.onChangeComDesc = this.onChangeComDesc.bind(this);
        this.onChangeVision = this.onChangeVision.bind(this);
        this.onChangeMission = this.onChangeMission.bind(this);
        this.onChangeLnews = this.onChangeLnews.bind(this);
        this.onSubmit = this.onSubmit.bind(this);




        this.state = {

            comDesc: '',
            vision: '',
            mission: '',
            lNews: ''

        }

    }



    componentDidMount() {

        axios.get('http://localhost:4003/aboutUs/' + this.props.match.params.id)

            .then(response => {

                this.setState({

                    comDesc: response.data.comDesc,

                    vision: response.data.vision,

                    mission: response.data.mission,

                    lNews: response.data.lNews

                })

            })

            .catch(function (error) {

                console.log(error);

            })



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

            comDesc: this.state.comDesc,
            vision: this.state.vision,
            mission: this.state.mission,
            lNews: this.state.lNews

        }



        console.log(aboutUs);



        axios.post('http://localhost:4003/aboutUs/update/' + this.props.match.params.id, aboutUs)

            .then(res => console.log(res.data));

            alert("Updated Succesfully!");

        window.location = '/viewa';

    }



    render() {

        return (

            <div className='addCovidPage'>

                <br />

                <div className='container' id="addRegisterForm">

                    <h3 className="addcovidTitle">Update About Us Details</h3>

                    <form onSubmit={this.onSubmit}>

                        <div className="form-group">

                        <label className="textColour">Company Description: </label>
                            <input type="text"
                                required
                                className="form-control"
                                value={this.state.comDesc}
                                onChange={this.onChangeComDesc}

                            />

                        </div>

                        <div className="form-group">

                        <label className="textColour">Vission: </label>
                            <input type="text"
                                required
                                className="form-control"
                                value={this.state.vision}
                                onChange={this.onChangeVision}

                            />

                        </div>

                        <div className="form-group">

                        <label className="textColour">Mission: </label>
                            <input
                                type="text"
                                className="form-control"
                                value={this.state.mission}
                                onChange={this.onChangeMission}

                            />

                        </div>

                       

                        <div className="form-group">

                        <label className="textColour">Latest Nesw: </label>
                            <input
                                type="text"
                                className="form-control"
                                value={this.state.lNews}
                                onChange={this.onChangeLnews}

                            />

                        </div>

                      

                        <br />

                        <div className="form-group">

                            <input type="submit" value="UPDATE" className="btn btn-primary" />

                        </div>

                    </form>

                </div></div>

        )

    }

}