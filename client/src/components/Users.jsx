import React, { useState, useEffect } from "react";
import "../styles/user.css";
import axios from "axios";
import toast from "react-hot-toast";
import Loading from "./Loading";
import { setLoading } from "../redux/reducers/rootSlice";
import { useDispatch, useSelector } from "react-redux";
import jwt_decode from "jwt-decode";

axios.defaults.baseURL = process.env.REACT_APP_SERVER_DOMAIN;

function Users() {
  const [data, setData] = useState([]);
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.root);

  const getAllUsers = async (e) => {
    try {
      const { userId } = jwt_decode(localStorage.getItem("token"));
      const temp = await axios.get("/user/getallusers", {
        headers: { authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      temp.data = temp.data.filter((ele) => {
        return ele._id !== userId;
      });
      setData(temp.data);
    } catch (error) {}
  };

  const deleteUser = async (userId) => {
    try {
      const confirm = window.confirm("Are you sure you want to delete?");
      if (confirm) {
        const { data } = await toast.promise(
          axios.delete("/user/deleteuser", {
            headers: {
              authorization: `Bearer ${localStorage.getItem("token")}`,
            },
            data: { userId },
          }),
          {
            pending: "Deleting in...",
            success: "User deleted successfully",
            error: "Unable to delete user",
            loading: "Deleting user...",
          }
        );
        getAllUsers();
      }
    } catch (error) {
      return error;
    }
  };

  useEffect(() => {
    dispatch(setLoading(true));
    getAllUsers();
    dispatch(setLoading(false));
  }, []);

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <section className="user-section">
          <h3 className="home-sub-heading">All Users</h3>
          {data.length > 0 ? (
            <div className="user-container">
              <table>
                <thead>
                  <tr>
                    <th>First Name</th>
                    <th>Last Name</th>
                    <th>Email</th>
                    <th>Mobile No.</th>
                    <th>Age</th>
                    <th>Gender</th>
                    <th>Is Doctor</th>
                    <th>Remove</th>
                  </tr>
                </thead>
                <tbody>
                  {data?.map((ele) => {
                    return (
                      <tr key={ele._id}>
                        <td data-title="Provider Name">{ele.firstname}</td>
                        <td data-title="Provider Name">{ele.lastname}</td>
                        <td data-title="E-mail">{ele.email}</td>
                        <td data-title="E-mail">{ele.mobile}</td>
                        <td data-title="E-mail">{ele.age}</td>
                        <td data-title="E-mail">{ele.gender}</td>
                        <td data-title="E-mail">
                          {ele.isDoctor ? "Yes" : "No"}
                        </td>
                        <td className="select">
                          <button
                            className="btn user-btn"
                            onClick={() => {
                              deleteUser(ele._id);
                            }}
                          >
                            Remove
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          ) : (
            <h2 className="nothing flex-center">Nothing to show</h2>
          )}
        </section>
      )}
    </>
  );
}

export default Users;
