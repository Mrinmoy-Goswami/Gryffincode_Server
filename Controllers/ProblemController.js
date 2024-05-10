const asyncHandler = require("express-async-handler");
const Question = require("../Models/Question");

// Set a question
const setQuestion = asyncHandler(async (req, res) => {
  const {
    title,
    description,
    exampleInput,
    exampleOutput,
    testcases,
    difficulty,
  } = req.body;

  if (!title || !description || !difficulty) {
    return res
      .status(400)
      .json({ message: "Please fill all the details to post a question" });
  }
  else{

      
      const questionExists = await Question.findOne({ title: title });
      if (questionExists) {
          return res.status(400).json("Question already exists !");
  } else {
      const newQuestion = {
          title: title,
          description: description,
          exampleInput: exampleInput,
          exampleOutput: exampleOutput,
          testcases: testcases,
      difficulty: difficulty,
    };
    
    const problem = await Question.create(newQuestion);
    if (problem) {
        return res.status(200).json({ message: "Question posted!" });
    } else {
        return res
        .status(500)
        .json({
            message: "Sorry, the question could not be posted at this time.",
        });
    }
}
}
});

const getQuestion = asyncHandler(async (req, res) => {
  const { id, title } = req.params;

  let question;
  if (id) {
    // If _id is provided, search by _id
    question = await Question.findById(id);
  }

  if (!question && title) {
    // If question is not found by _id and title is provided, search by title
    question = await Question.findOne({ title: title });
  }

  if (!question) {
    // If the question is not found, return a 404 Not Found error
    return res.status(404).json({ message: "Question not found." });
  }

  // If the question is found, return it
  res.status(200).json(question);
});

const getAllProblems = asyncHandler(async (req, res) => {
  try {
    const problems = await Question.find({});
    res.status(200).json(problems);
  } catch (error) {
    res.status(500).json("Some error occured while fetching the problems");
  }
});

module.exports = { setQuestion, getQuestion, getAllProblems };
