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
    tests: [
      {
        patient_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Patient', required: true , required: true},
        date: { type:String, required: true},
        nurse_name: { type:String, required: true},
        type: { type:String, required: true}, 
        category: { type:String, required: true},
        reading: { 
          blood_pressure:{ 
            systolic:{type:Number, required: false},
            diastolic:{type:Number, required: false}
          },
          respiratory_rate:{ type:Number, required: false},
          blood_oxygen_level:{ type:Number, required: false},
          heartbeat_rate:{ type:Number, required: false}
        },
      }

    ],
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