import React, { useState } from "react";
import toast from "react-hot-toast";
import "../styles/doctorapply.css";
import axios from "axios";

axios.defaults.baseURL = process.env.REACT_APP_SERVER_DOMAIN;

function DoctorApply() {
  const [formDetails, setFormDetails] = useState({
    specialization: "",
    experience: "",
    fees: "",
    timing: "Timing",
  });

  const inputChange = (e) => {
    const { name, value } = e.target;
    return setFormDetails({
      ...formDetails,
      [name]: value,
    });
  };

  const formSubmit = async (e) => {
    try {
      e.preventDefault();
      const { specialization, experience, fees, timing } = formDetails;

      if (!specialization || !experience || !fees || !timing) {
        return toast.error("Input field should not be empty");
      }
      const { data } = await toast.promise(
        axios.post(
          "/doctor/applyfordoctor",

          {
            specialization,
            experience,
            fees,
            timing,
          },
          {
            headers: {
              authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        ),
        {
          pending: "Submitting application...",
          success: "Thank You for submitting the apllication.",
          error: "Unable to submit application",
          loading: "Submitting application...",
        }
      );
    } catch (error) {
      return error;
    }
  };

  return (
    <section className="apply-doctor-section flex-center">
      <div className="apply-doctor-container flex-center">
        <h2 className="form-heading">Apply For Doctor</h2>
        <form onSubmit={formSubmit} className="register-form">
          <input
            type="text"
            name="specialization"
            className="form-input"
            placeholder="Enter your specialization"
            value={formDetails.specialization}
            onChange={inputChange}
          />
          <input
            type="text"
            name="experience"
            className="form-input"
            placeholder="Enter your experience in years"
            value={formDetails.experience}
            onChange={inputChange}
          />
          <input
            type="text"
            name="fees"
            className="form-input"
            placeholder="Enter your fees per consultation in rupees"
            value={formDetails.fees}
            onChange={inputChange}
            defaultChecked="Timings"
          />
          <select
            name="timing"
            value={formDetails.timing}
            className="form-input"
            id="timing"
            onChange={inputChange}
          >
            <option disabled>Timings</option>
            <option value="morning">Morning</option>
            <option value="afternoon">Afternoon</option>
            <option value="evening">Evening</option>
            <option value="night">Night</option>
          </select>
          <button type="submit" className="btn form-btn">
            apply
          </button>
        </form>
      </div>
    </section>
  );
}

export default DoctorApply;
