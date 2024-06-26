import React, { useEffect, useState } from 'react';
import { Map, Marker, Overlay } from 'pigeon-maps';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Container, Typography, TextField, Button, Box, Paper } from '@mui/material';

const MapPage = () => {
    // const [markers, setMarkers] = useState([]);
    const [position, setPosition] = useState({ coords: { longitude: 80, latitude: 6 } });
    const [selectedMarker, setSelectedMarker] = useState(null);
    const [radius, setRadius] = useState(10000);
    let markers = [];
    const handleMarkerClick = (marker) => {
        setSelectedMarker(marker);
    };

    const handleRadiusChange = (event) => {
        setRadius(event.target.value);
    };

    const getMarkers = async () => {
        console.log("Test => Search with Radius");
        try {
        
            const { longitude, latitude } = position.coords;
            console.log(`\tLongitude: ${longitude}`);
            console.log(`\tLatitude: ${latitude}`);
            console.log(`\tRadius: ${radius}`);
            const response = await axios.get(`http://https://ds-central.onrender.com/m_center/api/v1/m_center/search_by_radius?latitude=6&longitude=80&radius=1000`);
            if (response.data.length > 0) markers= response.data;
            console.log(response.data);
            console.log(markers[0].location.coordinates[0]);
            console.log("\tPassed => Search with Radius");
            console.log("\t****************************** \n");
        } catch (error) {
            console.error(error);
            console.log("\tFailed => Search with Radius");
            console.log("\t****************************** \n");
        }
    };

    useEffect(() => {
        getMarkers();
    }, [radius]);

    return (
        <Container>
            <Box my={4}>
                <Typography variant="h4" component="h1" gutterBottom>
                    Medical Centers Map
                </Typography>
                <Box display="flex" alignItems="center" mb={2}>
                    <TextField
                        label="Radius"
                        type="number"
                        value={radius}
                        onChange={handleRadiusChange}
                        variant="outlined"
                        size="small"
                        sx={{ marginRight: 2 }}
                    />
                   
                </Box>
                <Box component={Paper} elevation={3} p={2}>
                    <Map height={400} defaultCenter={[6, 81]} defaultZoom={7.5}>
                        {markers.map((marker) => (
                            <Marker
                                key={marker.id}
                                anchor={[6, 80]}
                                onClick={() => handleMarkerClick(marker)}
                            />
                        ))}

                        {selectedMarker && (
                            <Overlay anchor={[selectedMarker.location.coordinates[0], selectedMarker.location.coordinates[1]]} offset={[120, 79]}>
                                <Paper elevation={3} sx={{ padding: 2 }}>
                                    <Typography variant="h6">{selectedMarker.name}</Typography>
                                    <Typography variant="body2">{selectedMarker.owner_name}</Typography>
                                    <Typography variant="body2">{selectedMarker.phone_number}</Typography>
                                    <Typography variant="body2">{selectedMarker.destination}</Typography>
                                    <Typography variant="body2">{selectedMarker.description}</Typography>
                                    <Button variant="contained" color="primary" component={Link} to="/t_appointment">
                        Appointment
                    </Button>
                                </Paper>
                            </Overlay>
                        )}
                    </Map>
                </Box>
            </Box>
        </Container>
    );
};

export default MapPage;
