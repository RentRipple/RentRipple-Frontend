import React, { useState, useContext } from "react";
import {
  Grid,
  TextField,
  Button,
  FormControlLabel,
  Checkbox,
  Paper,
  Typography,
} from "@mui/material";
import { useDropzone } from "react-dropzone";
import { styled } from "@mui/system";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import {PropertyContext} from "../../context/PropertyContext";
const MainDiv = styled("div")(() => ({
  fontFamily: "Roboto",
}));

const HeadTitle = styled("div")(() => ({
  fontSize: "20px",
  paddingTop: "20px",
}));

const ImagePreview = styled("div")(() => ({
  display: "flex",
  marginTop: "10px",
  alignItems: "center",
  justifyContent: "center",
  flexWrap: "wrap",
  backgroundColor: "#5e909117",
  borderRadius: "10px",
}));

const ImageItem = styled("div")(() => ({
  margin: "10px",
  textAlign: "center",
}));

const AddProperty = () => {
  const { addProperty, uploadImagesToproperty } = useContext(PropertyContext);
  const navigate = useNavigate();
  const [formValues, setFormValues] = useState({
    address_line1: "",
    city: "",
    state: "",
    country: "",
    postal_code: "",
    description: "",
    price: "",
    leaseLength: "",
    deposit: "",
    location: "",
    utilities: {
      electricity: false,
      water: false,
      gas: false,
      internet: false,
      cable: false,
      heat: false,
      airConditioning: false,
    },
    features: {
      parking: false,
      laundry: false,
      dishwasher: false,
      refrigerator: false,
      stove: false,
      microwave: false,
      garbageDisposal: false,
      fireplace: false,
      balcony: false,
      pool: false,
      hotTub: false,
      gym: false,
      elevator: false,
      furnished: false,
      wheelchairAccessible: false,
      petFriendly: false,
    },
    extraFeatures: "",
    // imageUrl: [],
  });

  
  const [propertyId, setPropertyId] = useState(null);
  const [showImageUpload, setShowImageUpload] = useState(false);
  const [showSubmitPropertyButton, setShowSubmitPropertyButton] = useState(true);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({
      ...formValues,
      [name]: value,
    });
  };

  const handleCheckboxChange = (e, category) => {
    const { name, checked } = e.target;
    setFormValues({
      ...formValues,
      [category]: {
        ...formValues[category],
        [name]: checked,
      },
    });
  };

  const onDrop = (acceptedFiles) => {
    const filePromises = acceptedFiles.map((file) => {
      return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve({ base64: reader.result, file });
        reader.onerror = reject;
      });
    });

    Promise.all(filePromises).then((fileContents) => {
      setFormValues((prevValues) => ({
        ...prevValues,
        // imageUrl: [...prevValues.imageUrl, ...fileContents],
        imageUrl: Array.isArray(prevValues.imageUrl)
          ? [...prevValues.imageUrl, ...fileContents]
          : [...fileContents],
      }));
    });
  };

  const { getRootProps, getInputProps } = useDropzone({ onDrop });

  const handleSubmitProperty = async (e) => {
    e.preventDefault();
    console.log("formValues", formValues);
    const response = await addProperty(formValues);
    if (response) {
      setPropertyId(response._id);
      setShowImageUpload(true);
      setShowSubmitPropertyButton(false);
      toast.success("Property added successfully");
    } else {
      toast.error("Failed to add property");
    }
    console.log("response", response);
  };

  const handleSubmitImages = async (e) => {
    e.preventDefault();
    if (!propertyId) return;

    const images = formValues.imageUrl.map((file) => file.file);
    const response = await uploadImagesToproperty(propertyId, images);
    
    if (response.status === 200) {
      toast.success("Property and Images added successfully");
      navigate("/");
    } else {
      toast.error("Failed to upload images");
    }
    console.log("response", response);
  };

  const handleRemoveImage = (index) => {
    const updatedImages = [...formValues.imageUrl];
    updatedImages.splice(index, 1);
    setFormValues({
      ...formValues,
      imageUrl: updatedImages,
    });
  };

  return (
    <MainDiv>
      <Paper style={{ padding: "20px 80px" }}>
        <h1>Add Property</h1>
        <form onSubmit={handleSubmitProperty}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={12}>
              <HeadTitle> Address </HeadTitle>
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Address Line 1"
                name="address_line1"
                value={formValues.address_line1}
                onChange={handleChange}
                fullWidth
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="City"
                name="city"
                value={formValues.city}
                onChange={handleChange}
                fullWidth
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="State"
                name="state"
                value={formValues.state}
                onChange={handleChange}
                fullWidth
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Country"
                name="country"
                value={formValues.country}
                onChange={handleChange}
                fullWidth
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Postal Code"
                name="postal_code"
                value={formValues.postal_code}
                onChange={handleChange}
                fullWidth
              />
            </Grid>
            <Grid item xs={12} sm={12}>
              <HeadTitle> Pricing Details </HeadTitle>
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Price"
                name="price"
                value={formValues.price}
                onChange={handleChange}
                fullWidth
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Lease Length"
                name="leaseLength"
                value={formValues.leaseLength}
                onChange={handleChange}
                fullWidth
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Deposit"
                name="deposit"
                value={formValues.deposit}
                onChange={handleChange}
                fullWidth
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Location"
                name="location"
                value={formValues.location}
                onChange={handleChange}
                fullWidth
              />
            </Grid>
            <Grid item xs={12} sm={12}>
              <HeadTitle> Property Details</HeadTitle>
            </Grid>
            <Grid item xs={12} sm={12}>
              <TextField
                multiline
                label="Description"
                name="description"
                value={formValues.description}
                onChange={handleChange}
                fullWidth
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Extra Features"
                name="extraFeatures"
                value={formValues.extraFeatures}
                onChange={handleChange}
                fullWidth
              />
            </Grid>
            <Grid item xs={12}>
              <HeadTitle>Utilities</HeadTitle>
              {Object.entries(formValues.utilities).map(([key, value]) => (
                <FormControlLabel
                  key={key}
                  control={
                    <Checkbox
                      checked={value}
                      onChange={(e) => handleCheckboxChange(e, "utilities")}
                      name={key}
                    />
                  }
                  label={key}
                />
              ))}
            </Grid>
            <Grid item xs={12}>
              <HeadTitle>Features</HeadTitle>
              {Object.entries(formValues.features).map(([key, value]) => (
                <FormControlLabel
                  key={key}
                  control={
                    <Checkbox
                      checked={value}
                      onChange={(e) => handleCheckboxChange(e, "features")}
                      name={key}
                    />
                  }
                  label={key}
                />
              ))}
            </Grid>
            {showSubmitPropertyButton ? 
            <Grid item xs={12}>
              <Button
                type="submit"
                variant="contained"
                style={{ backgroundColor: "rgb(4, 196, 204)", color: "white" }}
              >
                Upload Images
              </Button>
            </Grid>
            : ""}
          </Grid>
        </form>

        {showImageUpload && (
          <form onSubmit={handleSubmitImages}>
            <Grid container spacing={2} style={{ marginTop: "20px" }}>
              <Grid item xs={12} sm={12}>
                <HeadTitle>Upload Images</HeadTitle>
              </Grid>
              <Grid item xs={12}>
                <div
                  {...getRootProps()}
                  style={{
                    border: "1px dashed gray",
                    padding: "20px",
                    textAlign: "center",
                  }}
                >
                  <input {...getInputProps()} />
                  <p>Drag & drop images here, or click to select images</p>
                </div>
              </Grid>
              {formValues.imageUrl?.length > 0 && (
                <Grid item xs={12}>
                  <HeadTitle>Preview</HeadTitle>
                  <ImagePreview>
                    {formValues.imageUrl.map((file, index) => (
                      <ImageItem key={index}>
                        <img
                          src={file.base64}
                          alt={`Preview ${index}`}
                          style={{ maxWidth: "100px", maxHeight: "100px" }}
                        />
                        <Typography variant="caption" style={{padding: "0 10px"}}>
                          {file.file.name}
                        </Typography>
                        <Button
                          variant="outlined"
                          color="primary"
                          onClick={() => handleRemoveImage(index)}
                          style={{ marginTop: "5px", padding: "0"}}
                        >
                          Remove
                        </Button>
                      </ImageItem>
                    ))}
                  </ImagePreview>
                </Grid>
              )}
              <Grid item xs={12}>
                <Button
                  type="submit"
                  variant="contained"
                  style={{ backgroundColor: "rgb(4, 196, 204)", color: "white" }}
                >
                  Submit
                </Button>
              </Grid>
              
            </Grid>
          </form>
        )}
      </Paper>
    </MainDiv>
  );
};

export default AddProperty;
