import express from 'express';
import { configDotenv } from 'dotenv';
import connectDB from './config/db.js';
import authRoutes from "./routes/authRoutes.js";

configDotenv();
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// MongoDb Connection
connectDB().then((host) => {
    console.log("Connected to MongoDB at: " + host);
})

app.use("/api/auth/", authRoutes);

app.get('/serverHealth', (req, res) => {
    res.send("Server is Healthy and Running...")
})

app.listen(process.env.PORT || 5000, () => {
    console.log("Server is running on port " + (process.env.PORT || 5000));
});