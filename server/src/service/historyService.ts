import fs from 'fs';
import {v4 as uuid} from 'uuid';
// Define a City class with name and id properties
class City {
  id:string;
  name:string;

  constructor(name:string){
    this.id = uuid();
    this.name = name;
  }
}
// Complete the HistoryService class
class HistoryService {
  dbSearchHistory!:City[];
  // Define a read method that reads from the searchHistory.json file
  private async read() {
    try {
      await fs.readFile(`${process.env.SEARCH_HISTORY_LOCATION}`, 'utf-8', async(_err, data) => {
        if (data) {
          const fileData:any = JSON.parse(data); // if any, data should already be an array
          const dbSearchHistory:City[] = fileData.cities; // create array of cities, assign with data from file
          this.dbSearchHistory = dbSearchHistory; // reassign dbSearchHistory class property
          console.log('[SUCCESS] searchHistory.json was successfully read'); // log read success
        }else if (_err) {
          console.log(`searchHistory.json does not exist, creating...`);
          await this.write(this.dbSearchHistory);
          console.log(`searchHistory.json was created`);
        }
      });
    }catch(err){
      console.error(`[ERROR] Something went wrong: ${err}`);
    }
  }
  // Define a write method that writes the updated cities array to the searchHistory.json file
  private async write(cities: City[]) {
    try{
      this.dbSearchHistory = cities; // updates the dbSearchHistory class property
      // convert to JSON object with cities array
      let jsonOut = {
        cities: this.dbSearchHistory
      }
      // update the file using writeFile()
      await fs.writeFile(`${process.env.SEARCH_HISTORY_LOCATION}`, JSON.stringify(jsonOut), (err) =>{
        if (err)
          throw new Error(`Could not write to file`);
      });
    }catch(err){
      console.error(`[ERROR] Something went wrong: ${err}`);
    }
  }
  // Define a getCities method that reads the cities from the searchHistory.json file and returns them as an array of City objects
  async getCities() {
    await this.read();
    return this.dbSearchHistory;
  }
  // Define an addCity method that adds a city to the searchHistory.json file
  async addCity(city: string) {
    const newCity = new City(city);
    if (!this.dbSearchHistory)
        this.dbSearchHistory = [];
    this.dbSearchHistory.push(newCity);

    await this.write(this.dbSearchHistory);
  }
  // * BONUS Define a removeCity method that removes a city from the searchHistory.json file
  async removeCity(id: string) {
    try{
      this.read();
      const newDbSearchHistory = this.dbSearchHistory.filter((dbCity)=>dbCity.id != id); 
      // validation that it was deleted
      let confirmed = true;
      newDbSearchHistory.forEach(city => {
        if (city.id === id)
          confirmed = false;
      });
      if (!confirmed)
        throw new Error(`Removing city of id: ${id} was unsuccessful`);
      // if successful, update searchHistory.json and class property 
      this.write(newDbSearchHistory);
      this.read();
    }catch(err){
      if (err)
        console.error(`[ERROR] Something went wrong: ${err}`);
    }

  }
}

export default new HistoryService();
