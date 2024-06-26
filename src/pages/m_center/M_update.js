import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { selectUser } from "../../slices/userSlice";
import axios from "axios";
import { TextField, Button, Container, Box, Typography, Grid, InputAdornment, Snackbar, Alert } from '@mui/material';
import { Email, LocationOn, Phone, Person, Description, AccountCircle, Lock } from '@mui/icons-material';

const M_Update = () => {
    const user = useSelector(selectUser);
    console.log("User data_:", user.token);

    const [name, setName] = useState(user.name);
    const [longitude, setLongitude] = useState(user.longitude);
    const [latitude, setLatitude] = useState(user.latitude);
    const [destination, setDestination] = useState(user.destination);
    const [phone_number, setPhone_number] = useState(user.phone_number);
    const [owner_name, setOwner_name] = useState(user.owner_name);
    const [description, setDescription] = useState(user.description);
    const [username, setUsername] = useState(user.username);
    const [password, setPassword] = useState("");
    const [openSnackbar, setOpenSnackbar] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');
    const [snackbarSeverity, setSnackbarSeverity] = useState('success');

    const getUser = async () => {
        try {
            const currentUser = await axios.get(`${process.env.REACT_APP_MEDICAL_CENTER_URL}/api/v1/m_center/${user.username}`, {
                headers: { Authorization: `Bearer ${user.token}` },
            });
            console.log("Current User long:", currentUser.data.location.coordinates[0]);
            setName(currentUser.data.name);
            setLongitude(currentUser.data.location.coordinates[0]);
            setLatitude(currentUser.data.location.coordinates[1]);
            setDestination(currentUser.data.destination);
            setPhone_number(currentUser.data.phone_number);
            setOwner_name(currentUser.data.owner_name);
            setDescription(currentUser.data.description);
            setUsername(currentUser.data.username);
        } catch (error) {
            console.error("Error fetching user:", error);
        }
    };

    useEffect(() => {
        getUser();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            console.log("Update front sending data", user.username, name, longitude, latitude, destination, phone_number, owner_name, description, username, password, user.token);
            const response = await axios.put(`${process.env.REACT_APP_MEDICAL_CENTER_URL}/api/v1/m_center`, {
                username: user.username,
                name: name,
                longitude: longitude,
                latitude: latitude,
                destination: destination,
                phone_number: phone_number,
                owner_name: owner_name,
                description: description,
                password: password,
                token: user.token
            });

            console.log("Update response:", response.data);
            setSnackbarMessage('Update successful!');
            setSnackbarSeverity('success');
            setOpenSnackbar(true);

            setTimeout(() => {
                window.location = "/m_home";
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
                    backgroundColor: '#f0f4f8'
                }}
            >
                <Typography variant="h4" component="h1" gutterBottom sx={{ color: 'blue' }}>
                    Update Medical Center Information
                </Typography>
                <Grid container spacing={2} alignItems="center">
                    <Grid item xs={12} md={6}>
                        <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                            <img src="/images/hospital1.png" alt="Hospital" style={{ width: '100%', maxWidth: '300px', borderRadius: '10px' }} />
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
                                label="Longitude"
                                variant="outlined"
                                fullWidth
                                margin="normal"
                                type="number"
                                value={longitude}
                                onChange={(e) => setLongitude(e.target.value)}
                                InputProps={{
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            <LocationOn />
                                        </InputAdornment>
                                    ),
                                }}
                                sx={{ backgroundColor: '#ffffff', borderRadius: 1 }}
                            />
                            <TextField
                                label="Latitude"
                                variant="outlined"
                                fullWidth
                                margin="normal"
                                type="number"
                                value={latitude}
                                onChange={(e) => setLatitude(e.target.value)}
                                InputProps={{
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            <LocationOn />
                                        </InputAdornment>
                                    ),
                                }}
                                sx={{ backgroundColor: '#ffffff', borderRadius: 1 }}
                            />
                            <TextField
                                label="Destination"
                                variant="outlined"
                                fullWidth
                                margin="normal"
                                value={destination}
                                onChange={(e) => setDestination(e.target.value)}
                                InputProps={{
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            <LocationOn />
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
                                value={phone_number}
                                onChange={(e) => setPhone_number(e.target.value)}
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
                                label="Owner Name"
                                variant="outlined"
                                fullWidth
                                margin="normal"
                                value={owner_name}
                                onChange={(e) => setOwner_name(e.target.value)}
                                InputProps={{
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            <Person />
                                        </InputAdornment>
                                    ),
                                }}
                                sx={{ backgroundColor: '#ffffff', borderRadius: 1 }}
                            />
                            <TextField
                                label="Description"
                                variant="outlined"
                                fullWidth
                                margin="normal"
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                InputProps={{
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            <Description />
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
                            <Button type="submit" variant="contained" color="primary" fullWidth sx={{ mt: 2, backgroundColor: '#2e7d32' }}>
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

export default M_Update;
