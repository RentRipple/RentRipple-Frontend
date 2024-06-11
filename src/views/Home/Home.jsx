import React from "react";
import { styled } from "@mui/system";
import { Container, Grid } from "@mui/material";
import SearchBox from "../../layout/homeLayout/searchbox";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import img1 from "../../assets/Image1.svg";
import img2 from "../../assets/Image2.svg";
import img3 from "../../assets/Image3.svg";
import img4 from "../../assets/Image4.svg";
import img5 from "../../assets/Image5.svg";
import img6 from "../../assets/Image6.svg";
import img7 from "../../assets/Image7.svg";
import { useNavigate } from "react-router-dom";

const SearchBoxStyled = styled(SearchBox)({
  flexGrow: 1,
  display: "flex",
  justifyContent: "center",
});

const Item = styled(Paper)(() => ({
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
  margin: "18px 0px",
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

const CardDetails = [
  {
    id: 1,
    image: img1,
    name: "Serenity Lake House",
    price: "$600",
  },
  {
    id: 2,
    image: img2,
    name: "Urban Chic Loft",
    price: "$600",
  },
  {
    id: 3,
    image: img3,
    name: "Mountain View Cabin",
    price: "$600",
  },
  {
    id: 4,
    image: img4,
    name: "Sunlit Garden Retreat",
    price: "$600",
  },
  {
    id: 5,
    image: img5,
    name: "Cozy Beachfront Bungalow",
    price: "$600",
  },
  {
    id: 6,
    image: img6,
    name: "Historic Downtown Apartment",
    price: "$600",
  },
  {
    id: 7,
    image: img7,
    name: "Forest Whisper Cottage",
    price: "$600",
  },
  {
    id: 8,
    image: img1,
    name: "Serenity Lake House",
    price: "$600",
  },
  {
    id: 9,
    image: img2,
    name: "Urban Chic Loft",
    price: "$600",
  },
  {
    id: 10,
    image: img3,
    name: "Mountain View Cabin",
    price: "$600",
  },
  {
    id: 11,
    image: img4,
    name: "Sunlit Garden Retreat",
    price: "$600",
  },
  {
    id: 12,
    image: img5,
    name: "Cozy Beachfront Bungalow",
    price: "$600",
  },
  {
    id: 13,
    image: img6,
    name: "Historic Downtown Apartment",
    price: "$600",
  },
  {
    id: 14,
    image: img7,
    name: "Forest Whisper Cottage",
    price: "$600",
  },
];

const SearchBoxx = <SearchBoxStyled />;

const Home = () => {
  const navigate = useNavigate(); // Correct usage of useNavigate
  return (
    <div>
      <Box>
        <Container>
          <Grid item xs={12} align="center">
            {SearchBoxx}
          </Grid>
          <Grid container spacing={2} xs={12} style={{ marginTop: "10px" }}>
            {filters &&
              filters.map((data, i) => (
                <Grid item xs="auto" key={i}>
                  <Item>{data.name}</Item>
                </Grid>
              ))}
          </Grid>
          <Grid xs={12}>
            <StatText>1,000+ rentals : Sep 12 - Sep 15</StatText>
          </Grid>
          <Grid container spacing={2} xs={12}>
            {CardDetails &&
              CardDetails.map((data, i) => (
                <Grid item xs={12} sm={6} md={4} lg={3} key={i}>
                  <Item
                    style={{
                      backgroundColor: "white",
                      height: "260px",
                      padding: "10px",
                    }}
                    onClick={() => {
                      navigate("/property-details", { state: { data } }); // Correct usage of navigate
                    }}
                  >
                    <img
                      src={data.image}
                      alt="hotel"
                      style={{
                        width: "100%",
                        height: "160px",
                        objectFit: "cover",
                        borderRadius: "12px",
                      }}
                    />
                    <StatText style={{ fontSize: "16px", padding: "0px 8px" }}>
                      {data.name}
                    </StatText>
                    <StatText style={{ color: "#879AAD", padding: "0px 8px" }}>
                      {data.price}/ per month
                    </StatText>
                  </Item>
                </Grid>
              ))}
          </Grid>
        </Container>
      </Box>
    </div>
  );
};

export default Home;
