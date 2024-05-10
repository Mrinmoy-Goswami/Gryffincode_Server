const router = require("express").Router();
const {setQuestion,getQuestion,getAllProblems} = require("../Controllers/ProblemController")
const { protect } = require("../Middleware/authMiddleware");

router.post("/postQuestion",setQuestion)
router.get('/allProblems',getAllProblems)
router.get('/:id',getQuestion)
module.exports  = router