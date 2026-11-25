const express=require("express")
const router = express.Router()

router.get("/",(req,res)=>{
    res.send("GET Request for Posts")
})

router.get("/:id",(req,res)=>{
    res.send("ID request for Posts")
})

module.exports = router