const express = require("express")
const router = express.Router()
const User = require("../models/user.js")
const passport = require("passport")
const wrapAsync = require("../utils/wrapAsync.js")
const {savedRedirectUrl} = require("../middleware.js")
const userController = require("../controllers/users.js")


router.route("/signup")
.get(userController.renderSignup)   // signup form
.post(wrapAsync(userController.signup))  // signup post


router.route("/login")
.get(userController.renderLogin)  // login form
.post(savedRedirectUrl,         // logout
    passport.authenticate("local",
        {failureRedirect:"/login",failureFlash : true}),
wrapAsync(userController.login))


//logout
router.get("/logout",userController.logout)

module.exports = router

// //   signup form
// router.get("/signup",userController.renderSignup)

// //   signup
// router.post("/signup",wrapAsync(userController.signup))

// //login Form
// router.get("/login",userController.renderLogin)

// //login
// router.post("/login", savedRedirectUrl,
//     passport.authenticate("local",
//         {failureRedirect:"/login",failureFlash : true}),
//     wrapAsync(userController.login))

// // logout
// router.get("/logout",userController.logout)


// module.exports = router