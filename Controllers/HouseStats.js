const asynchandler = require("express-async-handler")
const User = require('../Models/User')

const getHouseDetails = asynchandler(async(req,res)=>{
    const houseStats = await User.aggregate([
        {$group:{
                _id:"$house",
                numberofUsers : {$sum:1},
                totalHousePoints:{$sum:"$housePoints"}
        }
    },
    {
        $sort:{totalHousePoints : -1}
    }
    ])
    return res.status(200).json(houseStats)
})  

module.exports = {getHouseDetails}