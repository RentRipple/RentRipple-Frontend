import React, { useEffect, useState } from "react";
import { styled } from "@mui/system";
import { Container, Grid } from "@mui/material";
import SearchBox from "../../layout/homeLayout/searchbox";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const SearchBoxStyled = styled(SearchBox)({
  flexGrow: 1,
  display: "flex",
  justifyContent: "center",
});

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

const filters = [
  {
    id: 1,
    name: "Entire Place",
  },
  {
    id: 2,
    name: "Private Room",
  },
  {
    id: 3,
    name: "Hotel Room",
  },
  {
    id: 4,
    name: "Shared Room",
  },
  {
    id: 5,
    name: "Free Cancellation",
  },
  {
    id: 6,
    name: "Air Conditioning",
  },
  {
    id: 7,
    name: "Pool",
  },
];


const SearchBoxx = <SearchBoxStyled />;

const Home = () => {
  const navigate = useNavigate();
  const [propertyList, setPropertyList] = useState([]);

  const getPropertyList = async () => {
    try {
      // http://localhost:8000/api/property/get-properties
      const res = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/property/get-properties`);

      if(res.status === 200)
        {
          setPropertyList(res.data.properties)
        }
      // console.log("Property List", res.data);
    } catch (error) {
      console.log("ERROR", error);
    }
  };

  useEffect(() => {
    getPropertyList();
  }, []);

  return (
    <div>
      <Box>
        <Container>
          <Grid item xs={12} align="center">
            {SearchBoxx}
          </Grid>
          <Grid container spacing={2} xs={12} style={{ marginTop: "10px" }}>
            {filters.map((data, i) => (
              <Grid item xs="auto" key={i}>
                <FilterItem>{data.name}</FilterItem>
              </Grid>
            ))}
          </Grid>
          <Grid xs={12}>
            <StatText style={{ padding: "8px 0px" }}>1,000+ rentals : Sep 12 - Sep 15</StatText>
          </Grid>
          <Grid container spacing={2} xs={12}>
          {console.log("propertyList", propertyList)}
            {propertyList &&
              propertyList?.map((data, i) => (
                <Grid item xs={12} sm={6} md={4} lg={3} key={i}>
                  <FilterItem
                    style={{
                      backgroundColor: "white",
                      height: "260px",
                      padding: "10px",
                    }}
                    onClick={() => {
                      navigate(`/property-details/${data.id}`, { state: {data} });
                    }}
                  >
                    <img
                      src={data.imageUrl[0]}
                      alt="hotel"
                      style={{
                        width: "100%",
                        height: "160px",
                        objectFit: "cover",
                        borderRadius: "12px",
                      }}
                    />
                    <StatText style={{ fontSize: "16px", padding: "0px 8px" }}>
                      {data.shortDescription}, {data.location}
                    </StatText>

                    <StatText style={{ color: "#879AAD", padding: "0px 8px" }}>
                      {data.price}/ per month
                    </StatText>
                  </FilterItem>
                </Grid>
              ))}
          </Grid>
        </Container>
      </Box>
    </div>
  );
};

export default Home;
