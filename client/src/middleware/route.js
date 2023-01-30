import { Navigate } from "react-router-dom";

export const Protected = ({ children }) => {
  const token = localStorage.getItem("token");
  if (!token) {
    return <Navigate to={"/"} replace={true}></Navigate>;
  }
  return children;
};

export const Public = ({ children }) => {
  const token = localStorage.getItem("token");
  if (!token) {
    return children;
  }
  return <Navigate to={"/home"} replace={true}></Navigate>;
};
