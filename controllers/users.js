const User = require("../models/user.js")

// signup form
module.exports.renderSignup = (req,res)=>{
    res.render("users/signup.ejs")
}


// signup
module.exports.signup = async(req,res)=>{
    try{
        const { username, email, password } = req.body;
        const newUser = new User({ username,email })
        const registerUser = await User.register(newUser,password)
        console.log(registerUser)

        req.login(registerUser,(err)=>{
            if(err) return next(err)
            
            req.flash("success","Welcome to WanderLust")
            res.redirect("/listings")
        })
    }
    catch(err){
        req.flash("error",err.message)
        res.redirect("/listings")
    }
}


// login form
module.exports.renderLogin = (req,res)=>{
    res.render("users/login.ejs")
}


// login
module.exports.login = async (req,res)=>{
    req.flash("success","Welcome back to WanderLust !")
    // res.redirect("/listings")
    let redirectUrl = res.locals.redirectUrl || "/listings"
    res.redirect(redirectUrl)
}

// logout
module.exports.logout = (req,res)=>{
    req.logout((err)=>{
        if(err) return next(err)
        req.flash("success","you are logged out now")
        res.redirect("/listings")
    })
}