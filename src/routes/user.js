const router = require('express').Router();
const userCRUD = require('../CRUD/userCRUD')

router.get('/', userCRUD.getUser)

router.put(
    '/edit',
    [
        
    ]
)

module.exports = router

