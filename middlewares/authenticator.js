const jwt = require("jsonwebtoken")

function authenticator(req, res, next) {
    const token = req.headers.authorization
    jwt.verify(token, "Ice", (err, decode) => {
        if (err) return res.send({
            message: "Token Invalid, Login again!!",
            status: 2
        })
        if (decode) {
            req.body.user = decode.userId
            next()
        } else {
            res.send({
                message: "Token Invalid, Login again!!",
                status: 2
            })
        }
    })
}

module.exports = { authenticator }