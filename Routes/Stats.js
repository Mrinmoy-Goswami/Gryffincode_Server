const router = require("express").Router()
const {getHouseDetails} = require('../Controllers/HouseStats')

router.get('/houseDetails',getHouseDetails)

module.exports = router