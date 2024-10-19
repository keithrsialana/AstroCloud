import dotenv from 'dotenv';
dotenv.config();

// Define an interface for the Coordinates object
interface Coordinates{
  id:number;
  name:string;
  coord:{
    lat:number;
    lon:number;
  };
  country:string;
  population:number;
  timezone:number;
  sunrise:number;
  sunset:number;
}
// TODO: Define a class for the Weather object
class Weather {

}
// TODO: Complete the WeatherService class
class WeatherService {
  // Define the baseURL, API key, and city name properties
  baseURL:string | undefined;
  apiKey:string | undefined;
  cityName:string;

  constructor(){
    this.baseURL = process.env.API_BASE_URL?.toString();
    this.apiKey = process.env.API_KEY?.toString();
    this.cityName = "";
  }
  
  // Create buildWeatherQuery method
  private buildWeatherQuery(coordinates: Coordinates): string {
    const params = new URLSearchParams({
      q: coordinates.name,
      appid: this.apiKey
    }.toString());
    const queryString = `${this.baseURL}${params}`;

    return queryString;
  }
  // Create fetchWeatherData method
  private async fetchWeatherData(coordinates: Coordinates) {
    try{
      fetch(this.buildWeatherQuery(coordinates))
      .then((data) => {
        // TODO: What does this do?
      });
    }catch(err){
      console.error(`[ERROR] Something went wrong: ${err}`)
    }
  }
  // TODO: Build parseCurrentWeather method
  private parseCurrentWeather(response: any) {}
  // TODO: Complete buildForecastArray method
  private buildForecastArray(currentWeather: Weather, weatherData: any[]) {}
  // TODO: Complete getWeatherForCity method
  async getWeatherForCity(city: string) {}
}

export default new WeatherService();
