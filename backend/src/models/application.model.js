import {Schema,model} from "mongoose"

const applicationSchema = new Schema({
    job:{
        type:Schema.Types.ObjectId,
        ref:"Job",
        required:true
    },
    applicant:{
        type:Schema.Types.ObjectId,
        ref:"User",
        required:true
    },
    status:{
        type:String,
        enum:['pending','accepted','rejected'],
        default:"pending"
    }
},{timestamps:true})

export const Application = model("Application",applicationSchema)