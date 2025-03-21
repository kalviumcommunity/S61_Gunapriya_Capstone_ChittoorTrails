import React, { useState } from 'react';
import { 
  AppBar, 
  Toolbar, 
  Typography, 
  Button, 
  IconButton, 
  Drawer, 
  List, 
  ListItem, 
  ListItemText, 
  Card, 
  CardContent, 
  CardMedia, 
  Container, 
  Grid, 
  Box, 
  Paper, 
  Avatar, 
  Divider, 
  useMediaQuery, 
  useTheme 
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import ExploreIcon from '@mui/icons-material/Explore';
import PersonalizeIcon from '@mui/icons-material/EmojiPeople';
import EcoIcon from '@mui/icons-material/Spa'; 
import ArrowRightAltIcon from '@mui/icons-material/ArrowRightAlt';
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import TwitterIcon from '@mui/icons-material/Twitter';
import LoginIcon from '@mui/icons-material/Login';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import { Link } from 'react-router-dom';
import valleyImage from '../assets/valley.jpg';


// Create a consistent styling approach using Material UI's sx prop
const styles = {
  appContainer: {
    minHeight: '100vh',
    bgcolor: 'grey.50',
  },
  drawer: {
    width: 250,
    p: 4,
  },
  drawerHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    mb: 3,
  },
  navButton: {
    color: 'white',
    '&:hover': {
      color: '#86efac', // green-300 equivalent
    },
    transition: 'colors 0.3s',
  },
  authButtons: {
    display: 'flex',
    gap: 1,
    ml: 2,
  },
  loginButton: {
    bgcolor: 'rgba(255, 255, 255, 0.2)',
    color: 'white',
    textTransform: 'none',
    borderRadius: 2,
    px: 2,
    py: 0.5,
    '&:hover': {
      bgcolor: 'rgba(255, 255, 255, 0.3)',
    },
  },
  registerButton: {
    bgcolor: '#16a34a', // green-600
    color: 'white',
    textTransform: 'none',
    borderRadius: 2,
    px: 2,
    py: 0.5,
    '&:hover': {
      bgcolor: '#15803d', // green-700
    },
  },
  drawerItem: {
    '&:hover': {
      bgcolor: '#f0fdf4', // green-50 equivalent
    },
  },
  drawerAuthButtons: {
    display: 'flex',
    flexDirection: 'column',
    gap: 1,
    mt: 2,
    mb: 2,
  },
  hero: {
    height: '100vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    position: 'relative',
  },
  heroContent: {
    textAlign: 'center',
    zIndex: 10,
    px: 4,
  },
  heroTitle: {
    color: 'white',
    fontWeight: 'bold',
    mb: 4,
    fontSize: { xs: '2.5rem', md: '4rem' },
    letterSpacing: '0.1em',
  },
  heroSubtitle: {
    color: 'white',
    mb: 8,
    maxWidth: 600,
    mx: 'auto',
  },
  buttonContainer: {
    display: 'flex',
    flexDirection: { xs: 'column', sm: 'row' },
    justifyContent: 'center',
    gap: { xs: 2, sm: 2 },
  },
  primaryButton: {
    bgcolor: '#16a34a', // green-600
    color: 'white',
    px: 4,
    py: 1.5,
    borderRadius: 28,
    textTransform: 'none',
    '&:hover': {
      bgcolor: '#15803d', // green-700
    },
  },
  outlinedButton: {
    border: 2,
    borderColor: 'white',
    color: 'white',
    px: 4,
    py: 1.5,
    borderRadius: 28,
    textTransform: 'none',
    '&:hover': {
      bgcolor: 'white',
      color: '#166534', // green-800
    },
    transition: 'colors 0.3s',
  },
  sectionTitle: {
    textAlign: 'center',
    fontWeight: 'bold',
    mb: 6,
  },
  featureCard: {
    p: 3,
    height: '100%',
    textAlign: 'center',
    transition: 'box-shadow 0.3s',
    '&:hover': {
      boxShadow: 8,
    },
  },
  featureIcon: {
    bgcolor: '#dcfce7', // green-100
    width: 64,
    height: 64,
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    margin: '0 auto',
    mb: 2,
  },
  iconColor: {
    color: '#16a34a', // green-600
  },
  destinationCard: {
    height: '100%',
    transition: 'box-shadow 0.3s',
    '&:hover': {
      boxShadow: 8,
    },
  },
  exploreButton: {
    color: '#16a34a', // green-600
    textTransform: 'none',
    p: 0,
    '&:hover': {
      color: '#166534', // green-800
    },
    transition: 'colors 0.3s',
  },
  ctaSection: {
    py: 8,
    bgcolor: '#16a34a', // green-600
    color: 'white',
  },
  ctaButton: {
    bgcolor: 'white',
    color: '#16a34a', // green-600
    px: 3,
    py: 1,
    textTransform: 'none',
    '&:hover': {
      bgcolor: 'grey.100',
    },
  },
  ctaOutlinedButton: {
    border: 2,
    borderColor: 'white',
    color: 'white',
    px: 3,
    py: 1,
    textTransform: 'none',
    '&:hover': {
      bgcolor: 'white',
      color: '#16a34a', // green-600
    },
  },
  footer: {
    bgcolor: '#1f2937', // gray-800
    color: 'white',
    py: 6,
  },
  footerLink: {
    color: '#9ca3af', // gray-400
    pl: 0,
    '&:hover': {
      color: '#86efac', // green-300
    },
  },
  footerText: {
    color: '#9ca3af', // gray-400
    mb: 1,
  },
  socialIcon: {
    color: '#9ca3af', // gray-400
    p: 0.5,
    '&:hover': {
      color: 'white',
    },
  },
  footerDivider: {
    my: 4,
    bgcolor: '#374151', // gray-700
  },
  copyright: {
    color: '#9ca3af', // gray-400
    textAlign: 'center',
  }
};

const Homepage = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const toggleDrawer = (open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }
    setDrawerOpen(open);
  };

  const navItems = [
    { label: 'Destinations', href: '#destinations' },
    { label: 'Experiences', href: '#experiences' },
    { label: 'Packages', href: '#packages' },
    { label: 'About Us', href: '/about' },
    { label: 'Contact', href: '#contact' }
  ];

  const features = [
    {
      icon: <ExploreIcon fontSize="large" sx={styles.iconColor} />,
      title: 'Local Expertise',
      description: 'Guides with deep knowledge of Chittoor\'s culture, history, and hidden paths.'
    },
    {
      icon: <PersonalizeIcon fontSize="large" sx={styles.iconColor} />,
      title: 'Personalized Tours',
      description: 'Customized experiences tailored to your interests, fitness level, and schedule.'
    },
    {
      icon: <EcoIcon fontSize="large" sx={styles.iconColor} />,
      title: 'Eco-Friendly',
      description: 'Sustainable tourism practices that respect and preserve Chittoor\'s natural beauty.'
    }
  ];

  const destinations = [
    {
      title: 'Horsley Hills',
      description: 'Experience the breathtaking views from the "Andhra Ooty" at an elevation of 1,290 meters.'
    },
    {
      title: 'Kaundinya Wildlife Sanctuary',
      description: 'Trek through this elephant sanctuary with diverse flora and fauna in their natural habitat.'
    },
    {
      title: 'Chandragiri Fort',
      description: 'Walk through history at this ancient fort with stunning architecture and panoramic views.'
    }
  ];

  const testimonials = [
    {
      name: 'Priya Sharma',
      role: 'Adventure Enthusiast',
      quote: 'The Horsley Hills trek was breathtaking! Our guide was knowledgeable about the local flora and fauna, making the experience both educational and exciting.'
    },
    {
      name: 'Rajesh Kumar',
      role: 'Family Traveler',
      quote: 'My family thoroughly enjoyed the customized tour of Chandragiri Fort. The trails were accessible for all ages, and the historical insights added tremendous value.'
    }
  ];

  // Background images
  const backgroundImages = {
    hero: `linear-gradient(rgba(0,0,0,0.6), rgba(0,0,0,0.6)), url(${valleyImage})`,
    destinations: `url('/api/placeholder/1400/600')`,
    testimonials: `linear-gradient(rgba(0,0,0,0.7), rgba(0,0,0,0.7)), url('/api/placeholder/1400/600')`
  };
  return (
    <Box sx={styles.appContainer}>
      {/* Navigation Drawer for Mobile */}
      <Drawer
        anchor="right"
        open={drawerOpen}
        onClose={toggleDrawer(false)}
      >
        <Box sx={styles.drawer}>
          <Box sx={styles.drawerHeader}>
            <Typography variant="h6" sx={{ fontWeight: 'bold' }}>Chittoor Trails</Typography>
            <IconButton onClick={toggleDrawer(false)}>
              <CloseIcon />
            </IconButton>
          </Box>
          <Divider sx={{ mb: 2 }} />
          
          {/* Auth buttons in drawer */}
          <Box sx={styles.drawerAuthButtons}>
            <Button 
              component={Link}
              to="/signin"
              variant="contained" 
              startIcon={<LoginIcon />}
              fullWidth
              sx={styles.loginButton}
            >
              Login
            </Button>
            <Button 
              component={Link}
              to="/signup"
              variant="contained" 
              startIcon={<PersonAddIcon />}
              fullWidth
              sx={styles.registerButton}
            >
              Register
            </Button>
          </Box>
          
          <Divider sx={{ mb: 2 }} />
          
          <List>
            {navItems.map((item) => (
              <ListItem 
                button 
                key={item.label} 
                component="a" 
                href={item.href}
                onClick={toggleDrawer(false)}
                sx={styles.drawerItem}
              >
                <ListItemText primary={item.label} />
              </ListItem>
            ))}
          </List>
        </Box>
      </Drawer>

      {/* App Bar */}
      <AppBar position="absolute" color="transparent" elevation={0}>
        <Toolbar sx={{ px: { xs: 2, md: 4 } }}>
          <Typography variant="h6" component="div" sx={{ color: 'white', fontWeight: 'bold', flexGrow: 1 }}>
            Chittoor Trails
          </Typography>
          
          {isMobile ? (
            <IconButton
              edge="end"
              color="inherit"
              aria-label="menu"
              onClick={toggleDrawer(true)}
            >
              <MenuIcon sx={{ color: 'white' }} />
            </IconButton>
          ) : (
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              {/* Navigation items */}
              <Box sx={{ display: 'flex', gap: 2 }}>
                {navItems.map((item) => (
                  <Button 
                    key={item.label} 
                    href={item.href} 
                    color="inherit"
                    sx={styles.navButton}
                  >
                    {item.label}
                  </Button>
                ))}
              </Box>
              
              {/* Auth buttons for desktop */}
              <Box sx={styles.authButtons}>
                <Button 
                  component={Link}
                  to="/signin"
                  variant="contained" 
                  startIcon={<LoginIcon />}
                  sx={styles.loginButton}
                >
                  Login
                </Button>
                <Button 
                  component={Link}
                  to="/signup"
                  variant="contained" 
                  startIcon={<PersonAddIcon />}
                  sx={styles.registerButton}
                >
                  Register
                </Button>
              </Box>
            </Box>
          )}
        </Toolbar>
      </AppBar>

      {/* Hero Section */}
      <Box 
        sx={{
          ...styles.hero,
          backgroundImage: backgroundImages.hero
        }}
      >
        <Box sx={styles.heroContent}>
          <Typography variant="h2" component="h1" sx={styles.heroTitle}>
            CHITTOOR TRAILS
          </Typography>
          <Typography variant="h5" sx={styles.heroSubtitle}>
            Discover the hidden gems of Chittoor with our expertly curated trail experiences.
          </Typography>
          <Box sx={styles.buttonContainer}>
            <Button 
              variant="contained" 
              sx={styles.primaryButton}
            >
              Explore Trails
            </Button>
            <Button 
              variant="outlined" 
              sx={styles.outlinedButton}
            >
              Book Now
            </Button>
          </Box>
        </Box>
      </Box>

      {/* Features Section */}
      <Container maxWidth="lg" sx={{ py: 8 }}>
        <Typography variant="h4" component="h2" sx={styles.sectionTitle}>
          Why Choose Chittoor Trails?
        </Typography>
        
        <Grid container spacing={4}>
          {features.map((feature, index) => (
            <Grid item xs={12} md={4} key={index}>
              <Paper elevation={2} sx={styles.featureCard}>
                <Box sx={styles.featureIcon}>
                  {feature.icon}
                </Box>
                <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 1 }}>
                  {feature.title}
                </Typography>
                <Typography variant="body1" color="textSecondary">
                  {feature.description}
                </Typography>
              </Paper>
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* Destinations Section */}
      <Box 
        sx={{ 
          py: 8, 
          bgcolor: 'grey.100',
          backgroundImage: backgroundImages.destinations,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundAttachment: 'fixed',
          position: 'relative',
          '&::before': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(243, 244, 246, 0.85)', // Light grey with opacity
          }
        }} 
        id="destinations"
      >
        <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1 }}>
          <Typography variant="h4" component="h2" sx={styles.sectionTitle}>
            Popular Destinations
          </Typography>
          
          <Grid container spacing={4}>
            {destinations.map((destination, index) => (
              <Grid item xs={12} md={4} key={index}>
                <Card sx={styles.destinationCard}>
                  <CardMedia
                    component="img"
                    height="200"
                    image={`../public/assets/chandragiri.jpeg`}
                    alt={destination.title}
                  />
                  <CardContent>
                    <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 1 }}>
                      {destination.title}
                    </Typography>
                    <Typography variant="body2" color="textSecondary" sx={{ mb: 2 }}>
                      {destination.description}
                    </Typography>
                    <Button 
                      endIcon={<ArrowRightAltIcon />}
                      sx={styles.exploreButton}
                    >
                      Explore Trail
                    </Button>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* Testimonials */}
      <Box 
        sx={{ 
          py: 8, 
          backgroundImage: backgroundImages.testimonials,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundAttachment: 'fixed',
          color: 'white'
        }}
      >
        <Container maxWidth="lg">
          <Typography variant="h4" component="h2" sx={{ ...styles.sectionTitle, color: 'white' }}>
            What Our Explorers Say
          </Typography>
          
          <Grid container spacing={4}>
            {testimonials.map((testimonial, index) => (
              <Grid item xs={12} md={6} key={index}>
                <Paper elevation={2} sx={{ p: 3, bgcolor: 'rgba(255, 255, 255, 0.9)' }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                    <Avatar sx={{ mr: 2, bgcolor: '#16a34a' }}>{testimonial.name[0]}</Avatar>
                    <Box>
                      <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>{testimonial.name}</Typography>
                      <Typography variant="body2" color="textSecondary">{testimonial.role}</Typography>
                    </Box>
                  </Box>
                  <Typography variant="body1">"{testimonial.quote}"</Typography>
                </Paper>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* CTA Section */}
      <Box sx={styles.ctaSection}>
        <Container maxWidth="md" sx={{ textAlign: 'center' }}>
          <Typography variant="h4" component="h2" sx={{ fontWeight: 'bold', mb: 2 }}>
            Ready for Your Chittoor Adventure?
          </Typography>
          <Typography variant="h6" sx={{ mb: 4 }}>
            Book your personalized trail experience today and discover the natural wonders and cultural heritage of Chittoor.
          </Typography>
          <Box sx={styles.buttonContainer}>
            <Button 
              variant="contained" 
              sx={styles.ctaButton}
            >
              View All Trails
            </Button>
            <Button 
              variant="outlined" 
              sx={styles.ctaOutlinedButton}
            >
              Contact Us
            </Button>
          </Box>
        </Container>
      </Box>

      {/* Footer */}
      <Box sx={styles.footer}>
        <Container maxWidth="lg">
          <Grid container spacing={4}>
            <Grid item xs={12} md={3}>
              <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 2 }}>
                Chittoor Trails
              </Typography>
              <Typography variant="body2" sx={styles.footerText}>
                Explore the unexplored paths of Chittoor with our expert guides and curated experiences.
              </Typography>
            </Grid>
            
            <Grid item xs={12} md={3}>
              <Typography variant="subtitle1" sx={{ fontWeight: 'bold', mb: 2 }}>
                Quick Links
              </Typography>
              <nav>
                <List dense disablePadding>
                  {['Home', 'Destinations', 'Packages', 'About Us'].map((item) => (
                    <ListItem key={item} button component="a" href="#" disableGutters sx={styles.footerLink}>
                      <ListItemText primary={item} />
                    </ListItem>
                  ))}
                </List>
              </nav>
            </Grid>
            
            <Grid item xs={12} md={3}>
              <Typography variant="subtitle1" sx={{ fontWeight: 'bold', mb: 2 }}>
                Contact
              </Typography>
              <Typography variant="body2" sx={styles.footerText}>
                123 Adventure Road, Chittoor
              </Typography>
              <Typography variant="body2" sx={styles.footerText}>
                Andhra Pradesh, India
              </Typography>
              <Typography variant="body2" sx={styles.footerText}>
                info@chittoortrails.com
              </Typography>
              <Typography variant="body2" sx={styles.footerText}>
                +91 98765 43210
              </Typography>
            </Grid>
            
            <Grid item xs={12} md={3}>
              <Typography variant="subtitle1" sx={{ fontWeight: 'bold', mb: 2 }}>
                Follow Us
              </Typography>
              <Box sx={{ display: 'flex', gap: 1.5 }}>
                <IconButton sx={styles.socialIcon}>
                  <FacebookIcon />
                </IconButton>
                <IconButton sx={styles.socialIcon}>
                  <InstagramIcon />
                </IconButton>
                <IconButton sx={styles.socialIcon}>
                  <TwitterIcon />
                </IconButton>
              </Box>
            </Grid>
          </Grid>
          
          <Divider sx={styles.footerDivider} />
          
          <Typography variant="body2" sx={styles.copyright}>
            © 2025 Chittoor Trails. All rights reserved.
          </Typography>
        </Container>
      </Box>
    </Box>
  );
};

export default Homepage;