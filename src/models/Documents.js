const mongoose =require('mongoose')

const documentSchema = mongoose.Schema({
    name:{
        type: String,
        required: true,
        max: 128 
    },
    url: {
        type: String,
        required: true
    },
    description:{
        type: String,
        max: 1024,
    },
    size:{
        type: Number,
        required: true
    },
    type:{
        type: String,
        required: true,
    },
    owner:{
        type: String,
        required: true
    },
    date_uploaded:{
        type: Date,
        default: Date.now
    }
})

module.exports = mongoose.model('Document', documentSchema)