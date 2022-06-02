const mongoose = require('mongoose');
const signoffSchema = mongoose.Schema({
    name:{
        type: String,
        required:true
    },
    grade:{
        type: String,
        required:true
    },
    email:{
        type: String,
        required:true
    },
});

// exporting the schema 
const Signoff = module.exports = mongoose.model('Signoff', signoffSchema);