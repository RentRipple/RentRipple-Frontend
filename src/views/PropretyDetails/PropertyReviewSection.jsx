import React, { useEffect, useState, useContext } from "react";
import { PropertyContext } from "../../context/PropertyContext";
import { AppContext } from "../../context/AppContext";
import {
  Button,
  TextField,
  Rating,
  Grid,
  Card,
  CardContent,
  Typography,
} from "@mui/material";
import { toast } from "react-toastify";
import { styled } from "@mui/system";
import propTypes from "prop-types";

const HeadTitle = styled("div")(() => ({
  fontSize: "26px",
  paddingTop: "26px",
  paddingBottom: "12px",
}));

const ReviewFormContainer = styled("div")(() => ({
  marginTop: "20px",
  padding: "20px",
  border: "1px solid #ddd",
  borderRadius: "8px",
  backgroundColor: "#f9f9f9",
}));

const ReviewFormTitle = styled("div")(() => ({
  fontSize: "20px",
  paddingBottom: "10px",
}));

const PropertyReviewSection = ({ propertyId, isOwner }) => {
  const { fetchReviewsByProperty, addReview, reviews } =
    useContext(PropertyContext);
  const { userId } = useContext(AppContext);
  const [newReview, setNewReview] = useState({
    reviewee_property: propertyId,
    rating: 0,
    review: "",
  });

  useEffect(() => {
    fetchReviewsByProperty(propertyId);
  }, [propertyId]);

  const handleReviewChange = (e) => {
    setNewReview({
      ...newReview,
      [e.target.name]: e.target.value,
    });
  };

  const handleRatingChange = (e, value) => {
    setNewReview({
      ...newReview,
      rating: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await addReview(newReview);
    if (response) {
      toast.success("Review added successfully");
      fetchReviewsByProperty(propertyId);
      setNewReview({ reviewee_property: propertyId, rating: 0, review: "" });
    } else {
      toast.error("Failed to add review");
    }
  };

  return (
    <Grid item xs={12}>
      <HeadTitle>Reviews</HeadTitle>
      {userId && !isOwner && (
        <ReviewFormContainer>
          <form onSubmit={handleSubmit}>
            <ReviewFormTitle>Add Your Review</ReviewFormTitle>
            <div>
              <Rating
                name="rating"
                value={newReview.rating}
                onChange={handleRatingChange}
              />
            </div>
            <div>
              <TextField
                name="review"
                value={newReview.review}
                onChange={handleReviewChange}
                label="Review"
                multiline
                rows={4}
                fullWidth
                variant="outlined"
                margin="normal"
              />
            </div>
            <Button
              type="submit"
              variant="contained"
              style={{
                backgroundColor: "#04c4cc",
                color: "white",
                margin: "0 20px 0 0",
              }}
            >
              Submit
            </Button>
          </form>
        </ReviewFormContainer>
      )}
      <Grid container spacing={2} style={{ marginTop: "20px" }}>
        {reviews.map((review) => (
          <Grid item xs={12} key={review._id}>
            <Card>
              <CardContent>
                <Rating value={review.rating} readOnly />
                <Typography variant="body2" color="textSecondary" component="p">
                  {review.review}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Grid>
  );
};

PropertyReviewSection.propTypes = {
  propertyId: propTypes.number.isRequired,
  isOwner: propTypes.bool,
};

export default PropertyReviewSection;
