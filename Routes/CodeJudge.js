const router = require("express").Router();
const {correct} = require("../Controllers/Judge");

router.post('/submit',correct)

module.exports = router