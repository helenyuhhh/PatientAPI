import express from "express"
import patient from "../models/patients.js"
const router = express.Router();
// getting all patients
router.get('/', (req, res) =>{
   res.send('hello world')
})
// getting one patients by id?
router.get('/:id', (req, res)=>{
   res.send(req.params.id)
})
// creating one
router.post('/', (req, res)=>{

})
// updating one
router.patch('/', (req, res)=>{

})
// deleting one
router.delete('/:id', (req, res)=>{

})

export default router;