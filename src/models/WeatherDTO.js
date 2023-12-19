export class WeatherDTO {
  date = new Date();
  temp;
  min_temp;
  feels_like;
  max_temp;
  cloud_pct;
  humidity;
  windSpeed;
  windDegrees;
  susnet;
  sunrise;

  constructor(
    temp,
    min_temp,
    feels_like,
    max_temp,
    cloud_pct,
    humidity,
    windDegrees,
    windSpeed,
    susnet,
    sunrise
  ) {
    this.date = new Date(Date.now()).toISOString();
    this.temp = temp;
    this.min_temp = min_temp;
    this.feels_like = feels_like;
    this.max_temp = max_temp;
    this.cloud_pct = cloud_pct;
    this.humidity = humidity;
    this.windDegrees = windDegrees;
    this.windSpeed = windSpeed;
    this.susnet = susnet;
    this.sunrise = sunrise;
  }
}
