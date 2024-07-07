import React, { createContext, useState } from "react";
import PropTypes from 'prop-types';
import { callApiWithRefresh } from "../helpers/api";

const PropertyContext = createContext();

const PropertyContextProvider = ({ children }) => {
  const [properties, setProperties] = useState(null);
  const [property, setProperty] = useState([]);
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
      setProperties((prevProperties) => [...prevProperties, response.data]);
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
      setProperty(response.data);
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
        property,
        addProperty,
        fetchProperties,
        fetchPropertyById,
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
