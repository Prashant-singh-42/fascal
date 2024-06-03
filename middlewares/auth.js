const jwt = require('jsonwebtoken');
const User = require('../models/user');

const requireAuth = (req, res, next) => {
  const token = req.cookies.jwt;

  if (token) {
    jwt.verify(token, 'mysecret', async (err, decodedToken) => {
      if (err) {
        console.log(err);
        return next(err);
      } else {
        console.log(decodedToken);
        let user = await User.findById(decodedToken.id);
        if (user) {
          req.session.userId = decodedToken.id
        //   req.session.isAdmin = user.isAdmin
          req.session.username = user.username
        }
        // console.log(req.session)
        next();
      }
    });
  } else {
    const err = new Error('not Logged in')
    err.customprop = 'kyu bhai kya kar raha hai'
    next(err);
  }
};

module.exports = { requireAuth };