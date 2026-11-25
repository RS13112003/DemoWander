const express= require("express")
const app = express();
const port=8080;
const users = require("./user.js")
const posts = require("./post.js")
const cookieParser = require("cookie-parser")

app.use(cookieParser("secretcode"))



app.get("/getcookies",(req,res)=>{
    res.cookie("greet","india")
    res.cookie("namaste","bharat")
    res.send("Send Some cookies")
})


app.get("/greet",(req,res)=>{
    let {name="Someone"} = req.cookies;
    res.send(`Hi ${name}`)
})

app.get("/getsignedcookie",(req,res)=>{
    res.cookie("made-in","India",{signed:true})
    res.cookie("raja","Ram",{signed:true})
    res.send("Signed cookie send")
})


app.get("/verify",(req,res)=>{
    console.log(req.cookies) // unsigned cookies
    console.log(req.signedCookies) // signed cookies
    res.send("verifyed")
})

Users
app.use("/users",users)

// Posts
app.use("/posts",posts)


app.listen(port,()=>{
    console.log("App is listening to ",port)
})