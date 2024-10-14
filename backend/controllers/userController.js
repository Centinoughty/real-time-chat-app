const User = require("../models/UserModel");

module.exports.getUserInfo = async (req, res) => {
  try {
    const _id = req.user._id;

    // checks if user exists
    const user = await User.findById(_id);
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User doesn't exist" });
    }

    res.status(200).json({
      success: true,
      message: "User fetched succesfully",
      user: {
        firstName: user.profile.firstName,
        lastName: user.profile.lastName,
        avatar: user.profile.avatar,
        email: user.email,
      },
    });
  } catch (error) {
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};
