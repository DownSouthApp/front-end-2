import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'; // Import useNavigate from react-router-dom
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faArrowRight } from '@fortawesome/free-solid-svg-icons'; // Import the arrow icon
import { TextField, Button, Container, Typography, Grid, InputAdornment } from '@mui/material';
import './Search.css';
import axios from "axios";

const SearchWithDestination_ = async (destination) => {
  return await axios.get(`https://ds-desrination.onrender.com/api/v1/destination/search?name=${destination}`);
}

const SearchComponent = () => {
  const [typedText, setTypedText] = useState('');
  const [destinations, setDestinations] = useState([]);
  const navigate = useNavigate(); // Use useNavigate hook to get navigation function

  const handleSearch = async (event) => {
    const searchTerm = event.target.value;
    setTypedText(searchTerm);
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

  const handleDestinationClick = (destination) => {
    setTypedText(destination);
  };

  const handleSearchIconClick = () => {
    navigate(`/maps/${typedText}`); // Use navigate function to redirect to result page
  };

  return (
    <Container maxWidth="md" style={{ backgroundColor: '#f0f0f0', marginTop:'100px' }}>
      <div className="all-container">
        <Grid container spacing={2} alignItems="center">
          <Grid item xs={12} sm={6}>
            <div className="fort-img">
              <img src="/images/fort.jpg" alt="Medical" style={{ maxWidth: '500px', height: '500px', marginLeft:'-100px', marginTop:'-80px'}} />
            </div>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Grid container spacing={2} direction="column">
              <Grid item xs={12}>
                <Typography variant="subtitle1" gutterBottom className="square-text1"  fontSize={'20px'}>
                  Discover Nearby Medical Centers. <br />
                  Search by Your <span color='blue'>Location</span> or
                  Go To <span >Map</span> for Exploration
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <Button
                  component={Link}
                  to="/map"
                  variant="contained"
                  color="primary"
                  size="large"
                  fullWidth
                  className="map-button" // Add a class for styling
                >
                  Go To Map
                  <FontAwesomeIcon icon={faArrowRight} className="arrow-icon" /> {/* Add the arrow icon */}
                </Button>
              </Grid>
              <Grid item xs={12} style={{ position: 'relative' }}>
                <TextField
                  label="Enter Destination"
                  variant="outlined"
                  value={typedText}
                  onChange={handleSearch}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="start">
                        <FontAwesomeIcon icon={faSearch} color="black" onClick={handleSearchIconClick} style={{ cursor: 'pointer' }}/>
                      </InputAdornment>
                    ),
                  }}
                  fullWidth
                />
                {destinations.length > 0 && (
                  <div className="results-list" style={{ position: 'absolute', top: '100%', left: 0, width: '100%', backgroundColor: 'white', zIndex: 999 }}>
                    {destinations.map((result, id) => (
                      <div className="search-result" key={id}>
                        <Link to="#" onClick={() => handleDestinationClick(result)}>
                          {result}
                        </Link>
                      </div>
                    ))}
                  </div>
                )}
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </div>
    </Container>
  );
};

export default SearchComponent;