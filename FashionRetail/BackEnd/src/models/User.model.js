const mongoose = require('mongoose');

const collectionName = 'User';
const UsersSchema = new mongoose.Schema({
    first_name: {
        type: String,
    } ,
    
    last_name: {
        type: String,
    },
    
    email:{
        type:String
    },
    password:{
        type:String
    }
    

});
module.exports=mongoose.model(collectionName, UsersSchema );