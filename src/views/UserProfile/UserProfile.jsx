import React from 'react';
import { Grid, Box, Typography, Avatar, Button, Divider } from '@mui/material';
import { styled } from "@mui/system";
import profilePic from '../../assets/profile.svg'; // Ensure this path is correct

const Root = styled(Box)(() => ({
backgroundColor: 'red',

//   backgroundColor: "whiteSmoke!important",
  backdropFilter: "blur(50px)",
  display:"flex",
  justifyContent:"center",
  alignItems:"center",
//   flexGrow:1,
//   marginLeft:"-100px",
//   marginRight:"-100px",

  position:"absolute",
  left:"-10px",

  minWidth:"100vw",
  height:"87vh",
  
}));

const Content = styled(Box)(() => ({
  width: "100%",
  maxWidth: "850px",
  borderRadius: "8px",
  background: "white",
  height: "auto",
  maxHeight: "45rem",
  color: "#000",
  padding: "20px",
}));

const ProfileContainer = styled(Root)`
  && {
    background-color: whitesmoke!important;
    // border-radius: 8px;
    box-shadow: 0px 3px 6px rgba(0, 0, 0, 0.16);
    
  }
`;

const UserInfoBox = styled(Box)`
  && {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-bottom: 16px;
  }
`;

const UserName = styled(Typography)`
  && {
    font-size: 1.5rem;
    font-weight: bold;
    margin-top: 8px;
  }
`;

const UserJobTitle = styled(Typography)`
  && {
    color: #6c757d;
  }
`;

const InfoItem = styled(Box)`
  && {
    margin-bottom: 8px;
  }
`;

const ProfileContent = styled(Content)`
  && {
    background-color: white;
    padding: 24px;
    border-radius: 8px;
  }
`;

function UserProfile() {
  return (
    <ProfileContainer>
      <ProfileContent>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={4}>
            <UserInfoBox>
              <Avatar alt="User Avatar" src={profilePic} sx={{ width: 128, height: 128 }} />
              <UserName>Jenny Doe</UserName>
              <UserJobTitle>Product Designer</UserJobTitle>
            </UserInfoBox>
            <Divider sx={{ my: 2 }} />
            <Typography variant="body1" color="textPrimary" gutterBottom>
              Contact Information
            </Typography>
            <InfoItem>
              <Typography variant="body2">Phone:</Typography>
              <Typography variant="body2" color="textSecondary">
                +1 123 456 7890
              </Typography>
            </InfoItem>
            <InfoItem>
              <Typography variant="body2">Address:</Typography>
              <Typography variant="body2" color="textSecondary">
                525 E 68th Street New York, NY 10065-7185
              </Typography>
            </InfoItem>
            <InfoItem>
              <Typography variant="body2">Email:</Typography>
              <Typography variant="body2" color="textSecondary">
                hello@jennydoe.com
              </Typography>
            </InfoItem>
            <InfoItem>
              <Typography variant="body2">Site:</Typography>
              <Typography variant="body2" color="textSecondary">
                www.jennydoe.com
              </Typography>
            </InfoItem>
          </Grid>
          <Grid item xs={12} sm={8}>
            <Box mb={2}>
              <Button variant="contained" color="primary" sx={{ mr: 2 }}>
                Send Message
              </Button>
              <Button variant="outlined" color="primary">
                Contacts
              </Button>
            </Box>
            <Divider sx={{ my: 2 }} />
            <Typography variant="body1" color="textPrimary" gutterBottom>
              Work
            </Typography>
            <InfoItem>
              <Typography variant="body2">Company A</Typography>
              <Typography variant="body2" color="textSecondary">
                123 Broadway, New York, NY
              </Typography>
            </InfoItem>
            <InfoItem>
              <Typography variant="body2">Company B</Typography>
              <Typography variant="body2" color="textSecondary">
                456 Main Street, San Francisco, CA
              </Typography>
            </InfoItem>
            <Divider sx={{ my: 2 }} />
            <Typography variant="body1" color="textPrimary" gutterBottom>
              Skills
            </Typography>
            <InfoItem>
              <Typography variant="body2">Design</Typography>
              <Typography variant="body2" color="textSecondary">
                UX/UI, Graphic Design
              </Typography>
            </InfoItem>
            <Divider sx={{ my: 2 }} />
            <Typography variant="body1" color="textPrimary" gutterBottom>
              Basic Information
            </Typography>
            <InfoItem>
              <Typography variant="body2">Birthday:</Typography>
              <Typography variant="body2" color="textSecondary">
                January 1, 1990
              </Typography>
            </InfoItem>
            <InfoItem>
              <Typography variant="body2">Gender:</Typography>
              <Typography variant="body2" color="textSecondary">
                Female
              </Typography>
            </InfoItem>
          </Grid>
        </Grid>
      </ProfileContent>
    </ProfileContainer>
  );
}

export default UserProfile;
