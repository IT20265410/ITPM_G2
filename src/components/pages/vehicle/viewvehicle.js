import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import swl from "sweetalert";
import { jsPDF } from "jspdf";
import "jspdf-autotable";
import * as FaIcons from 'react-icons/fa';

//import './register.css';

const Addvehicle = props => (
    <tr>
        <td>{props.addvehicle._id}</td>
        <td>{props.addvehicle.name}</td>
        
        <td>{props.addvehicle.price}</td>
        <td>{props.addvehicle.description}</td>


       
        <td>
              <Link to={"/editvehicle/" + props.addvehicle._id } type="button" className="btn btn-secondary">
                <i className="far fa-edit"></i> &nbsp;&nbsp;Edit
              </Link>
              <br />
          
            
            <button onClick={() => { props.deleteAddvehicle(props.addvehicle._id) }} className="btn btn-danger"
            style={{ position: 'relative', top: "-38px", left: "110px"}}
>
            <FaIcons.FaTrash /> &nbsp;&nbsp;Delete</button></td>
            
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
            
            "Price",
            "Description",
          ],
        ];
    
        const addvehicle = this.state.addvehicle.map((elt) => [
          elt._id,
          elt.name,
       
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
        axios.get('http://localhost:4800/addvehicle/')
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
                axios.delete(`http://localhost:4800/addvehicle/${id}`).then((res) => {
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
            <div className='addvehiclePage' id="viewTable">
                <br />
                <div className='container'>
                    <div id='covidbar2' >

                    <center><h3 className="addcovid1Title">Rent On Vehicles</h3></center>

                    <div className="row">
            <div className="col-2 buttons">
              <Link to="/addvehicle" type="button" className="btn btn-primary">
                <i className="far fa-plus-square"></i> &nbsp;&nbsp;Add Vehicle
              </Link>
              <br />
            </div>
            <div className="col-3 buttons2">
              <Link
                onClick={() => this.exportPDF()}
                className="btn btn-warning"
              ><FaIcons.FaFilePdf /> 
                &nbsp;&nbsp;Genarate Report
              </Link>
              <br />
              <br />
            </div>
            <div className="col-6 buttons2">
              <div className="col-4 buttons" style={{ marginLeft: "500px" }}>
                <Link
                  to="/searchvehicle"
                  type="button"
                  className="btn btn-success"
                ><FaIcons.FaSearch /> 
                &nbsp;&nbsp;
                  Search Details
                </Link>
                <br />
              </div>
            </div>
          </div>
          <br />
                        
                        <table className="table" id="displayTable">
                            <thead className="thead-light">
                                <tr id="tablist">
                                    <th className="viewlist">Vehicle ID</th>
                                    <th className="viewlist">Name</th>
                                    
                                    <th className="viewlist">Rent Price</th>
                                    <th style={{ width: "400px" }} className="viewlist">Description</th>
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