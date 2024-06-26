// src/pages/DisplayProfilePage.js

import React, { useContext, useEffect } from "react";
import {
  Box,
  Typography,
  CircularProgress,
  Alert,
  Grid,
  Avatar,
} from "@mui/material";
import {
  Timeline,
  TimelineItem,
  TimelineSeparator,
  TimelineConnector,
  TimelineContent,
  TimelineDot,
} from "@mui/lab";
import { timelineItemClasses } from "@mui/lab/TimelineItem";
import { ProfileContext } from "../../context/ProfileContext";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const { userProfile, fetchUserProfile, loading, error } =
    useContext(ProfileContext);

  const navigate = useNavigate();

  useEffect(() => {
    if (sessionStorage.getItem("accessToken")) {
      fetchUserProfile();
    } else {
      navigate("/");
    }
  }, []);

  if (loading) return <CircularProgress />;
  if (error) return <Alert severity="error">{error}</Alert>;
  if (!userProfile)
    return <Alert severity="warning">No profile data available.</Alert>;

  return (
    <Box sx={{ margin: "auto", overflow: "hidden", p: 2 }}>
      <Typography variant="h4">Profile</Typography>
      <hr style={{ width: "25%", marginLeft: 0 }} />
      {/* Row 1: Name and Location */}
      <Box sx={{ display: "flex", alignItems: "center", mb: 4 }}>
        <Avatar
          alt="Profile Picture"
          src="https://robohash.org/set=set2"
          sx={{ width: 100, height: 100, mr: 2 }}
        />
        <Box>
          <Typography variant="h4">
            {userProfile.firstName} {userProfile.lastName}
          </Typography>
          <Typography variant="subtitle1" color="text.secondary">
            1654 Bruce Ave, Windsor, ON
            {/* {userProfile.address} */}
          </Typography>
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
          <Typography variant="body1">
            <strong>Email:</strong> {userProfile.email}
          </Typography>
          <Typography variant="body1">
            <strong>Mobile:</strong> {userProfile.number}
          </Typography>
          <Typography variant="body1">
            <strong>Gender:</strong> {userProfile.gender}
          </Typography>
          <Typography variant="body1">
            <strong>Birth Date:</strong>{" "}
            {new Date(userProfile.birthDate).toLocaleDateString()}
          </Typography>
        </Grid>

        {/* Column 2: Living History */}
        <Grid item xs={12} md={6}>
          <Typography variant="h5" gutterBottom>
            Living History
          </Typography>
          <hr />
          <Timeline
            sx={{
              [`& .${timelineItemClasses.root}:before`]: {
                flex: 0,
                padding: 0,
              },
            }}
          >
            <TimelineItem>
              <TimelineSeparator>
                <TimelineDot />
                <TimelineConnector />
              </TimelineSeparator>
              <TimelineContent>
                <Typography variant="body1">
                  <strong>2020 - Present:</strong> San Francisco, USA
                </Typography>
              </TimelineContent>
            </TimelineItem>
            <TimelineItem>
              <TimelineSeparator>
                <TimelineDot />
                <TimelineConnector />
              </TimelineSeparator>
              <TimelineContent>
                <Typography variant="body1">
                  <strong>2015 - 2018:</strong> New York, USA
                </Typography>
              </TimelineContent>
            </TimelineItem>
            <TimelineItem>
              <TimelineSeparator>
                <TimelineDot />
              </TimelineSeparator>
              <TimelineContent>
                <Typography variant="body1">
                  <strong>2018 - 2020:</strong> Toronto, Canada
                </Typography>
              </TimelineContent>
            </TimelineItem>
          </Timeline>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Profile;
