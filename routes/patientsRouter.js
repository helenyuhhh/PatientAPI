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
   if (req.body.room != null) {
      res.patient.room = req.body.room
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
   if (req.body.tests != null) {
      res.patient.tests = req.body.tests
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
/********************************************************TESTS***************************************************** */
// get patient's test list by passing the id, it's working now
router.get('/:id/tests', async(req, res)=>{
   try{
      const tests = await Test.find()
      res.json(tests)
   } catch (error) {
      res.status(500).json({ message: error.message})
   }
})
// get test by id
router.get('/:id/tests/:testid', getTest, (req, res)=>{
   // returning the patient name with specific id
   // first check if the patient exist
   // then check if the test id exist
   res.send(res.test)
})
// post test by its id
router.post('/:id', getPatient,async(req, res)=>{
   // const {name, age, gender, room, clinical, weight, height, date} = req.body
   // check if ther's any existed tests, check the date, cat and nurse
   const foundText = res.patient.tests.find(test => 
      test.date === req.body.date &&
      test.category === req.body.category &&
      test.nurse_name === req.body.nurse_name
   )
   if (foundText) {
      res.status(400).json({ message: "Test exists!"})

   }
   const test = 
      {
         patient_id: req.params.id,
         date: req.body.date,
         nurse_name: req.body.nurse_name,
         type: req.body.type, 
         category: req.body.category,
         reading:{
            blood_pressure: {
               systolic: req.body.reading.blood_pressure?.systolic || null,
               diastolic: req.body.reading.blood_pressure?.diastolic || null,
            },
            respiratory_rate: req.body.reading.respiratory_rate || null,
            blood_oxygen_level: req.body.reading.blood_oxygen_level || null,
            heartbeat_rate: req.body.reading.heartbeat_rate || null
         },
         id:req.body.id
      }
   
   try {
      // add new test to test array
      res.patient.tests.push(test)
      const patientUpdate = await res.patient.save()
      res.status(201).json(patientUpdate)
    } catch (error) {
       res.status(400).json({ message: error.message})
    }
})

// patch test information by id
router.patch('/:id/tests/:testid', getTest, async(req, res)=>{
   // update the reading
   if (req.body.reading != null) {
      res.test.reading = req.body.reading
   }
   // update the date
   if (req.body.date != null) {
      res.test.date = req.body.date
   }
   // update the nurse
   if (req.body.nurse_name != null) {
      res.test.nurse_name = req.body.nurse_name
   }
   // update the type
   if (req.body.type != null) {
      res.test.type = req.body.type
   }
   // update the category
   if (req.body.category != null) {
      res.test.category = req.body.category
   }
   
   try {
      const updatedTest = await res.test.save()
      res.json(updatedTest)
   }catch(error){
      res.status(400).json({message: error.message})
   }
})
// add delete function, removes the test from tests array
router.delete('/:id/tests/:testid', getPatient, async(req, res)=>{
   // first check if the test is exists, using test id
   const testExist = res.patient.tests.find(test=>test.id == req.params.testid)
   if (!testExist) {
      res.status(404).json({ message: "Test doesn't exist!"})
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
async function getTest(req, res, next){
   let test1
   try{
     test1 = await Test.findById(req.params.testid)
     if (test1 == null){
      return res.status(404).json({messsage: 'Cannot find patient'})
     }
   }catch(error){
      return res.status(500).json({ message: error.message})
   }
   res.test = test1
   next()
}


export default router;