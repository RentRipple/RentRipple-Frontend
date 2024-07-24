import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Typography, Box, Grid, Pagination } from '@mui/material';
import { styled } from '@mui/system';
// import { useNavigate } from 'react-router-dom';

const Container = styled('div')(({ theme }) => ({
  borderRadius: theme.shape.borderRadius,
}));

const PropertyCard = styled(Box)(({ theme }) => ({
  border: `1px solid ${theme.palette.divider}`,
  borderRadius: theme.shape.borderRadius,
  backgroundColor: "#E7EDF2",
  padding: theme.spacing(2),
  marginBottom: theme.spacing(2),
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  textAlign: 'center',
}));

const PropertyImage = styled('img')({
  width: '100%',
  height: 'auto',
  maxHeight: '200px',
  marginBottom: '16px',
  borderRadius: '8px',
});

const ProfilePropertiesSection = ({ propertyDetails }) => {
//   const navigate = useNavigate();
  const [page, setPage] = useState(1);
  const propertiesPerPage = 6;
  const totalPages = Math.ceil(propertyDetails.length / propertiesPerPage);

  const handlePageChange = (event, value) => {
    setPage(value);
  };

  useEffect(() => {
    console.log(propertyDetails, "propertyDetails");
  }, [propertyDetails]);

  return (
    <Container>
      <Typography variant="h5" gutterBottom>
        My Properties
      </Typography>
      <hr />
      <Grid container spacing={2}>
        {propertyDetails
          .slice((page - 1) * propertiesPerPage, page * propertiesPerPage)
          .map((property) => {
            // const firstImageUrl = property?.imageUrl[0];
            const firstImageUrl = "1720636276215-home2.jpg";
            return (
              <Grid item xs={12} sm={6} md={4} key={property._id}>
                <PropertyCard>
                {/* <PropertyCard  onClick={() => navigate(`/property-details/${property?.id}`)}> */}
                  {firstImageUrl && (
                    <PropertyImage
                      src={require(`../../assets/${firstImageUrl}`)}
                      alt="Property"
                    />
                  )}
                  <Typography variant="body1" component="div">
                    <strong>{property.address_line1}, {property.city}</strong>
                  </Typography>
                  <Typography variant="body2" component="div">
                    Price: ${property.price}
                  </Typography>
                </PropertyCard>
              </Grid>
            );
          })}
      </Grid>
      <Box display="flex" justifyContent="center" mt={2}>
        <Pagination
          count={totalPages}
          page={page}
          onChange={handlePageChange}
          color="primary"
        />
      </Box>
    </Container>
  );
};

ProfilePropertiesSection.propTypes = {
  propertyDetails: PropTypes.arrayOf(
    PropTypes.shape({
      _id: PropTypes.string.isRequired,
      address_line1: PropTypes.string.isRequired,
      city: PropTypes.string.isRequired,
      price: PropTypes.number.isRequired,
      features: PropTypes.shape({
        images: PropTypes.arrayOf(PropTypes.string).isRequired,
      }).isRequired,
    })
  ).isRequired,
};

export default ProfilePropertiesSection;
