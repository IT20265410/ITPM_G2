import React from "react";
import { NavLink } from "react-router-dom";
import "./home.css";

import {
  VehicleManageContainer,
  VehicleManageWrapper,
  VehicleManageCard,
  VehicleManageH2,
} from "./home2";

function VehicleManage() {
  return (
    <div className="mainvehiclePage">
      <br />
      <div className="vehicleManage">
        <VehicleManageContainer id="vehicleManage">
          <h3 className="vehicleB">RATHAVAHANA.LK</h3>
          <br />
          <VehicleManageWrapper>
            <VehicleManageCard>
              <div className="vehicleManage1">
                <VehicleManageH2>CUSTOMER DETAILS MANAGEMENT</VehicleManageH2>
                <h4>
                  <NavLink to="/customer-list">Continue</NavLink>
                </h4>
              </div>
            </VehicleManageCard>
            <VehicleManageCard>
              <div className="vehicleManage1">
                <VehicleManageH2>STAFF DETAILS MANAGEMENT</VehicleManageH2>
                <h4>
                  <NavLink to="/viewp">Continue</NavLink>
                </h4>
              </div>
            </VehicleManageCard>
            <VehicleManageCard>
              <div className="vehicleManage1">
                <VehicleManageH2>VEHICLE DETAILS MANAGEMENT</VehicleManageH2>

                <h4>
                  <NavLink to="/viewvehicle">Continue</NavLink>
                </h4>
              </div>
            </VehicleManageCard>
            <VehicleManageCard>
              <div className="vehicleManage1">
                <VehicleManageH2>OFFER DETAILS MANAGEMENT</VehicleManageH2>
                <h4>
                  <NavLink to="/viewOffer">Continue</NavLink>
                </h4>
              </div>
            </VehicleManageCard>
          </VehicleManageWrapper>
        </VehicleManageContainer>
      </div>
    </div>
  );
}

export default VehicleManage;
