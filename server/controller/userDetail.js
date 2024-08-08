const getUserDetailsFromToken = require("../helpers/getUserDetailsFromToken");

async function userDetails(request, response) {
  try {
    const token = request.cookies.token || "";

    if (!token) {
      return response.status(401).json({ message: "No token provided", error: true });
    }

    const user = await getUserDetailsFromToken(token);

    if (user.logout) {
      return response.status(401).json({ message: user.message, error: true });
    }

    return response.status(200).json({ message: "User details", data: user });
  } catch (error) {
    return response.status(500).json({
      message: error.message || "Internal server error",
      error: true,
    });
  }
}

module.exports = userDetails;
