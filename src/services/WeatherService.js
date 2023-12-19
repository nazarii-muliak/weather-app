import { WeatherDTO } from "../models/WeatherDTO";

export class WeatherService {
  static getWeatherInfo = async (url, setWeather) => {
    await fetch(url, {
      method: "GET",
      headers: {
        "X-Api-Key": "SW52mhipmbYbLc+CwwdHtw==nK0PXUiVHxoL9Hvx",
      },
      contentType: "application/json",
    })
      .then((response) => {
        console.log(response.json);
        return response.json();
      })
      .then((data) => {
        console.log(data);
        setWeather(
          new WeatherDTO(
            data.temp,
            data.min_temp,
            data.feels_like,
            data.max_temp,
            data.cloud_pct,
            data.humidity,
            data.wind_degrees,
            data.wind_speed,
            data.sunset,
            data.sunrise
          )
        );
      })
      .catch((err) => {
        console.error(err);
      });
  };

  static getCitiesInfo = async (url, setTempInfo) => {
    await fetch(url, {
      method: "GET",
      headers: {
        "X-Api-Key": "SW52mhipmbYbLc+CwwdHtw==nK0PXUiVHxoL9Hvx",
      },
      contentType: "application/json",
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        console.log(data);
        setTempInfo(data);
      });
  };

  static getTempDeviation = async (url, setTempDeviation) => {
    await fetch(url, {
      method: "GET",
      headers: {
        "X-Api-Key": "SW52mhipmbYbLc+CwwdHtw==nK0PXUiVHxoL9Hvx",
      },
      contentType: "application/json",
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        console.log(data)
        setTempDeviation(data);
      });
  };
}
