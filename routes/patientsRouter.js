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
router.get('/:id', (req, res)=>{
   res.send(req.params.id)
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
// updating one
router.patch('/', (req, res)=>{

})
// deleting one
router.delete('/:id', (req, res)=>{

})

export default router;