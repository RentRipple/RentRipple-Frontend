import React from "react";
import { useLocation } from 'react-router-dom';

const PropertyDetails = () => {
  const location = useLocation();
  const { data } = location.state;
  console.log(data._id, "data")
  return (
  <div>
    PropertyDetails

  </div>
  )
};

export default PropertyDetails;
