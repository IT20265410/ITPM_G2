const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const teamSchema = new Schema({
    _id: {
        type: String,
        required: true,
        unique: true,
        trim: true,

    },
    name: {
        type: String,
        required: true,
        trim: true,
    },
    nic: {
        type: String,
        required: true,
        maxlength:12, 
        minlength:9, 
        unique: true,
        trim: true,
    },
    age: {
        type: Number,
        required: true,
        trim: true,

    },
    gender: {
        type: String,
        required: true,
        trim: true,
    },
    phone: {
        type: Number,
        required: true,
        minlength: 10,
        unique: true,
        trim: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
    },
    address: {
        type: String,
        required: true,
        trim: true,
    }
}, {
    timestamps: true,
})

const Team = mongoose.model("Team", teamSchema);

module.exports = Team;