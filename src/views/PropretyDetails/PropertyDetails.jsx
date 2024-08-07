import React, { useEffect, useContext, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { styled } from "@mui/system";
import profileImage from "../../assets/profile.svg";
import {
  Button,
  Grid,
  Checkbox,
  TextField,
  Rating,
  Card,
  CardContent,
  Typography,
} from "@mui/material";
import { AppContext } from "../../context/AppContext";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./imageCustom.css";
import { features, utilities } from "../../helpers/utilityAndFeatures";
import { PropertyContext } from "../../context/PropertyContext";
import { toast } from "react-toastify";
import PropertyReviewSection from "./PropertyReviewSection";

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
  paddingTop: "40px",
  paddingBottom: "20px",
}));

const OpacityText = styled("div")(() => ({
  opacity: "0.5",
}));

const AboutProperty = styled("div")(() => ({
  fontSize: "14px",
  opacity: "0.8",
  backgroundColor: "whitesmoke",
  padding: "10px",
}));

const OwnerDetailsStyle = styled("div")(() => ({
  fontSize: "13.5px",
  padding: "10px",
}));

const PropertyDetails = () => {
  const navigate = useNavigate();
  const { userId } = useContext(AppContext);
  const { fetchPropertyById, propertyDetails, updateProperty } =
    useContext(PropertyContext);
  const [editMode, setEditMode] = useState(false);
  const [editedDetails, setEditedDetails] = useState({});
  const [images, setImages] = useState([]);

  const propertyId = useParams();
  useEffect(() => {
    fetchPropertyById(propertyId.propertyId);
  }, [propertyId.propertyId]);

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
  const handleChangeCheckbox = (e, category, key) => {
    setEditedDetails((prevDetails) => ({
      ...prevDetails,
      [category]: {
        ...prevDetails[category],
        [key]: e.target.checked,
      },
    }));
  };

  const handleSave = async (e) => {
    e.preventDefault();

    // Filtering out id and imageUel
    const filterOutId = (details) => {
      const { id, imageUrl, ...rest } = details;
      console.log(id, imageUrl);
      return rest;
    };

    const filteredDetails = filterOutId(editedDetails);

    console.log("Edited Data", filteredDetails);

    const response = await updateProperty(
      propertyId.propertyId,
      filteredDetails
    );
    if (response) {
      toast.success("Property updated successfully");
      // reload the page
      fetchPropertyById(propertyId.propertyId);
    }

    console.log("Images", images);
    setEditMode(false);
  };

  const isHttpUrl = function (url) {
    return url && url.startsWith("http");
  };

  const renderRatingStars = (rating) => {
    return (
      <Rating name="rating-stars" value={rating} precision={0.5} readOnly />
    );
  };

  const handleAddProperty = () => {
    navigate("/add-property");
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
        {userId === propertyDetails?.ownerDetails?.id ? (
          <Grid item xs={12} sm={12} md={12} lg={12}>
            <ImageGrid>
              {editMode ? (
                <></>
              ) : (
                
                <Slider {...settings}>
                  {propertyDetails?.propertyDetails?.imageUrl?.map(
                    (url, index) => (
                      <LargeImageStyle
                        key={index}
                        src={
                          isHttpUrl(url) ? url : require(`../../assets/${url}`)
                        }
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
                  <></>
                ) : (
                  <Slider {...settings}>
                    {propertyDetails?.propertyDetails?.imageUrl?.map(
                      (url, index) => (
                        <LargeImageStyle
                          key={index}
                          src={
                            isHttpUrl(url)
                              ? url
                              : require(`../../assets/${url}`)
                          }
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
                  {propertyDetails?.ownerDetails?.rating
                    ? renderRatingStars(propertyDetails.ownerDetails.rating)
                    : "No ratings"}
                </OwnerDetailsStyle>
                <OwnerDetailsStyle>
                  {propertyDetails?.ownerDetails?.email}
                </OwnerDetailsStyle>
                <OwnerDetailsStyle style={{ marginBottom: "14px" }}>
                  {propertyDetails?.ownerDetails?.phone}
                </OwnerDetailsStyle>
              </ChatGrid>
            </Grid>
          </>
        )}
        <Grid item xs={12} sm={12} md={12} lg={12}>
          {userId === propertyDetails?.ownerDetails?.id ? (
            <>
              {!editMode && (
                <>
                  <Button
                    style={{
                      backgroundColor: "rgb(34, 83, 141)",
                      color: "white",
                      margin: "0 20px 0 0",
                    }}
                    onClick={handleEditToggle}
                  >
                    {" "}
                    Edit Property
                  </Button>
                  <Button
                    style={{
                      backgroundColor: "rgb(34, 83, 141)",
                      color: "white",
                    }}
                    onClick={handleAddProperty}
                  >
                    {" "}
                    Add new property
                  </Button>
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

          <div>
            <Grid container spacing={2} style={{paddingTop: "40px"}}>
              <Grid item xs={8} sm={3}>
                <Card
                  style={{
                    backgroundColor: "#E7EDF2",
                    color: "#333",
                  }}
                >
                  <CardContent style={{paddingBottom: "12px"}}>
                    <Typography variant="h6" style={{fontWeight: "bold"}}>Price</Typography>
                    {editMode ? (
                      <TextField
                        name="price"
                        value={editedDetails.price}
                        onChange={handleChange}
                        fullWidth
                      />
                    ) : (
                      <Typography variant="body1">
                        {propertyDetails?.propertyDetails?.price}
                      </Typography>
                    )}
                  </CardContent>
                </Card>
              </Grid>
              <Grid item xs={8} sm={3}>
                <Card
                  style={{
                    backgroundColor: "#E7EDF2",
                    color: "#333",
                  }}
                >
                  <CardContent style={{paddingBottom: "12px"}}>
                    <Typography variant="h6" style={{fontWeight: "bold"}}>Deposit</Typography>
                    {editMode ? (
                      <TextField
                        name="deposit"
                        value={editedDetails.deposit}
                        onChange={handleChange}
                        fullWidth
                      />
                    ) : (
                      <Typography variant="body1">
                        {propertyDetails?.propertyDetails?.deposit}
                      </Typography>
                    )}
                  </CardContent>
                </Card>
              </Grid>
              <Grid item xs={8} sm={3}>
                <Card
                  style={{
                    backgroundColor: "#E7EDF2",
                    color: "#333",
                  }}
                >
                  <CardContent style={{paddingBottom: "12px"}}>
                    <Typography variant="h6" style={{fontWeight: "bold"}}>Lease Length</Typography>
                    {editMode ? (
                      <TextField
                        name="leaseLength"
                        value={editedDetails.leaseLength}
                        onChange={handleChange}
                        fullWidth
                      />
                    ) : (
                      <Typography variant="body1">
                        {propertyDetails?.propertyDetails?.leaseLength}
                      </Typography>
                    )}
                  </CardContent>
                </Card>
              </Grid>
            </Grid>
          </div>
          {editMode ? (
            //All checkboxes for features in Edit form
            <>
              <Grid item xs={12}>
                <HeadTitle>Features</HeadTitle>
                <Grid container spacing={2} direction="row">
                  {features.map((feature, index) => (
                    <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
                      <Grid container spacing={1} alignItems="center">
                        <Grid item>
                          <img
                            src={feature.icon}
                            alt={feature.name}
                            style={{ width: "40px", marginRight: "10px" }}
                          />
                        </Grid>
                        <Grid
                          item
                          style={{
                            backgroundColor: "whitesmoke",
                            padding: "10px",
                            width: "200px",
                            borderRadius: "10px",
                          }}
                        >                          
                          <Checkbox
                            checked={editedDetails.features[feature.key]}
                            onChange={(e) =>
                              handleChangeCheckbox(e, "features", feature.key)
                            }
                          />
                          {feature.name}
                        </Grid>
                      </Grid>
                    </Grid>
                  ))}
                </Grid>
              </Grid>
            </>
          ) : (
            <>
              {/* features */}
              <Grid item xs={12}>
                <HeadTitle>Features</HeadTitle>
                <Grid container spacing={2} direction="row">
                  {features.map((feature, index) => (
                    <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
                      <Grid container spacing={1} alignItems="center">
                        <Grid item>
                          <img
                            src={feature.icon}
                            alt={feature.name}
                            style={{ width: "40px", marginRight: "10px" }}
                          />
                        </Grid>
                        <Grid
                          item
                          style={{
                            backgroundColor: "whitesmoke",
                            padding: "10px",
                            width: "200px",
                            borderRadius: "10px",
                          }}
                        >
                          {feature.name}
                          <OpacityText>
                            {propertyDetails?.propertyDetails?.features[
                              feature.key
                            ]
                              ? "Available"
                              : "N/A"}
                          </OpacityText>
                        </Grid>
                      </Grid>
                    </Grid>
                  ))}
                </Grid>
              </Grid>
              <Grid>
                <PropertyReviewSection
                  propertyId={propertyId.propertyId}
                  isOwner={userId === propertyDetails?.ownerDetails?.id}
                />
              </Grid>
            </>
          )}
        </Grid>

        {editMode ? (
          //All checkboxes for utilities in Edit form

          <>
            <Grid item xs={12} sm={12} md={3} lg={3}>
              <Grid item xs={12} sm={12} md={12} lg={12}>
                <HeadTitle>Utilities</HeadTitle>
                <Grid container spacing={2}>
                  {utilities.map((utility, index) => (
                    <Grid item xs={12} key={index}>
                      <Grid container spacing={1} alignItems="center">
                        <Grid item>
                          <img
                            src={utility.icon}
                            alt={utility.name}
                            style={{ width: "40px", marginRight: "10px" }}
                          />
                        </Grid>
                        <Grid
                          item
                          style={{
                            backgroundColor: "whitesmoke",
                            padding: "10px",
                            width: "200px",
                            borderRadius: "10px",
                          }}
                        >
                          <Checkbox
                            checked={editedDetails.utilities[utility.key]}
                            onChange={(e) =>
                              handleChangeCheckbox(e, "utilities", utility.key)
                            }
                          />
                          {utility.name}
                        </Grid>
                      </Grid>
                    </Grid>
                  ))}
                </Grid>
              </Grid>
            </Grid>
          </>
        ) : (
          <>
            {/* utilities */}
            <Grid item xs={12} sm={12} md={3} lg={3}>
              <Grid item xs={12} sm={12} md={12} lg={12}>
                <HeadTitle>Utilities</HeadTitle>
                <Grid container spacing={2}>
                  {utilities.map((utility, index) => (
                    <Grid item xs={12} key={index}>
                      <Grid container spacing={1} alignItems="center">
                        <Grid item>
                          <img
                            src={utility.icon}
                            alt={utility.name}
                            style={{ width: "40px", marginRight: "10px" }}
                          />
                        </Grid>
                        <Grid
                          item
                          style={{
                            backgroundColor: "whitesmoke",
                            padding: "10px",
                            width: "200px",
                            borderRadius: "10px",
                          }}
                        >
                          {utility.name}
                          <OpacityText>
                            {propertyDetails?.propertyDetails?.utilities[
                              utility.key
                            ]
                              ? "Available"
                              : "N/A"}
                          </OpacityText>
                        </Grid>
                      </Grid>
                    </Grid>
                  ))}
                </Grid>
              </Grid>
            </Grid>
          </>
        )}

        <Grid item xs={12} sm={12} md={12} lg={12}>
          {editMode && (
            <>
              <Button
                onClick={handleSave}
                style={{
                  backgroundColor: "rgb(34, 83, 141)",
                  color: "white",
                  margin: "0 20px 0 0",
                }}
              >
                Save Changes
              </Button>
              <Button
                onClick={handleEditToggle}
                style={{
                  backgroundColor: "rgb(34, 83, 141)",
                  color: "white",
                }}
              >
                {" "}
                Cancel{" "}
              </Button>
            </>
          )}
        </Grid>
      </Grid>
    </div>
  );
};

export default PropertyDetails;
