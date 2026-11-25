const express = require("express")
const app = express()
const port = 8080;
const path = require("path")
const ExpressError = require("./ExpressError.js")

app.use((req,res,next)=>{
    // let {q} = req.query;
    // console.log(q)
    console.log("1st Middleware")
    next();
}) 

app.use((req,res,next)=>{
    console.log("2nd Middleware")
    next();
})

let checkToken = ("/api",(req,res,next)=>{
    let {token} = req.query;
    if(token=="giveaccess") next();
    else throw new ExpressError(401,"ACCESS DENIED")
})

app.get("/api",checkToken,(req,res,next)=>{
    res.send("data")
})

app.get("/err",(req,res)=>{
    abc=abc
})

app.get("/admin",(req,res)=>{
    throw new ExpressError(403,"ACCESS IS FORBIDDEN")
})
app.get("/",(req,res)=>{
    res.send("Hi I'm Root")
})

app.get("/random",(req,res)=>{
    res.send("It's a random path")
})

app.use((err,req,res,next)=>{
    console.log("------------Error 1------------")
    let {status=500,msg = "Some Error"} = err;
    res.status(status).send(msg)
    next(err)
    // res.send(err)
})

app.use((req,res)=>{
    res.status(404).send("Page not found")
})

app.listen(port,()=>{
    console.log(`App is listening ${port}`)
})