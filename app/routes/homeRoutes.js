const express = require('express');
const router = express.Router();

// handling routes of home
router.get('/',(req,res)=>{
    res.render('home')
});
module.exports = router;
// exporting the router