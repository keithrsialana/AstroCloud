import { Router, type Request, type Response } from 'express';
const router = Router();

import WeatherService from '../../service/weatherService.js';
import HistoryService from '../../service/historyService.js';
// set weatherservice stuff
WeatherService.baseURL = process.env.API_BASE_URL;
WeatherService.apiKey = process.env.API_KEY;

// POST Request with city name to retrieve weather data
// localhost:3001/api/weather/
router.post('/', async (req: Request, res: Response) => {
  // GET weather data from city name
  let weatherArray: any[] = [];
  try { weatherArray = await WeatherService.getWeatherForCity(req.body.cityName); } catch (err) {
    res.status(404).send('Somesthing went wrong with trying to get weather information.')
  }

  // save city to search history
  const cityHistory = await HistoryService.getCities();
  if (cityHistory) {
    const foundCity = await cityHistory.find((element) => element.name === weatherArray[0].city)
    // if the city doesn't exist, add it to the database
    if (!foundCity)
      await HistoryService.addCity(weatherArray[0].city);
  } else {
    // if the array is empty, add the first city
    await HistoryService.addCity(weatherArray[0].city);
  }
  // return REST response
  res.send(weatherArray);
});

// GET search history
// localhost:3001/api/weather/history
router.get('/history', async (_req: Request, res: Response) => {
  const cities = await HistoryService.getCities();
  res.send(cities);
});

// DELETE city from search history
// localhost:3001/api/weather/history/:id
router.delete('/history/:id', async (req: Request, res: Response) => {
  let response = HistoryService.removeCity(req.params.id);

  res.send(response);
});

export default router;
