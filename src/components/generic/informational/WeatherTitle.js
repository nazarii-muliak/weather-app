import React from "react";
import PropTypes from "prop-types";
import "../generic.css";

const WeatherInfo = ({weatherDTO}) => {
  const getWeatherString = (cloudiness, temperature, humidity) => {
    console.log(cloudiness, temperature, humidity)
    if (cloudiness >= 75 && temperature < 0) {
      return "Possible snow";
    } else if (cloudiness >= 50 && temperature < 10 && humidity >= 80) {
      return "Possible rain";
    } else if (cloudiness >= 50 && temperature < 20 && humidity >= 70) {
      return "Partly Cloudy";
    } else if (cloudiness >= 25 && temperature < 30 && humidity >= 50) { //TODO rewrite prediction
      return "Mostly Clear";
    } else if (cloudiness >= 60) {
      return "Cloudy";
    } else {
      return "Clear sky";
    }
  };

  return <div className="info-title">{getWeatherString(weatherDTO.cloud_pct, weatherDTO.temp, weatherDTO.humidity)}</div>;
};

WeatherInfo.propTypes = {};

export default WeatherInfo;
