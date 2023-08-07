const Router = require("express").Router;
const router = Router();

const { getCoins } = require("../controllers/coins");

// Routes
router.route("/topCoins").get(getCoins);

// Export router
module.exports = router;
