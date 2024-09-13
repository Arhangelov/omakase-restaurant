const router = require('express').Router();

const homeController = require("./controllers/homeController");
const userAuthController = require("./controllers/userAuthController");
const createSushiController = require("./controllers/sushiCreateController");
const sushiMenuController = require("./controllers/sushiMenuController");
const sushiCartController = require("./controllers/sushiCartController");
const profileController = require("./controllers/userProfileController");

router.use("/", homeController);
router.use("/auth", userAuthController);
router.use("/createSushi", createSushiController);
router.use("/menu", sushiMenuController);
router.use("/cart", sushiCartController);
router.use("/profile", profileController);

module.exports = router;