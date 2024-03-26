const axios = require("axios");

// Free tier limitations (adjust based on RunCode.io documentation)
const maxCpuTime = 1; // Seconds - Adjust based on free tier limits
const maxMemory = 256; // MB - Adjust based on free tier limits

const Compiler = async (req, res) => {
 

  const options = {
    method: 'POST',
    url: 'https://online-code-compiler.p.rapidapi.com/v1/',
    headers: {
      'content-type': 'application/json',
      'X-RapidAPI-Key': '7569217ec7msheb0de54bfba16e8p10b097jsn9bc2a151f511',
      'X-RapidAPI-Host': 'online-code-compiler.p.rapidapi.com'
    },
    data: {
      language: 'python3',
      version: 'latest',
      code: 'print("Hello, World!");',
      input: null
    }
  };
  
  try {
    const response = await axios.request(options);
    res.status(200).json(response.data);
  } catch (error) {
    consoleres.status(400).json(error);
  }
};

module.exports = Compiler;
