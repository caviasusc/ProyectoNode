const Joi = require("@hapi/joi")
const User = require("../models/User");
const bcypt = require("bcrypt");

const schemaRegister = Joi.object({
    first_name: Joi.string().max(128).required(),
    last_name: Joi.string().min(6).max(128).required(),
    email: Joi.string().min(6).max(128).required().email(),
    password: Joi.string().min(6).required(),
    birthday: Joi.date()
})

exports.validateNewUser = async (req, res, next) => {
    const { error } = schemaRegister.validate(req.body)
    if (error) {
        console.log(error)
        return res.status(400).json({
            error: error.details[0].message
        })
    }
    next();
}

exports.isNotEmail = async (req, res, next) => {
    const email = await User.findOne({ email: req.body.email })
    if (email) {
        return res.status(400).json({
            error: true,
            message: "email ya registrado"
        })
    }
    next()
}

const schemaLogin = Joi.object({
    email: Joi.string().min(6).max(255).required().email(),
    password: Joi.string().min(6).max(1024).required()
})

exports.validateUser = async (req, res, next) => {
    const { error } = schemaLogin.validate(req.body)
    if (error) {
        return res.status(400).json({
            error: error.details[0].message
        })
    }
    next()
}

exports.isUser = async (req, res, next) => {
    const user = await User.findOne({ email: req.body.email });    if (!user) {
        return res.status(400).json({
            error: "usuario no encontrado"
        })
    }
    next()
}

exports.comparePassword = async (req, res, next) => {
    const user = await User.findOne({ email: req.body.email });
    const valid_password = await bcypt.compare(req.body.password, user.password)
    if (!valid_password) return res.status(401).json({ error: "contraseña incorrecta" })
    next()
}


