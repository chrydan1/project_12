const router = require("express").Router();

const clothingItemRouter = require("./clothingitem");
const usersRouter = require("./users"); 

router.use("/items", clothingItemRouter);
router.use("/users", usersRouter); 

module.exports = router;