const router = require('express').Router();
const multer = require('multer')
const docCRUD = require('../CRUD/docCRUD');

const storage = multer.diskStorage({
    destination: function (req, file,cb) {
        cb(null, './uploads')
    },
    filename: function(req,file,cb){
        const datetime = new Date().toISOString().replace(/:|\./g, '')
        cb(null, datetime + '-' + file.originalname)
    },
})

const upload = multer({ storage: storage});


router.post(
    '/',    
    upload.single('document'),
    docCRUD.createDoc
)

router.get(
    '/all',
    docCRUD.getAllDocs
)

router.get(
    '/',
    docCRUD.getDoc
)

router.delete(
    '/delete',
    docCRUD.deleteDoc
)

module.exports = router

