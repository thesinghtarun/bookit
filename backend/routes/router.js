const express=require('express')
const controller = require('./controller')
const router=express.Router()

router.route("/").get((req,res)=>{res.send("HomePage")})
router.route("/signup").post(controller.user)
router.route("/signin").post(controller.login)
router.route("/search").post(controller.searchExperiences)
router.route("/experiences").get(controller.experiences)
router.route("/experiences/:id").get(controller.experienceDetails)
router.route("/bookexperience").post(controller.bookExperience)

module.exports=router