const UserModel = require("../model/UserModel");
const jwt = require("jsonwebtoken");

const getUserDetailsFromToken = async (token) => {
  if (!token) {
    return {
      message: "Session out",
      logout: true,
    };
  }

  try {
    // Xác minh và giải mã token
    const decoded = await jwt.verify(token, process.env.JWT_SECRET_KEY);

    // Tìm người dùng từ ID đã giải mã
    const user = await UserModel.findById(decoded.id).select("-password");

    // Nếu người dùng không tồn tại
    if (!user) {
      return {
        message: "User not found",
        logout: true,
      };
    }

    return user;
  } catch (error) {
    if (error.name === "TokenExpiredError") {
      return {
        message: "Token expired",
        logout: true,
      };
    } else if (error.name === "JsonWebTokenError") {
      return {
        message: "Invalid token",
        logout: true,
      };
    } else {
      return {
        message: "An error occurred",
        logout: true,
      };
    }
  }
};

module.exports = getUserDetailsFromToken;
