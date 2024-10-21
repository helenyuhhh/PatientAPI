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
      systolic: { type:Number,required: true },
      Diastolic:{ type:Number,required: true },
      Blood_Pressure: { type: String, required: true }
      
    },
    weight: {
      type: Number,
      required: true
    },
    height:{
      type: Number,
      required: true
    },
    date: {
      type: Date,
      required: true
    }
    
})
// export default mongoose.model("patients", patientSchemaSchema)
export default mongoose.model("Patient", patientSchema)