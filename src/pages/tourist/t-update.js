import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { selectUser } from "../../slices/userSlice";
import axios from "axios";
import { TextField, Button, Container, Box, Typography, Grid, InputAdornment, Snackbar, Alert } from '@mui/material';
import { AccountCircle, Flag, Phone, Lock, Email } from '@mui/icons-material';
import './t-register.css';

const imageSrc = '/images/traveller1.png'; // Replace with a suitable image URL

const EditProfile = () => {
    // Accessing user data from the Redux store
    const user = useSelector(selectUser);

    // State variables to store user details
    const [name, setName] = useState(user.name);
    const [country, setCountry] = useState(user.country);
    const [phoneNumber, setPhoneNumber] = useState(user.phone_number);
    const [password, setPassword] = useState("");
    const [openSnackbar, setOpenSnackbar] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');
    const [snackbarSeverity, setSnackbarSeverity] = useState('success');

    const getUser = async () => {
        try {
            const response = await axios.get(`${process.env.REACT_APP_TOURIST_URL}/api/v1/tourists?username=${user.username}`, {
                headers: {
                    Authorization: `Bearer ${user.token}`
                }
            });
            const currentUser = response.data;
            setName(currentUser.name);
            setCountry(currentUser.country);
            setPhoneNumber(currentUser.phone_number);
        } catch (error) {
            console.error("Error fetching user:", error);
        }
    };

    // useEffect hook to populate the form fields with user data when the component mounts
    useEffect(() => {
        getUser();
    }, []);

    // Function to handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        
        try {
            // Send updated user details to the server
            const response = await axios.put(`${process.env.REACT_APP_TOURIST_URL}/api/v1/tourists`, {
                username: user.username,
                name: name,
                country: country,
                phone_number: phoneNumber,
                password: password
            }, {
                headers: {
                    Authorization: `Bearer ${user.token}`
                }
            });

            setSnackbarMessage('Profile updated successfully!');
            setSnackbarSeverity('success');
            setOpenSnackbar(true);

            // Redirect after a delay
            setTimeout(() => {
                window.location = "/t_home";
            }, 2000);
        } catch (error) {
            console.error("Error updating user:", error);
            setSnackbarMessage('Update failed. Please try again.');
            setSnackbarSeverity('error');
            setOpenSnackbar(true);
        }
    };

    const handleCloseSnackbar = () => {
        setOpenSnackbar(false);
    };

    return (
        <Container maxWidth="md">
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    mt: 5,
                    mb: 5,
                    p: 3,
                    boxShadow: 3,
                    borderRadius: 2,
                    backgroundColor: '#e0f7fa'
                }}
            >
                <Typography variant="h4" component="h1" gutterBottom sx={{ color: 'blue' }}>
                    Edit Profile
                </Typography>
                <Grid container spacing={2} alignItems="center">
                    <Grid item xs={12} md={6}>
                        <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                            <img src={imageSrc} alt="Traveller" style={{ width: '100%', maxWidth: '300px', borderRadius: '10px' }} />
                        </Box>
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <form onSubmit={handleSubmit} style={{ width: '100%' }}>
                            <TextField
                                label="Username"
                                variant="outlined"
                                fullWidth
                                margin="normal"
                                value={user.username}
                                InputProps={{
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            <AccountCircle />
                                        </InputAdornment>
                                    ),
                                    readOnly: true,
                                }}
                                sx={{ backgroundColor: '#ffffff', borderRadius: 1 }}
                            />
                            <TextField
                                label="Email"
                                variant="outlined"
                                fullWidth
                                margin="normal"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                InputProps={{
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            <Email />
                                        </InputAdornment>
                                    ),
                                }}
                                sx={{ backgroundColor: '#ffffff', borderRadius: 1 }}
                            />
                            <TextField
                                label="Country"
                                variant="outlined"
                                fullWidth
                                margin="normal"
                                value={country}
                                onChange={(e) => setCountry(e.target.value)}
                                InputProps={{
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            <Flag />
                                        </InputAdornment>
                                    ),
                                }}
                                sx={{ backgroundColor: '#ffffff', borderRadius: 1 }}
                            />
                            <TextField
                                label="Phone Number"
                                variant="outlined"
                                fullWidth
                                margin="normal"
                                value={phoneNumber}
                                onChange={(e) => setPhoneNumber(e.target.value)}
                                InputProps={{
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            <Phone />
                                        </InputAdornment>
                                    ),
                                }}
                                sx={{ backgroundColor: '#ffffff', borderRadius: 1 }}
                            />
                            <TextField
                                label="Password"
                                variant="outlined"
                                type="password"
                                fullWidth
                                margin="normal"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                InputProps={{
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            <Lock />
                                        </InputAdornment>
                                    ),
                                }}
                                sx={{ backgroundColor: '#ffffff', borderRadius: 1 }}
                            />
                            <Button type="submit" variant="contained" color="primary" fullWidth sx={{ mt: 2, backgroundColor: '#00695c' }}>
                                Update
                            </Button>
                        </form>
                    </Grid>
                </Grid>
                <Snackbar open={openSnackbar} autoHideDuration={6000} onClose={handleCloseSnackbar}>
                    <Alert onClose={handleCloseSnackbar} severity={snackbarSeverity} sx={{ width: '100%' }}>
                        {snackbarMessage}
                    </Alert>
                </Snackbar>
            </Box>
        </Container>
    );
};

export default EditProfile;
