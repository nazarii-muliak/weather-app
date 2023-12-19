import { CityDTO } from "../models/CityDTO";
import { WeatherDTO } from "../models/WeatherDTO";

export class CityService {
  static getCityBycoordinates = async (
    latitude,
    longitude,
    deviation,
    setCity
  ) => {
    await fetch(
      `https://api.api-ninjas.com/v1/city?min_lat=${
        latitude - deviation
      }&max_lat=${latitude + deviation}&min_lon=${
        longitude - deviation
      }&max_lon=${longitude + deviation}`,
      {
        method: "GET",
        headers: {
          "X-Api-Key": "SW52mhipmbYbLc+CwwdHtw==nK0PXUiVHxoL9Hvx",
        },
        contentType: "application/json",
      }
    )
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        console.log(data);
        setCity(
          new CityDTO(
            data[0].name,
            data[0].latitude,
            data[0].longitude,
            data[0].country
          )
        );
      });
  };

  static getCityByName = async (name, setCity) => {
    await fetch(`https://api.api-ninjas.com/v1/city?name=${name}`, {
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
        setCity(
          new CityDTO(
            data[0].name,
            data[0].latitude,
            data[0].longitude,
            data[0].country
          )
        );
      });
  };
}
