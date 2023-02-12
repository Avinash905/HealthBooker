import React, { useEffect, useState } from "react";
import DoctorCard from "../components/DoctorCard";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import "../styles/doctors.css";
import fetchData from "../helper/apiCall";
import Loading from "../components/Loading";
import { useDispatch, useSelector } from "react-redux";
import { setLoading } from "../redux/reducers/rootSlice";

const Doctors = () => {
  const [doctors, setDoctors] = useState([]);
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.root);

  const fetchAllDocs = async () => {
    const data = await fetchData(`/doctor/getalldoctors`);
    setDoctors(data);
  };

  useEffect(() => {
    dispatch(setLoading(true));
    fetchAllDocs();
    dispatch(setLoading(false));
  }, []);

  return (
    <>
      <Navbar />
      {loading ? (
        <Loading />
      ) : (
        <section className="container doctors">
          <h2 className="page-heading">Our Doctors</h2>
          <div className="doctors-card-container">
            {doctors.map((ele) => {
              return (
                <DoctorCard
                  ele={ele}
                  key={ele._id}
                />
              );
            })}
          </div>
        </section>
      )}
      <Footer />
    </>
  );
};

export default Doctors;
