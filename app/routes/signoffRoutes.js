const express = require('express');
const router = express.Router();
const expressValidator= require('express-validator');
const mongoose = require('mongoose');

const Signoff = require('../models/signoff')
router.use (expressValidator());


//handles fetching client data from the db to populate the table
router.get('/signoff', async(req,res)=>{
    // to pick data from the 
    try {
        // helps return all the members in the collection clients
        const data = await Signoff.find({}).sort({$natural:-1});
        // gives us the file dash and come with the client data or client has same info with data
        res.render('signoff', {signoffs : data})
      } catch(error) {
        return res.status(400).send(
          { 
            status: 400,
            message: 'Oops failed to fetch all clients',
            error
          });
    }
});
// handling routes of dash for post to access reg form on route /dash
// post from frontend using the dash route to backend 
router.post('/signoff',(req,res)=>{
    // declaring the variables in the pug file name
    // we are requesting node js to foward the data and the body with the name given only uses name
    const name = req.body.name;
    const grade = req.body.grade;
    const email = req.body.email;

    
    // handling errors
    // incase there is an error we serve back the form
    const errors = req.validationErrors();
    if (errors) {
        res.render('/signoff')
    }
    else{
        // new variable asssigin it 
        // value(property name from schema):property(varible name in route)
        let newSignoff = new Signoff({
            name:name,
            grade:grade,
            email:email,
        });
        // saving the data
        // case of error return err incase no error give message in console and give dash 
        // controllers
        newSignoff.save((err) =>{

            if(err){
                return;
            }
            else{
                // we first flash a message confirm save in data base
                // go to dashboard since user signed up
                res.redirect('/signoff')
            }
        })
    }
});

module.exports = router;
// exporting the router