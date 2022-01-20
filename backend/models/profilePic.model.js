

const mongoose = require("mongoose")


const profilepicSchema= mongoose.Schema({
    user_id: {
        type: mongoose.Schema.Types.ObjectId, 
        ref:'user',
        required: true},
   

img:{type:String,required:true}


}
,
{
    versionKey:false,
    timestamps:true
}

)

module.exports = mongoose.model('profilepic',profilepicSchema)