import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import axios from 'axios';
import {
  Container,
  Typography,
  Card,
  CardContent,
  CardMedia,
  Grid,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Button
} from '@mui/material';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import PhoneIcon from '@mui/icons-material/Phone';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import PersonIcon from '@mui/icons-material/Person';
import DescriptionIcon from '@mui/icons-material/Description';

const Destinations = () => {
  const [medicalCenters, setMedicalCenters] = useState([]);
  const { destination } = useParams();

  useEffect(() => {
    const fetchMedicalCenters = async () => {
      try {
        const response = await axios.get(`https://downsouth-m-center.onrender.com/api/v1/m_center/search_by_destination?destination=${destination}`);
        setMedicalCenters(response.data);
      } catch (error) {
        console.error('Error fetching medical centers:', error);
      }
    };

    fetchMedicalCenters();
  }, [destination]);

  return (
    <Container>
      <Typography variant="h3" gutterBottom>
        Medical Centers in {destination}
      </Typography>
      {medicalCenters.length > 0 ? (
        <Grid container spacing={4}>
          {medicalCenters.map((center, index) => (
            <Grid item xs={12} key={index}>
              <Card sx={{ display: 'flex' }}>
                <CardMedia
                  component="img"
                  sx={{ width: 460, border: '2px solid #000' }} // Add border to image
                  image={center.image || 'default-image-url'} // Replace with a default image URL
                  alt={`${center.name}`}
                />
                <CardContent sx={{ flex: 1, paddingLeft: 30 }}> {/* Add padding to move content to the right */}
                  <Typography variant="h5" component="div">
                    {center.name}
                  </Typography>
                  <List>
                    <ListItem>
                      <ListItemIcon>
                        <PersonIcon />
                      </ListItemIcon>
                      <ListItemText primary={`Owner: ${center.owner_name}`} />
                    </ListItem>
                    <ListItem>
                      <ListItemIcon>
                        <PhoneIcon />
                      </ListItemIcon>
                      <ListItemText primary={`Phone Number: ${center.phone_number}`} />
                    </ListItem>
                    <ListItem>
                      <ListItemIcon>
                        <DescriptionIcon />
                      </ListItemIcon>
                      <ListItemText primary={`Description: ${center.description}`} />
                    </ListItem>
                    <ListItem>
                      <ListItemIcon>
                        <LocationOnIcon />
                      </ListItemIcon>
                      <ListItemText primary={`Location: ${center.latitude}, ${center.longitude}`} />
                    </ListItem>
                    <ListItem>
                      <ListItemIcon>
                        <AccessTimeIcon />
                      </ListItemIcon>
                      <ListItemText primary={`Open: ${center.open_time} - Close: ${center.close_time}`} />
                    </ListItem>
                  </List>
                  <Button variant="contained" color="primary" component={Link} to="/t_appointment">
                        Appointment
                    </Button>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      ) : (
        <Typography>No medical centers found for this destination.</Typography>
      )}
    </Container>
  );
};

export default Destinations;
