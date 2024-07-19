import React, { useContext, useEffect } from "react";
import { Typography, Box, Grid } from "@mui/material";
import { styled } from "@mui/system";
import { ProfileContext } from "../../context/ProfileContext";
import { AppContext } from "../../context/AppContext";
import Rating from "@mui/material/Rating";

const Container = styled("div")(({ theme }) => ({
  borderRadius: theme.shape.borderRadius,
}));

const ReviewCard = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  marginBottom: theme.spacing(2),
  padding: theme.spacing(2),
  border: `1px solid ${theme.palette.divider}`,
  borderRadius: theme.shape.borderRadius,
  backgroundColor: "#E7EDF2",
}));

const ReviewImage = styled("img")({
  width: "100px",
  height: "100px",
  objectFit: "cover",
  borderRadius: "8px",
  marginRight: "16px",
});

const renderRatingStars = (rating) => {
  return <Rating name="rating-stars" value={rating} precision={0.5} readOnly />;
};

const ProfileReviewSection = () => {
  const { fetchUserReviews, userReviews } = useContext(ProfileContext);
  const { userId } = useContext(AppContext);

  useEffect(() => {
    fetchUserReviews(userId);
  }, [userId]);

  return (
    <Container>
      <Typography variant="h5" gutterBottom>
        Reviewed Properties
      </Typography>
      <hr />
      <Grid container spacing={2}>
        {userReviews.map((review) => {
          const firstImageUrl = review.property_imageUrl[0];
          return (
            <Grid item xs={12} sm={6} key={review._id}>
              <ReviewCard>
                {firstImageUrl && (
                  <ReviewImage
                    src={require(`../../assets/${firstImageUrl}`)}
                    alt="Property"
                  />
                )}
                <div>
                  <Typography variant="body1" component="div">
                    <strong>
                      {review.property_address_line1}, {review.property_state},{" "}
                      {review.property_country}
                    </strong>
                  </Typography>
                  <Typography variant="body2" component="div">
                    {renderRatingStars(review.rating) || null}
                  </Typography>
                  <Typography variant="body2" component="div">
                    {review.review}
                  </Typography>
                </div>
              </ReviewCard>
            </Grid>
          );
        })}
      </Grid>
    </Container>
  );
};

export default ProfileReviewSection;
