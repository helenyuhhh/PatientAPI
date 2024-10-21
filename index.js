import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import router from "./routes/patientsRouter.js";

const app = express();
app.use(bodyParser.json());
dotenv.config();

const PORT = process.env.PORT || 8000;
const mongourl = process.env.MONGO_URL;

mongoose.connect(mongourl).then(()=>{
    console.log("Connection success");
    app.listen(PORT,()=>{
        console.log(`Server is running on port ${PORT}`)
    })
}).catch((error)=>console.log(error));
app.use("/api/patients", router);