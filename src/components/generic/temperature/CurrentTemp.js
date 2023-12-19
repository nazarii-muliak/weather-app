import React from "react";
import PropTypes from "prop-types";
import { Tile } from "react-bulma-components";
import { TbPlusMinus } from "react-icons/tb";

const CurrentTemp = ({ weatherDTO }) => {
  const parseDegrees = (degrees) => {
    let intDegrees = parseInt(degrees);

    if (intDegrees >= 0 && intDegrees < 22.5) return "N";
    if (intDegrees >= 22.5 && intDegrees < 67.5) return "NE";
    if (intDegrees >= 67.5 && intDegrees < 112.5) return "E";
    if (intDegrees >= 112.5 && intDegrees < 157.5) return "SE";
    if (intDegrees >= 157.5 && intDegrees < 202.5) return "S";
    if (intDegrees >= 202.5 && intDegrees < 247.5) return "SW";
    if (intDegrees >= 247.5 && intDegrees < 292.5) return "W";
    if (intDegrees >= 292.5 && intDegrees < 337.5) return "NW";
    return "N";
  };

  return (
    <div className="temp-board">
      <Tile kind="parent">
        <Tile kind="child">
          <span className="item-title">{weatherDTO.temp}°</span>
          <div className="item-aux">{weatherDTO.cloud_pct}%</div>
        </Tile>

        <div className="temp-sign">
          <TbPlusMinus></TbPlusMinus>
        </div>

        <Tile kind="child">
          <span className="item-title">
            {Math.abs(
              Math.abs(weatherDTO.temp) - Math.abs(weatherDTO.feels_like)
            )}
            °
          </span>
          <div className="wind-aux">
            Wind: {parseDegrees(weatherDTO.windDegrees)} {weatherDTO.windSpeed}
            km/h
          </div>
        </Tile>
      </Tile>
    </div>
  );
};

CurrentTemp.propTypes = {};

export default CurrentTemp;
