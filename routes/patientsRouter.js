import express from "express"
import Patient from "../models/patients.js"
import Test from "../models/tests.js"
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
      date: req.body.date,
      tests:req.body.tests,
      picture: req.body.picture
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
   if (req.body.picture != null) {
      res.patient.picture = req.body.picture
   }
   if (req.body.gender != null) {
      res.patient.gender = req.body.gender
   }
   /*if (req.body.tests != null) {
      res.patient.tests = req.body.tests
   }*/
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

// get patient's test list by passing the id, it's working now
router.get('/:id/tests', getPatient, (req, res)=>{
   res.send(res.patient.tests)// returning the patient name with specific id
})
router.get('/:id/tests/:testid', getPatient, (req, res)=>{
   // returning the patient name with specific id
   // first check if the patient exist
   // then check if the test id exist
   let testingID 
   try{
      testingID = res.patient.tests.id
      if (testingID != req.params.testid){
       return res.status(404).json({messsage: 'Cannot find fond'})
      }
      else {
         res.send(res.patient.tests.id)
      }
    }catch(error){
       return res.status(500).json({ message: error.message})
    }
})
// post tests works
router.post('/:id/tests', getPatient,async(req, res)=>{
   // const {name, age, gender, room, clinical, weight, height, date} = req.body
   const test = new Test(
      {
         patient_id: req.params.id,
         date: req.body.date,
         nurse_name: req.body.nurse_name,
         type: req.body.type, 
         category: req.body.category,
         reading: req.body.reading,
         id:req.body.id
      }
   ) 
   try {
      const newTest = await test.save()
      res.status(201).json(newTest)
    } catch (error) {
       res.status(400).json({ message: error.message})
    }
})

// patch the patient's tests it should be patch the data by test id, inplement this later
router.patch('/:id/tests', getPatient, async(req, res)=>{
   // after getting the patient, check the test id of the 
   if (req.body.date != null) {
      res.patient.tests.date = req.body.date
   }
   if (req.body.nurse_name != null) {
      res.patient.tests.nurse_name = req.body.nurse_name
   }
   if (req.body.type != null) {
      res.patient.tests.type = req.body.type
   }
   if (req.body.category != null) {
      res.patient.tests.category = req.body.category
   }
   // for reading
   if (req.body.category != null) {
      res.patient.tests.reading = req.body.reading
   }
   // for id
   if (req.body.id != null) {
      res.patient.tests.id = req.body.id
   }
   try {
      const updatedClinical = await res.patient.save()
      res.json(updatedClinical)
   }catch(error){
      res.status(400).json({message: error.message})
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