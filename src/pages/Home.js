import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import {
  Container,
  Grid,
  Typography,
  Button,
  Box,
  Card,
  CardMedia,
  CardContent,
  AppBar,
  Toolbar,
  IconButton,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import styles from './Home.css';



const Home = () => {
  const handleMouseEnter = (type) => {
    console.log(`Mouse enter: ${type}`);
  };

  const handleMouseLeave = () => {
    console.log('Mouse leave');
  };

  useEffect(() => {
    return () => {
      setShownews1(false);
    };
  }, []);

  const [showValue1, setShowValue1] = useState(false);
  const [showValue2, setShowValue2] = useState(false);
  const [showValue3, setShowValue3] = useState(false);
  const [showValue4, setShowValue4] = useState(false);
  const [shownews1, setShownews1] = useState(false);
  const [shownews2, setShownews2] = useState(false);
  const [shownews3, setShownews3] = useState(false);

  const [currentImage, setCurrentImage] = useState(0);



  return (
    <Container maxWidth="lg"  sx={{ marginLeft:'-20px'}}>
       <AppBar position="static" sx={{ backgroundColor: '#023047' }}>
      <Toolbar>
        <IconButton edge="start" color="inherit" aria-label="menu">
          <MenuIcon />
        </IconButton>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          Healthy Roam
        </Typography>
        <Button
          color="inherit"
          component={Link}
          to="/projects"
          sx={{
            '&:hover': {
              textDecoration: 'underline',
              textDecorationThickness: '2px',
            },
          }}
        >
          Services
        </Button>
        <Button
          color="inherit"
          component={Link}
          to="/about"
          sx={{
            '&:hover': {
              textDecoration: 'underline',
              textDecorationThickness: '2px',
            },
          }}
        >
          About Us
        </Button>
        <Button
          color="inherit"
          component={Link}
          to="/contact"
          sx={{
            '&:hover': {
              textDecoration: 'underline',
              textDecorationThickness: '2px',
            },
          }}
        >
          Contact
        </Button>
        <Button
          color="inherit"
          component={Link}
          to="/login"
          sx={{
            '&:hover': {
              textDecoration: 'underline',
              textDecorationThickness: '2px',
            },
          }}
        >
          Login
        </Button>
        <Button
          color="inherit"
          component={Link}
          to="/signup"
          sx={{
            '&:hover': {
              textDecoration: 'underline',
              textDecorationThickness: '2px',
            },
          }}
        >
          Sign Up
        </Button>
      </Toolbar>
    </AppBar>

      <div style={{ position: 'relative' }}>
        <Typography
          variant="h4"
          gutterBottom
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            zIndex: 1,
            color: '#023047',
            textAlign: 'center',
            fontWeight:'bold',
          }}
        >
          Discover Best Medical Centers Nearby, During Your Visit <br/> Down South
          <Box sx={{ textAlign: 'center', py: 10 }}>
          <Button 
  component={Link} 
  to="/search" 
  variant="contained" 
  color="primary" 
  className="animateButton" // Apply the animation class here
>
  Search Location
</Button>

        </Box>
        </Typography>
        
        <Card>
          <CardMedia component="img" height="520" image="/images/medicaltourism2.webp" alt="Tourist" style={{ opacity: 0.7 }}/>
        </Card>
      </div>

     
   

      <Box sx={{ my: 4, textAlign: 'center' }}>
        <Typography variant="h6">What We Provide You</Typography>
        <Box sx={{ my: 2 }}>
          <Button
            startIcon={<FontAwesomeIcon icon={faPlus} />}
            onClick={() => setShowValue1(!showValue1)}
            variant="outlined"
            color="primary"
            fullWidth
          >
            Quick Medical Facility Search
          </Button>
          {showValue1 && (
            <Typography variant="body1" sx={{ mt: 2 }}>
              Offers users a seamless and efficient way to find nearby healthcare centers in the Southern area. With our
              intuitive search feature, users can swiftly locate medical facilities tailored to their needs, ensuring
              convenient access to essential healthcare services.
            </Typography>
          )}
        </Box>

        <Box sx={{ my: 2 }}>
          <Button
            startIcon={<FontAwesomeIcon icon={faPlus} />}
            onClick={() => setShowValue2(!showValue2)}
            variant="outlined"
            color="primary"
            fullWidth
          >
            Interactive Map Feature
          </Button>
          {showValue2 && (
            <Typography variant="body1" sx={{ mt: 2 }}>
              Offers users a seamless and efficient way to find nearby healthcare centers in the Southern area. With our
              intuitive search feature, users can swiftly locate medical facilities tailored to their needs, ensuring
              convenient access to essential healthcare services.
            </Typography>
          )}
        </Box>

        <Box sx={{ my: 2 }}>
          <Button
            startIcon={<FontAwesomeIcon icon={faPlus} />}
            onClick={() => setShowValue3(!showValue3)}
            variant="outlined"
            color="primary"
            fullWidth
          >
            Easy Online Appointment Scheduling
          </Button>
          {showValue3 && (
            <Typography variant="body1" sx={{ mt: 2 }}>
              Offers users a seamless and efficient way to find nearby healthcare centers in the Southern area. With our
              intuitive search feature, users can swiftly locate medical facilities tailored to their needs, ensuring
              convenient access to essential healthcare services.
            </Typography>
          )}
        </Box>

        <Box sx={{ my: 2 }}>
          <Button
            startIcon={<FontAwesomeIcon icon={faPlus} />}
            onClick={() => setShowValue4(!showValue4)}
            variant="outlined"
            color="primary"
            fullWidth
          >
            Destination-Based Notifications Included
          </Button>
          {showValue4 && (
            <Typography variant="body1" sx={{ mt: 2 }}>
              Offers users a seamless and efficient way to find nearby healthcare centers in the Southern area. With our
              intuitive search feature, users can swiftly locate medical facilities tailored to their needs, ensuring
              convenient access to essential healthcare services.
            </Typography>
          )}
        </Box>
      </Box>

      <Box sx={{ my: 4 }}>
        <Typography variant="h6" textAlign="center">
          Featured Medical Centers
        </Typography>
        <Grid container spacing={2} justifyContent="center">
          <Grid item>
            <img src="/images/m1.webp" alt="Medical Center 1" className="m-1" />
          </Grid>
          <Grid item>
            <img src="/images/m2.webp" alt="Medical Center 2" className="m-1" />
          </Grid>
          <Grid item>
            <img src="/images/m3.webp" alt="Medical Center 3" className="m-1" />
          </Grid>
        </Grid>
      </Box>

      <Box sx={{ my: 4 }}>
        <Typography variant="h6" textAlign="center">
          News
        </Typography>
        <Grid container spacing={4}>
          <Grid item xs={12} sm={4}>
            <Card className="move-on-hover">
              <CardMedia component="img" height="140" image="/images/Galle.jpg" alt="Galle" />
              <CardContent>
                <Typography variant="h6">Know before traveling to Galle</Typography>
                <Button onClick={() => setShownews1(!shownews1)} variant="text" color="primary">
                  {shownews1 ? 'Read Less' : 'Read More'}
                </Button>
                {shownews1 && (
                  <Typography variant="body2" sx={{ mt: 2 }}>
                    Traveling to Galle is a great adventure. Remember to get travel insurance that covers health costs.
                    This site is to find doctors and medicine if you need them. Prices for things like food and places
                    to stay are usually reasonable. Galle is pretty safe, but be careful of small thefts. Respect local
                    customs and maybe learn a few words in Sinhala, the local language. There's lots to do in Galle, like
                    exploring the old Galle Fort and chilling on beautiful beaches nearby. Galle is a fun place to visit
                    and make great memories!
                    <br />
                    <a href="https://hikersbay.com/travel-informations/srilanka/galle/galle-tourist-information.html?lang=en#num-crime">
                      Find More
                    </a>
                  </Typography>
                )}
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} sm={4}>
            <Card className="move-on-hover">
              <CardMedia component="img" height="140" image="/images/weather.jpg" alt="Galle Weather" />
              <CardContent>
                <Typography variant="h6">Galle Weather</Typography>
                <Button onClick={() => setShownews2(!shownews2)} variant="text" color="primary">
                  {shownews2 ? 'Read Less' : 'Read More'}
                </Button>
                {shownews2 && (
                  <Typography variant="body2" sx={{ mt: 2 }}>
                    Galle, Sri Lanka, enjoys a tropical climate characterized by warm temperatures and high humidity
                    levels year-round. Average temperatures typically range between 25°C to 30°C (77°F to 86°F). The
                    region experiences two distinct monsoon seasons: the Southwest Monsoon from May to September and the
                    Northeast Monsoon from December to February, bringing heavy rainfall. Despite the rain, Galle still
                    sees plenty of sunshine throughout the year. With its balmy weather and occasional showers, Galle
                    offers visitors a lush and vibrant environment to explore its rich history, scenic landscapes, and
                    cultural treasures.
                    <br />
                    <a href="https://www.accuweather.com/en/lk/galle/309721/weather-forecast/309721">Find More</a>
                  </Typography>
                )}
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} sm={4}>
            <Card className="move-on-hover">
              <CardMedia component="img" height="140" image="/images/dalawella.jpg" alt="Tourist Destinations" />
              <CardContent>
                <Typography variant="h6">Tourist Destinations</Typography>
                <Button onClick={() => setShownews3(!shownews3)} variant="text" color="primary">
                  {shownews3 ? 'Read Less' : 'Read More'}
                </Button>
                {shownews3 && (
                  <Typography variant="body2" sx={{ mt: 2 }}>
                    Galle, situated along the southern coast of Sri Lanka, boasts a treasure trove of attractions that
                    enthrall visitors with its rich history and breathtaking scenery. Within the ancient Galle Fort, a
                    UNESCO World Heritage Site, wander cobblestone streets lined with colonial-era buildings, boutique
                    shops, and charming cafes. Explore the historic ramparts, offering panoramic views of the Indian
                    Ocean and the bustling city below. Nearby, unwind on the picturesque beaches of Unawatuna and Jungle
                    Beach, known for their golden sands and turquoise waters ideal for swimming and snorkeling. For a
                    cultural immersion, visit the Dutch Reformed Church, Maritime Museum, and National Museum of Galle.
                    With its blend of cultural heritage and natural beauty, Galle promises an unforgettable journey
                    steeped in charm and allure.
                    <br />
                    <a href="https://www.arabiers.lk/guides/places-to-visit-in-galle">Find More</a>
                  </Typography>
                )}
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Box>

      <Box sx={{ my: 4, textAlign: 'center' }}>
        <Typography variant="body2" color="textSecondary">
          © 2024 Healthy Roam. All rights reserved.
        </Typography>
        <Typography variant="body2" color="textSecondary">
          Privacy Policy | Terms of Use | Contact Us
        </Typography>
      </Box>

      <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2 }}>
        <img src="/images/fb.png" alt="Facebook" style={{ width: '24px', height: '24px' }} />
        <img src="/images/in.png" alt="Instagram" style={{ width: '24px', height: '24px' }} />
        <img src="/images/twitter.png" alt="Twitter" style={{ width: '24px', height: '24px' }} />
      </Box>
    </Container>
  );
};

export default Home;
