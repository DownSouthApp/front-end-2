import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { selectUser } from '../../slices/userSlice';
import { useParams } from 'react-router-dom';
import './T_edit_appointment.css';

const Appointment_Update = () => {
  const { appointment_id } = useParams();
  const user = useSelector(selectUser);
  
  const [appointmentid, setAppointmentid] = useState(appointment_id);
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [medical_center, setMedical_center] = useState("");
  const [doctor, setDoctor] = useState("");
  const [patient, setPatient] = useState("");
  const [description, setDescription] = useState("");

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    let month = '' + (date.getMonth() + 1);
    let day = '' + date.getDate();
    const year = date.getFullYear();
  
    if (month.length < 2) 
        month = '0' + month;
    if (day.length < 2) 
        day = '0' + day;
  
    return [year, month, day].join('-');
  }

  const getAppointment = async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_APPOINTMENT_URL}/api/v1/appointment/${appointment_id}`);
      const appointment = response.data;
      
      console.log("Current Appointment data:", appointment);

      setAppointmentid(appointment.appointment_id);
      setDate(appointment.date);
      setTime(appointment.time);
      setMedical_center(appointment.medical_center);
      setDoctor(appointment.doctor);
      setPatient(appointment.patient);
      setDescription(appointment.description);

      const formattedDate = formatDate(appointment.date);
      setDate(formattedDate);

    } catch (error) {
      console.error("Error fetching appointment:", error);
    }
  }

  useEffect(() => {
    getAppointment();
  }, [appointment_id]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      console.log("Update front sending data", appointment_id, date, time, medical_center, doctor, patient, description);

      const appointmentData = {
        appointment_id: appointmentid,
        date: date,
        time: time,
        medical_center: medical_center,
        doctor: doctor,
        patient: patient,
        description: description,
        username: user.username,
      };
      
      const response = await axios.put(`${process.env.REACT_APP_APPOINTMENT_URL}/api/v1/appointment/`, appointmentData, {
        headers: { 'Content-Type': 'application/json' }
      });

      console.log("Update response:", response);
      window.location.href = "/t_home";

    } catch (error) {
      console.error("Error updating appointment:", error);
    }
  }

  return (
    <div className="appointment-create-page">
        <div className='background'></div>
      <h1 className="form-title">Update Appointment</h1>
      <div className="form-container">
      <form className="appointment-form" onSubmit={handleSubmit}>
        <label>
          Date:
          <input type="date" name="date" value={date} onChange={(e) => setDate(e.target.value)} />
        </label>
        <br />
        <label>
          Time:
          <input type="time" name="time" value={time} onChange={(e) => setTime(e.target.value)} />
        </label>
        <br />
        <label>
          Medical Center:
          <input type="text" name="medical_center" value={medical_center} onChange={(e) => setMedical_center(e.target.value)} />
        </label>
        <br />
        <label>
          Doctor:
          <input type="text" name="doctor" value={doctor} onChange={(e) => setDoctor(e.target.value)} />
        </label>
        <br />
        <label>
          Patient:
          <input type="text" name="patient" value={patient} onChange={(e) => setPatient(e.target.value)} />
        </label>
        <br />
        <label>
          Description:
          <input type="text" name="description" value={description} onChange={(e) => setDescription(e.target.value)} />
        </label>
        <br />
        <button type="submit">Update</button>
      </form>
    </div>
    </div>
  );
}

export default Appointment_Update;
