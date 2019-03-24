const express = require('express');
const router = express.Router();
// Bring in members
const members = require('../../Members');
const uuid = require('uuid');

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

// Create member. Whenever we send data, it is in the request object.
router.post('/', (req, res) => {
  const newMember = {
    id: uuid.v4(),
    name: req.body.name,
    email: req.body.email,
    status: 'active'
  };
  if (!newMember.name || !newMember.email) {
    return res.status(400).json({ msg: 'Please included a name and email' });
  }

  members.push(newMember);

  res.json(members);
});

module.exports = router;
