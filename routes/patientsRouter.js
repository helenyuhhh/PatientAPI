import express from "express"
import Patient from "../models/patients.js"
const router = express.Router();
// getting all patients
router.get('/', async(req, res) =>{
   try{
      const patients = await Patient.find() // get all the patients from the patiens
      res.json(patients)
   } catch (error) {
      res.status(500).json({ message: error.message})
   }
})
// getting one patients by id?
router.get('/:id', getPatient, (req, res)=>{
   res.send(res.patient)// returning the patient name with specific id
})
// creating one
router.post('/', async(req, res)=>{
   // const {name, age, gender, room, clinical, weight, height, date} = req.body
   const patient = new Patient({
      name:req.body.name,
      age: req.body.age,
      gender: req.body.gender,
      room: req.body.room,
      clinical: req.body.clinical,
      weight: req.body.weight,
      height: req.body.height,
      date: req.body.date
   })
   try {
     const newPatient = await patient.save()
     res.status(201).json(newPatient)
   } catch (error) {
      res.status(400).json({ message: error.message})
   }
  
})
// only update the data that we sent 
router.patch('/:id', getPatient, async(req, res)=>{
   if (req.body.clinical != null) {
      res.patient.clinical = req.body.clinical
   }
   if (req.body.date != null) {
      res.patient.date = req.body.date
   }
   if (req.body.weight != null) {
      res.patient.weight = req.body.weight
   }
   try {
      const updatedClinical = await res.patient.save()
      res.json(updatedClinical)
   }catch(error){
      res.status(400).json({message: error.message})
   }

})
// deleting one
router.delete('/:id', getPatient, async(req, res)=>{
  // res.patient
  try{
   await res.patient.deleteOne()
   res.json({message:"Patient Deleted!"})
  }catch(error){
   res.status(500).json({message: error.message})
  }
})

// a function can be called multi times
async function getPatient(req, res, next){
   let patient1
   try{
     patient1 = await Patient.findById(req.params.id)
     if (patient1 == null){
      return res.status(404).json({messsage: 'Cannot find patient'})
     }
   }catch(error){
      return res.status(500).json({ message: error.message})
   }
   res.patient = patient1
   next()

}

export default router;