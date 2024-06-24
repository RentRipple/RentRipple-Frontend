import React from "react";
import { useLocation } from "react-router-dom";
import { styled } from "@mui/system";
import profileImage from "../../assets/profile.svg";
import { Grid, InputBase, IconButton, Paper } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableRow from "@mui/material/TableRow";
import { toast } from "react-toastify";

const ImageGrid = styled("div")(() => ({
  backgroundColor: "#f0f0f0",
  borderRadius: "16px",
}));
const LargeImageStyle = styled("img")(() => ({
  width: "100%",
  height: "400px",
  // objectFit: "contain",
  objectFit: "cover",
  borderRadius: "16px",
}));
const ChatGrid = styled("div")(() => ({
  padding: 10,
  backgroundColor: "#E7EDF2",
  borderRadius: "16px",
  textAlign: "center",
  height: "385px",
}));
const HeadTitle = styled("div")(() => ({
  fontSize: "24px",
  paddingTop: "20px",
  paddingBottom: "10px",
}));
const OpacityText = styled("div")(() => ({
  opacity: "0.5",
}));
const AboutProperty = styled("div")(() => ({
  fontSize: "14px",
  opacity: "0.8",
}));
const OwnerDetailsStyle = styled("div")(() => ({
  fontSize: "13.5px",
  padding: "10px",
  textAlign: "left",
}));

const propertyDetails = {
  contactList: [
    {
      id: 1,
      name: "Linda Smith",
      role: "Owner",
      imageUrl: profileImage,
    },
    {
      id: 2,
      name: "Electrician & Co",
      role: "Electrician",
      imageUrl: profileImage,
    },
    {
      id: 3,
      name: "Plumb Pros",
      role: "Plumber",
      imageUrl: profileImage,
    },
  ],
  pricingDetails: [
    {
      id: 1,
      title: "Price",
      data: "$4,000/month",
    },
    {
      id: 2,
      title: "Lease Length",
      data: "12 months",
    },
    {
      id: 3,
      title: "Deposit",
      data: "$1,000",
    },
    {
      id: 4,
      title: "Utilities",
      data: "Not included",
    },
  ],
  ownerDetails: {
      name: "Linda Smith",
      address: "1178 Green Street, Lexington, KY 40507",
      ratings: "4.5",
      contact: "8596598569",
      imageUrl: profileImage,
    },
};

const PropertyDetails = () => {
  const location = useLocation();
  const { data } = location.state;
  console.log(data, "data");
  const [message, setMessage] = React.useState("");

  const handleMessage = (e) => {
    setMessage(e.target.value);
  };

  const handleButtonClick = () => {
    const Finalmessage = message.trim() === "" ? "Interested in this property" : message;
    console.log("Message sent:", Finalmessage);
    toast.success("Message sent successfully");
    // Navigate to chat page
  };

  return (
    <div style={{ fontFamily: "Roboto" }}>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={12} md={9} lg={9}>
          <ImageGrid>
            <LargeImageStyle src={data.imageUrl} alt="hotel" />
          </ImageGrid>
        </Grid>
        <Grid item xs={12} sm={12} md={3} lg={3}>
          <ChatGrid>
          <HeadTitle style={{marginBottom: "14px"}}>Chat with Owner</HeadTitle>
            <img src={propertyDetails.ownerDetails.imageUrl} alt="profile" style={{ width: "80px"}} />
            
            <p> {propertyDetails.ownerDetails.name}</p>
            <OwnerDetailsStyle> Ratings: {propertyDetails.ownerDetails.ratings}</OwnerDetailsStyle>
            <OwnerDetailsStyle> Address: {propertyDetails.ownerDetails.address}</OwnerDetailsStyle>
            <OwnerDetailsStyle style={{marginBottom: "14px"}}> Contact: {propertyDetails.ownerDetails.contact}</OwnerDetailsStyle>
            <Paper
              component="form"
              sx={{
                // p: "2px 4px",
                display: "flex",
                alignItems: "center",
              }}
            >
              <InputBase
                sx={{ ml: 1, flex: 1 }}
                value={message}
                onChange={handleMessage}
                placeholder="Interested in this property"
                inputProps={{ "aria-label": "send a message" }}
              />
              <IconButton color="primary" aria-label="directions"  onClick={handleButtonClick}>
                <SendIcon/>
              </IconButton>
            </Paper>
          </ChatGrid>
        </Grid>
        <Grid item xs={12} sm={12} md={9} lg={9}>
          <HeadTitle>About this Property</HeadTitle>
          <AboutProperty>{data?.shortDescription}</AboutProperty>
          <HeadTitle>Pricing</HeadTitle>
          <TableContainer>
            <Table sx={{ minWidth: 500 }}>
              <TableBody>
                {propertyDetails.pricingDetails &&
                  propertyDetails.pricingDetails.map((row) => (
                    <TableRow key={row.id} align="left">
                      <TableCell component="th">
                        <OpacityText>{row.title}</OpacityText>
                      </TableCell>
                      <TableCell>{row.data}</TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
          </TableContainer>
          <HeadTitle>Contact List</HeadTitle>
          {propertyDetails.contactList &&
            propertyDetails.contactList.map((data, i) => (
              <Grid container spacing={3} key={i}>
                <Grid item xs={2} sm={2} md={1} lg={1}>
                  <img
                    src={data.imageUrl}
                    alt="profile"
                    style={{ width: "50px" }}
                  />
                </Grid>
                <Grid item xs={10} sm={10} md={11} lg={11}>
                  <div>{data.name}</div>
                  <OpacityText>{data.role}</OpacityText>
                </Grid>
              </Grid>
            ))}
        </Grid>
      </Grid>
      <Grid></Grid>
    </div>
  );
};

export default PropertyDetails;
