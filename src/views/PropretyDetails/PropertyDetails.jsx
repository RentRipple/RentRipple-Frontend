import React, { useEffect, useContext, useState } from "react";
import { useLocation } from "react-router-dom";
import { styled } from "@mui/system";
import profileImage from "../../assets/profile.svg";
import { Button, Grid, TextField } from "@mui/material";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import { AppContext } from "../../context/AppContext";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./imageCustom.css";

const ImageGrid = styled("div")(() => ({
  backgroundColor: "#f0f0f0",
  borderRadius: "16px",
}));

const LargeImageStyle = styled("img")(() => ({
  width: "100%",
  height: "400px",
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
  fontSize: "26px",
  paddingTop: "26px",
  paddingBottom: "12px",
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

const PropertyDetails = () => {
  const location = useLocation();
  const { data } = location.state;
  const { getPropertyDetails, propertyDetails, name } = useContext(AppContext);
  const [editMode, setEditMode] = useState(false);
  const [editedDetails, setEditedDetails] = useState({});
  const [images, setImages] = useState([]);

  useEffect(() => {
    if (data.id && !propertyDetails) {
      getPropertyDetails(data.id);
    }
  }, [data.id, getPropertyDetails]);

  useEffect(() => {
    if (propertyDetails?.propertyDetails) {
      setEditedDetails(propertyDetails.propertyDetails);
      setImages(propertyDetails.propertyDetails.imageUrl || []);
    }
  }, [propertyDetails]);

  const handleEditToggle = () => {
    setEditMode(!editMode);
  };

  const handleChange = (e) => {
    setEditedDetails({
      ...editedDetails,
      [e.target.name]: e.target.value,
    });
  };

  const handleSave = () => {
    // EDIT API (PATCH)
    console.log("Edited Data", editedDetails);
    console.log("Images", images);
    setEditMode(false);
  };

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    const newImages = files.map((file) => URL.createObjectURL(file));
    setImages((prevImages) => [...prevImages, ...newImages]);
  };

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  return (
    <div style={{ fontFamily: "Roboto" }}>
      <Grid container spacing={2}>
        {name === propertyDetails?.ownerDetails?.name ? (
          <Grid item xs={12} sm={12} md={12} lg={12}>
            <ImageGrid>
              {editMode ? (
                <div>
                  <input
                    type="file"
                    accept="image/*"
                    multiple
                    onChange={handleImageUpload}
                  />
                  <div
                    style={{ display: "flex", gap: "10px", marginTop: "10px" }}
                  >
                    {propertyDetails?.propertyDetails?.imageUrl.map(
                      (url, index) => (
                        <img
                          key={index}
                          src={url}
                          alt={`Thumbnail ${index}`}
                          style={{
                            width: "80px",
                            height: "80px",
                            objectFit: "cover",
                            borderRadius: "8px",
                          }}
                        />
                      )
                    )}
                  </div>
                </div>
              ) : (
                <Slider {...settings}>
                  {propertyDetails?.propertyDetails?.imageUrl?.map(
                    (url, index) => (
                      <LargeImageStyle
                        key={index}
                        src={url}
                        alt={`Slide ${index}`}
                      />
                    )
                  ) || <p>No images available</p>}
                </Slider>
              )}
            </ImageGrid>
          </Grid>
        ) : (
          <>
            <Grid item xs={12} sm={12} md={9} lg={9}>
              <ImageGrid>
                {editMode ? (
                  <div>
                    <input
                      type="file"
                      accept="image/*"
                      multiple
                      onChange={handleImageUpload}
                    />
                    <div
                      style={{
                        display: "flex",
                        gap: "10px",
                        marginTop: "10px",
                      }}
                    >
                      {propertyDetails?.propertyDetails?.imageUrl.map(
                        (url, index) => (
                          <img
                            key={index}
                            src={url}
                            alt={`Thumbnail ${index}`}
                            style={{
                              width: "80px",
                              height: "80px",
                              objectFit: "cover",
                              borderRadius: "8px",
                            }}
                          />
                        )
                      )}
                    </div>
                  </div>
                ) : (
                  <Slider {...settings}>
                    {propertyDetails?.propertyDetails?.imageUrl?.map(
                      (url, index) => (
                        <LargeImageStyle
                          key={index}
                          src={url}
                          alt={`Slide ${index}`}
                        />
                      )
                    ) || <p>No images available</p>}
                  </Slider>
                )}
              </ImageGrid>
            </Grid>
            <Grid item xs={12} sm={12} md={3} lg={3}>
              <ChatGrid>
                <HeadTitle style={{ marginBottom: "14px" }}>
                  Owner Details
                </HeadTitle>
                <img
                  src={propertyDetails?.ownerDetails?.imageUrl || profileImage}
                  alt="profile"
                  style={{ width: "80px" }}
                />
                <p>{propertyDetails?.ownerDetails?.name}</p>
                <OwnerDetailsStyle>
                  Ratings: {propertyDetails?.ownerDetails?.rating}
                </OwnerDetailsStyle>
                <OwnerDetailsStyle>
                  Email: {propertyDetails?.ownerDetails?.email}
                </OwnerDetailsStyle>
                <OwnerDetailsStyle style={{ marginBottom: "14px" }}>
                  Contact: {propertyDetails?.ownerDetails?.phone}
                </OwnerDetailsStyle>
              </ChatGrid>
            </Grid>
          </>
        )}
        <Grid item xs={12} sm={12} md={12} lg={12}>
          {name === propertyDetails?.ownerDetails?.name ? (
            <>
              {!editMode && (
                <>
                  <Button style={{backgroundColor:"#04c4cc", color:"white", margin:"0 20px 0 0"}} onClick={handleEditToggle}> Edit Property</Button>
                  <Button style={{backgroundColor:"#04c4cc", color:"white"}}> Add new property</Button>
                </>
              )}
            </>
          ) : (
            <></>
          )}
        </Grid>
        <Grid item xs={12} sm={12} md={9} lg={9}>
          <HeadTitle>About this Property</HeadTitle>
          {editMode ? (
            <>
              <AboutProperty>
                Description:
                <TextField
                  name="description"
                  value={editedDetails.description}
                  onChange={handleChange}
                  fullWidth
                  multiline
                  rows={4}
                />
              </AboutProperty>
              <AboutProperty>
                Address:{" "}
                <TextField
                  name="address_line1"
                  value={editedDetails.address_line1}
                  onChange={handleChange}
                  fullWidth
                  rows={4}
                />
              </AboutProperty>
            </>
          ) : (
            <>
              <AboutProperty>
                {propertyDetails?.propertyDetails?.description.slice(0, 200) +
                  "..."}
              </AboutProperty>
              <AboutProperty>
                Address: {propertyDetails?.propertyDetails?.address_line1},{" "}
                {propertyDetails?.propertyDetails?.city},{" "}
                {propertyDetails?.propertyDetails?.country}
              </AboutProperty>
            </>
          )}
          <HeadTitle>Pricing</HeadTitle>
          <TableContainer>
            <Table sx={{ minWidth: 500 }}>
              <TableBody>
                <TableRow align="left">
                  <TableCell component="th">
                    <OpacityText>Price</OpacityText>
                  </TableCell>
                  <TableCell>
                    {editMode ? (
                      <TextField
                        name="price"
                        value={editedDetails.price}
                        onChange={handleChange}
                      />
                    ) : (
                      propertyDetails?.propertyDetails?.price
                    )}
                  </TableCell>
                </TableRow>
                <TableRow align="left">
                  <TableCell component="th">
                    <OpacityText>Deposit</OpacityText>
                  </TableCell>
                  <TableCell>
                    {editMode ? (
                      <TextField
                        name="deposit"
                        value={editedDetails.deposit}
                        onChange={handleChange}
                      />
                    ) : (
                      propertyDetails?.propertyDetails?.deposit
                    )}
                  </TableCell>
                </TableRow>
                <TableRow align="left">
                  <TableCell component="th">
                    <OpacityText>Lease length</OpacityText>
                  </TableCell>
                  <TableCell>
                    {editMode ? (
                      <TextField
                        name="leaseLength"
                        value={editedDetails.leaseLength}
                        onChange={handleChange}
                      />
                    ) : (
                      propertyDetails?.propertyDetails?.leaseLength
                    )}
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
          <HeadTitle>Utilities</HeadTitle>

          <Grid container>
            <Grid item xs={12} sm={6} md={4}>
              <Grid container spacing={3}>
                <Grid item xs={4} sm={4} md={3} lg={2}>
                  <img
                    src="https://static.vecteezy.com/system/resources/previews/025/725/916/original/ac-outside-unit-thick-line-icon-for-personal-and-commercial-use-free-vector.jpg"
                    alt="AC"
                    style={{ width: "50px" }}
                  />
                </Grid>
                <Grid item xs={8} sm={8} md={9} lg={10}>
                  <div>Air Conditioning</div>
                  <OpacityText>
                    {propertyDetails?.propertyDetails?.utilities
                      ?.airConditioning
                      ? "Included in rent"
                      : "Not included in rent"}
                  </OpacityText>
                </Grid>
              </Grid>
            </Grid>

            <Grid item xs={12} sm={6} md={4}>
              <Grid container spacing={3}>
                <Grid item xs={4} sm={4} md={3} lg={2}>
                  <img
                    src="https://static.vecteezy.com/system/resources/previews/006/601/573/original/electric-socket-with-cable-vector.jpg"
                    alt="AC"
                    style={{ width: "50px" }}
                  />
                </Grid>
                <Grid item xs={8} sm={8} md={9} lg={10}>
                  <div>Cable</div>
                  <OpacityText>
                    {propertyDetails?.propertyDetails?.utilities?.cable
                      ? "Included in rent"
                      : "Not included in rent"}
                  </OpacityText>
                </Grid>
              </Grid>
            </Grid>

            <Grid item xs={12} sm={6} md={4}>
              <Grid container spacing={3}>
                <Grid item xs={4} sm={4} md={3} lg={2}>
                  <img
                    src="https://media.istockphoto.com/id/1234991640/vector/energy-electricity-power-icon.jpg?s=612x612&w=0&k=20&c=c7mEczpw6phZqtZE1C9BM3cX2QdgH7FwVhD6afpR3og="
                    alt="Electricity"
                    style={{ width: "50px" }}
                  />
                </Grid>
                <Grid item xs={8} sm={8} md={9} lg={10}>
                  <div>Electricity</div>
                  <OpacityText>
                    {propertyDetails?.propertyDetails?.utilities?.electricity
                      ? "Included in rent"
                      : "Not included in rent"}
                  </OpacityText>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
          <Grid container>
            <Grid item xs={12} sm={6} md={4}>
              <Grid container spacing={3}>
                <Grid item xs={4} sm={4} md={3} lg={2}>
                  <img
                    src="https://st2.depositphotos.com/1070291/44229/v/450/depositphotos_442291734-stock-illustration-propane-gas-cylinder-vector-glyph.jpg"
                    alt="gas"
                    style={{ width: "50px" }}
                  />
                </Grid>
                <Grid item xs={8} sm={8} md={9} lg={10}>
                  <div>Gas</div>
                  <OpacityText>
                    {propertyDetails?.propertyDetails?.utilities?.gas
                      ? "Included in rent"
                      : "Not included in rent"}
                  </OpacityText>
                </Grid>
              </Grid>
            </Grid>

            <Grid item xs={12} sm={6} md={4}>
              <Grid container spacing={3}>
                <Grid item xs={4} sm={4} md={3} lg={2}>
                  <img
                    src="https://img.freepik.com/premium-vector/stand-heater-icon-flat-illustration-stand-heater-vector-icon-web-design_98402-29470.jpg"
                    alt="heater"
                    style={{ width: "50px" }}
                  />
                </Grid>
                <Grid item xs={8} sm={8} md={9} lg={10}>
                  <div>Heating</div>
                  <OpacityText>
                    {propertyDetails?.propertyDetails?.utilities?.heat
                      ? "Included in rent"
                      : "Not included in rent"}
                  </OpacityText>
                </Grid>
              </Grid>
            </Grid>

            <Grid item xs={12} sm={6} md={4}>
              <Grid container spacing={3}>
                <Grid item xs={4} sm={4} md={3} lg={2}>
                  <img
                    src="https://icons.veryicon.com/png/o/miscellaneous/smart-icon-library/internet-61.png"
                    alt="internet"
                    style={{ width: "50px" }}
                  />
                </Grid>
                <Grid item xs={8} sm={8} md={9} lg={10}>
                  <div>Internet</div>
                  <OpacityText>
                    {propertyDetails?.propertyDetails?.utilities?.internet
                      ? "Included in rent"
                      : "Not included in rent"}
                  </OpacityText>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
          <Grid container>
            <Grid item xs={12} sm={6} md={4}>
              <Grid container spacing={3}>
                <Grid item xs={4} sm={4} md={3} lg={2}>
                  <img
                    src="https://png.pngtree.com/png-vector/20191030/ourmid/pngtree-water-icons-isolated-on-white-background-vector-illustration-png-image_1870622.jpg"
                    alt="water"
                    style={{ width: "50px" }}
                  />
                </Grid>
                <Grid item xs={8} sm={8} md={9} lg={10}>
                  <div>Water</div>
                  <OpacityText>
                    {propertyDetails?.propertyDetails?.utilities?.water
                      ? "Included in rent"
                      : "Not included in rent"}
                  </OpacityText>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12} sm={12} md={3} lg={3}>
          <HeadTitle>Features</HeadTitle>
          <Grid container spacing={1}>
            <Grid item xs={4} sm={4} md={3} lg={2}>
              <img
                src="https://media.istockphoto.com/id/1449828500/vector/balcony-vector-icon.jpg?s=612x612&w=0&k=20&c=ycXXJ2w8M-WdhIekg8XldqalX2VucsoPZBM5f64hdW8="
                alt="AC"
                style={{ width: "50px" }}
              />
            </Grid>
            <Grid item xs={8} sm={8} md={9} lg={10}>
              <div>Balcony</div>
              <OpacityText>
                {propertyDetails?.propertyDetails?.features?.balcony
                  ? "Available"
                  : "N/A"}
              </OpacityText>
            </Grid>
          </Grid>
          <Grid container spacing={1}>
            <Grid item xs={4} sm={4} md={3} lg={2}>
              <img
                src="https://static.vecteezy.com/system/resources/previews/025/725/916/original/ac-outside-unit-thick-line-icon-for-personal-and-commercial-use-free-vector.jpg"
                alt="AC"
                style={{ width: "50px" }}
              />
            </Grid>
            <Grid item xs={8} sm={8} md={9} lg={10}>
              <div>Elevator</div>
              <OpacityText>
                {propertyDetails?.propertyDetails?.features?.elevator
                  ? "Available"
                  : "N/A"}
              </OpacityText>
            </Grid>
          </Grid>
          <Grid container spacing={1}>
            <Grid item xs={4} sm={4} md={3} lg={2}>
              <img
                src="https://static.vecteezy.com/system/resources/previews/000/599/049/original/elevator-icon-vector.jpg"
                alt="AC"
                style={{ width: "50px" }}
              />
            </Grid>
            <Grid item xs={8} sm={8} md={9} lg={10}>
              <div>Gym</div>
              <OpacityText>
                {propertyDetails?.propertyDetails?.features?.gym
                  ? "Available"
                  : "N/A"}
              </OpacityText>
            </Grid>
          </Grid>
          <Grid container spacing={1}>
            <Grid item xs={4} sm={4} md={3} lg={2}>
              <img
                src="https://static.vecteezy.com/system/resources/thumbnails/003/179/642/small/dumbbell-equipment-gym-isolated-icon-free-vector.jpg"
                alt="AC"
                style={{ width: "50px" }}
              />
            </Grid>
            <Grid item xs={8} sm={8} md={9} lg={10}>
              <div>Pool</div>
              <OpacityText>
                {propertyDetails?.propertyDetails?.features?.pool
                  ? "Available"
                  : "N/A"}
              </OpacityText>
            </Grid>
          </Grid>
          <Grid container spacing={1}>
            <Grid item xs={4} sm={4} md={3} lg={2}>
              <img
                src="https://img.freepik.com/premium-vector/swimming-pool-icon-logo-vector-design-template_827767-3032.jpg"
                alt="AC"
                style={{ width: "50px" }}
              />
            </Grid>
            <Grid item xs={8} sm={8} md={9} lg={10}>
              <div>Dish Washer</div>
              <OpacityText>
                {propertyDetails?.propertyDetails?.features?.dishwasher
                  ? "Available"
                  : "N/A"}
              </OpacityText>
            </Grid>
          </Grid>
          <Grid container spacing={1}>
            <Grid item xs={4} sm={4} md={3} lg={2}>
              <img
                src="https://img.freepik.com/premium-vector/dishwasher-icon-simple-illustration-dishwasher-vector-icon-web-design-isolated-white-background_98396-9031.jpg"
                alt="AC"
                style={{ width: "50px" }}
              />
            </Grid>
            <Grid item xs={8} sm={8} md={9} lg={10}>
              <div>Laundry</div>
              <OpacityText>
                {propertyDetails?.propertyDetails?.features?.laundry
                  ? "Available"
                  : "N/A"}
              </OpacityText>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12} sm={12} md={12} lg={12}>
          {editMode && (
            <>
              <Button onClick={handleEditToggle} style={{backgroundColor:"#04c4cc", color:"white", margin:"0 20px 0 0"}} > Cancel </Button>
              <Button onClick={handleSave} style={{backgroundColor:"#04c4cc", color:"white"}}>Save Changes</Button>
            </>
          )}
        </Grid>
      </Grid>
    </div>
  );
};

export default PropertyDetails;
