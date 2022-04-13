const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const expressValidator= require('express-validator');


// router.use(expressValidator());
// requring the schema of signup Signup variable singup model
// const User = require('../models/User');

// handling routes of signup for get method to serve sign up view
router.get('/',(req,res)=>{
    res.render('edit')
});
module.exports = router;