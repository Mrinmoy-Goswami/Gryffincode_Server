
const router = require('express').Router();
const compile = require('../Controllers/Compile');


router.get('/compile',compile);


module.exports = router