const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const rentvSchema = new Schema({
    cid: {
        type: String,
        required: true,
        unique: true,
        trim: true

    },
    cname: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },

    vid: {
        type: String,
        required: true,
        unique: true,
        trim: true

    },

    vname: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },

   
    idate: {
        type: Date,
        required: true
    },

    ddate: {
        type: Date,
        required: true
    },

    status: {
        type: String
    }

}, {
    timestamps: true,
})

const Rentv = mongoose.model("Rentv", rentvSchema);

module.exports = Rentv;