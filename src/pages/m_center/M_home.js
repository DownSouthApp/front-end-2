import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './M_home.css';
import { Card, CardContent, Typography, List, Button, Avatar, Box, Divider } from '@mui/material';
import NotificationsIcon from '@mui/icons-material/Notifications';
import { useDispatch, useSelector } from "react-redux";
import { selectUser } from '../../slices/userSlice';
import Calendar from 'react-calendar';
import EventIcon from '@mui/icons-material/Event';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import PersonIcon from '@mui/icons-material/Person';
import DescriptionIcon from '@mui/icons-material/Description';
import 'react-calendar/dist/Calendar.css'; // Import default calendar styles

const M_home = () => {
  const [navOpen, setNavOpen] = useState(false);
  const dispatch = useDispatch();

  const user = useSelector(selectUser);
  console.log("User data_:", user.token);

  let currentUser = null;
  
  console.log("User data:", currentUser);

  const [name, setName] = useState(user.name);
  const [longitude, setLongitude] = useState(user.longitude);
  const [latitude, setLatitude] = useState(user.latitude);
  const [destination, setDestination] = useState(user.destination);
  const [phone_number, setPhone_number] = useState(user.phone_number);
  const [owner_name, setOwner_name] = useState(user.owner_name);
  const [description, setDescription] = useState(user.description);
  const [username, setUsername] = useState(user.username);
  const [images, setImages] = useState([]);
  const [password, setPassword] = useState("");

  const [appointments, setAppointments] = useState([]);

  const getUser = async () => {
    try {
      currentUser = await axios.get(`http://localhost:4003/api/v1/m_center/search_by_username?username=${user.username}`, {
        username: user.username,
      });
      console.log("Current User long:", currentUser.data);
      setName(currentUser.data.name);
      setLongitude(currentUser.data.location.coordinates[0]);
      setLatitude(currentUser.data.location.coordinates[1]);
      setDestination(currentUser.data.destination);
      setPhone_number(currentUser.data.phone_number);
      setOwner_name(currentUser.data.owner_name);
      setDescription(currentUser.data.description);
      setUsername(currentUser.data.username);
      setImages(currentUser.data.images);
    
    } catch (error) {
      console.error("Error fetching user:", error);
    }
  };

  async function fetchAppointments() {
    try {
      const response = await axios.get(`https://ds-central.onrender.com/appointment/api/v1/appointment/our_appointments?medical_center=${user.username}`);
      console.log(response.data);
      setAppointments(response.data);
    } catch (error) {
      console.log('Failed to fetch appointments:', error);
    }
  }

  useEffect(() => {
    fetchAppointments();
    getUser();
  }, [user.name, user.longitude, user.latitude, user.destination, user.phone_number, user.owner_name, user.description, user.username]);

  const toggleNav = () => {
    setNavOpen(!navOpen);
  };

  const tileClassName = ({ date, view }) => {
    if (view === 'month') {
      const today = new Date();
      if (
        date.getDate() === today.getDate() &&
        date.getMonth() === today.getMonth() &&
        date.getFullYear() === today.getFullYear()
      ) {
        return 'today';
      }
    }
  };

  return (
    <Box className="layout">
      <Box className={`sidebar ${navOpen ? 'open' : ''}`}>
        <Button className="close-btn" onClick={toggleNav}>×</Button>
        <nav>
          <ul>
            <li>
              <Link to="/M_update" className="nav-link">Update Profile</Link>
            </li>
            <li>
              <Link to="/t_register" className="nav-link">Log Out</Link>
            </li>
          </ul>
        </nav>
      </Box>
      <Box className={`content1 ${navOpen ? 'shift' : ''}`}>
        <Button className="open-btn" onClick={toggleNav}>☰</Button>
        <Box className="profile-box1" sx={{ p: 2, textAlign: 'center' }}>
          <Avatar src= {images[0] } alt="Profile Icon" sx={{ width: 56, height: 56, mx: 'auto' }} />
          <Typography variant="h4" className="title" sx={{ mt: 1 }}>{username}</Typography>
          <Card variant="outlined" sx={{ mt: 2, p: 2 }}>
            <Typography variant="subtitle1"><strong>Email:</strong> {name}</Typography>
            <Divider sx={{ my: 1 }} />
            <Typography variant="subtitle1"><strong>Longitude:</strong> {longitude}</Typography>
            <Divider sx={{ my: 1 }} />
            <Typography variant="subtitle1"><strong>Latitude:</strong> {latitude}</Typography>
            <Divider sx={{ my: 1 }} />
            <Typography variant="subtitle1"><strong>Destination:</strong> {destination}</Typography>
            <Divider sx={{ my: 1 }} />
            <Typography variant="subtitle1"><strong>Phone Number:</strong> {phone_number}</Typography>
            <Divider sx={{ my: 1 }} />
            <Typography variant="subtitle1"><strong>Owner Name:</strong> {owner_name}</Typography>
            <Divider sx={{ my: 1 }} />
            <Typography variant="subtitle1"><strong>Description:</strong> {description}</Typography>
          </Card>
          <Box className="calendar-container" sx={{ mt: 2, textAlign: 'center' }}>
            <Calendar tileClassName={tileClassName} style={{ width: '100%', maxWidth: '300px', margin: 'auto' }} />
          </Box>
        </Box>
      </Box>
      <Box className={`content3 ${navOpen ? 'shift' : ''}`}>
        <Box className="profile-box1" sx={{ p: 2 }}>
          <Typography variant="h4" className="title1">Upcoming Appointments</Typography>
          <Box display="flex" alignItems="center" mt={2}>
            <NotificationsIcon />
            <Typography variant="h6" sx={{ ml: 1 }}>{appointments.length}</Typography>
          </Box>
          <List className='aplist' sx={{ mt: 2 }}>
            {appointments.map((appointment) => (
              <Card key={appointment.appointment_id} variant="outlined" sx={{ mb: 2, p: 2, transition: '0.3s', '&:hover': { boxShadow: 6 }, backgroundColor: '#e3f2fd' }} className="card-hover">
                <CardContent>
                  <Typography className="black-font" variant="h6">Appointment ID: {appointment.appointment_id}</Typography>
                  <Box display="flex" alignItems="center" mt={1}>
                    <EventIcon />
                    <Typography className="black-font" variant="body2" sx={{ ml: 1 }}>Date: {appointment.date}</Typography>
                  </Box>
                  <Box display="flex" alignItems="center" mt={1}>
                    <AccessTimeIcon />
                    <Typography className="black-font" variant="body2" sx={{ ml: 1 }}>Time: {appointment.time}</Typography>
                  </Box>
                  <Box display="flex" alignItems="center" mt={1}>
                    <LocationOnIcon />
                    <Typography className="black-font" variant="body2" sx={{ ml: 1 }}>Medical Center: {appointment.medical_center}</Typography>
                  </Box>
                  <Box display="flex" alignItems="center" mt={1}>
                    <PersonIcon />
                    <Typography className="black-font" variant="body2" sx={{ ml: 1 }}>Doctor: {appointment.doctor}</Typography>
                  </Box>
                  <Box display="flex" alignItems="center" mt={1}>
                    <PersonIcon />
                    <Typography className="black-font" variant="body2" sx={{ ml: 1 }}>Patient: {appointment.patient}</Typography>
                  </Box>
                  <Box display="flex" alignItems="center" mt={1}>
                    <DescriptionIcon />
                    <Typography className="black-font" variant="body2" sx={{ ml: 1 }}>Description: {appointment.description}</Typography>
                  </Box>
                </CardContent>
              </Card>
            ))}
          </List>
        </Box>
      </Box>
    </Box>
  );
};

export default M_home;
