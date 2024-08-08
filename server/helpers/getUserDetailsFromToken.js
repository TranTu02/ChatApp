const UserModel = require("../model/UserModel");
const jwt = require("jsonwebtoken");

const getUserDetailsFromToken = async (token) => {
  if (!token) {
    return {
      message: "Session out",
      logout: true,
    };
  }

  const decoded = await jwt.verify(token, process.env.JWT_SECRET_KEY);

  const user = await UserModel.findById(decoded.id);

  return user;
};

module.exports = getUserDetailsFromToken;
