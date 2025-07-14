const mongoose=require('mongoose');

//describing schema
const jobSchema=new mongoose.Schema({
    //unique id
userId: {
  type: mongoose.Schema.Types.ObjectId,
  ref: 'User',
  required: true
},
    company:{
        type:String,
         required:true
    },
    role:{
        type:String,
         required:true
    },
    jobLink:{
        type:String
    },
    status:{
        type:String,
        enum: ["Wishlist", "Applied", "Online Test", "Interview", "Offer", "Rejected"]
    },
    appliedDate:{
        type:Date
    },
isBookmarked:{
    type:Boolean
}
})
//compiling schema into model
module.exports=mongoose.model('Job',jobSchema);