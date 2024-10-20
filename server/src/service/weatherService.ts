import dotenv from 'dotenv';
import { v4 as uuid } from 'uuid';
dotenv.config();

// Define an interface for the Coordinates object
interface Coordinates{
  id:string;
  city:string;
  country:string;
}
// Define a class for the Weather object
class Weather implements Coordinates{
  id: string;
  city:string;
  country!: string;
  date!: string;
  icon!: string;
  iconDescription!: string;
  tempF!: number;
  windSpeed!: number;
  humidity!: number;

  constructor(city:string){
    this.city = city;
    this.id = uuid();
  }
}
// Complete the WeatherService class
class WeatherService {
  // Define the baseURL, API key, and city name properties
  baseURL:string | undefined;
  apiKey:string | undefined;
  cityName:string = "";
  
  // Create buildWeatherQuery method
  private buildWeatherQuery(coordinates: Coordinates) {
    const params:string = `weather?q=${coordinates.city}&appid=${this.apiKey}`;
    const queryString:string = `${this.baseURL}${params}`;
    return queryString;
  }
  private buildForecastQuery(coordinates: Coordinates) {
    const params:string = `forecast?q=${coordinates.city}&appid=${this.apiKey}`;
    const queryString:string = `${this.baseURL}${params}`;
    return queryString;
  }
  // Create fetchWeatherData method
  private async fetchWeatherData(coordinates: Coordinates) {
    try{
      const response = await fetch(this.buildWeatherQuery(coordinates));
      if (response.ok){
        const data = await response.json();
        return data;
      }else{throw new Error('Could not get weather data from OpenWeatherMap API');}
    }catch(err){
      console.error(`[ERROR] Something went wrong: ${err}`)
      return null;
    }
  }
  private async fetchForecastData(coordinates: Coordinates) {
    try{
      const response = await fetch(this.buildForecastQuery(coordinates));
      if (response.ok){
        const data = await response.json();
        return data;
      }else{throw new Error('Could not get forecast data from OpenWeatherMap API');}
    }catch(err){
      console.error(`[ERROR] Something went wrong: ${err}`)
      return null;
    }
  }
  private convertToFahrenheit(kelv:number):number{
    return (kelv - 273.15) * 9/5 + 32;
  }
  private convertToMPH(speed:number):number{
    return speed * 2.23694;
  }
  private parseCurrentWeather(response:any): Weather{
    let currentWeather = new Weather(response.name);
    currentWeather.country = response.sys.country;
    currentWeather.date = (new Date(response.dt*1000)).toLocaleDateString('en-US');
    currentWeather.icon = response.weather[0].icon;
    currentWeather.iconDescription = response.weather[0].description;
    currentWeather.tempF = parseFloat((this.convertToFahrenheit(response.main.temp)).toFixed(2));
    currentWeather.windSpeed = parseFloat((this.convertToMPH(response.wind.speed)).toFixed(2));
    currentWeather.humidity = response.main.humidity;

    return currentWeather;
  }
  // Complete buildForecastArray method
  private buildForecastArray(currentWeather: Weather, weatherData: any) {
    // weatherData is unfiltered request data
    let weatherArray:Weather[] = [];
    weatherData.list.forEach((weatherObj:any) => {
      // splits the date and time
      // data dateTime string: yyyy/mm/dd HH:mm:ss
      const dateTime:string[] = (weatherObj.dt_txt).split(' ');

      // reformat date 2024-10-19 to MM/dd/yyyy
      // [0]=year [1]=month [2]=day
      const dataDate:string[] = dateTime[0].split('-');
      const newDate:string = `${dataDate[1]}/${dataDate[2]}/${dataDate[0]}`;
      const today:string = (new Date()).toLocaleDateString('en-US');

      // checks if it's a noon weather object, not the same as today, and if the array is less than 5
      if (dateTime[1] == '12:00:00' && newDate !== today && weatherArray.length < 5){
        //make weather object
        let newWeather = new Weather(currentWeather.city);
        newWeather.city = weatherData.city.name;
        newWeather.country = weatherData.city.country;
        newWeather.date = newDate;
        newWeather.icon = weatherObj.weather[0].icon;
        newWeather.iconDescription = weatherObj.weather[0].description;
        newWeather.tempF = parseFloat((this.convertToFahrenheit(parseFloat(weatherObj.main.temp))).toFixed(2));
        newWeather.windSpeed = parseFloat((this.convertToMPH(parseFloat(weatherObj.wind.speed))).toFixed(2));
        newWeather.humidity = weatherObj.main.humidity;

        // push to array
        weatherArray.push(newWeather);
      }

    });
    // after building array, return array
    return weatherArray;
  }
  // Complete getWeatherForCity method
  async getWeatherForCity(city: string) {
    const newWeatherObj = new Weather(city); // incomplete weather object

    // get list of weather objects to return to weatherRoutes.ts
    const forecastData:any = await this.fetchForecastData(newWeatherObj); // get unfiltered response data
    const forecastList:Weather[] = await this.buildForecastArray(newWeatherObj, forecastData); // filter forecast data
    
    // get current weather data
    const weatherData:any = await this.fetchWeatherData(newWeatherObj); // get unfiltered response data
    const currentWeather:Weather = await this.parseCurrentWeather(weatherData);

    // add current weather to top of forecast weather list and add again if list is still less than 6
    while(forecastList.length < 6){
      forecastList.unshift(currentWeather);
    }

    return forecastList;
  }
}

export default new WeatherService();
