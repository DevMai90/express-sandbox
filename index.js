// Bring in express
const express = require('express');
// Bring in path module (it's a node module!!!)
const path = require('path');

// Bring in middleware
const logger = require('./middleware/logger');

// Initialize a variable with express
const app = express();

// Initialize the custom middleware
// app.use(logger);

/*
// Create a route - When we go to a webpage, it's a GET request
// Takes in a request and response - Every route will have access to these two objects
app.get('/', (req, res) => {
  // res has this method. Sends something to the browser. Not used too much
  // res.send('<h1>Hello World!!</h1>');

  // Transfer a file from the given path
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});
This method is not very useful because it is very specific. We need it to be dynamic
*/

// Set static FOLDER - Express allows us to create a static server that just serves html, css, images, etc.
// .use() is a method we use when we need middleware
app.use(express.static(path.join(__dirname, 'public')));

// We're using the routes right here. Already specifying /api/members
app.use('/api/members', require('./routes/api/members'));

// Look for environment variable called port
const PORT = process.env.PORT || 5000;

// Listen on a port to run server - Can add callback as second parameter
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
