import React, { useState, useContext } from "react";
import axios from "axios";
import {
  Grid,
  TextField,
  Button,
  FormControlLabel,
  Checkbox,
  Paper,
} from "@mui/material";
import { useDropzone } from "react-dropzone";
import { AppContext } from "../../context/AppContext";
import { styled } from "@mui/system";

const MainDiv = styled("div")(() => ({
  fontFamily: "Roboto",
}));


const HeadTitle = styled("div")(() => ({
  fontSize: "20px",
  paddingTop: "20px",
}));

const AddProperty = () => {
  const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
  const ADDPROPERTY_URL = `${BACKEND_URL}/api/property/add-property`;
  const { userId, accessToken } = useContext(AppContext);

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
    imageUrl: [],
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
    ownerDetails: userId,
    extraFeatures: "",
  });

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

  // const onDrop = (acceptedFiles) => {
  //   const filePromises = acceptedFiles.map((file) => {
  //     return new Promise((resolve, reject) => {
  //       const reader = new FileReader();
  //       reader.readAsDataURL(file);
  //       reader.onload = () => resolve(reader.result);
  //       reader.onerror = reject;
  //     });
  //   });

  //   Promise.all(filePromises).then((fileContents) => {
  //     setFormValues((prevValues) => ({
  //       ...prevValues,
  //       imageUrl: [...prevValues.imageUrl, ...fileContents],
  //     }));
  //   });
  // };

  const onDrop = (acceptedFiles) => {
    const filePromises = acceptedFiles.map((file) => {
      return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = reject;
      });
    });
  
    Promise.all(filePromises).then((fileContents) => {
      setFormValues((prevValues) => ({
        ...prevValues,
        imageUrl: [...prevValues.imageUrl, ...fileContents],
      }));
    });
  };

  const { getRootProps, getInputProps } = useDropzone({ onDrop });

  // const addProperty = async (propertyData) => {
  //   try {
  //     const res = await axios.post(ADDPROPERTY_URL, propertyData, {
  //       headers: {
  //         Authorization: `Bearer ${accessToken}`,
  //       },
  //     });
  //     if (res.status === 200) {
  //       console.log("Property added successfully");
  //     } else {
  //       console.log("Failed to add property");
  //     }
  //     return res;
  //   } catch (error) {
  //     console.log("ERROR", error);
  //     return error.response;
  //   }
  // };

  const addProperty = async (propertyData) => {
    try {
      // Convert image URLs to base64 here if needed
      const base64Images = await Promise.all(
        propertyData.imageUrl.map(async (imageUrl) => {
          const response = await axios.get(imageUrl, { responseType: 'blob' });
          const reader = new FileReader();
          reader.readAsDataURL(response.data);
          return new Promise((resolve) => {
            reader.onloadend = () => {
              resolve(reader.result);
            };
          });
        })
      );
  
      // Replace image URLs with base64 encoded strings
      propertyData.imageUrl = base64Images;
  
      const res = await axios.post(ADDPROPERTY_URL, propertyData, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
  
      if (res.status === 200) {
        console.log("Property added successfully");
      } else {
        console.log("Failed to add property");
      }
      return res;
    } catch (error) {
      console.log("ERROR", error);
      return error.response;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("formValues", formValues);
    const response = await addProperty(formValues);
    console.log("response", response);
  };

  return (
    <MainDiv>
    <Paper style={{padding:"20px 80px"}}>
      <h1>Add Property</h1>
      <form onSubmit={handleSubmit}>
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
          <Grid item xs={12} sm={6}></Grid>
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
          <Grid item xs={12}>
            <HeadTitle>Upload Images</HeadTitle>
            <div
              {...getRootProps({ className: "dropzone" })}
              style={{
                border: "2px dashed #cccccc",
                padding: "20px",
                textAlign: "center",
              }}
            >
              <input {...getInputProps()} />
              <h4>Drag and drop some files here, or click to select files</h4>
              <div
                style={{
                  display: "flex",
                  flexWrap: "wrap",
                  gap: "10px",
                  justifyContent: "center",
                }}
              >
                {formValues.imageUrl.map((file, index) => (
                  <div
                    key={index}
                    style={{
                      position: "relative",
                      width: "100px",
                      height: "100px",
                      overflow: "hidden",
                    }}
                  >
                    <img
                      src={file}
                      alt={`Uploaded ${index}`}
                      style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                      }}
                    />
                  </div>
                ))}
              </div>
            </div>
          </Grid>
          <Grid item xs={12}>
            <Button type="submit" variant="contained" style={{    backgroundColor: "rgb(4, 196, 204)",color: "white"}}>
              Add Property
            </Button>
          </Grid>
        </Grid>
      </form>
    </Paper>
    </MainDiv>
  );
};

export default AddProperty;
