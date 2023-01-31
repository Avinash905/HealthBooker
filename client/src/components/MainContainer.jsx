import React from "react";
import { useLocation } from "react-router-dom";
import Home from "./Home";
import Appointments from "./Appointments";
import DoctorApply from "./DoctorApply";
import Notifications from "./Notifications";
import Users from "./Users";

function MainContainer() {
  const { pathname } = useLocation();
  return pathname === "/home" ? (
    <Home />
  ) : pathname === "/appointments" ? (
    <Appointments />
  ) : pathname === "/doctorapply" ? (
    <DoctorApply />
  ) : pathname === "/notifications" ? (
    <Notifications />
  ) : (
    <Users />
  );
}

export default MainContainer;
