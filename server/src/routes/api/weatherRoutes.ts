import { Router, type Request, type Response } from 'express';
const router = Router();

// remove later
import dotenv from 'dotenv';
dotenv.config();
console.log(process.env.API_BASE_URL);
console.log(process.env.API_KEY);

// import HistoryService from '../../service/historyService.js';
// import WeatherService from '../../service/weatherService.js';

// TODO: POST Request with city name to retrieve weather data
router.post('/', (_req: Request, _res: Response) => {
  // TODO: GET weather data from city name
  console.log(_req.params);
  // TODO: save city to search history
});

// TODO: GET search history
router.get('/history', async (_req: Request, _res: Response) => {
  console.log('history ayylmao');
});

// * BONUS TODO: DELETE city from search history
router.delete('/history/:id', async (req: Request, _res: Response) => {
  console.log(req.params.id);
});

export default router;
