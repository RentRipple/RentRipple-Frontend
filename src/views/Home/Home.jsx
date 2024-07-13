import React, { useContext, useEffect, useState } from "react";
import { styled } from "@mui/system";
import {
  Button,
  Container,
  Grid,
  CircularProgress,
  Pagination,
  TextField
} from "@mui/material";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import { useNavigate } from "react-router-dom";
import { PropertyContext } from "../../context/PropertyContext";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const FilterItem = styled(Paper)(() => ({
  textAlign: "center",
  padding: "8px 18px",
  fontFamily: "Roboto",
  fontSize: "14px",
  backgroundColor: "#E8EDF2",
  borderRadius: "12px",
  color: "#333",
}));

const StatText = styled("div")(() => ({
  fontFamily: "Roboto",
  fontSize: "14px",
  color: "#333",
  margin: "10px 0px",
  textAlign: "left",
}));

const utilitiesMeet = [
  "electricity",
  "water",
  "gas",
  "internet",
  "cable",
  "heat",
  "airConditioning",
];

const featuresMeet = [
  "parking",
  "laundry",
  "dishwasher",
  "refrigerator",
  "stove",
  "microwave",
  "garbageDisposal",
  "fireplace",
  "balcony",
  "pool",
  "hotTub",
  "gym",
  "elevator",
  "furnished",
  "wheelchairAccessible",
  "petFriendly",
];

const Home = () => {
  const navigate = useNavigate();
  const { properties, fetchProperties, loading, error } =
    useContext(PropertyContext);
  const [page, setPage] = useState(1);
  const pageSize = 16;

  const [searchText, setSearchText] = useState("");

  const [utilitiesFilters, setUtilitiesFilters] = useState({
    electricity: false,
    water: false,
    gas: false,
    internet: false,
    cable: false,
    heat: false,
    airConditioning: false,
  });

  const [featuresFilters, setFeaturesFilters] = useState({
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
  });

  const [filteredProperties, setFilteredProperties] = useState([])

  useEffect(() => {
    fetchProperties();
  }, []);

  useEffect(() => {setFilteredProperties(properties)}, [properties]);

  const paginatedProperties =
    filteredProperties && filteredProperties.slice((page - 1) * pageSize, page * pageSize);

    useEffect(() => {
      let temp = properties;
      
      if (searchText) {
        temp = temp.filter((property) =>
          property.description.toLowerCase().includes(searchText.toLowerCase()) 
          || property.location.toLowerCase().includes(searchText.toLowerCase())
          || property.price.toString().includes(searchText)
          || property.address_line1.toLowerCase().includes(searchText.toLowerCase())
        );
      }

      //Make me filter for featuresFilters
      if (Object.values(featuresFilters).some((value) => value === true)) {
        temp = temp.filter((property) => {
          return Object.keys(featuresFilters).every((key) => {
            return featuresFilters[key] ? property.features[key] : true;
          });
        });
      }

      //Make me filter for utilitiesFilters
      if (Object.values(utilitiesFilters).some((value) => value === true)) {
        temp = temp.filter((property) => {
          return Object.keys(utilitiesFilters).every((key) => {
            return utilitiesFilters[key] ? property.utilities[key] : true;
          });
        });
      }
  
      setFilteredProperties(temp);
    }, [searchText, featuresFilters, utilitiesFilters, properties ])  

  const isHttpUrl = function (url) {
    return url && url.startsWith("http");
  };

  useEffect(() => {
    if (error) {
      toast.error("Error Fetching data");
    }
  }, [error]);

  const handlePageChange = (event, value) => {
    setPage(value);
  };

  const handleUtilitiesFilterChange = (filter) => {
    setUtilitiesFilters((prevState) => ({
      ...prevState,
      [filter]: !prevState[filter],
    }));
  };

  const handleFeaturesFilterChange = (filter) => {
    setFeaturesFilters((prevState) => ({
      ...prevState,
      [filter]: !prevState[filter],
    }));
  };

  return (
    <div>
      <Box>
        <Container>
          <Grid item xs={12} align="center">
            <TextField fullWidth label="Search Box" id="fullWidth" value={searchText} onChange={(event)=>{setSearchText(event.target.value)}} />
          </Grid>
          <Box
            mt={2}
            mb={2}
            display="flex"
            flexWrap="wrap"
          >
            {utilitiesMeet.map((filter) => (
              <Button
                key={filter}
                variant={utilitiesFilters[filter] ? "contained" : "outlined"}
                color="primary"
                size="small"
                onClick={() => handleUtilitiesFilterChange(filter)}
                style={{ margin: "2px" }}
              >
                {filter.charAt(0).toUpperCase() + filter.slice(1)}
              </Button>
            ))}
          </Box>
          <Box
            mt={2}
            mb={2}
            display="flex"
            flexWrap="wrap"
          >
            {featuresMeet.map((filter) => (
              <Button
                key={filter}
                variant={featuresFilters[filter] ? "contained" : "outlined"}
                color="primary"
                size="small"
                onClick={() => handleFeaturesFilterChange(filter)}
                style={{ margin: "2px" }}
              >
                {filter.charAt(0).toUpperCase() + filter.slice(1)}
              </Button>
            ))}
          </Box>
          <Box>
            <Grid container spacing={2} xs={12}>
              {loading ? (
                <Grid
                  item
                  xs={12}
                  style={{ textAlign: "center", marginTop: "20px" }}
                >
                  <CircularProgress />
                </Grid>
              ) : (
                paginatedProperties &&
                paginatedProperties.map((data, i) => (
                  <Grid item xs={12} sm={6} md={4} lg={3} key={i}>
                    <FilterItem
                      style={{
                        backgroundColor: "white",
                        height: "260px",
                        padding: "20px",
                      }}
                      onClick={() => {
                        navigate(`/property-details/${data._id}`, {
                          state: { data },
                        });
                      }}
                    >
                      <img
                        // src={data.imageUrl[0]}
                        src={
                          isHttpUrl(data.imageUrl[0])
                            ? data.imageUrl[0]
                            : require(`../../assets/${data.imageUrl[0]}`)
                        }
                        alt="hotel"
                        style={{
                          width: "100%",
                          height: "160px",
                          objectFit: "cover",
                          borderRadius: "12px",
                        }}
                      />
                      <StatText
                        style={{ fontSize: "20px", padding: "0px 8px" }}
                      >
                        {data.address_line1}, {data.location}
                      </StatText>
                      <StatText
                        style={{ fontSize: "13px", padding: "0px 8px" }}
                      >
                        {data.description}
                      </StatText>
                      <StatText
                        style={{ color: "#879AAD", padding: "0px 8px", textAlign: "right"}}
                      >
                        {data.price}/ per month
                      </StatText>
                    </FilterItem>
                  </Grid>
                ))
              )}
            </Grid>
          </Box>
        </Container>
        <Grid
          item
          xs={12}
          style={{
            textAlign: "center",
            marginTop: "50px",
            display: "flex",
            justifyContent: "right",
            padding: "0 24px",
          }}
        >
          {properties && (
            <Pagination
              count={Math.ceil(properties.length / pageSize)}
              page={page}
              onChange={handlePageChange}
              color="primary"
            />
          )}
        </Grid>
        <ToastContainer />
      </Box>
    </div>
  );
};

export default Home;
