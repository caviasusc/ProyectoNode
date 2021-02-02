const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    first_name: {
        type: String,
        required: true,
        max: 128
    },
    last_name: {
        type: String,
        required: true,
        min: 6,
        max: 128
    },
    email: {
        type: String,
        required: true,
        unique:true,
        min: 6,
        max: 128
    },
    password: {
        type: String,
        required: true,
        minlength: 6
    },
    date_created: {
        type: Date,
        default: Date.now
    },
    birthday: {
        type: Date
    }
})

module.exports = mongoose.model('User', userSchema);