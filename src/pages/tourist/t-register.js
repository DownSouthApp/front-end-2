import React, { useState } from 'react';
import axios from 'axios';
import { TextField, Button, Container, Box, Typography, Grid, InputAdornment, Snackbar, Alert } from '@mui/material';
import { AccountCircle, Flag, Phone, Lock, Email } from '@mui/icons-material';
import './t-register.css';

const imageSrc = '/images/traveller1.png'; // Replace with a suitable image URL

const TouristRegister = () => {
    const [username, setUsername] = useState('');
    const [name, setName] = useState('');
    const [country, setCountry] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [password, setPassword] = useState('');
    const [openSnackbar, setOpenSnackbar] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');
    const [snackbarSeverity, setSnackbarSeverity] = useState('success');

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log('try to register ');

        try {
            const formData = new FormData();
            formData.append('username', username);
            formData.append('name', name);
            formData.append('country', country);
            formData.append('phone_number', phoneNumber);
            formData.append('password', password);
    
            const response = await axios.post('https://ds-tourist.onrender.com/api/v1/tourist', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
    
            console.log('Registration successful:', response.data);

            console.log(response);

            setUsername('');
            setName('');
            setCountry('');
            setPhoneNumber('');
            setPassword('');

            setSnackbarMessage('Registration successful!');
            setSnackbarSeverity('success');
            setOpenSnackbar(true);

            // Redirect after a delay
            setTimeout(() => {
                window.location = '/login';
            }, 2000);
        } catch (error) {
            console.log(error);

            setSnackbarMessage('Registration failed. Please try again.');
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
                    Register As A Tourist
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
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                InputProps={{
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            <AccountCircle />
                                        </InputAdornment>
                                    ),
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
                                Register
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

export default TouristRegister;
