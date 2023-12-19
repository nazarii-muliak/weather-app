import React, { useState } from "react";
import PropTypes from "prop-types";
import { ValidationService } from "../../../services/ValidationService";
import { apiUrlList } from "../../../api/UrlList";
import { WeatherService } from "../../../services/WeatherService";
import { CityService } from "../../../services/CityService";
import { FiSearch } from "react-icons/fi";
import "bulma/css/bulma.min.css";
import "../generic.css";

const SearchFiled = ({ setWeather, setCity }) => {
  const validator = ValidationService;
  const weatherService = WeatherService;
  const cityService = CityService;

  let requestCity = "";

  const handleInput = (city) => {
    requestCity = city;
  };

  const handleClick = () => {
    console.log("test");
    let valid = validator.validate(requestCity);
    if (!valid) return;

    weatherService.getWeatherInfo(
      apiUrlList.apiWeatherUrl + requestCity,
      setWeather
    );

    cityService.getCityByName(requestCity, setCity);
  };

  return (
    <div className="searchfield transparent">
      <input
        type="text"
        placeholder="City"
        onChange={(e) => handleInput(e.target.value)}
      />
      <button className="search-button transparent" onClick={() => handleClick()}>
        <FiSearch className="search-icon" size="1.1rem" />
      </button>
    </div>
  );
};

SearchFiled.propTypes = {};

export default SearchFiled;
