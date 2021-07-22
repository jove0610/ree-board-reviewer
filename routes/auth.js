const express = require('express');
const { check, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const bouncer = require('express-bouncer')(10000, 10000, 3);

const auth = require('../middleware/auth');

const User = require('../models/user');

require('dotenv').config();

const router = express.Router();

bouncer.blocked = function blocked(req, res, next, remaining) {
  res.status(400).json({
    errors: [
      { msg: `Try again after ${Math.floor(remaining / 1000)} seconds` },
    ],
  });
};

// Login user
router.post(
  '/',
  [
    bouncer.block,
    [
      check('username', 'Username is required.').not().isEmpty(),
      check('password', 'Password is required').exists(),
    ],
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { username, password } = req.body;

    try {
      const user = await User.findOne({ username });
      if (!user) {
        return res
          .status(400)
          .json({ errors: [{ msg: 'Invalid Credentials' }] });
      }

      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res
          .status(400)
          .json({ errors: [{ msg: 'Invalid Credentials' }] });
      }

      jwt.sign(
        {
          user: {
            id: user.id,
          },
        },
        process.env.JWT_SECRET,
        { expiresIn: 3600 },
        (err, token) => {
          if (err) throw err;
          res.json({ token });
        }
      );
    } catch (err) {
      res.status(500).send('Server Error');
    }
  }
);

// Authenticate user for validation
router.get('/', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    res.json(user);
  } catch (err) {
    res.status(500).send('Server Error');
  }
});

module.exports = router;
