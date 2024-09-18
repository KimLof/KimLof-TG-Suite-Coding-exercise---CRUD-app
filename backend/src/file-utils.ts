import * as fs from 'fs';
import * as path from 'path';

// Tiedoston polku
const dataFilePath = path.join(__dirname, '../data.json');

// vakio data
const defaultData = {
  users: [],
  events: []
};

// Tarkistaa onko tiedostoa ja lisää jos ei ole
export const checkAndCreateDataFile = () => {
  try {
    if (!fs.existsSync(dataFilePath)) {
      console.log('Data file not found. Creating default data file...');
      fs.writeFileSync(dataFilePath, JSON.stringify(defaultData, null, 2), 'utf8');
      console.log('Data file created with default content.');
    } else {
      console.log('Data file already exists.');
    }
  } catch (error) {
    console.error('Error creating data file:', error);
  }
};
