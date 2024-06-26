import React, { useEffect, useState } from 'react';
import { Map, Marker, Overlay } from 'pigeon-maps';
import axios from 'axios';
import { Link ,useParams} from 'react-router-dom';
import { Container, Typography, TextField, Button, Box, Paper } from '@mui/material';

const MapPage = () => {
    const { destination } = useParams();
    const [markers, setMarkers] = useState([]);
    const [position, setPosition] = useState({ coords: { longitude: 80, latitude: 6 } });
    const [selectedMarker, setSelectedMarker] = useState(null);

    const handleMarkerClick = (marker) => {
        setSelectedMarker(marker);
    };

    

    const getMarkers = async () => {
        console.log("Test => Search with Radius");
        try {
            
            const response = await axios.get(`https://ds-central.onrender.com/m_center/api/v1/m_center/search_by_radius?latitude=6&longitude=80&radius=1000`, {
                
            });
            if (response.data.length > 0){ setMarkers(response.data);
            console.log(response.data);
            }
            console.log(response.data[5]?.location.coordinates[0]);
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
    }, [destination]);
    return (
        <Container>
            <Box my={4}>
                <Typography variant="h4" component="h1" gutterBottom>
                    Medical Centers Map
                </Typography>
                
                <Box component={Paper} elevation={3} p={2}>
                    <Map height={400} defaultCenter={[6, 81]} defaultZoom={7.5}>
                        {markers.map((marker) => (
                            <Marker
                                key={marker.id}
                                anchor={[marker.location.coordinates[1], marker.location.coordinates[0]]}
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
