import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
//import './register.css';

const Addvehicle = props => (
    <tr>
        <td>{props.addvehicle._id}</td>
        <td>{props.addvehicle.name}</td>
        <td>{props.addvehicle.vehicleImage}</td>
        <td>{props.addvehicle.price}</td>
        <td>{props.addvehicle.description}</td>
        

        <td>
            <Link to={"/editvehicle/" + props.addvehicle._id}>edit</Link> | <a href="#" onClick={() => { props.deleteAddvehicle(props.addvehicle._id) }}>delete</a>
        </td>
    </tr>
)

export default class Viewvehicle extends Component {
    constructor(props) {
        super(props);

        this.deleteAddvehicle = this.deleteAddvehicle.bind(this);

        this.state = { addvehicle: [] };
    }

    componentDidMount() {
        axios.get('http://localhost:5000/addvehicle/')
            .then(response => {
                this.setState({ addvehicle: response.data })
            })
            .catch((error) => {
                console.log(error);
            })
    }

    deleteAddvehicle(id) {
        axios.delete('http://localhost:5000/addvehicle/' + id)
            .then(res => console.log(res.data));

        this.setState({
            addvehicle: this.state.addvehicle.filter(sml => sml._id !== id)
        })
    }

    addvehicleMembersList() {
        return this.state.addvehicle.map(currentaddvehicle => {
            return <Addvehicle addvehicle={currentaddvehicle} deleteAddvehicle={this.deleteAddvehicle} key={currentaddvehicle._id} />;
        })
    }


    render() {
        return (
            <div className='addCovidPage' id="viewTable">
                <br />
                <div className='container'>
                    <div id='covidbar2' >
                        <button className="searchStaffBtn"><Link className="toSearchPage" to="/searchvehicle" >Search Vehicle details</Link></button>
                        <h3 className="addcovid1Title">Rent On Vehicles</h3>
                        <table className="table" id="displayTable">
                            <thead className="thead-light">
                                <tr id="tablist">
                                    <th className="viewlist">Vehicle ID</th>
                                    <th className="viewlist">Name</th>
                                    <th className="viewlist">Image</th>
                                    <th className="viewlist">Rent Price</th>
                                    <th className="viewlist">Description</th>
                                    <th className="viewlist"></th>
                                    

                                </tr>
                            </thead>
                            <tbody>
                                {this.addvehicleMembersList()}
                            </tbody>
                        </table>
                    </div></div></div>
        )
    }
}