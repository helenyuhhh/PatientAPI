import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import router from "./routes/patientsRouter.js";
import swaggerJsDoc from 'swagger-jsdoc';
import swaggerUI from 'swagger-ui-express';
import cors from'cors'

const app = express();
const swaggerOptions = {
  swaggerDefinition: {
    
    info: {
      title: 'Patient API',
      version: '1.0.0',
      description: 'API documentation',
      contact: {
        name: 'MAPD713-Team 7',
      },
    },
    servers: [
      {
        // url: 'http://172.16.7.126:8080', 
        url : 'https://mapd713patientapi-g3dpdtdthvcbhwbh.canadacentral-01.azurewebsites.net/api/patients'
      },
    ],
  },
  apis: ['./routes/*.js', './models/*.js'], 
};
const swaggerDocs = swaggerJsDoc(swaggerOptions)
app.use(bodyParser.json());
app.use(cors({
  origin:["https://mapd713patientapi-g3dpdtdthvcbhwbh.canadacentral-01.azurewebsites.net/api/patients"]
}))
app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerDocs))
dotenv.config();
// running now on my machineS
const PORT = process.env.PORT || 8080
const mongourl = process.env.MONGO_URL

mongoose.connect(mongourl).then(()=>{
    console.log("Connection success")
    app.listen(PORT, '0.0.0.0',()=>{
      console.log(`Server is running on ${PORT}`)
  })
}).catch((error)=>console.log(error))
app.use("/api/patients", router)
