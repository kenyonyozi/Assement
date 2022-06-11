const express = require('express');
const router = express.Router();
const passport = require('passport');
const expressValidator= require('express-validator');
const mongoose = require('mongoose');

router.use(expressValidator());
// requring the schema of dash from the model
const Client = require('../models/Client')

// handling routes of dash
// router.get('/dash',(req,res)=>{
//     // give me the dash board at this route and res with dash
//     res.render('dash')
// });

//handles fetching client data from the db to populate the table
// and also the totals and login with first name
router.get('/dash', async(req,res)=>{
    if (req.session.user) {
        try {
            // helps return all the members in the collection clients
            const data = await Client.find({}).sort({$natural:-1});
            //   let totalEarnings = await Client.aggregate([
            //   {$group:{_id:'$all',
            //   totalParking:{$sum:'$paidprice'},
            //   totalCartyre:{$sum:'$cartyreprice'},
            //   totalBattery:{$sum:'$batteryprice'},
            // }}]);
            // values parking from the same parking
            // console.log('>>>>>> all clients',data);
            // console.log('collection of earning', totalEarnings)
            // gives us the file dash and come with the client data or client has same info with data
            res.render('dash', {
              clients : data,loggedinuser:req.session.user,
              // total:totalEarnings[0],
            });
          } catch(error) {
            return res.status(400).send(
              { 
                status: 400,
                message: 'Oops failed to fetch all clients',
                error
              });
        }
    }
    else{
      res.redirect('/login')
    }
    // to pick data from the 
    
});

// handling routes of dash for post to access reg form on route /dash
// post from frontend using the dash route to backend 
router.post('/dash',(req,res)=>{
    // declaring the variables in the pug file name
    // we are requesting node js to foward the data and the body with the name given only uses name
    const name = req.body.name;
    const phonenumber = req.body.phonenumber;
    const ninnumber = req.body.ninnumber;
    const color= req.body.color;
    const numberplate= req.body.numberplate;
    const model= req.body.model;
    const date= req.body.date;
    const time= req.body.time;
    const gender= req.body. gender;
    const service= req.body.service;
    const description= req.body.description;
    const duration= req.body.duration;
    const paidprice= req.body.paidprice;
    const batteryprice= req.body.batteryprice;
    const batterysize= req.body.batterysize;
    const cartyreprice= req.body.cartyreprice;
    const cartyresize= req.body.cartyresize;
    const cartyremake= req.body.cartyremake;
    
   
    // handling errors
    // incase there is an error we serve back the form
    const errors = req.validationErrors();
    console.log();
    if (errors) {
        res.render('/dash')
    }
    else{
        // new variable asssigin it 
        // value(property name from schema):property(varible name in route)
        let newClient = new Client({
            name:name,
            phonenumber:phonenumber,
            ninnumber: ninnumber,
            color: color,
            numberplate: numberplate,
            model:model,
            date: date,
            time:time,
            gender: gender,
            service:service,
            description:description,
            duration:duration,
            paidprice:paidprice,
            batteryprice:batteryprice,
            batterysize:batterysize,
            cartyreprice:cartyreprice,
            cartyresize:cartyresize,
            cartyremake:cartyremake,
        });
        // saving the data
        // case of error return err incase no error give message in console and give dash 
        // controllers
        newClient.save((err) =>{

            if(err){
                console.error(err);
                return;
            }
            else{
                // we first flash a message confirm save in data base
                // go to dashboard since user signed up
                console.log('data saved in database', );
                res.redirect('/dash')
            }
        })
    }
});

// delete user
router.get('/deleteuser/:id',async (req,res)=>{
    try {
        // const client = await Client.findById(req.params._id)
        // console.log('client')
        await Client.deleteOne({_id:req.params.id})
        res.redirect('back')
    } catch (error) {
        res.status(400).send('unable to delete user')
    }
});

// update user
router.get("/update/:id", async (req, res) => {
    // if someone isnt logged in they cant update if no session
    // prepopulated form
    // if (req.session.user) {
      try {
        const updateUser = await Client.findOne({ _id: req.params.id })
        res.render('edit', {client: updateUser})
        // res.json(user);
      } catch (error) {
        res.status(400).send("unable to find the user in the database");
      }
    // }
    //  else {
    //     // someones session experiers
    //  console.log("cant find session");
    //   res.redirect("/login");
    //  }
  });

  router.post("/update", async (req, res) => {
    //   send back the form to the database
    // if (req.session.user) {
      try {
        await Client.findOneAndUpdate({ _id: req.query.id }, req.body)
        res.redirect("/dash");
        // console.log(_id);
        // res.redirect("back");
      } catch (error) {
        res.status(400).send("unable to update item");
      }
    // } 
    // else {
    //   console.log("cant find session");
    //   res.redirect("/login");
    // }
  });
  
module.exports = router;
// exporting the router