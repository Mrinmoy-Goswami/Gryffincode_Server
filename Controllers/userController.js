const asyncHandler = require("express-async-handler");
const User = require("../Models/User");
const jwt = require("jsonwebtoken");

// Generating a token for authorizations
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "5d",
  });
};
//Function for registering a user
const registerUser = asyncHandler(async (req, res) => {
  const { username, email, password} = req.body;

  // Error Case
  if (!username || !email || !password) {
    res.status(400).json("Please fill all the required fields");
  }

  //If the User Already Exists

  const userExists = await User.findOne({ email });
  if (userExists) {
    res
      .status(400)
      .json(
        "User with this email id already exists ! You can login instead or use a different email id"
      );
  }

  const user = await User.create({
    username,
    email,
    password,
    house:null
  });
  if (user ) {
    res.status(200).json({
      _id:user._id,
      username:user.username,
      email:user.email,
      house:user.house,
      housePoints:user.housePoints,
      title:user.title,
      solvedProblems:user.solvedProblems,
     token:generateToken(user._id)
    });
  } else {
    res.status(400).json("User could not be created at this moment !");
  }
});

//Function for logging a user in

const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email:email });
  
  if (!user) {
    res.status(404).json("User not found ! Please signup first!!");
  } else if (password !== user.password) {
    res.status(400).json("Wrong Credentials !");
  } else if (user) {
      
      res.status(200).json({
        _id:user._id,
        username:user.username,
        email:user.email,
        house:user.house,
        housePoints:user.housePoints,
        title:user.title,
        solvedProblems:user.solvedProblems,
        token:generateToken(user._id)
      });
    
  }
});

//Assign a house to user 


const assignHouse = asyncHandler(async (req, res) => {
  const { house, id } = req.body;

  try {
   
    const userExists = await User.findById(id);
    userExists.house = house;
    await(userExists.save())
    return res.json(userExists);
 
   
  } catch (error) {

    console.error("Error updating user:", error);
    res.status(500).json({ message: "Internal Server Error" , error});
  }
});

// Getting userData

const userDetails = asyncHandler(async (req, res) => {
  const { userId } = req.body;
  try {
    const userdetails = await User.findById(userId);
    if (!userdetails) {
      // If userdetails is null (user not found), return a 404 response
      return res.status(404).json({ message: "User not found" });
    }
    // If userdetails is found, return a 200 response with userdetails
    return res.status(200).json(userdetails);
  } catch (error) {
    // If there's an error, return a 500 response with the error message
    return res.status(500).json({ message: "Could not fetch user details at the moment", error: error });
  }
});






module.exports = { registerUser, loginUser, assignHouse ,userDetails};
