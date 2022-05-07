import React from "react";
import { NavLink } from "react-router-dom";
import "./home.css";
// import RegVac from "../../images/RegVac.png";
// import PatientList from "../../images/PatientList.png";
// import CalculateFee from "../../images/CalculateFee.png";
// import Generate from "../../images/Generate.png";
import {
  CovidManageContainer,
  CovidManageH1,
  CovidManageWrapper,
  CovidManageCard,
  CovidManageIcon,
  CovidManageH2,
} from "./home2";
import ViewOffer from "../pages/offer/viewOffer";

function CovidManage() {
  return (
    <div className="maincovidPage">
      <br />
      <div className="covidManage">
        <CovidManageContainer id="covidManage">
          <h3 className="covidB">RATHAVAHANA.LK</h3>
          <br />
          {/* <CovidManageH1>
            <h4 className="covidtext">Select task to continue</h4>
          </CovidManageH1> */}
          <CovidManageWrapper>
            <CovidManageCard>
              <div className="covidManage1">
                <CovidManageH2>CUSTOMER DETAILS MANAGEMENT</CovidManageH2>
                {/* <CovidManageIcon src={ViewOffer} /> */}
                <h4>
                  <NavLink to="/">Continue</NavLink>
                </h4>
              </div>
            </CovidManageCard>
            <CovidManageCard>
              <div className="covidManage1">
                <CovidManageH2>STAFF DETAILS MANAGEMENT</CovidManageH2>
                {/* <CovidManageIcon src={PatientList} /> */}
                <h4>
                  <NavLink to="/">Continue</NavLink>
                </h4>
              </div>
            </CovidManageCard>
            <CovidManageCard>
              <div className="covidManage1">
                <CovidManageH2>VEHICLE DETAILS MANAGEMENT</CovidManageH2>
                {/* <CovidManageIcon src={CalculateFee} /> */}
                <h4>
                  <NavLink to="/">Continue</NavLink>
                </h4>
              </div>
            </CovidManageCard>
            <CovidManageCard>
              <div className="covidManage1">
                <CovidManageH2>OFFER DETAILS MANAGEMENT</CovidManageH2>
                {/* <CovidManageIcon src={Generate} /> */}
                <h4>
                  <NavLink to="/viewOffer">Continue</NavLink>
                </h4>
              </div>
            </CovidManageCard>
          </CovidManageWrapper>
        </CovidManageContainer>
      </div>
    </div>
  );
}

export default CovidManage;