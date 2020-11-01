/* eslint-disable consistent-return */
/* eslint-disable no-shadow */
/* eslint-disable no-unused-vars */
/* eslint-disable no-console */
const express = require('express');

const router = express.Router();
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { JWT_SECRET } = require('../keys');

const User = mongoose.model('User');
const requireLogin = require('../middleware/requireLogin');

router.get('/protected', requireLogin,(req, res) => {
  res.send('hello user');
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
      bcrypt.hash(password, 12)
        .then((hashedpassword) => {
          const user = new User({
            email,
            password: hashedpassword,
            name,
          });

          user.save()
            .then((user) => {
              res.json({ message: 'Saved succesfully' });
            })
            .catch((err) => {
              console.log(err);
            });
        });
    })
    .catch((err) => {
      console.log(err);
    });
});

router.post('/signin', (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    res.status(422).json({ error: 'please add email or password' });
  }
  User.findOne({ email })
    .then((savedUser) => {
      if (!savedUser) {
        return res.status(422).json({ error: 'Invalid email or password' });
      }
      bcrypt.compare(password, savedUser.password)
        .then((doMatch) => {
          if (doMatch) {
            // res.json({ message: 'Succesfuly signed in' });
            const token = jwt.sign({ _id: savedUser._id }, JWT_SECRET);
            res.json({ token });
          } else {
            return res.status(422).json({ error: 'Invalid email or password' });
          }
        })
        .catch((err) => {
          console.log(err);
        });
    });
});

module.exports = router;
