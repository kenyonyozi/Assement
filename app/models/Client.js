const mongoose = require('mongoose');
const clientSchema = mongoose.Schema({
    name:{
        type: String,
        required:true
    },
    phonenumber:{
        type: String,
        required:true
    },
    ninnumber:{
        type: String,
        required:true
    },
    color:{
        type: String,
        required:true
    },
    numberplate:{
        type: String,
        required:true
    },
    model:{
        type: String,
        required:true
    },
    date:{
        type: String,
        required:true
    },
    time:{
        type: String,
        required:true
    },
    gender:{
        type: String,
        required:true
    },
    service:{
        type: String,
        required:true
    },
    description:{
        type: String,
        required:true
    },
    duration:{
        type: String,
        required:true
    },
    paidprice:{
        type: Number,
        required:true
    },
    batteryprice:{
        type: Number,
        required:true
    },
    batterysize:{
        type: String,
        required:true
    },
    cartyreprice:{
        type: Number,
        required:true
    },
    cartyresize:{
        type: String,
        required:true
    },
    cartyremake:{
        type: String,
        required:true
    },
});

// exporting the schema 
const Client = module.exports = mongoose.model('Client', clientSchema);