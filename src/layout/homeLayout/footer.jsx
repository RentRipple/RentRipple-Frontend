import React from "react";
import { Typography, Grid, Box, IconButton } from "@mui/material";
import { styled } from "@mui/system";
import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";
import InstagramIcon from "@mui/icons-material/Instagram";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import logo from "../../assets/TransparentLogo.svg"; 
import { useNavigate } from "react-router-dom";

const FooterContainer = styled(Box)(({ theme }) => ({
  backgroundColor: "#E7EDF2",
  color: "#000",
  padding: theme.spacing(4),
  marginTop: theme.spacing(4),
}));

const FooterSection = styled(Box)(({ theme }) => ({
  marginBottom: theme.spacing(2),
}));

const FooterLink = styled('a')(() => ({
  color: "#000",
  textDecoration: 'none',
  '&:hover': {
    textDecoration: 'underline',
    color: '#1d72b8', 
  },
}));

const Logo = styled("img")({
  width: "120px",
  height: "auto",
  marginBottom: "16px",
  transition: "transform 0.3s",
  '&:hover': {
    cursor: "pointer",
    transform: "scale(1.1)",
  },
});

const Footer = () => {
  const navigate = useNavigate();
  return (
    <FooterContainer>
      <Grid container spacing={6}>
        <Grid item xs={12} md={4} style={{paddingLeft: "90px"}}>
          <FooterSection>
            <Logo src={logo} alt="Company Logo" onClick={() => navigate('/')} />
            <Typography variant="h6" gutterBottom>
              About Us
            </Typography>
            <Typography variant="body2">
              We are a leading provider of rental properties, dedicated to making the rental process transparent and seamless for both property owners and tenants.
            </Typography>
          </FooterSection>
        </Grid>
        <Grid item xs={12} md={4} style={{paddingLeft: "90px"}}>
          <FooterSection>
            <Typography variant="h6" gutterBottom>
              Quick Links
            </Typography>
            <Typography variant="body2">
              <FooterLink href="/about">About</FooterLink>
            </Typography>
            <Typography variant="body2">
              <FooterLink href="/contact">Contact</FooterLink>
            </Typography>
            <Typography variant="body2">
              <FooterLink href="/privacy">Privacy Policy</FooterLink>
            </Typography>
          </FooterSection>
        </Grid>
        <Grid item xs={12} md={4} style={{paddingLeft: "90px"}}>
          <FooterSection>
            <Typography variant="h6" gutterBottom>
              Contact Us
            </Typography>
            <Typography variant="body2">
              123 Main Street, Anytown, AN 12345
            </Typography>
            <Typography variant="body2">
              Email: info@rentalapp.com
            </Typography>
            <Typography variant="body2">
              Phone: (123) 456-7890
            </Typography>
          </FooterSection>
          <FooterSection>
            <Typography variant="h6" gutterBottom>
              Follow Us
            </Typography>
            <Box>
              <IconButton aria-label="Facebook" href="https://www.facebook.com" target="_blank" color="inherit">
                <FacebookIcon />
              </IconButton>
              <IconButton aria-label="Twitter" href="https://www.twitter.com" target="_blank" color="inherit">
                <TwitterIcon />
              </IconButton>
              <IconButton aria-label="Instagram" href="https://www.instagram.com" target="_blank" color="inherit">
                <InstagramIcon />
              </IconButton>
              <IconButton aria-label="LinkedIn" href="https://www.linkedin.com" target="_blank" color="inherit">
                <LinkedInIcon />
              </IconButton>
            </Box>
          </FooterSection>
        </Grid>
      </Grid>
      <Box mt={4} textAlign="center">
        <Typography variant="body2">
          &copy; {new Date().getFullYear()} RentalApp. All rights reserved.
        </Typography>
      </Box>
    </FooterContainer>
  );
};

export default Footer;
