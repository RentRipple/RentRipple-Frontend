import React from "react";
import { useParams } from "react-router-dom";

const PropertyDetails = () => {
  const { id } = useParams()

  console.log(id);

  return (
  <div>
    PropertyDetails

  </div>
  )
};

export default PropertyDetails;
