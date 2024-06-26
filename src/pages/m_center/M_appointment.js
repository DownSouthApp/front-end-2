import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { selectUser } from '../../slices/userSlice';
import { Card, CardContent, Typography, List, Button, Avatar } from '@mui/material';




function M_appointment() {
    const [appointments, setAppointments] = useState([]);

    const user = useSelector(selectUser);

    useEffect(() => { 
        fetchAppointments();
    }, []);

    async function fetchAppointments() {
        try {
            console.log(user.username);
            const response = await axios.get(`http://https://ds-central.onrender.com/appointment/api/v1/appointment/our_appointments?medical_center=${user.username}`);
            console.log(response.data);
            setAppointments(response.data); 
        } catch (error) {
            console.log('Failed to fetch appointments:', error);
        }
    }

    return (
        <div>
            <h1> Our medi center Appointments</h1>
            <div className='content3'>
            <div className="profile-box1">
            <Typography variant="h4" className="title1">My Appointments</Typography>
            
            <List className='aplist'>
                {appointments.map(appointment => (
                    <ul>
                        <Card  key={appointment._id}>
                        <CardContent>
                            <h4>Appointment ID: {appointment.appointment_id}</h4>
                            <h4>Date: {appointment.date}</h4>
                            <h4>Time: {appointment.time}</h4>
                            <h4>Medical Center: {appointment.medical_center}</h4>
                            <h4>Doctor: {appointment.doctor}</h4>
                            <h4>Patient: {appointment.patient}</h4>
                            <h4>Description: {appointment.description}</h4>
                            <h4>Username: {appointment.username}</h4>    
                            </CardContent>
                        </Card>
                    </ul>

                ))}
            
            </List>
            </div>
        </div>
        </div>
    );
}

export default M_appointment;