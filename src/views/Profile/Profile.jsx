// src/pages/DisplayProfilePage.js

import React, { useContext, useEffect, useState } from "react";
import {
  Box,
  Typography,
  CircularProgress,
  Alert,
  Grid,
  Avatar,
  TextField,
  Button,
  IconButton,
} from "@mui/material";
import EditIcon from '@mui/icons-material/Edit';
import SaveIcon from '@mui/icons-material/Save';
import { ProfileContext } from "../../context/ProfileContext";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import ProfileReviewSection from "./ProfileReviewSection";

const Profile = () => {
  const { userProfile, fetchUserProfile, updateUserProfile, loading, error } =
    useContext(ProfileContext);

  const [editMode, setEditMode] = useState(false);
  const [editProfile, setEditProfile] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    if (sessionStorage.getItem("accessToken")) {
      fetchUserProfile();
    } else {
      navigate("/");
    }
  }, []);

  useEffect(() => {
    if (userProfile) {
      setEditProfile(userProfile.UserDetails);
    }
  }, [userProfile]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditProfile((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleUpdate = () => {
    if(updateUserProfile(editProfile)){
      navigate("/profile");
    }else{
      setEditProfile(userProfile.UserDetails);
      toast.error("Failed to update profile");
    }
    setEditMode(false);
  };

  const handleEditModeToggle = () => {
    setEditMode(!editMode);
  };

  if (loading) return <CircularProgress />;
  if (error) return <Alert severity="error">{error}</Alert>;
  if (!userProfile)
    return <Alert severity="warning">No profile data available.</Alert>;

  return (
    <Box sx={{ margin: "auto", overflow: "hidden", p: 2 }}>
      <Typography variant="h4">Profile</Typography>
      <hr style={{ width: "25%", marginLeft: 0 }} />
      <IconButton onClick={handleEditModeToggle} sx={{ float: "right" }}>
        {editMode ? <SaveIcon /> : <EditIcon />}
      </IconButton>
      {/* Row 1: Name and Location */}
      <Box sx={{ display: "flex", alignItems: "center", mb: 4 }}>
        <Avatar
          alt="Profile Picture"
          src={editProfile.profilePicture || "https://robohash.org/set=set2"}
          sx={{ width: 100, height: 100, mr: 2 }}
        />
        <Box>
          {editMode ? (
            <>
              <TextField
                name="firstName"
                label="First Name"
                value={editProfile.firstName || ""}
                onChange={handleChange}
                variant="outlined"
                fullWidth
                margin="dense"
              />
              <TextField
                name="lastName"
                label="Last Name"
                value={editProfile.lastName || ""}
                onChange={handleChange}
                variant="outlined"
                fullWidth
                margin="dense"
              />
              <TextField
                name="address"
                label="Address"
                value={editProfile.address || ""}
                onChange={handleChange}
                variant="outlined"
                fullWidth
                margin="dense"
              />
            </>
          ) : (
            <>
              <Typography variant="h4">
                {userProfile.UserDetails.firstName} {userProfile.UserDetails.lastName}
              </Typography>
              <Typography variant="subtitle1" color="text.secondary">
                {userProfile.UserDetails.address || "No address provided"}
              </Typography>
            </>
          )}
        </Box>
      </Box>

      {/* Row 2: Columns */}
      <Grid container spacing={2}>
        {/* Column 1: User Details */}
        <Grid item xs={12} md={6}>
          <Typography variant="h5" gutterBottom>
            User Details
          </Typography>
          <hr />
          {editMode ? (
            <>
              <TextField
                name="gender"
                label="Gender"
                value={editProfile.gender || ""}
                onChange={handleChange}
                variant="outlined"
                fullWidth
                margin="dense"
              />
              <TextField
                name="number"
                label="Mobile"
                value={editProfile.number || ""}
                onChange={handleChange}
                variant="outlined"
                fullWidth
                margin="dense"
              />
              <TextField
                name="birthDate"
                label="Birth Date"
                value={editProfile.birthDate ? editProfile.birthDate.slice(0, 10) : ""}
                onChange={handleChange}
                variant="outlined"
                fullWidth
                margin="dense"
                type="date"
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </>
          ) : (
            <>
              <Typography variant="body1">
                <strong>Email:</strong> {userProfile.UserDetails.email}
              </Typography>
              <Typography variant="body1">
                <strong>Mobile:</strong> {userProfile.UserDetails.number}
              </Typography>
              <Typography variant="body1">
                <strong>Gender:</strong> {userProfile.UserDetails.gender}
              </Typography>
              <Typography variant="body1">
                <strong>Birth Date:</strong>{" "}
                {userProfile.UserDetails.birthDate.slice(0, 10)}
              </Typography>
            </>
          )}
        </Grid>

        {/* Column 2: Rental History */}
        <Grid item xs={12} md={6}>
          <Typography variant="h5" gutterBottom>
            Rental History
          </Typography>
          <hr />
          {userProfile.UserDetails.rentalHistory.map((rental) => (
            <Typography key={rental._id} variant="body1">
              <strong>{rental.address_line1}, {rental.city}, {rental.country}</strong>
            </Typography>
          ))}
        </Grid>

        {/* Column 3: Preferred Location */}
        <Grid item xs={12} md={6}>
          <Typography variant="h5" gutterBottom>
            Preferred Location
          </Typography>
          <hr />
          {userProfile.UserDetails.preferredLocation.map((location, index) => (
            <Box key={location._id}>
              {editMode ? (
                <>
                  <TextField
                    name={`preferredLocation[${index}].address_line1`}
                    label="Address Line 1"
                    value={editProfile.preferredLocation[index].address_line1 || ""}
                    onChange={handleChange}
                    variant="outlined"
                    fullWidth
                    margin="dense"
                  />
                  <TextField
                    name={`preferredLocation[${index}].city`}
                    label="City"
                    value={editProfile.preferredLocation[index].city || ""}
                    onChange={handleChange}
                    variant="outlined"
                    fullWidth
                    margin="dense"
                  />
                  <TextField
                    name={`preferredLocation[${index}].country`}
                    label="Country"
                    value={editProfile.preferredLocation[index].country || ""}
                    onChange={handleChange}
                    variant="outlined"
                    fullWidth
                    margin="dense"
                  />
                </>
              ) : (
                <Typography variant="body1">
                  <strong>{location.address_line1}, {location.city}, {location.country}</strong>
                </Typography>
              )}
            </Box>
          ))}
        </Grid>
      </Grid>
      {editMode && (
        <Button
          variant="contained"
          color="primary"
          onClick={handleUpdate}
          sx={{ mt: 2 }}
        >
          Save Changes
        </Button>
      )}
      {editMode ? (
        <></>
      ):(
        <>
        <Grid item xs={12} md={6} mt={2}>
        <ProfileReviewSection />
      </Grid>
        </>
      )        
      }
      
    </Box>
  );
};

export default Profile;
