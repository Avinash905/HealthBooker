import "../styles/doctorcard.css";
import React, { useState } from "react";
import BookAppointment from "../components/BookAppointment";

const DoctorCard = ({ ele }) => {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <div className={`card`}>
      <div className={`card-img flex-center`}>
        <img
          src={
            ele.userId.pic ||
            "https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg"
          }
          alt="profile"
        />
      </div>
      <h3 className="card-name">
        Dr. {ele.userId.firstname + " " + ele.userId.lastname}
      </h3>
      <p className="specialization">
        <strong>Specialization: </strong>
        {ele.specialization}
      </p>
      <p className="experience">
        <strong>Experience: </strong>
        {ele.experience}yrs
      </p>
      <p className="fees">
        <strong>Fees per consultation: </strong>$ {ele.fees}
      </p>
      <p className="phone">
        <strong>Phone: </strong>
        {ele.userId.mobile}
      </p>
      <button
        className="btn appointment-btn"
        onClick={() => setModalOpen(true)}
      >
        Book Appointment
      </button>
      {modalOpen && (
        <BookAppointment
          setModalOpen={setModalOpen}
          ele={ele}
        />
      )}
    </div>
  );
};

export default DoctorCard;
