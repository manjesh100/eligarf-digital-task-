const mongoose =require('mongoose');
const userSchema = new mongoose.Schema({
 
    username:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        requied:true,
        unigue:true
    }
})
const User = new mongoose.model("User",userSchema)
module.exports = User

 


