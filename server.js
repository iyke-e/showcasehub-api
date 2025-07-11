const express = require("express")
const mongoose = require("mongoose")
const dotenv = require("dotenv")
const cors = require("cors")

const authRoutes = require("./routes/authRoutes")
const projectRoutes = require("./routes/ProjectRoutes")
const errorHandler = require("./middlewares/errorHandler")

dotenv.config()

const app = express()


app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))


app.use("/auth", authRoutes)
app.use("/projects", projectRoutes)
app.use("/public", projectRoutes)

app.use(errorHandler)

const PORT = process.env.PORT || 5000
mongoose
    .connect(process.env.MONGO_URI)
    .then(() => {
        app.listen(PORT, () => {
            console.log(`Server running on http://localhost:${PORT}`)
        })
    })
    .catch((err) => console.error("DB connection failed", err))