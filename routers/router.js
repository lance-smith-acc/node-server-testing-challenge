const bcrypt = require("bcryptjs");
const jwt = require('jsonwebtoken');
const router = require('express').Router();
const restricted = require('../middleware/restricted-middleware')
const Users = require('../users/users-model.js');


router.get('/users', (req, res) => {
  Users.find()
    .then(users => {
      console.log(req.session)
      res.status(200).json(users);
    })
    .catch(err => {
      res.status(500).json(err)
    });
});

router.post('/register', (req, res) => {
  let user = req.body;
  const hash = bcrypt.hashSync(user.password, 8)
  user.password = hash;

  Users.add(user)
    .then(saved => {
      const token = generateToken(saved);

      res.status(201).json({ message: `Welcome ${saved.username}, have a token!`, token, });
    })
    .catch(error => {
      res.status(500).json(error);
    });
});

router.post('/login', (req, res) => {
  let { username, password } = req.body;

  Users.findBy({ username })
    .first()
    .then(user => {
      if (user && bcrypt.compareSync(password, user.password)) {
        const token = generateToken(user);

        res.status(200).json({ message: `Welcome ${user.username}, have a token!`, token, });
      } else {
        res.status(401).json({ message: 'Invalid Credentials' });
      }
    })
    .catch(error => {
      res.status(500).json(error);
    });
});

router.get('/logout', (req, res) => {
  if(req.session){
    req.session.destroy(err => {
      if (err) {
        res.status(500).json({error: "unable to logout"})
      }
      else {
        res.status(200).json({message: "Logged out successfully"})
      }
    })
  }
  else {
    res.status(200).json({error: "No session found"})
  }

});


function generateToken(user) {
  const payload = {
    username: user.username
  };

  const secrets = require('../secrets')

  const options = {
    expiresIn: '1d'
  };

  return jwt.sign(payload, secrets.jwtSecret, options); 
}

module.exports = router;
