import React, { useState } from 'react';
import { Grid, Box, Typography, Avatar, Button, Divider, TextField } from '@mui/material';
import { styled } from "@mui/system";

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
  backgroundColor: "white",
  padding: "20px",
}));

const UserInfoBox = styled(Box)(() => ({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  marginBottom: "16px",
}));

const UserName = styled(Typography)(() => ({
  fontSize: "1.5rem",
  fontWeight: "bold",
  marginTop: "8px",
}));

const InfoItem = styled(Box)(() => ({
  marginBottom: "8px",
}));

const ProfileContainer = styled(Root)`
  && {
    background-color: whitesmoke!important;
    box-shadow: 0px 3px 6px rgba(0, 0, 0, 0.16);
  }
`;

function EditProfile() {
  const user = {
    profilePic: 'https://picsum.photos/200/300',
    firstName: 'John',
    lastName: 'Doe',
    phone: '+1 123 456 7890',
    birthDate: '1995-01-01',
    gender: 'Male',
    address: '123 Main Street, Springfield, IL 62701',
    email: 'john.doe@example.com',
    rentalProperties: [
      { name: 'Sunny Apartment', address: '456 Oak Street, Springfield, IL' },
      { name: 'Cozy Cottage', address: '789 Pine Street, Springfield, IL' }
    ],
    rating: 2,
    rentalHistory: [
      { propertyName: 'Urban Loft', startDate:'Jan 2020', endDate:'Dec 2020' },
      { propertyName: 'Beach House', startDate:'Jan 2020', endDate:'Dec 2020' }
    ]
  };

  const [isEditing, setIsEditing] = useState(false);
  const [editedUser, setEditedUser] = useState(user);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedUser({ ...editedUser, [name]: value });
  };

  const handleSave = () => {
    console.log('User data saved:', editedUser);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditedUser(user);
    setIsEditing(false);
  };

  return (
    <ProfileContainer>
      <Content>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={4}>
            <UserInfoBox>
              <Avatar alt="User Avatar" src={user.profilePic} sx={{ width: 128, height: 128 }} />
              {isEditing ? (
                <Box display="flex" flexDirection="row" alignItems="center">
                  <TextField
                    name="firstName"
                    label="First Name"
                    value={editedUser.firstName}
                    onChange={handleInputChange}
                    fullWidth
                    margin="normal"
                    sx={{ marginRight: 2 }}
                  />
                  <TextField
                    name="lastName"
                    label="Last Name"
                    value={editedUser.lastName}
                    onChange={handleInputChange}
                    fullWidth
                    margin="normal"
                  />
                </Box>
              ) : (
                <UserName>{user.firstName} {user.lastName}</UserName>
              )}
            </UserInfoBox>
            <Divider sx={{ my: 2 }} />
            <Typography variant="body1" color="textPrimary" gutterBottom>
              Contact Information
            </Typography>
            {isEditing ? (
              <>
                <TextField
                  name="phone"
                  label="Phone"
                  value={editedUser.phone}
                  onChange={handleInputChange}
                  fullWidth
                  margin="normal"
                />
                <TextField
                  name="address"
                  label="Address"
                  value={editedUser.address}
                  onChange={handleInputChange}
                  fullWidth
                  margin="normal"
                />
                <TextField
                  name="email"
                  label="Email"
                  value={editedUser.email}
                  onChange={handleInputChange}
                  fullWidth
                  margin="normal"
                />
              </>
            ) : (
              <>
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
              </>
            )}
            <Divider sx={{ my: 2 }} />
            <Typography variant="body1" color="textPrimary" gutterBottom>
              Personal Information
            </Typography>
            {isEditing ? (
              <>
                <TextField
                  name="birthDate"
                  label="Birth Date"
                  type="date"
                  value={editedUser.birthDate}
                  onChange={handleInputChange}
                  fullWidth
                  margin="normal"
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
                <TextField
                  name="gender"
                  label="Gender"
                  value={editedUser.gender}
                  onChange={handleInputChange}
                  fullWidth
                  margin="normal"
                />
              </>
            ) : (
              <>
                <InfoItem>
                  <Typography variant="body2">Birthday:</Typography>
                  <Typography variant="body2" color="textSecondary">
                    {user.birthDate}
                  </Typography>
                </InfoItem>
                <InfoItem>
                  <Typography variant="body2">Gender:</Typography>
                  <Typography variant="body2" color="textSecondary">
                    {user.gender}
                  </Typography>
                </InfoItem>
              </>
            )}
          </Grid>
          <Grid item xs={12} sm={8}>
            <Box mb={2}>
              {isEditing ? (
                <>
                  <Button variant="contained" color="primary" sx={{ mr: 2 }} onClick={handleSave}>
                    Save
                  </Button>
                  <Button variant="outlined" color="secondary" onClick={handleCancel}>
                    Cancel
                  </Button>
                </>
              ) : (
                <Button variant="contained" color="primary" sx={{ mr: 2 }} onClick={() => setIsEditing(true)}>
                  Edit Profile
                </Button>
              )}
            </Box>
            <Divider sx={{ my: 2 }} />
            <Typography variant="body1" color="textPrimary" gutterBottom>
              Rental Properties
            </Typography>
            {isEditing ? (
              editedUser.rentalProperties.map((property, index) => (
                <InfoItem key={index}>
                  <TextField
                    label={`Property Name ${index + 1}`}
                    name={`propertyName${index}`}
                    value={property.name}
                    onChange={(e) => {
                      const newProperties = [...editedUser.rentalProperties];
                      newProperties[index].name = e.target.value;
                      setEditedUser({ ...editedUser, rentalProperties: newProperties });
                    }}
                    fullWidth
                    margin="normal"
                  />
                  <TextField
                    label={`Property Address ${index + 1}`}
                    name={`propertyAddress${index}`}
                    value={property.address}
                    onChange={(e) => {
                      const newProperties = [...editedUser.rentalProperties];
                      newProperties[index].address = e.target.value;
                      setEditedUser({ ...editedUser, rentalProperties: newProperties });
                    }}
                    fullWidth
                    margin="normal"
                  />
                </InfoItem>
              ))
            ) : (
              user.rentalProperties.map((property, index) => (
                <InfoItem key={index}>
                  <Typography variant="body2">{property.name}</Typography>
                  <Typography variant="body2" color="textSecondary">
                    {property.address}
                  </Typography>
                </InfoItem>
              ))
            )}
            <Divider sx={{ my: 2 }} />
            <Typography variant="body1" color="textPrimary" gutterBottom>
              Rental History
            </Typography>
            {isEditing ? (
              editedUser.rentalHistory.map((history, index) => (
                <InfoItem key={index}>
                  <TextField
                    label={`Property Name ${index + 1}`}
                    name={`historyName${index}`}
                    value={history.propertyName}
                    onChange={(e) => {
                      const newHistory = [...editedUser.rentalHistory];
                      newHistory[index].propertyName = e.target.value;
                      setEditedUser({ ...editedUser, rentalHistory: newHistory });
                    }}
                    fullWidth
                    margin="normal"
                  />
                  <Box display="flex" gap={2}>
                    <TextField
                      label={`Start Date`}
                      name={`historyStartDate${index}`}
                      type="date"
                      value={history.startDate}
                      onChange={(e) => {
                        const newHistory = [...editedUser.rentalHistory];
                        newHistory[index].startDate = e.target.value;
                        setEditedUser({ ...editedUser, rentalHistory: newHistory });
                      }}
                      fullWidth
                      margin="normal"
                      InputLabelProps={{
                        shrink: true,
                      }}
                    />
                    <TextField
                      label="End Date"
                      name={`historyEndDate${index}`}
                      type="date"
                      value={history.endDate}
                      onChange={(e) => {
                        const newHistory = [...editedUser.rentalHistory];
                        newHistory[index].endDate = e.target.value;
                        setEditedUser({ ...editedUser, rentalHistory: newHistory });
                      }}
                      fullWidth
                      margin="normal"
                      InputLabelProps={{
                        shrink: true,
                      }}
                    />
                  </Box>
                </InfoItem>
              ))
            ) : (
              user.rentalHistory.map((history, index) => (
                <InfoItem key={index}>
                  <Typography variant="body2">{history.propertyName}</Typography>
                  <Typography variant="body2" color="textSecondary">
                    {history.startDate} - {history.endDate}
                  </Typography>
                </InfoItem>
              ))
            )}
            <Divider sx={{ my: 2 }} />
            <Typography variant="body1" color="textPrimary" gutterBottom>
              Rating: {user.rating}
            </Typography>
          </Grid>
        </Grid>
      </Content>
    </ProfileContainer>
  );
}

export default EditProfile;
