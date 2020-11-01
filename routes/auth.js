/* eslint-disable no-console */
const express = require('express');

const router = express.Router();
const mongoose = require('mongoose');

const User = mongoose.model('User');

router.get('/', (req, res) => {
  res.send('hello');
});

// eslint-disable-next-line consistent-return
router.post('/signup', (req, res) => {
  const { name, email, password } = req.body;
  if (!email || !password || !name) {
    console.log('err');
    return res.status(422).json({ error: 'please add all the fields' });
  }
  User.findOne({ email })
    .then((savedUser) => {
      if (savedUser) {
        return res.status(422).json({ error: 'user already exists with that email' });
      }
      const user = new User({
        email,
        password,
        name,
      });

      user.save()
        .then((user) => {
          res.json({ message: 'Saved succesfully' });
        })
        .catch((err) => {
          console.log(err);
        });
    })
    .catch((err) => {
      console.log(err);
    });
});

module.exports = router;
