const express = require('express');
const router = express.Router();
// Bring in members
const members = require('../../Members');

// Return a JSON file so that we can use in react and other APIs
// Automatically returns JSON
// Do not need /api/members because it's already specified in index.js
router.get('/]', (req, res) => res.json(members));

// Get Single Member
router.get('/:id', (req, res) => {
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

module.exports = router;
