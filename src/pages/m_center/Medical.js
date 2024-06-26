import React, { useState } from 'react';
import { Link } from 'react-router-dom'; 
import './Medical.css';
import axios from 'axios';
import { TextField, Button, Container, Box, Typography, Grid, InputAdornment, Snackbar, Alert } from '@mui/material';
import { Email, LocationOn, Phone, Person, Description, AccountCircle, Lock } from '@mui/icons-material';

const imageSrc = '/images/hospital1.png';

const Medical = () => {
    const [name, setName] = useState('');
    const [longitude, setLongitude] = useState(0);
    const [latitude, setLatitude] = useState(0);
    const [destination, setDestination] = useState('');
    const [destinations, setDestinations] = useState([]);
    const [phoneNumber, setPhoneNumber] = useState('');
    const [ownerName, setOwnerName] = useState('');
    const [description, setDescription] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [openSnackbar, setOpenSnackbar] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');
    const [snackbarSeverity, setSnackbarSeverity] = useState('success');

    const SearchWithDestination_ = async (destination) => {
        return await axios.get(`https://ds-desrination.onrender.com/api/v1/destination/search?name=${destination}`);
    }

    const handleSearch = async (event) => {
        const searchTerm = event.target.value;
        setDestination(searchTerm);
        if (searchTerm.trim() === '') {
            setDestinations([]);
            return;
        }
        try {
            const response = await SearchWithDestination_(searchTerm);
            console.log(response.data[0]);
            setDestinations(response.data.map((destination) => destination.name));
        } catch (error) {
            console.error(error);
        }
    };

    const handleRegister = async (e) => {
        e.preventDefault();  // Prevent the default form submission behavior
        
        try {
            console.log("button clicked");
            console.log("name : "+ name + " longitude : "+ longitude + " latitude : "+ latitude + " destination : "+ destination + " phoneNumber : "+ phoneNumber + " ownerName : "+ ownerName + " description : "+ description + " username : "+ username + " password : "+ password);

            const fileInput = e.target.file;  // Use e.target to access the file input
            const selectedFile = fileInput.files[0];

            let body = new FormData();
            body.append('name', name);
            body.append('longitude', longitude);
            body.append('latitude', latitude);
            body.append('destination', destination);
            body.append('phone_number', phoneNumber);
            body.append('owner_name', ownerName);
            body.append('description', description);
            body.append('username', username);
            body.append('password', password);
            body.append('file', selectedFile);

            const response = await axios.post(`http://localhost:4003/api/v1/m_center`, body);
            console.log(response.data);

            setSnackbarMessage('Registration successful!');
            setSnackbarSeverity('success');
            setOpenSnackbar(true);

            // Redirect after a delay
            setTimeout(() => {
                window.location = '/login';
            }, 2000);
        } catch (error) {
            console.error(error);
            console.log("\tFailed => Create Medical Center");
            console.log("\t****************************** \n");

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
                    backgroundColor: '#f0f4f8'
                }}
            >
                <Typography variant="h4" component="h1" gutterBottom sx={{ color: 'blue' }}>
                    Register as a Medical Center
                </Typography>
                <Grid container spacing={2} alignItems="center">
                    <Grid item xs={12} md={6}>
                        <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                            <img src={imageSrc} alt="Hospital" style={{ width: '100%', maxWidth: '300px', borderRadius: '10px' }} />
                        </Box>
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <form onSubmit={handleRegister} style={{ width: '100%' }}>
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
                            <button
                                onClick={(e) => {
                                    e.preventDefault();
                                    navigator.geolocation.getCurrentPosition((position) => {
                                        setLatitude(position.coords.latitude);
                                        setLongitude(position.coords.longitude);
                                    });
                                }}
                            >Get Current Location</button>
                            <TextField
                                label="Nearest tourist Destination"
                                variant="outlined"
                                fullWidth
                                margin="normal"
                                value={destination}
                                onChange={(e) => { handleSearch(e) }}
                                InputProps={{
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            <LocationOn />
                                        </InputAdornment>
                                    ),
                                }}
                                sx={{ backgroundColor: '#ffffff', borderRadius: 1 }}
                            />
                            {destinations.map((result, id) => (
                                <div className="search-result" key={id}>
                                    <Link to="#" onClick={() => setDestination(result)}>
                                        {result}
                                    </Link>
                                </div>
                            ))}
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
                                label="Owner Name"
                                variant="outlined"
                                fullWidth
                                margin="normal"
                                value={ownerName}
                                onChange={(e) => setOwnerName(e.target.value)}
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
                            <input type="file" name="file" id="m_center_image" />
                            <Button type="submit" variant="contained" color="primary" fullWidth sx={{ mt: 2, backgroundColor: '#2e7d32' }}>
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

export default Medical;
