const Document = require('../models/Documents');

exports.createDoc = async (req, res)=>{
    try{
        const doc = new Document({
            name: req.file.originalname,
            url: req.file.path,
            description: req.body.description,
            owner: req.user.email,
            size: req.file.size,
            type: req.file.mimetype
        })
        const docDB = await doc.save()
        res.json({
            error: null,
            data: docDB
        })
    }catch (error){
        res.status(400).json(error)
        console.log(error)
    }
}

exports.getAllDocs = async (req, res)=>{
    try {
        const docs = await Document.find({owner:req.user.email})
        res.json({
            error: null,
            data: docs
        })
    } catch(error){
        res.status(400).json(error)
    }
}

exports.getDoc =async (req, res)=>{
    try{
        const doc = await Document.findById(req.body.id)
        res.json({
            error: null,
            data: doc
        })

    } catch(error){
        res.status(400).json(error)
    }
}

exports.deleteDoc = async(req, res)=>{
    try{
        Document.findByIdAndDelete(req.body.id, function (err) {
            if (err) console.log(err);
            res.json({
                error: null,
                message: "Eliminado"
            });
        });
        
    } catch (error) {

        res.status(400).json(error)

    }
}