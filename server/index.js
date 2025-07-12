import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import colors from 'colors'
import userRoutes from "./routes/Users.js";
import questionRoutes from "./routes/Questions.js";
import answerRoutes from "./routes/Answer.js";
import adminRoutes from "./routes/Admin.js";
import notificationRoutes from "./routes/Notifications.js";
import connectDB from './config/connectDB.js'

dotenv.config()
connectDB()

const PORT = 5000

const app = express();
app.use(express.json({ limit: "30mb", extended: true }))
app.use(express.urlencoded({ limit: "30mb", extended: true }))
app.use(cors())

app.use("/user", userRoutes);
app.use("/questions", questionRoutes);
app.use("/answer", answerRoutes);
app.use("/admin", adminRoutes);
app.use("/notifications", notificationRoutes);


app.get('/', (req, res) => {
  res.send("Hello there , This is to test the server is running . Thank you for visiting - team 3839")
})

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`.bgBlue.white)
})
