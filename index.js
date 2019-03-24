// Bring in express
const express = require('express');
// Bring in path module (it's a node module!!!)
const path = require('path');
// Bring in members
const members = require('./Members');
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

// Return a JSON file so that we can use in react and other APIs
// Automatically returns JSON
app.get('/api/members', (req, res) => res.json(members));

// Get Single Member
app.get('/api/members/:id', (req, res) => {
  // Run .some(). Returns true the moment it finds a truth value
  const found = members.some(member => member.id === parseInt(req.params.id));
  if (found) {
    // req.params.id sends the id as a string, but our array is a number!
    res.json(members.filter(member => member.id === parseInt(req.params.id)));
  } else {
    // Status 400 means bad request - Return JSON
    res.status(400).json({ msg: `No member with the id of ${req.params.id}` });
  }
});

// Set static FOLDER - Express allows us to create a static server that just serves html, css, images, etc.
// .use() is a method we use when we need middleware
app.use(express.static(path.join(__dirname, 'public')));

// Look for environment variable called port
const PORT = process.env.PORT || 5000;

// Listen on a port to run server - Can add callback as second parameter
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
