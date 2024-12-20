// const jwt = require('jsonwebtoken');

// const createTokenAndSaveCookie = (userId, res) => {
//   const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
//     expiresIn: "10d",
//   });
//   res.cookie("jwt", token, {
//     httpOnly: true, // xss
//     // secure: true,
//     credentials: true,
//     secure: false, 
//     sameSite: "strict", // csrf
//   });
// };
// module.exports= createTokenAndSaveCookie;


const jwt = require('jsonwebtoken');

const createTokenAndSaveCookie = (userId, res) => {
  const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
    expiresIn: "10d", // Token validity for 10 days
  });

  res.cookie("jwt", token, {
    httpOnly: true, // Prevent XSS attacks
    secure: process.env.NODE_ENV === "production", // Use HTTPS in production
    sameSite: "strict", // Prevent CSRF attacks
    maxAge: 10 * 24 * 60 * 60 * 1000, // Cookie expiry in milliseconds (10 days)
  });
};

module.exports = createTokenAndSaveCookie;
