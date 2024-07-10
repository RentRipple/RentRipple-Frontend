import React, { createContext, useState } from "react";
import PropTypes from 'prop-types';
import { callApiWithRefresh } from "../helpers/api";

const PropertyContext = createContext();

const PropertyContextProvider = ({ children }) => {
  const [properties, setProperties] = useState(null);
  const [propertyDetails, setPropertyDetails] = useState(null);
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
      console.log("saved property", response.data);
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
      console.log("sdasdsa",response.data);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  const updateProperty = async (propertyId, updateData) => {
    try {
      console.log("updateData", updateData)
      setLoading(true);
      const response = await callApiWithRefresh(
        `api/property/update-property/${propertyId}`,
        "put",
        updateData
      );
      console.log("Updated property", response.data);
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

  return (
    <PropertyContext.Provider
      value={{
        properties,
        propertyDetails,
        addProperty,
        fetchProperties,
        fetchPropertyById,
        updateProperty,
        uploadImagesToproperty,
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
