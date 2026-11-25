const express=require("express")
const router = express.Router()

router.get('/',(req,res)=>{
    res.send("GET Request Users")
})

router.get("/:id",(req,res)=>{
    res.send("ID GET Request Users")
})

module.exports = router