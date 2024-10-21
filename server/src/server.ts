import dotenv from 'dotenv';
import path from 'path';
import express from 'express';
dotenv.config();

import { fileURLToPath } from 'url';
import { dirname } from 'path';

// Get the current file's URL and convert it to a file path
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Import the routes
import routes from './routes/index.js';

const app = express();

const PORT = process.env.PORT || 3001;

// Serve static files of entire client dist folder
app.use(express.static(path.join(__dirname,'../../client/dist'))); // points the server to the dist folder
// Implement middleware for parsing JSON and urlencoded form data
app.use(express.json()); // all data will be parsed in JSON format
app.use(express.urlencoded({ extended: true })); // lets us use req.body in routes to grab data
// Implement middleware to connect the routes
app.use(routes);

// Start the server on the port
app.listen(PORT, () => console.log(`Listening on PORT: ${PORT}`));
