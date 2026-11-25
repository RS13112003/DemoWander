if(process.env.NODE_ENV != 'production'){
    require('dotenv').config()
    // console.log(process.env.SECRET)
}

const mongoose = require('mongoose');
const express = require("express")
const app = express()
const port = 8080;
const path  = require("path")
// const Listing = require("./models/listing.js")
const methodOverride =  require("method-override")
const ejsmate = require("ejs-mate")
// const ExpressError = require("./utils/ExpressError.js")
// const wrapAsync = require("./utils/wrapAsync.js")
// const { listingSchema , reviewSchema} = require("./schema.js")
// const Review = require("./models/review.js")
const session = require("express-session")
const cookieParser = require("cookie-parser")
const flash = require("connect-flash")
const passport = require("passport")
const LocalStrategy = require("passport-local")
const User = require("./models/user.js")


const listingsRouter = require("./routes/listing.js")
const reviewsRouter = require("./routes/review.js")
const UserRouter = require("./routes/user.js")

app.engine("ejs",ejsmate)
app.set("view engine","ejs")
app.set("views",path.join(__dirname,"/views"))

app.use(express.static(path.join(__dirname,"/public/css")))
app.use("/css", express.static(path.join(__dirname, "public/css"))) // for rating
// app.use(express.static(path.join(__dirname,"/public/js")))
app.use("/js", express.static(path.join(__dirname, "public/js")))

app.use(express.urlencoded({extended:true}))
app.use(express.json())
app.use(methodOverride("_method"))

main().then((res)=>{
    console.log("Connnection Successfull")
}).catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/WanderLand');
}


// Sessions & flash message Middlewares
const sessionOptions={
    secret : "supercode",
    resave : false,
    saveUninitialized : true,
    cookie : {
        expires : Date.now() + 7 * 24 * 60 * 60 * 1000,
        maxAge : 7 * 24 * 60 * 60 * 1000,
        httpOnly:true // cross scripting attack prevent
    }
}

app.use(session(sessionOptions))
app.use(flash())



// Passport middlewares
app.use(passport.initialize())
app.use(passport.session())
passport.use(new LocalStrategy(User.authenticate()))

passport.serializeUser(User.serializeUser())
passport.deserializeUser(User.deserializeUser())




app.use((req,res,next)=>{
    res.locals.success = req.flash("success")
    res.locals.error = req.flash("error")
    // console.log(res.locals.success) // success array
    res.locals.currUser = req.user
    next()
}) 

// app.get("/",(req,res)=>{
//     res.send("Working....")
// })

// listings
app.use("/listings",listingsRouter)

// reviews
app.use("/listings/:id/reviews",reviewsRouter)

// user
app.use("/",UserRouter)

// app.get("/demouser",async (req,res)=>{
//     let fakeuser = new User({
//         email : "fake@gmail.com",
//         username : "fake"
//     })
//     let registeredUser = await User.register(fakeuser,"hello")
//     res.send(registeredUser)
// })

// Middlewares
app.use((err,req,res,next)=>{
    let {status=500,message="Something Went Wrong"} = err
    // res.status(status).send(message)
    res.status(status).render("error.ejs",{message})
    // res.send("Something went wrong")
})

// Page Not Found
app.use((req,res)=>{
    res.status(404).render("error.ejs",{message : "Page not found"})
})


app.listen(port,()=>{
    console.log(`App is listening to ${port}`)
})