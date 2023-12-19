import React from "react";
import PropTypes from "prop-types";
import { BsSunsetFill, BsSunriseFill } from "react-icons/bs";
import { Section } from "react-bulma-components";

const DescAlias = ({ temp, rise, set }) => {
  const parseTime = (time) => {
    return new Date(time * 1000).toLocaleTimeString("ua-UA");
  };

  return (
    <section>
      <div className="date-alias">
        Feels like:<span className="desc-aux">{temp}°</span>
      </div>
      <div className="date-alias">
        <span className="desc-aux">
          <BsSunriseFill></BsSunriseFill> {parseTime(rise)}
        </span>
      </div>
      <div className="date-alias">
        <span className="desc-aux">
          <BsSunsetFill></BsSunsetFill> {parseTime(set)}
        </span>
      </div>
    </section>
  );
};

DescAlias.propTypes = {};

export default DescAlias;
