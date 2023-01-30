import React, { useEffect, useState } from "react";
import "../styles/homecontainer.css";
import { NavLink, useNavigate } from "react-router-dom";
import axios from "axios";
import Loading from "./Loading";
import { setLoading } from "../redux/reducers/rootSlice";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-hot-toast";

axios.defaults.baseURL = process.env.REACT_APP_SERVER_DOMAIN;

function Home() {
  const [data, setData] = useState([]);
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.root);
  const navigate = useNavigate();

  const getAllDocs = async (e) => {
    try {
      const temp = await axios.get("/doctor/getAlldoctors", {
        headers: {
          authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      for (let index = 0; index < temp.data.length; index++) {
        const name = await getUser(temp.data[index].userId);
        temp.data[index].name = name;
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
      const { firstname, lastname } = temp.data;
      return `${firstname} ${lastname}`;
    } catch (error) {}
  };

  const bookAppointment = async (docId, timing) => {
    try {
      const { data } = await toast.promise(
        axios.post(
          "/appointment/bookappointment",
          { doctorId: docId, timing },
          {
            headers: {
              authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        ),
        {
          pending: "Booking appointment...",
          success: "Appointment booked successfully",
          error: "Unable to book appointment",
          loading: "Booking appointment...",
        }
      );
      return navigate("/appointments");
    } catch (error) {
      return error;
    }
  };

  useEffect(() => {
    dispatch(setLoading(true));
    getAllDocs();
    dispatch(setLoading(false));
  }, [dispatch]);

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <section className="home-section">
          <h2 className="home-heading">welcome to healthbooker</h2>
          <h3 className="home-sub-heading">Our Doctors</h3>
          <div className="home-container">
            {data.map((ele, i) => {
              let name = getUser(ele.userId);
              return (
                <div className="card" key={i}>
                  <h3 className="card-name">Dr. {ele.name}</h3>
                  <p className="specialization">
                    <strong>Specialization: </strong>
                    {ele.specialization}
                  </p>
                  <p className="experience">
                    <strong>Experience: </strong>
                    {ele.experience}
                  </p>
                  <p className="fees">
                    <strong>Fees per consultation: </strong>₹ {ele.fees}
                  </p>
                  <p className="timing">
                    <strong>Timing: </strong>
                    {ele.timing}
                  </p>
                  <button
                    className="btn appointment-btn"
                    onClick={() => {
                      bookAppointment(ele.userId, ele.timing);
                    }}
                  >
                    Book Appointment
                  </button>
                </div>
              );
            })}
          </div>
        </section>
      )}
    </>
  );
}

export default Home;
