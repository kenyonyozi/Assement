const express = require('express');
const router = express.Router();
const passport = require('passport');


// handling routes of login
router.get('/login',(req,res)=>{
    res.render('login') 
});

router.post('/login', passport.authenticate('local', { failureRedirect: '/login' }),(req, res) => {
	console.log("This is the login data", req.body)
	req.session.user = req.user
	res.redirect('/dash');
});

// Logout form
router.get('/logout', function(req, res) {
    req.logout();
    // req.flash('success', 'You are logged out');
    res.redirect('/login');
});

module.exports = router;
// exporting the router
