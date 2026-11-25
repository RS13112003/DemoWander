const express = require("express")
const app = express()
const port = 8080
const session = require("express-session")
const flash = require("connect-flash")
const cookieParser = require("cookie-parser")
const path = require("path")


const sessionOption = {
    secret : "supercode",
    resave : false,
    saveUninitialized: true,
    
}


app.use(session(sessionOption))
app.use(flash())

app.set("view engine","views")
app.set("views",path.join(__dirname,"/views"))

app.use((req,res,next)=>{
    res.locals.successMsg = req.flash("success")
    res.locals.errorMsg = req.flash("error")
    next()
})

app.get("/test",(req,res)=>{
    res.send("Working...")
})

app.get("/register",(req,res)=>{
    let {name = "somone"} = req.query;
    console.log(req.session)
    req.session.name=name
    console.log(req.session.name)

    if(name=="someone")  req.flash("error","User not registered")
    else req.flash("success","Welcome !!")

    res.redirect("/hello")
})

app.get("/hello",(req,res)=>{
    // res.send(`Hello ${req.session.name}`)
    res.render("page.ejs",{name : req.session.name})
})
app.get("/reqcount",(req,res)=>{
    if(req.session.count) req.session.count++;
    else req.session.count=1
    res.send(`you sent request = ${req.session.count}`)
})
app.listen(port,()=>{
    console.log(`App is listening ${port}`)
})