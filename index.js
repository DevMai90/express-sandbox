// Bring in express
const express = require('express');

// Initialize a variable with express
const app = express();

// Create a route - When we go to a webpage, it's a GET request
// Takes in a request and response - Every route will have access to these two objects
app.get('/', (req, res) => {
  // res has this method. Sends something to the browser
  res.send('<h1>Hello World</h1>');
});

// Look for environment variable called port
const PORT = process.env.PORT || 5000;

// Listen on a port to run server - Can add callback as second parameter
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
