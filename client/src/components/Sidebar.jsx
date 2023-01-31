import React, { useEffect, useState } from "react";
import "../styles/sidebar.css";
import { NavLink } from "react-router-dom";
import { MdLogout } from "react-icons/md";
import { admin, user, doctor } from "../helper/sidebarLinks";
import axios from "axios";
import token from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { setLoading } from "../redux/reducers/rootSlice";
import Loading from "./Loading";

axios.defaults.baseURL = process.env.REACT_APP_SERVER_DOMAIN;

function Sidebar() {
  const [data, setData] = useState([]);
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.root);

  const logoutFunc = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userInfo");
    token.success("Logged out successfully");
  };

  const getUser = async () => {
    try {
      const temp = await axios.get("/user/getcurrentuser", {
        headers: {
          authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      if (temp.data.isDoctor === true) {
        return setData(doctor);
      } else if (temp.data.isAdmin === true) {
        return setData(admin);
      } else {
        return setData(user);
      }
    } catch (error) {}
  };

  useEffect(() => {
    dispatch(setLoading(true));
    getUser();
    dispatch(setLoading(false));
  }, []);

  return (
    <>
      {!loading && (
        <section className="sidebar-section flex-center">
          <div className="sidebar-container">
            <ul>
              {data.map((ele, i) => {
                return (
                  <li key={i}>
                    {ele.icon}
                    <NavLink to={ele.path}>{ele.name}</NavLink>
                  </li>
                );
              })}
            </ul>
            <div className="logout-container">
              <MdLogout />
              <NavLink to={"/"} onClick={logoutFunc}>
                Logout
              </NavLink>
            </div>
          </div>
        </section>
      )}
    </>
  );
}

export default Sidebar;
