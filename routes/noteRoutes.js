const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { authenticator } = require("../middlewares/authenticator");
const { NoteModel } = require("../models/NoteModel.js");

const NoteRouter = express.Router();
NoteRouter.use(authenticator)

NoteRouter.get("/", async (req, res) => {

    let token = req.headers.authorization
    jwt.verify(token, "Ice", async (err, decode) => {
        try {
            let data = await NoteModel.find({ user: decode.userId })
            res.send({
                data: data,
                message: "success",
                status: 1
            })
        } catch (error) {
            res.send({
                message: error.message,
                status: 0
            })
        }
    })

    // res.send({
    //     message: "All the Notes",
    //     status: 1
    // })
})

NoteRouter.post("/create", async (req, res) => {
    try {
        let note = new NoteModel(req.body)
        await note.save()
        res.send({
            message: "Note created",
            status: 1
        })
    } catch (error) {
        res.send({
            message: error.message,
            status: 0
        })
    }
})


NoteRouter.patch("/", async (req, res) => {
    let { id } = req.headers
    try {
        await NoteModel.findByIdAndUpdate({ _id: id }, req.body)
        res.send({
            message: "Note updated",
            status: 1
        })
    } catch (error) {
        res.send({
            message: error.message,
            status: 0
        })
    }
})

NoteRouter.delete("/", async (req, res) => {
    let { id } = req.headers
    try {
        await NoteModel.findByIdAndDelete({ _id: id })
        res.send({
            message: "Note deleted",
            status: 1
        })
    } catch (error) {
        res.send({
            message: error.message,
            status: 0
        })
    }
})



module.exports = { NoteRouter };
