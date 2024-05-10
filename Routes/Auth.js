const router = require('express').Router();
const {registerUser, loginUser , assignHouse,userDetails} = require('../Controllers/userController')

const bcrypt = require('bcrypt');
const { protect } = require('../Middleware/authMiddleware');

router.post("/register",registerUser),
router.post('/login',loginUser)
router.post('/houseSorting',assignHouse)
router.post('/userQuests',userDetails)

module.exports = router