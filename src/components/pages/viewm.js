import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import swl from "sweetalert";
//import './register.css';
import { jsPDF } from "jspdf";
import "jspdf-autotable";

const Team = props => (
    <tr>
        <td>{props.team._id}</td>
        <td>{props.team.name}</td>
        <td>{props.team.age}</td>
        <td>{props.team.email}</td>
        <td>{props.team.address}</td>
        <td>{props.team.gender}</td>
        <td>{props.team.nic}</td>
        <td>{props.team.phone}</td>

        <td>
            <Link to={"/editm/" + props.team._id}>edit</Link> | <a href="#" onClick={() => { props.deleteTeam(props.team._id) }}>delete</a>
        </td>
    </tr>
)

export default class Viewm extends Component {
    constructor(props) {
        super(props);

        this.deleteTeam = this.deleteTeam.bind(this);

        this.state = { team: [] };
    }

    exportPDF = () => {
        const unit = "pt";
        const size = "A4"; // Use A1, A2, A3 or A4
    
        const marginLeft = 40;
        const doc = new jsPDF("landscape", unit, size);
    
        doc.setFontSize(15);
    
        const title = "team Details";
        const headers = [
          [
            "team ID",
            "team Name",
            "Job Title",
            "NIC",
            "Contact No",
          ],
        ];
    
        const team = this.state.team.map((elt) => [
          elt._id,
          elt.name,
          elt.address,
          elt.nic,
          elt.phone,
          
        ]);
    
        let content = {
          startY: 50,
          head: headers,
          body: team,
        };
    
        doc.text(title, marginLeft, 40);
        doc.autoTable(content);
        doc.save("team.pdf");
      };


    componentDidMount() {
        axios.get('http://localhost:4800/team/')
            .then(response => {
                this.setState({ team: response.data })
            })
            .catch((error) => {
                console.log(error);
            })
    }

    deleteTeam = (id) => {
        swl({
            title: "Are you sure?",
            text: "Once deleted, you will not be able to recover this file!",
            icon: "warning",
            buttons: ["Cancel", "Delete"],

            dangerMode: true,
        }).then((willDelete) => {
            if (willDelete) {
                axios.delete('http://localhost:4800/team/ ${id}').then((res) => {
                    swl("Vehicle Deleted Succesfully.", {
                        icon: "success",
                    });
                    this.setState({
                        team: this.state.team.filter((el) => el._id !== id),
                    });
                });
            }
        });
    };



    teamMembersList() {
        return this.state.team.map(currentteam => {
            return <Team team={currentteam} deleteTeam={this.deleteTeam} key={currentteam._id} />;
        })
    }





    
    render() {
        return (
            <div className='addCovidPage' id="viewTable">
                <br />
                <center><h3 className="addcovid1Title">Team Member Details</h3></center>
                <div className='container' id="viewMedicineForm">

                <div className='row'>
                       
                        <div className='col-2 buttons'>
                            <Link to="/registerTeam" type="button" className="btn btn-primary">
                             ADD 
                            </Link>
                            
                        </div>

                        <div className="col-7 buttons">
                            <Link onClick={() => this.exportPDF()} className="btn btn-warning">
              &nbsp;&nbsp;Genarate Report
            </Link>
            <br />
            <br />
           
          </div>
                        
                         <div className='col-3 buttons'>
                            <Link to="/searchteam" type="button" className="btn btn-secondary">
                            Search Member
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
                            <th className="viewlist">Description</th>
                            <th className="viewlist">Special Position</th>
                            <th className="viewlist">NIC</th>
                            <th className="viewlist">Phone</th>
                            <th className="viewlist">action</th>

                        </tr>
                    </thead>
                    <tbody>
                        {this.teamMembersList()}
                    </tbody>
                </table>
            </div></div>
        )
    }
}