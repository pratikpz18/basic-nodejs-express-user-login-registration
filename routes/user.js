const express = require('express')
const router = express.Router()

const usercontroller = require('../controllers/usercontroller')
const User = require('../models/usermodel')
let user = User.find({});

router.post('/register', usercontroller.register)
router.post('/login', usercontroller.login)

router.get("/login", function (req, res) { 
    res.render("login"); 
});

router.get("/logout", function (req, res) { 
    res.redirect("/"); 
}); 

router.get("/", function (req, res) { 
    res.render("home"); 
});  

router.get("/register", function (req, res) { 
    res.render("register"); 
});

router.get('/profile', function(req, res) {
    user.exec(function(err, data){
        res.render('profile',{
        data:data
    })
    })
});
module.exports = router