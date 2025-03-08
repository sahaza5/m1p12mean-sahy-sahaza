const jwt = require("jsonwebtoken");
const httpStatus = require("http-status-codes");

//-------------------------DESCRIPTION---------------------------//
//This function is used to verify the user by decoding the token in header authorization
//It is used to protect some route so a not logged in user for example cannot access some API call
const authentication = async (req, res, next) => {
  console.log("Authentication middleware");
  const token = req.headers.authorization;
  console.log("Token with bearer is:", token);

  if (!token || !token.startsWith("Bearer")) {
    res.status(httpStatus.BAD_REQUEST).send({ message: "Wrong token" });
  }

  const splitedToken = token.split(" ");
  const myToken = splitedToken[1];
  console.log("Token without Bearer is:", myToken);

  try {
    //Decode the token to get the user data
    //Because we have SIGNED the data during login process
    //Now we are going to verify that token if it is genuine to get the user information(in our case, we return id,username,role)
    const decoded = jwt.verify(myToken, process.env.JWT_SECRET);
    console.log(decoded);
    //In the log in, we have signed the user information, here it will return the user information, example:
    // {
    //     "id":"as123",
    //     "username":"sa",
    //     "role":"ADMIN"
    // }
    const { id, username, role } = decoded;
    //Store the data in our request
    req.user = { id, username, role };
    next();
  } catch (error) {
    res.status(httpStatus.FORBIDDEN).send({ message: "Forbidden access" });
  }
};

module.exports = { authentication };
