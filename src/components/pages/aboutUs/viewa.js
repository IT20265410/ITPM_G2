import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
//import './register.css';
import { jsPDF } from "jspdf";
import "jspdf-autotable";
import '../vehicle.css';
import * as FaIcons from 'react-icons/fa';

const AboutUs = props => (
    <tr>
        <td>{props.aboutUs._id}</td>
        <td>{props.aboutUs.comDesc}</td>
        <td>{props.aboutUs.vision}</td>
        <td>{props.aboutUs.mission}</td>
        <td>{props.aboutUs.lNews}</td>
      

        <td>
        <Link to={"/edita/" + props.aboutUs._id } type="button" className="btn btn-secondary">
                <i className="far fa-edit"></i> &nbsp;&nbsp;Edit
              </Link>
              <br />
        </td>
    </tr>
)

export default class Viewa extends Component {
    constructor(props) {
        super(props);

        this.deleteAboutUs = this.deleteAboutUs.bind(this);

        this.state = { aboutUs: [] };
    }

    exportPDF = () => {
        const unit = "pt";
        const size = "A4"; // Use A1, A2, A3 or A4
    
        const marginLeft = 40;
        const doc = new jsPDF("landscape", unit, size);
    
        doc.setFontSize(15);
    
        const title = "ab Details";
        const headers = [
          [
            "about ID",
            "company descripton",
            "vission",
            "mission",
           
          ],
        ];
    
        const aboutUs = this.state.aboutUs.map((elt) => [
          elt._id,
          elt.comDesc,
          elt.vision,
          elt.mission,
        
          
        ]);
    
        let content = {
          startY: 50,
          head: headers,
          body: aboutUs,
        };
    
        doc.text(title, marginLeft, 40);
        doc.autoTable(content);
        doc.save("aboutus.pdf");
      };


    componentDidMount() {
        axios.get('http://localhost:4800/aboutUs/')
            .then(response => {
                this.setState({ aboutUs: response.data })
            })
            .catch((error) => {
                console.log(error);
            })
    }

    deleteAboutUs(id) {
        axios.delete('http://localhost:4800/aboutUs/' + id)
            .then(res => console.log(res.data));

        this.setState({
            aboutUs: this.state.aboutUs.filter(sml => sml._id !== id)
        })
    }

    aboutUsMembersList() {
        return this.state.aboutUs.map(currentaboutUs => {
            return <AboutUs aboutUs={currentaboutUs} deleteAboutUs={this.delete} key={currentaboutUs._id} />;
        })
    }


    render() {
        return (
            <div className='addvehiclePage' id="viewTable">
                <br />
                <center><h3 className="addTitle">About Us</h3></center>
                <div className='container' id="viewMedicineForm">

                <div className='row'>
                       
                        <div className='col-2 buttons'>
                            <Link to="/aboutUs" type="button" className="btn btn-primary">
                            <i className="far fa-plus-square"></i> &nbsp;&nbsp;Add About
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
          </div>
                <table className="table" id="displayTable">
                    <thead className="thead-light">
                     <tr id="tablist">
                        <th className="viewlist">ID<br/><br/></th>
                            <th className="viewlist">Company Descripton <br/><br/></th>
                            <th className="viewlist">Vission<br/><br/></th>
                            <th className="viewlist">Mission<br/><br/></th>
                            <th className="viewlist">Latest News<br/><br/></th>
                            <th style={{ width: "120px" }} className="viewlist">Action<br/><br/></th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.aboutUsMembersList()}
                    </tbody>
                </table>
            </div></div>
        )
    }
}