const express = require('express');
const router = express.Router();
const passport = require('passport');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const expressValidator= require('express-validator');


router.use(expressValidator());
// requring the schema of signup Signup variable singup model
const User = require('../models/User');

// handling routes of signup for get method to serve sign up view
router.get('/signup',(req,res)=>{
    res.render('signup')
});

// post method using try and catch
router.post('/signup', async (req,res)=>{
    console.log(req.body)
    
    try{
        const newUser = new User(req.body);
        // findone db method
        let user = await User.findOne({email:req.body.email});
        if (user) {
            return res.status(400).send('user with simliar already email taken please use another email');
        }
        else{

            // bcrypt to hide password
            bcrypt.genSalt(7,(err,salt)=>{
                bcrypt.hash(newUser.password,salt,(err,hash)=>{
                    if (err) {
                        console.error(err)
                        return;
                    }
                    newUser.password = hash
                })
            })
            // already has incryption in the method register
            await User.register(newUser, req.body.password, (err) => {
                if(err){
                    throw err;
                }
                res.redirect('/login');
            });
        };
    }catch(err){
        console.log(err);
        res.send('your data wasnt saved');
    }
});
// //handling routes of signup for post to access sign up
// //use body paser to help us pass the data and concetrate on the
// router.post('/signup',(req,res)=>{
//     // declaring the variables in the pug file name
//     // we are requesting node js to foward the data and the body with the name given 
//     const firstname = req.body.firstname;
//     const lastname = req.body.lastname;
//     const email = req.body.email;
//     const password = req.body.password;
//     const confirmpassword = req.body.confirmpassword;

//     // validation(OPTIONAL)
//     // req.checkBody('firstname','firstname is required').notEmpty();
//     // req.checkBody('lastname','lastname is required').notEmpty();
//     // req.checkBody('email','email is required').notEmpty();
//     // req.checkBody('password','password is required').notEmpty();
//     // req.checkBody('confirmpassword','confirmpassword is required').notEmpty();

//     // handling errors
//     // incase there is an error we serve back the form
//     const errors = req.validationErrors();
//     if (errors) {
//         res.render('signup')
//     }
//     // if no error
//     else{
//         // new variable asssigin it 
//         // value(property name from schema):property(varible name in route)
//         // instatiate an object put our values with those in schema
//         let newSignup = new Signup({
//             firstname:firstname,
//             lastname:lastname,
//             email:email,
//             password:password,
//             confirmpassword:confirmpassword
//         });
//         // saving the data
//         // case of error return err incase not error give message in console and give dash page
//         newSignup.save((err) =>{

//             if(err){
//                 console.error(err);
//                 return;
//             }
//             else{
//                 // we first flash a message comfirm save in data base
//                 // go to dashboard since user signed up
//                 console.log('data saved in data base');
//                 res.redirect('/login')
//             }
//         })
//     }
   
// });
module.exports = router;
// exporting the router to any file that will require it 