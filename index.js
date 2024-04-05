const express = require("express");
const cors = require('cors')
const { connection } = require("./db");
const { userRouter } = require("./routes/userRoutes");
const { NoteRouter } = require("./routes/noteRoutes");
require("dotenv").config()
const port = process.env.PORT
const app = express()

app.use(cors()) 
app.use(express.json())
app.use("/user", userRouter)
app.use("/note", NoteRouter)


app.get("/", (req, res) =>{
    res.send({
        message: "Woohoo It works folks !!"
    })
})


app.listen(port, async() => {

    try {
        await connection
        console.log("databse is connected")
    } catch (error) {
        console.log(error)
    }


    console.log("Server is running on port number", port)
})