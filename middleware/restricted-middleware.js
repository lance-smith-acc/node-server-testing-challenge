const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {

  const {authorization} = req.headers;
  const secret = require('../secrets')

  if (authorization) {
    jwt.verify(authorization, secret.jwtSecret, (err, decodedToken) => {
      if (err) {
        res.status(401).json({message: "Invalid credentials"})
      }
      else {
        req.decodedToken = decodedToken;
        next();
      }
    })
  } else {
    res.status(400).json({ message: 'No session' });
  }
};
