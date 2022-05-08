import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import swl from "sweetalert";
//import './register.css';
import { jsPDF } from "jspdf";
import "jspdf-autotable";
import './vehicle.css';

const Team = props => (
    <tr>
        
        <td>{props.team.name}</td>

        <td>{props.team.address}</td>
        
    </tr>
)

export default class Viewcm extends Component {
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
                <center><h1 className="addcovid1Title">More About Rathavahana.lk</h1></center>
                <center><h3 className="addcovid1Title">Why Choose Us</h3></center>
              
                <div className='container' id="viewMedicineForm">

                <div className='row'>
                       
                     
                
                   <center> <thead className="thead-light">
                        <tr id="tablist">
                            <center><th className="viewlist"> Vehicle hire in Sri Lanka is not an easy way to all, with Ratha vahana.lk  you can enjoy vehicle rental in Sri Lanka at the coolest budget ways.</th></center>
                            <center><th className="viewlist">you can enjoy vehicle rental in Sri Lanka at the coolest budget ways.</th></center>
                            <center><th className="viewlist">We believe in providing the highest level of services at the lowest price. 24/7 working time. So you can enjoy your ride anytime. </th></center>

                        </tr>
                    </thead>
                   </center> 
            
             
                        
                   
                
          </div>
          <center><h1 className="addcovid1Title">Our Team</h1></center>


          
                 <center>    <thead className="thead-light">
                        <tr id="tablist">
                           
                         <th className="viewlist">  ****Name****</th>
                           
                         <center> <th className="viewlist">*****Description*****</th> </center> 
                           

                        </tr>
                    </thead>
                    <tbody>
                        {this.teamMembersList()}
                    </tbody>
                    </center>

                    <br/>
                
               <div className='row'>
                       
               <center> <div className='col-2 buttons'>
                           <Link to="/viewc" type="button" className="btn btn-primary">
                            -Back
                           </Link>
                           
                       </div></center> </div>
                
            </div></div>
        )
    }
}