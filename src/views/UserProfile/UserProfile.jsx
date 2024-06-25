import React from 'react';
import { Grid, Box, Typography, Avatar, Button, Divider } from '@mui/material';
import { styled } from "@mui/system";
import profilePic from '../../assets/profile.svg'; 

const Root = styled(Box)(() => ({
  backgroundColor: 'red',
  backdropFilter: "blur(50px)",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  position: "absolute",
  left: "-10px",
  minWidth: "100vw",
  height: "88vh",
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

const UserRole = styled(Typography)`
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
  const user = {
    profilePic: null,
    name: 'John Doe',
    role: 'Landlord',
    phone: '+1 123 456 7890',
    birthday: 'January 1, 1990',
    gender: 'Male',
    address: '123 Main Street, Springfield, IL 62701',
    email: 'john.doe@example.com',
    rentalProperties: [
      { name: 'Sunny Apartment', address: '456 Oak Street, Springfield, IL' },
      { name: 'Cozy Cottage', address: '789 Pine Street, Springfield, IL' }
    ],
    rentalHistory: [
      { propertyName: 'Urban Loft', duration: 'Jan 2020 - Dec 2020' },
      { propertyName: 'Beach House', duration: 'Jan 2019 - Dec 2019' }
    ],
    preferences: {
      location: 'Downtown Springfield',
      budget: '$1000 - $1500 per month'
    }
  };

  return (
    <ProfileContainer>
      <ProfileContent>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={4}>
            <UserInfoBox>
              <Avatar alt="User Avatar" src={user.profilePic || profilePic} sx={{ width: 128, height: 128 }} />
              <UserName>{user.name}</UserName>
              <UserRole>{user.role}</UserRole>
            </UserInfoBox>
            <Divider sx={{ my: 2 }} />
            <Typography variant="body1" color="textPrimary" gutterBottom>
              Contact Information
            </Typography>
            <InfoItem>
              <Typography variant="body2">Phone:</Typography>
              <Typography variant="body2" color="textSecondary">
                {user.phone}
              </Typography>
            </InfoItem>
            <InfoItem>
              <Typography variant="body2">Address:</Typography>
              <Typography variant="body2" color="textSecondary">
                {user.address}
              </Typography>
            </InfoItem>
            <InfoItem>
              <Typography variant="body2">Email:</Typography>
              <Typography variant="body2" color="textSecondary">
                {user.email}
              </Typography>
            </InfoItem>
            <Divider sx={{ my: 2 }} />
            <InfoItem>
              <Typography variant="body2">Birthday:</Typography>
              <Typography variant="body2" color="textSecondary">
                {user.birthday}
              </Typography>
            </InfoItem>
            <InfoItem>
              <Typography variant="body2">Gender:</Typography>
              <Typography variant="body2" color="textSecondary">
                {user.gender}
              </Typography>
            </InfoItem>
          </Grid>
          <Grid item xs={12} sm={8}>
            <Box mb={2}>
              <Button variant="contained" color="primary" sx={{ mr: 2 }}>
                Edit Profile
              </Button>
            </Box>
            <Divider sx={{ my: 2 }} />
            <Typography variant="body1" color="textPrimary" gutterBottom>
              Rental Properties
            </Typography>
            {user.rentalProperties.map((property, index) => (
              <InfoItem key={index}>
                <Typography variant="body2">{property.name}</Typography>
                <Typography variant="body2" color="textSecondary">
                  {property.address}
                </Typography>
              </InfoItem>
            ))}
            <Divider sx={{ my: 2 }} />
            <Typography variant="body1" color="textPrimary" gutterBottom>
              Rental History
            </Typography>
            {user.rentalHistory.map((history, index) => (
              <InfoItem key={index}>
                <Typography variant="body2">{history.propertyName}</Typography>
                <Typography variant="body2" color="textSecondary">
                  {history.duration}
                </Typography>
              </InfoItem>
            ))}
            <Divider sx={{ my: 2 }} />
            <Typography variant="body1" color="textPrimary" gutterBottom>
              Preferences
            </Typography>
            <InfoItem>
              <Typography variant="body2">Preferred Location:</Typography>
              <Typography variant="body2" color="textSecondary">
                {user.preferences.location}
              </Typography>
            </InfoItem>
            <InfoItem>
              <Typography variant="body2">Budget:</Typography>
              <Typography variant="body2" color="textSecondary">
                {user.preferences.budget}
              </Typography>
            </InfoItem>
          </Grid>
        </Grid>
      </ProfileContent>
    </ProfileContainer>
  );
}
export default UserProfile;