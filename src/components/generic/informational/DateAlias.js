import React from "react";
import PropTypes from "prop-types";
import { BsCloudDrizzle } from "react-icons/bs";

const DateAlias = ({cityDTO}) => {
  let currentDate = new Date().toLocaleDateString();
  let currentTime = new Date().toLocaleTimeString();

  return (
    <div className="date-alias">
      <BsCloudDrizzle></BsCloudDrizzle> {cityDTO.country}, {cityDTO.name},{" "}
      {currentDate}, {currentTime}
    </div>
  );
};

DateAlias.propTypes = {};

export default DateAlias;
