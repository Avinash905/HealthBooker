import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Loading from "./Loading";
import { setLoading } from "../redux/reducers/rootSlice";
import "../styles/notification.css";
import { toast } from "react-hot-toast";

axios.defaults.baseURL = process.env.REACT_APP_SERVER_DOMAIN;

function Notifications() {
  const [data, setData] = useState([]);
  const [id, setId] = useState("");
  const [userType, setUserType] = useState("");
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.root);

  const getUser = async () => {
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
        setId(temp.data._id);
      } else {
        setUserType("user");
      }
    } catch (error) {}
  };

  const acceptDoctor = async (docid) => {
    try {
      const temp = await toast.promise(
        axios.put(
          "/doctor/acceptdoctor",
          { id: docid },
          {
            headers: {
              authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        ),
        {
          pending: "Accepting application...",
          success: "Application accepted",
          error: "Unable to accept application",
          loading: "Accepting application...",
        }
      );
      window.location.reload();
    } catch (error) {}
  };

  const rejectDoctor = async (docid) => {
    try {
      const temp = await toast.promise(
        axios.put(
          "/doctor/rejectdoctor",
          { id: docid },
          {
            headers: {
              authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        ),
        {
          pending: "Rejecting application...",
          success: "Application rejected",
          error: "Unable to reject application",
          loading: "Rejecting application...",
        }
      );
      window.location.reload();
    } catch (error) {}
  };

  const clearAllNotif = async () => {
    try {
      const sure = window.confirm(
        "Are you sure you want to clear all notifications"
      );
      if (!sure) return;
      const { data } = await toast.promise(
        axios.put(
          "/doctor/deleteallnotif",
          { id },
          {
            headers: {
              authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        ),
        {
          pending: "Deleting...",
          success: "All notifications deleted",
          error: "Error while deleting notifications",
          loading: "Deleting...",
        }
      );
    } catch (error) {}
  };

  useEffect(() => {
    dispatch(setLoading(true));
    getUser();
    dispatch(setLoading(false));
  }, [dispatch]);

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <section className="notif-section">
          <h3 className="home-sub-heading">All Notifications</h3>
          <button className="btn user-btn clear-btn" onClick={clearAllNotif}>
            Clear All
          </button>
          {data.length > 0 ? (
            <div className="notif-container">
              <table>
                <thead>
                  <tr>
                    <th>Serial No.</th>
                    {userType === "admin" ? <th>User Id</th> : null}
                    <th>Message</th>
                    {userType === "admin" ? <th>Accept/Reject</th> : null}
                  </tr>
                </thead>
                <tbody>
                  {data?.map((ele, i) => {
                    return userType === "admin" ? (
                      <tr key={i}>
                        <td data-title="E-mail">{i + 1}</td>
                        <td data-title="E-mail">{ele.split(",")[1]}</td>
                        <td data-title="E-mail">{ele.split(",")[0]}</td>
                        <td className="btn-cont" data-title="E-mail">
                          {ele.split(",")[3] === "" ? (
                            <>
                              <button
                                className="btn user-btn green-btn"
                                onClick={() => {
                                  acceptDoctor(ele.split(",")[1]);
                                }}
                              >
                                Accept
                              </button>
                              <button
                                className="btn user-btn"
                                onClick={() => {
                                  rejectDoctor(ele.split(",")[1]);
                                }}
                              >
                                Reject
                              </button>
                            </>
                          ) : ele.split(",")[3] === "accepted" ? (
                            "Accepted"
                          ) : (
                            "Rejected"
                          )}
                        </td>
                      </tr>
                    ) : (
                      <tr key={i}>
                        <td data-title="E-mail">{i + 1}</td>
                        <td data-title="E-mail">{ele}</td>
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

export default Notifications;
