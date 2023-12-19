export class CityDTO {
  name;
  latitude;
  longitude;
  country;

  constructor (name, latitude, longitude, country) {
    this.name = name;
    this.latitude = latitude;
    this.longitude = longitude;
    this.country = country;
  }
}