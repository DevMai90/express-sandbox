// Bring in moment
const moment = require('moment');

// Middleware function takes in three parameters
// next is called last so that we can move onto the next middleware function in the stack
// Everytime we make a request, this middleware will run
const logger = (req, res, next) => {
  console.log(
    `${req.protocol}://${req.get('host')}${
      // originalUrl includes port
      req.originalUrl
    }: ${moment().format()}`
  );
  next();
};

module.exports = logger;
