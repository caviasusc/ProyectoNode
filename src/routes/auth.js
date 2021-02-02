const router = require("express").Router();
const authMid = require('../middlewares/auth')
const userCRUD =require('../CRUD/userCRUD');
const loginCRUD = require('../CRUD/loginCRUD')

router.post(
    "/signup",
    [
        authMid.validateNewUser,
        authMid.isNotEmail,
    ],
    userCRUD.createUser    
);

router.post(
    "/login", 
    [
        authMid.validateUser,
        authMid.isUser,
        authMid.comparePassword,
    ],
     loginCRUD.createToken
);

module.exports = router
