import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import swl from "sweetalert";
import { jsPDF } from "jspdf";
import "jspdf-autotable";

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

    exportPDF = () => {
        const unit = "pt";
        const size = "A4"; // Use A1, A2, A3 or A4
    
        const marginLeft = 40;
        const doc = new jsPDF("landscape", unit, size);
    
        doc.setFontSize(15);
    
        const title = "Vehicle Details";
        const headers = [
          [
            "Vehicle ID",
            "Name",
            "Vehicle Image",
            "Price",
            "Description",
          ],
        ];
    
        const addvehicle = this.state.addvehicle.map((elt) => [
          elt._id,
          elt.name,
          elt.vehicleImage,
          elt.price,
          elt.description,
          
        ]);
    
        let content = {
          startY: 50,
          head: headers,
          body: addvehicle,
        };
    
        doc.text(title, marginLeft, 40);
        doc.autoTable(content);
        doc.save("vehicle.pdf");
      };

    componentDidMount() {
        axios.get('http://localhost:4001/addvehicle/')
            .then(response => {
                this.setState({ addvehicle: response.data })
            })
            .catch((error) => {
                console.log(error);
            })
    }


    deleteAddvehicle = (id) => {
        swl({
            title: "Are you sure?",
            text: "Once deleted, you will not be able to recover this file!",
            icon: "warning",
            buttons: ["Cancel", "Delete"],

            dangerMode: true,
        }).then((willDelete) => {
            if (willDelete) {
                axios.delete(`http://localhost:4001/addvehicle/${id}`).then((res) => {
                    swl("Vehicle Deleted Succesfully.", {
                        icon: "success",
                    });
                    this.setState({
                        addvehicle: this.state.addvehicle.filter((el) => el._id !== id),
                    });
                });
            }
        });
    };


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

                    <center><h3 className="addcovid1Title">Rent On Vehicles</h3></center>

                        <div className='row'>
                        <div className='col-2 buttons'>
                            <Link to="/searchvehicle" type="button" className="btn btn-secondary">
                                Search Vehicle details
                            </Link>
                            <br />
                        </div>
                        

                        <div className='col-4 buttons'>
                            <Link to="/addvehicle" type="button" className="btn btn-primary">
                             ADD VEHICLE
                            </Link>
                            <br />
                        </div></div>

                        <br/>


                        <div className="col-3 buttons2">
            <Link onClick={() => this.exportPDF()} className="btn btn-warning">
              &nbsp;&nbsp;Genarate Report
            </Link>
            <br />
            <br />
          </div>

                        
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