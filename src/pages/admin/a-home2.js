import React, { useState, useEffect } from 'react'; 
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectUser } from '../../slices/userSlice';
import axios from 'axios';
import { 
    Container, 
    Typography, 
    TextField, 
    Button, 
    Box, 
    Card, 
    CardContent, 
    CardMedia, 
    Grid, 
    Alert,
    AppBar, 
    Toolbar 
} from '@mui/material';

const AUTH_URL = process.env.REACT_APP_AUTH_URL || 'https://downsouth-auth.onrender.com' || 'http://localhost:4001/api/v1/auth/login';

const AdminHome = () => {
    const user = useSelector(selectUser);
    const [destinationList, setDestinationList] = useState([]);
    const [username, setUsername] = useState('');
    const [disqualified, setDisqualified] = useState(false);
    const [disqualifingUser, setDisqualifingUser] = useState(null);

    const getDestinations = async () => {
        try {
            const response = await axios.get(`https://ds-desrination.onrender.com/api/v1/destination`, {
                headers: {
                    'x-access-token': user.token,
                }
            });
            setDestinationList(response.data);
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        getDestinations();
    }, []); 

    const onChangeOfUsername = async (e) => {
        try {
            const name = e.target.value;
            setUsername(name);
            setDisqualifingUser(null);
            const response = await axios.get(`https://ds-central.onrender.com/auth/api/v1/auth?username=${name}`, {
                headers: {
                    'x-access-token': user.token,
                }
            });
            setDisqualifingUser(response.data);
        } catch (error) {
            if (error.response?.data.includes("Missing required fields")) {
                setDisqualifingUser(null);
            }
            if (error.response?.data.includes("User not found")) {
                setDisqualifingUser({ error: 'User not found' });
            }
        }
    }

    const handleDisqualify = async () => {
        try {
            await axios.put(`https://ds-central.onrender.com/auth/api/v1/auth?username=${username}`, {
                username: "Invalid",
                user_type: 'Disqualified',
                password: 'invalid'
            }, {
                headers: {
                    'x-access-token': user.token,
                }
            });
            setDisqualified(true);
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <Container>
            <AppBar position="fixed">
                <Toolbar>
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                        Admin Home
                    </Typography>
                    <Box className="admin-home-links" sx={{ display: 'flex', gap: 2 ,mt: 1 ,ml: 40}}>
                    <Button 
                        className="admin-home-button"
                        variant="contained"
                        color="info"  
                        component={Link} 
                        to="/"
                    >
                        Log Out
                    </Button>
                   
                </Box>
                </Toolbar>
               
                
            
            </AppBar>
            <Toolbar sx={{ mt: 10 }} />
            
            <Container className="admin-content" sx={{ mt: -6 ,ml: -3}}>
                <Grid container spacing={2} alignItems="center">
                    <Grid item xs={12} sm={6}>
                        <TextField
                            fullWidth
                            value={username}
                            onChange={onChangeOfUsername}
                            className="admin-home-input"
                            placeholder="Enter username"
                            label="Search a User"
                            variant="outlined"
                            margin="normal"
                        />
                    </Grid>
                    <Grid item>
                        <Button
                            onClick={handleDisqualify}
                            className="admin-home-button"
                            variant="contained"
                            color="warning"
                        >
                            Disqualify User
                        </Button>
                    </Grid>
                </Grid>
                {disqualifingUser && (
                    <Box mt={2}>
                        {disqualifingUser.message ? (
                            <Typography color="error">{disqualifingUser.message}</Typography>
                        ) : (
                            <>
                                <Typography>Username: {disqualifingUser.username}</Typography>
                                <Typography>User Type: {disqualifingUser.user_type}</Typography>
                            </>
                        )}
                    </Box>
                )}
                {disqualified && <Alert severity="success" className="admin-home-message">User has been disqualified!</Alert>}
            </Container>
            <Toolbar sx={{ mt: 2 }}>
                <Box className="admin-home-links" sx={{ display: 'flex', gap: 2 }}>
                    <Button 
                        className="admin-home-button"
                        variant="contained"
                        color="primary"  
                        component={Link} 
                        to="/admin/a_create"
                    >
                        Create Destination
                    </Button>
                    <Button 
                        className="admin-home-button"
                        variant="contained"
                        color="primary" 
                        component={Link} 
                        to="/admin/a_update"
                    >
                        Update Destination
                    </Button>
                </Box>
            </Toolbar>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 ,mt: 5 }} >
                        Created Destinations
                    </Typography>
            <Grid container spacing={4} mt={1}>
                {destinationList.map((destination, index) => (
                    <Grid item key={index} xs={12} md={6} lg={4}>
                        <Card>
                            <CardContent>
                                <Typography variant="h5" component={Link} to={`/admin/a_update/${destination.id}`}>
                                    {destination.name}
                                </Typography>
                                <Typography variant="body2" color="textSecondary">
                                    {destination.description}
                                </Typography>
                            </CardContent>
                            {destination.images.map((image, idx) => (
                                <CardMedia
                                    key={idx}
                                    component="img"
                                    height="200"
                                    image={image}
                                    alt="destination"
                                    sx={{ objectFit: 'cover' }}
                                />
                            ))}
                        </Card>
                    </Grid>
                ))}
            </Grid>
        </Container>
    );
};

export default AdminHome;
