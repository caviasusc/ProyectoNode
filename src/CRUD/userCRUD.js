const User = require("../models/User");
const bcypt = require("bcrypt");


exports.createUser = async (req, res) => {

    try {
        const saltos = await bcypt.genSalt(10);
        const hashed_password = await bcypt.hash(req.body.password, saltos);

        const user = new User({
            first_name: req.body.first_name,
            last_name: req.body.last_name,
            email: req.body.email,
            password: hashed_password,
            birthday: req.body.birthday
        })
        const userDB = await user.save()
        res.json({
            error: null,
            data: userDB
        })
    } catch (error) {
        res.status(400).json(error)
    }
}

exports.getUser = async (req, res) => {
    try {

        const user = await User.findOne({ email: req.user.email });

        res.json({
            data: {
                user: user
            }
        })
    } catch (error){

        res.status(400).json(error)
    }
}

exports.updateUser = async(req, res)=>{
    try{
        const update = {
            first_name: req.body.first_name,
            last_name: req.body.last_name,
            birthday: req.body.birthday
        }
        const user = await User.findByIdAndUpdate(req.body.id)
    }catch(error){
        res.status(400).json(error)
    }
}
