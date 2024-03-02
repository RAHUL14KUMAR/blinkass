const mongoose=require("mongoose");
const schema=mongoose.Schema

const uploadSchema=new schema({
    profile:{
        type:Array
    }
},{
    timestamps:true
})

module.exports=mongoose.model("uploads",uploadSchema)