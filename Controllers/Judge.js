const asyncHandler = require('express-async-handler');
const User = require('../Models/User');
const Question = require('../Models/Question');

const correct = asyncHandler(async (req, res) => {
  const { questionId, userId } = req.body;

  try {
    // Check if user exists
    const user = await User.findOne({ _id: userId });
    if (!user) {
      return res.status(404).json("User not found");
    }

    // Check if user has already solved the question
    if (user.solvedProblems.includes(questionId)) {
      return res.status(400).json("Already solved");
    }


 

    // Update user document to add questionId to solvedProblems
    user.solvedProblems.push(questionId);
    await user.save();

    // Calculate new housePoints
    const solvedQuestions = await Question.find({ _id: { $in: user.solvedProblems } });
    const totalHousePoints = solvedQuestions.reduce((total, q) => total + q.housePoints, 0);
    if(totalHousePoints>200){
      user.title = "Charms Apprentice"
    }
    if(totalHousePoints> 300){
      
    }

    // Update user's housePoints
    user.housePoints = totalHousePoints;
    await user.save();

    return res.status(200).json(user);
  } catch (error) {
    console.error(error);
    return res.status(500).json("Error");
  }
});


module.exports = { correct };
