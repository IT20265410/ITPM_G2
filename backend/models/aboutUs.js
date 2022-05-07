const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const aboutUsSchema = new Schema({

    _id: {
        type: String,
        required: true,
        unique: true,
        trim: true,

    },
   
    comDesc: {
        type: String,
        required: true,
        unique: true,
        trim: true,
    },
    
    vision: {
        type: String,
        required: true,
        unique: true,
        trim: true,
    },

    mission: {
        type: String,
        required: true,
        unique: true,
        trim: true,
    },

    lNews: {
        type: String,
        required: true,
        unique: true,
        trim: true,
    }

}, {
    timestamps: true,
})

const Aboutus = mongoose.model("Aboutus", aboutUsSchema);

module.exports = Aboutus;