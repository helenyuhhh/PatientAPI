import mongoose from "mongoose";
const patientSchema = new mongoose.Schema({
    name:{
        first: { type: String, required: true },
        last: { type: String, required: true }
    },
    age:{
      type: Number,
      required: true
    },
    gender:{
      type: String,
      required: true
    },
    room: {
      type: String,
      required: true
    },
    clinical:{
      systolic: { type:Number,required: false },
      diastolic:{ type:Number,required: false },
      condition: { type: String, required: false }
      
    },
    weight: {
      type: String,
      required: true
    },
    height:{
      type: String,
      required: true
    },
    date: {
      type: Date,
      required: true
    },
    picture: {
      type: String,
      required: false
    }
    
    
})
// export default mongoose.model("patients", patientSchemaSchema)
export default mongoose.model("Patient", patientSchema)