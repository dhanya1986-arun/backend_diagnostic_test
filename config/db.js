
const fs = require('fs');
console.log("Checking if .env exists:", fs.existsSync('.env'));  // should print true
require('dotenv').config();