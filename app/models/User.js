const mongoose = require('mongoose');
// plag in to help capture user name
const passportLocalMongoose = require('passport-local-mongoose');
const userSchema = mongoose.Schema({
    firstname:{
        type:String,
        required:true
    },
    lastname:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
});
// set the user name feild which is email to login
userSchema.plugin(passportLocalMongoose, {
    usernameField: "email",
  });
  
// exporting the schema 
// Sign up is the name that will be calle in the collections and also it is the one carryin the model
const User = mongoose.model('User',userSchema);

module.exports = User;