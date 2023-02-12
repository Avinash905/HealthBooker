import { Navigate } from "react-router-dom";
import fetchData from "../helper/apiCall";
import jwtDecode from "jwt-decode";

export const Protected = ({ children }) => {
  const token = localStorage.getItem("token");
  if (!token) {
    return (
      <Navigate
        to={"/"}
        replace={true}
      ></Navigate>
    );
  }
  return children;
};

export const Public = ({ children }) => {
  const token = localStorage.getItem("token");
  if (!token) {
    return children;
  }
  return (
    <Navigate
      to={"/"}
      replace={true}
    ></Navigate>
  );
};

export const Admin = ({ children }) => {
  const { userId } = jwtDecode(localStorage.getItem("token"));

  const getUser = async (e) => {
    const temp = await fetchData(`/user/getuser/${userId}`);
    return temp.isAdmin;
  };

  if (getUser()) {
    return children;
  }
  return (
    <Navigate
      to={"/"}
      replace={true}
    ></Navigate>
  );
};
