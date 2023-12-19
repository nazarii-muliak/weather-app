import React from "react";
import PropTypes from "prop-types";
import { WeatherService } from "../../services/WeatherService";
import { WeatherDTO } from "../../models/WeatherDTO";
import { CityDTO } from "../../models/CityDTO";
import { useState, useEffect } from "react";
import { ImageService } from "../../services/ImageService";
import { CityService } from "../../services/CityService";
import { apiUrlList } from "../../api/UrlList";
import "bulma/css/bulma.min.css";
import { Tile, Section, Box } from "react-bulma-components";
import Loader from "../modals/Loader/Loader";
import "./canvas.css";
import SearchField from "../generic/search/SearchField";
import CurrentTemp from "../generic/temperature/CurrentTemp";
import TempChart from "../generic/temperature/TempChart";
import WeatherInfo from "../generic/informational/WeatherTitle";
import DateAlias from "../generic/informational/DateAlias";
import DescAlias from "../generic/informational/DescAlias";
import CitiesTempGraph from "../generic/informational/CitiesTempGraph";

const Canvas = () => {
  const weatherService = WeatherService;
  const imageService = ImageService;
  const cityService = CityService;
  let [cityDTO, setCity] = useState(new CityDTO());
  let [urlSrc, setUrl] = useState("http://via.placeholder.com/1080x720");
  let [weatherDTO, setWeather] = useState(new WeatherDTO());
  let [citiesTempInfo, setTempInfo] = useState([]);
  let [tempDeviationInfo, setTempDeviation] = useState([]);
  let [loaded, setLoaded] = useState(false);

  const graphSize = {
    width: 500,
    height: 400,
  };

  useEffect(() => {
    console.log(apiUrlList)
    weatherService.getWeatherInfo(apiUrlList.weatherUrl, setWeather);
    weatherService.getCitiesInfo(apiUrlList.cititesWeatherURL, setTempInfo);
    weatherService.getTempDeviation(apiUrlList.tempDeviationURL, setTempDeviation);

    const width = 1080;
    const height = 720;
    const imageUrl = `https://api.api-ninjas.com/v1/randomimage?category=nature&width=${width}&height=${height}`;
    imageService.getBackgroundImage(imageUrl, setUrl, setLoaded);
    getLocation();
  }, []);

  const getLocation = () => {
    navigator.geolocation.getCurrentPosition((position) => {
      cityService.getCityBycoordinates(
        position.coords.latitude,
        position.coords.longitude,
        Math.round(position.coords.accuracy / 1000),
        setCity
      );
      console.log(cityDTO);
    });
  };

  return (
    <Section>
      {!loaded ? (
        <Loader />
      ) : (
        <Box>
          <Tile kind="ancestor">
            <Tile
              kind="parent"
              style={{
                background: `radial-gradient(ellipse at center, rgba(0,0,0,0) 0%, rgba(0,0,0,1) 100%), url(${urlSrc}) center center`,
                backgroundSize: "cover",
                width: 720,
                height: 1024,
              }}
            >
              <Tile kind="child">
                <Tile kind="parent">
                  <SearchField setWeather={setWeather} setCity={setCity}></SearchField>
                </Tile>
                <Tile kind="parent">
                  <CurrentTemp weatherDTO={weatherDTO}></CurrentTemp>
                </Tile>
                <Tile kind="parent">
                  <TempChart tempDeviationInfo={tempDeviationInfo}></TempChart>
                </Tile>
              </Tile>
              <Tile kind="child">
                <Tile kind="parent"></Tile>
                <Tile kind="parent">
                  <div>
                    <h1>Weather forecast</h1>
                  </div>
                </Tile>
                <Tile kind="parent">
                  <WeatherInfo weatherDTO={weatherDTO}></WeatherInfo>
                </Tile>
                <Tile kind="parent">
                  <DateAlias cityDTO={cityDTO}></DateAlias>
                </Tile>
                <Tile kind="parent">
                  <DescAlias
                    temp={weatherDTO.feels_like}
                    rise={weatherDTO.sunrise}
                    set={weatherDTO.susnet}
                  ></DescAlias>
                </Tile>
                <Tile>
                  <CitiesTempGraph tempInfo={citiesTempInfo}></CitiesTempGraph>
                </Tile>
              </Tile>
              <Tile kind="child"></Tile>
            </Tile>
          </Tile>
        </Box>
      )}
    </Section>
  );
};

// Canvas.propTypes = {
//   imageSource: PropTypes.string,
// };

export default Canvas;
