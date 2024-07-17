import React, { createContext, useState } from "react";
import PropTypes from 'prop-types';
import { callApiWithRefresh } from "../helpers/api";

const PropertyContext = createContext();

const PropertyContextProvider = ({ children }) => {
  const [properties, setProperties] = useState(null);
  const [propertyDetails, setPropertyDetails] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [userReviews, setUserReviews] = useState([]);
  const [allReviews, setAllReviews] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const addProperty = async (propertyData) => {
    try {
      setLoading(true);
      const response = await callApiWithRefresh(
        "api/property/add-property",
        "post",
        propertyData
      );
      return response.data;
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  const fetchProperties = async () => {
    try {
      setLoading(true);
      const response = await callApiWithRefresh(
        `api/property/get-properties`, 
        "get"
      );
      setProperties(response.data.properties || []);
      console.log(properties,"properties")
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  const fetchPropertyById = async (propertyId) => {
    try {
      setLoading(true);
      const response = await callApiWithRefresh(
        `api/property/get-properties/${propertyId}`,
        "get"
      );
      setPropertyDetails(response.data);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  const updateProperty = async (propertyId, updateData) => {
    try {
      setLoading(true);
      const response = await callApiWithRefresh(
        `api/property/update-property/${propertyId}`,
        "put",
        updateData
      );
      return response.data;
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  const uploadImagesToproperty = async (propertyId, images) => {
    try {
      setLoading(true);
      const url = `api/property/add-property-images/${propertyId}`;
      const form = new FormData();
      images.forEach((image) => {
        form.append('images', image);
      });

      const response = await callApiWithRefresh(url, "post", form);
      return response;

    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  const addReview = async (reviewData) => {
    try {
      setLoading(true);
      const response = await callApiWithRefresh(
        "api/reviews/add-review",
        "post",
        reviewData
      );
      return response.data;
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  const fetchReviewsByProperty = async (propertyId) => {
    try {
      setLoading(true);
      const response = await callApiWithRefresh(
        `api/reviews/get-reviews/${propertyId}`,
        "get"
      );
      setReviews(response.data.reviews.reverse() || []);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  const fetchUserReviews = async (userId) => {
    try {
      setLoading(true);
      const response = await callApiWithRefresh(
        `api/reviews/user-reviews/${userId}`,
        "get"
      );
      setUserReviews(response.data.reviews || []);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  const fetchAllReviews = async () => {
    try {
      setLoading(true);
      const response = await callApiWithRefresh(
        `api/reviews/get-all-reviews`,
        "get"
      );
      setAllReviews(response.data.reviews || []);
      console.log(allReviews, "allReviews");
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <PropertyContext.Provider
      value={{
        properties,
        propertyDetails,
        reviews,
        userReviews,
        allReviews,
        addProperty,
        fetchProperties,
        fetchPropertyById,
        updateProperty,
        uploadImagesToproperty,
        addReview,
        fetchReviewsByProperty,
        fetchUserReviews,
        fetchAllReviews,
        loading,
        error,
      }}
    >
      {children}
    </PropertyContext.Provider>
  );
};

PropertyContextProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export { PropertyContext, PropertyContextProvider };
