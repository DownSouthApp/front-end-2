import React, { useState } from 'react';
import axios from 'axios';

const CreateAppointmentPage = () => {
    const [appointment, setAppointment] = useState({
        appointment_id: '',
        date: '',
        time: '',
        doctor: '',
        patient: '',
        description: '',
        username: ''
    });
    

    const handleChange = (e) => {
        setAppointment({ ...appointment, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('/api/appointments', appointment);
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
                    Appointment ID:
                    <input
                        type="text"
                        name="appointment_id"
                        value={appointment.appointment_id}
                        onChange={handleChange}
                    />
                </label>
                <br />
                <label>
                    Date:
                    <input
                        type="date"
                        name="date"
                        value={appointment.date}
                        onChange={handleChange}
                    />
                </label>
                <br />
                <label>
                    Time:
                    <input
                        type="text"
                        name="time"
                        value={appointment.time}
                        onChange={handleChange}
                    />
                </label>
                <br />
                <label>
                    Doctor:
                    <input
                        type="text"
                        name="doctor"
                        value={appointment.doctor}
                        onChange={handleChange}
                    />
                </label>
                <br />
                <label>
                    Patient:
                    <input
                        type="text"
                        name="patient"
                        value={appointment.patient}
                        onChange={handleChange}
                    />
                </label>
                <br />
                <label>
                    Description:
                    <input
                        type="text"
                        name="description"
                        value={appointment.description}
                        onChange={handleChange}
                    />
                </label>
                <br />
                <label>
                    Username:
                    <input
                        type="text"
                        name="username"
                        value={appointment.username}
                        onChange={handleChange}
                    />
                </label>
                <br />
                <button type="submit">Create Appointment</button>
            </form>
        </div>
    );
};

export default CreateAppointmentPage;