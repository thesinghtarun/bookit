const mongoose=require('mongoose')

const experienceSchema=new mongoose.Schema({
    name:{type:String,required:true},
    description:{type:String,required:true},
    location:{type:String,required:true},
    price:{type:Number,required:true},
    image: {type: String,default: "",},
    available_date:{type:Array,required:true},
    available_time:{type:Array,required:true}
})

const EXPERIENCE=mongoose.model("EXPERIENCE",experienceSchema)

module.exports=EXPERIENCE