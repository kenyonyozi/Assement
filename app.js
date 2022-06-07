const express = require('express');
require('dotenv').config()
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const path = require('path');
const expressValidator = require('express-validator');

//calling the sign off route
const signoffRoutes = require('./app/routes/signoffRoutes');

const { PORT } = process.env
const { WELCOME_MESSAGE, DATABASE_URL } = process.env

// instaciating the app to use express
const app = express()


// middleware

// must be used during pug 
// setting an engine sice we using pug
app.engine('pug', require('pug').__express); 
app.set('view engine','pug');
app.set('views', path.join(__dirname,'views'));


// extended means when node uses body parser get the forms the way they are and focus on input fields
app.use(express.urlencoded({extended:false}));
// // telling to use json formate when exposing the fields
app.use(express.json());
// //telling bodyparser to use json formate when exposing the fields
app.use(bodyParser.json());


// // find all my static files in public these include css images etc
app.use(express.static(path.join(__dirname,"public")));


// app.use
app.use('/',signoffRoutes);


//the message that appears in case someone searches for a route that doesnt exist on my server
app.get('*', (req, res) => {
    res.status(404).send('no such page')
});


  
// spin up the server 
mongoose.connect(DATABASE_URL).then(() => {
    // successful connection
    app.listen(PORT, ()=> {
        let message = `${WELCOME_MESSAGE} ${PORT}`
        console.log(message)
    })
}).catch(error => {
    console.error("Failed to start the server due to : ",error)
})
  

module.exports = app;