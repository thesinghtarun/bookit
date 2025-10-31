const mongoose=require('mongoose')

const bookExperienceSchema=new mongoose.Schema({
    email:{type:String,required:true},
    name:{type:String,required:true},
    selectedTime:{type:String,required:true},
    selectedDate:{type:String,required:true},
    location:{type:String,required:true}
},{timestamps:true})

const BOOKEXPERIENCE=mongoose.model("BOOKEXPERIENCE",bookExperienceSchema)

module.exports=BOOKEXPERIENCE