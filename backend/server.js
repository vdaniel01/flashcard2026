require("dotenv").config()
const express = require('express');
const mongoose = require("mongoose")
const cardRoutes = require("./routes/cards")
const userRoutes = require("./routes/user")
const app = express();

app.use(express.json())

app.use((req, res, next) => {
    console.log(req.path, req.method)
    next()
})

app.use("/api/cards", cardRoutes)
app.use("/api/user", userRoutes)

mongoose.connect(process.env.DB_URI)
.then(() => {
    app.listen(process.env.PORT, () => {
        console.log("connected to db and listening on port", process.env.PORT)
    })
})
.catch((err)=>{
    console.log(err)
})
