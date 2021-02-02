const User = require("../models/User");
const jwt = require("jsonwebtoken")

exports.createToken = async (req, res) => {
    try {
        const user = await User.findOne({ email: req.body.email });
        const token = jwt.sign({
            id: user._id,
            email: user.email
        },
            process.env.TOKEN_SECRET
        )

        res.header('auth-token', token).json({
            error: null,
            token: token,
            name: user.name
        })
    } catch (error) {
        res.status(400).json(error)
    }
}

exports.getPayload = async (req, res) => {
    const token = req.header('auth-token')
    try {
        const verificar = jwt.verify(token, process.env.TOKEN_SECRET)
        req.user = verificar
    } catch {
        res.status(401).json({ error: 'acceso denegado' })
    }
}