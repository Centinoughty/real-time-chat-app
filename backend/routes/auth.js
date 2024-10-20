const { registerUser, loginUser } = require("../controllers/authController");
const { getUserInfo, getAllUsers } = require("../controllers/userController");
const auth = require("../middlewares/auth");
const router = require("express").Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/get-info", auth, getUserInfo);
router.get("/get-users", auth, getAllUsers);

module.exports = router;
