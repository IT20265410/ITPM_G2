import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
//import './register.css';
import { jsPDF } from "jspdf";
import "jspdf-autotable";
import './vehicle.css';

const AboutUs = props => (
    <tr>
       
        <td>{props.aboutUs.comDesc}</td>
        <td>{props.aboutUs.vision}</td>
        <td>{props.aboutUs.mission}</td>
        <td>{props.aboutUs.lNews}</td>
      

       
    </tr>
)

export default class Viewc extends Component {
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
        axios.get('http://localhost:4003/aboutUs/')
            .then(response => {
                this.setState({ aboutUs: response.data })
            })
            .catch((error) => {
                console.log(error);
            })
    }

    deleteAboutUs(id) {
        axios.delete('http://localhost:4003/aboutUs/' + id)
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
            <div className='addCovidPage' id="viewTable">
                <br />
                <center><h1 className="addcovid1Title">About Rathavahana.lk</h1></center>
                <div className='container' id="viewMedicineForm">
                <br/>
                <center><h3 className="addcovid1Title">**Find The Right Vehicle For You **</h3></center>

                <div className='row'>
                       
                <br/>          
                <br/>     
                        
                     
                
          </div>


                <table className="table" id="displayTable">
                    <thead className="thead-light">
                     <tr id="tablist">
                        
                            <th className="viewlist">Company Descripton <br/><br/></th>
                            <th className="viewlist">Vission<br/><br/></th>
                            <th className="viewlist">Mission<br/><br/></th>
                            <th className="viewlist">Latest News<br/><br/></th>
                           
                         
                      

                        </tr>
                    </thead>
                    <tbody>
                        {this.aboutUsMembersList()}
                    </tbody>
                </table>
                <div className='row'>
                       
                       <div className='col-2 buttons'>
                           <Link to="/viewcm" type="button" className="btn btn-primary">
                            Learn More 
                           </Link>
                           
                       </div> </div>
                
            </div></div>

            
        )
    }
}