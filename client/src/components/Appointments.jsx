import React, { useState, useEffect } from "react";
import axios from "axios";
import Loading from "./Loading";
import { setLoading } from "../redux/reducers/rootSlice";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";

axios.defaults.baseURL = process.env.REACT_APP_SERVER_DOMAIN;

function Appointments() {
  const [data, setData] = useState([]);
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.root);
  const [userType, setUserType] = useState("");

  const getAllAppointments = async (e) => {
    try {
      const temp = await axios.get("/appointment/getallappointments", {
        headers: { authorization: `Bearer ${localStorage.getItem("token")}` },
      });

      for (let index = 0; index < temp.data.length; index++) {
        const vals = await getUser(temp.data[index].userId);
        temp.data[index].email = vals.split(",")[0];
        temp.data[index].mobile = vals.split(",")[1];
      }
      setData(temp.data);
    } catch (error) {
      return error;
    }
  };

  const getUser = async (userId) => {
    try {
      const temp = await axios.get(`/user/getuser/${userId}`, {
        headers: {
          authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      const { email, mobile } = temp.data;
      return `${email},${mobile}`;
    } catch (error) {}
  };

  const getCurrUser = async () => {
    try {
      const temp = await axios.get("/user/getcurrentuser", {
        headers: {
          authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      setData(temp.data.notification);
      if (temp.data.isDoctor) {
        setUserType("doctor");
      } else if (temp.data.isAdmin) {
        setUserType("admin");
      } else {
        setUserType("user");
      }
    } catch (error) {}
  };

  const completed = async (id) => {
    try {
      const { data } = await toast.promise(
        axios.put(
          "/appointment/completed",
          { id },
          {
            headers: {
              authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        ),
        {
          pending: "Completing appointment...",
          success: "Appointment completed successfully",
          error: "Unable to complete appointment",
          loading: "Completing appointment...",
        }
      );
      window.location.reload();
    } catch (error) {
      return error;
    }
  };

  useEffect(() => {
    dispatch(setLoading(true));
    getAllAppointments();
    getCurrUser();
    dispatch(setLoading(false));
  }, []);

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <section className="user-section">
          <h3 className="home-sub-heading">All Appointments</h3>
          {data.length > 0 ? (
            <div className="user-container">
              <table>
                <thead>
                  <tr>
                    {userType === "doctor" ? null : <th>Doctor Id</th>}
                    {userType === "user" ? null : <th>User Id</th>}
                    <th>Booked At</th>
                    {userType === "doctor" ? null : <th>Doctor Email</th>}
                    {userType === "doctor" ? null : <th>Doctor Mobile No.</th>}
                    <th>Timing</th>
                    <th>Status</th>
                    {userType === "user" ? null : <th>Complete</th>}
                  </tr>
                </thead>
                <tbody>
                  {data?.map((ele, i) => {
                    return (
                      <tr key={i}>
                        {userType === "doctor" ? null : (
                          <td data-title="Provider Name">{ele.doctorId}</td>
                        )}
                        {userType === "user" ? null : (
                          <td data-title="Provider Name">{ele.userId}</td>
                        )}
                        <td data-title="Provider Name">
                          {Date(ele.createdAt).split("G")[0]}
                        </td>
                        {userType === "doctor" ? null : (
                          <>
                            <td data-title="E-mail">{ele.email}</td>
                            <td data-title="E-mail">{ele.mobile}</td>
                          </>
                        )}
                        <td data-title="E-mail">{ele.timing}</td>
                        <td data-title="E-mail">{ele.status}</td>
                        {userType === "user" ? null : (
                          <td className="select">
                            <button
                              className={`btn gohome ${
                                ele.status === "Completed" ? "disabled" : ""
                              }`}
                              onClick={() => {
                                completed(ele._id);
                              }}
                              disabled={
                                ele.status === "Completed" ? true : false
                              }
                            >
                              Complete
                            </button>
                          </td>
                        )}
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

export default Appointments;
