import React, { useState } from 'react';
import axios from 'axios';

const CreateAppointment = () => {
    const [appointmentData, setAppointmentData] = useState({
        appointment_id:'id1',
        name: 'hh',
        date: '2024-03-26',
        time: '21:56',
        doctor : 'hh',
        patient : 'hh',
        description: 'hh',
        username: 'hh',

        
    });

    const handleChange = (e) => {
        setAppointmentData({
            ...appointmentData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            console.log("appointment dta =>" 
                + appointmentData.name + " \n"
                + appointmentData.date + " \n"
                + appointmentData.time + " \n"
                );
            const response = await axios.post(`${process.env.REACT_APP_APPOINTMENT_URL}/api/v1/appointment`, appointmentData);
            console.log(response.data);
            // Handle success or redirect to another page
        } catch (error) {
            console.error(error);
            // Handle error
        }
    };

    return (
        <div>
            <h1>Create Appointment</h1>
            <form onSubmit={handleSubmit}>
                <label>
                    Name:
                    <input
                        type="text"
                        name="name"
                        value={appointmentData.name}
                        onChange={handleChange}
                    />
                </label>
                <br />
                <label>
                    Date:
                    <input
                        type="date"
                        name="date"
                        value={appointmentData.date}
                        onChange={handleChange}
                    />
                </label>
                <br />
                <label>
                    Time:
                    <input
                        type="time"
                        name="time"
                        value={appointmentData.time}
                        onChange={handleChange}
                    />
                </label>
                <br />
                <label>
                    Doctor:
                    <input
                        type="text"
                        name="doctor"
                        value={appointmentData.doctor}
                        onChange={handleChange}
                    />
                </label>
                <br />
                <label>
                    Patient:
                    <input
                        type="text"
                        name="patient"
                        value={appointmentData.patient}
                        onChange={handleChange}
                    />  
                </label>
                <br />
                <label>
                    Description:
                    <input
                        type="text"
                        name="description"
                        value={appointmentData.description}
                        onChange={handleChange}
                    />
                </label>
                <br />
                <label>
                    Username:
                    <input
                        type="text"
                        name="username"
                        value={appointmentData.username}
                        onChange={handleChange}
                    />
                </label>
                <br />

                <button type="submit">Create</button>
            </form>
        </div>
    );
};

export default CreateAppointment;