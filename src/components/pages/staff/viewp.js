import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
//import './register.css';
import { jsPDF } from "jspdf";
import "jspdf-autotable";
import * as FaIcons from 'react-icons/fa';

const Register = props => (
    <tr>
        <td>{props.register._id}</td>
        <td>{props.register.name}</td>
        <td>{props.register.age}</td>
        <td>{props.register.email}</td>
        <td>{props.register.address}</td>
        <td>{props.register.gender}</td>
        <td>{props.register.nic}</td>
        <td>{props.register.phone}</td>

        <td>
        <Link to={"/editp/" + props.register._id } type="button" className="btn btn-secondary">
                <i className="far fa-edit"></i> &nbsp;&nbsp;Edit
              </Link>
              <br />
          
            
            <button onClick={() => { props.deleteRegister(props.register._id) }} className="btn btn-danger"
            style={{ position: 'relative', top: "-38px", left: "110px"}}
>
            <FaIcons.FaTrash /> &nbsp;&nbsp;Delete</button>
        </td>
    </tr>
)

export default class Viewp extends Component {
    constructor(props) {
        super(props);

        this.deleteRegister = this.deleteRegister.bind(this);

        this.state = { register: [] };
    }

    exportPDF = () => {
        const unit = "pt";
        const size = "A4"; // Use A1, A2, A3 or A4
    
        const marginLeft = 40;
        const doc = new jsPDF("landscape", unit, size);
    
        doc.setFontSize(15);
    
        const title = "employee Details";
        const headers = [
          [
            "Employee ID",
            "Employee Name",
            "Job Title",
            "NIC",
            "Contact No",
          ],
        ];
    
        const register = this.state.register.map((elt) => [
          elt._id,
          elt.name,
          elt.address,
          elt.nic,
          elt.phone,
          
        ]);
    
        let content = {
          startY: 50,
          head: headers,
          body: register,
        };
    
        doc.text(title, marginLeft, 40);
        doc.autoTable(content);
        doc.save("employee.pdf");
      };


    componentDidMount() {
        axios.get('http://localhost:4800/register/')
            .then(response => {
                this.setState({ register: response.data })
            })
            .catch((error) => {
                console.log(error);
            })
    }

    deleteRegister(id) {
        axios.delete('http://localhost:4800/register/' + id)
            .then(res => console.log(res.data));

        this.setState({
            register: this.state.register.filter(sml => sml._id !== id)
        })
    }

    registerMembersList() {
        return this.state.register.map(currentregister => {
            return <Register register={currentregister} deleteRegister={this.deleteRegister} key={currentregister._id} />;
        })
    }


    render() {
        return (
            <div className='addvehiclePage' id="viewTable">
                <br />
                <center><h3 className="addcovid1Title">Staff Member Details</h3></center>
                <div className='container' id="viewMedicineForm">

                <div className='row'>
                       
                        <div className='col-2 buttons'>
                            <Link to="/registerVaccine" type="button" className="btn btn-primary">
                            <i className="far fa-plus-square"></i> &nbsp;&nbsp;
                             ADD EMPLOYEE
                            </Link>
                            
                        </div>

                        <div className="col-7 buttons">
                            <Link onClick={() => this.exportPDF()} className="btn btn-warning">
                            <FaIcons.FaFilePdf /> 
                &nbsp;&nbsp;Genarate Report
            </Link>
            <br />
            <br />
           
          </div>
                        
                         <div className='col-3 buttons'>
                            <Link to="/searchemployee" type="button" className="btn btn-secondary">
                            <FaIcons.FaSearch /> 
                            &nbsp;&nbsp;
                            Search Staff
                            </Link>
                            
                        </div>
                
          </div>


                <table className="table" id="displayTable">
                    <thead className="thead-light">
                        <tr id="tablist">
                            <th className="viewlist">ID</th>
                            <th className="viewlist">Name</th>
                            <th className="viewlist">Age</th>
                            <th className="viewlist">Email</th>
                            <th className="viewlist">Job Title</th>
                            <th className="viewlist">Gender</th>
                            <th className="viewlist">NIC</th>
                            <th className="viewlist">Phone</th>
                            <th style={{ width: "250px" }} className="viewlist"></th>

                        </tr>
                    </thead>
                    <tbody>
                        {this.registerMembersList()}
                    </tbody>
                </table>
            </div></div>
        )
    }
}