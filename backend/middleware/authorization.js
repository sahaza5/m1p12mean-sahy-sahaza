const httpStatus = require("http-status-codes");

//MIDDLEWARE SPECIAL FOR ADMIN AND MECHANICIEN ROLE

const authorizationResponsable = (req, res, next) => {
  console.log("Authorization for responsable middleware");
  const user = req.user;
  console.log("The user is:", req.user);
  if (user.role === "CLIENT") {
    return res
      .status(httpStatus.UNAUTHORIZED)
      .send({ message: "Unauthorized access" });
  }

  next();
};

//MIDDLEWARE SPECIAL FOR ADMIN ROLE ONLY
const authorizationAdmin = (req, res, next) => {
  console.log("Authorization for admin middleware");
  const user = req.user;
  console.log("The user is:", req.user);
  if (user.role !== "ADMIN") {
    return res
      .status(httpStatus.UNAUTHORIZED)
      .send({ message: "Unauthorized access" });
  }

  next();
};

module.exports = { authorizationResponsable, authorizationAdmin };
