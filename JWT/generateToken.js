const jwt = require('jsonwebtoken');

const createTokenAndSaveCookie = (userId, res) => {

  const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
    expiresIn: "10d",
  });
  res.cookie("jwt", token, {
    httpOnly: true,
    secure: true, // HTTPS ke liye
    sameSite: 'None', // Cross-origin ke liye zaroori
    maxAge: 24 * 60 * 60 * 1000, // 1 day
  });

};
module.exports= createTokenAndSaveCookie;




