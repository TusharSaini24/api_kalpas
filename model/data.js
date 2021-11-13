const mongoose = require('mongoose')

const dataSchema = mongoose.Schema({
    name:{
        type: String,
        required:true,
        trim:true
    },
    email:{
        type: String,
        required:true,
        trim:true
    },
    salary:{
        type: Number,
        required:true,
        trim:true
    },
    filename:{
        type: String,
        required:true,
        trim:true
    }
})


module.exports = mongoose.model('Data',dataSchema)