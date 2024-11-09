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
      diastolic:{ type:Number,required: true },
      condition: { type: String, required: true }
      
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
    },
    tests:{
      patient_id: { type: String, required: true },
      date: { type: Date, required: true },
      nurse_name: { type: Date, required: true },
      // type: Test
      type: { type: String, required: true }, // to store the type: test name
      // category: Blood Pressure, cause there are many other tests, Respiratory Rate, Blood Oxygen,
      // and Heartbeat Rate
      category: { type: Date, required: true },
      // readings
      reading: { // for Blood Pressure Test
                 systolic: { type:Number,required: false },
                 diastolic:{ type:Number,required: false },
                 // for Respiratory Rate, safe for 12-18/min
                 respiratory:{ type:Number, required: false},
                 // for Blood Oxygen
                 blood_oxygen:{ type:Number, required: false},
                 // for heartbeat Rate
                 heart_beat:{type:Number, required: false}
                },
      // test_id
      id:{type:String, required:true}
  }
    
})
// export default mongoose.model("patients", patientSchemaSchema)
export default mongoose.model("Patient", patientSchema)