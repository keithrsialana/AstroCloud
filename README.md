# AstoCloud
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
### Deployed Web Application
[https://astrocloud.onrender.com/](https://astrocloud.onrender.com/)
## Table of Contents
- [Description](#Description)
- [Pre-Requisites](#Pre-Requisites)
- [Installation](#Installation-Instructions)
- [Usage](#Usage-Instructions)
    - [Optional Usage Instructions](#Optional-Usage-Instructions)
- [Credits](#Credits)
- [Tests](#Tests)
- [License](#License)
- [Features](#Features)
- [Questions](#Questions)
## Description
This project challenge aims to get the developer familiar with using API requests to receive information to use to apply onto OOP objects, classes, etc. The initial project files include some of the back-end code to serve as an API server, and all of the client (front-end) code that serves as the main interaction point for the user. The goal for this project was to fill the missing server-side code with newly attained knowledge of API data to OOP object manipulation.

## Pre-Requisites
- You need to acquire your own API key from [OpenWeatherMap](https://openweathermap.org) after registering your account and validating your email
- After acquiring your API key, create an `.env` file in your `server` folder with the contents as:
```
API_BASE_URL=https://api.openweathermap.org/data/2.5/
API_KEY={your-api-key-here}
SEARCH_HISTORY_LOCATION=./db/searchHistory.json
```
(remember to remove the { } brackets)
## Installation Instructions
- copy the repo link from this repo's github page
- use `git clone [repo-link]` to clone the repository
- when inside the project folder, use `npm run install` to install the required dependencies
## Usage Instructions
- then run `npm run start:dev` to run both the server and the client on the same terminal
- after running, your default browser should navigate to [localhost:3000](https://localhost:3000) in a new tab
### Optional Usage Instructions
- on one terminal, start the server first with `npm run server:dev`
- on a second terminal, start the client with `npm run client:dev`
## Credits
Keith Sialana
## Tests
N/A
## License
MIT
## Features
- Acquires and displays weather data from [OpenWeatherMap API](https://openweathermap.org/api) for current weather and weather data for the next 5 days (limited to city as the search query)
    - Weather data includes: date, temperature, wind speed (miles per hour), and humidity at 12:00pm of that date
- A list on the left side of the screen that shows your previous search attempts; saved in the `./db/searchHistory.json` file after your first search
- A delete button for each search history card to delete the past search from your history database.
## Questions
- [GitHub](https://github.com/keithrsialana)
- [Email](mailto:keith.sialana@hotmail.com)
