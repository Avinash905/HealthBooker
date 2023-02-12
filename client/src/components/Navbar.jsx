import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import "../styles/navbar.css";
import { HashLink } from "react-router-hash-link";
import { useDispatch, useSelector } from "react-redux";
import { setUserInfo } from "../redux/reducers/rootSlice";

const Navbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userInfo = useSelector((state) => state.root.userInfo);
  const token = localStorage.getItem("token");

  const logoutFunc = () => {
    dispatch(setUserInfo({}));
    localStorage.removeItem("token");
    navigate("/");
  };
  return (
    <nav>
      <h2 className="nav-logo">
        <NavLink to={"/"}>HealthBooker</NavLink>
      </h2>
      <ul className="nav-links">
        <li>
          <NavLink to={"/"}>Home</NavLink>
        </li>
        <li>
          <NavLink to={"/doctors"}>Doctors</NavLink>
        </li>
        <li>
          <NavLink to={"/appointments"}>Appointments</NavLink>
        </li>
        <li>
          <NavLink to={"/notifications"}>Notifications</NavLink>
        </li>
        <li>
          <NavLink to={"/applyfordoctor"}>Apply for doctor</NavLink>
        </li>
        <li>
          <HashLink to={"/#contact"}>Contact Us</HashLink>
        </li>
        <li>
          <NavLink to={"/profile"}>Profile</NavLink>
        </li>
        {!token ? (
          <>
            <li>
              <NavLink
                className="btn"
                to={"/login"}
              >
                Login
              </NavLink>
            </li>
            <li>
              <NavLink
                className="btn"
                to={"/register"}
              >
                Register
              </NavLink>
            </li>
          </>
        ) : (
          <li>
            <span
              className="btn"
              onClick={logoutFunc}
            >
              Logout
            </span>
          </li>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;
