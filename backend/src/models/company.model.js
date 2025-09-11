import { Schema, model } from "mongoose";

const companySchema = new Schema({
  name: {
    type: String,
    required: true,
    default:""
  },
  description: {
    type: String,
    default:""
  },
  website: {
    type: String,
    default:""
  },
  location: {
    type: String,
    default:""
  },
  logo: {
    type: String,
    default:""
  },
  userId: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
},{timestamps:true});
export const Company = model("Company", companySchema);
