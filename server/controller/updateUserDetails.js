const getUserDetailsFromToken = require("../helpers/getUserDetailsFromToken");
const UserModel = require("../model/UserModel");

async function updateUserDetails(request, response) {
  try {
    const token = request.cookies.token || "";
    const user = await getUserDetailsFromToken(token);

    const { name, profile_pic } = request.body;

    const updateUser = await UserModel.updateOne({ _id: user._id }, { name, profile_pic });

    if (updateUser.nModified === 0) {
      return response.status(400).json({
        message: "No changes made to the user details.",
        success: false,
      });
    }

    const userInformation = await UserModel.findById(user._id);

    return response.json({
      message: "User updated successfully",
      data: userInformation,
      success: true,
    });
  } catch (error) {
    console.error("Error updating user details:", error);
    return response.status(500).json({
      message: "Failed to update user details.",
      error: error.message || error,
      success: false,
    });
  }
}

module.exports = updateUserDetails;
