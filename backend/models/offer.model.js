const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const offerSchema = new Schema({
    offerId: {
        type: String,
        required: true,
        unique: true,                    
        trim: true,
        minlength: 3            
    },
    offerName: {
        type: String,
        required: true,
        unique: true,        
        trim: true,
    },
    offerCode: {
        type: String,
        required: true,
        unique: true,
        maxlength: 8
    },
    offerDescription: {
        type: String,
        required: true,
        trim: true
    },
    specialNotice: {
        type: String,
        trim: true,
    },
    startingDate: {
        type: Date,
        required: true
    },
    endingDate: {
        type: Date,
        required: true
    },
}, {
    timestamps: true,
});

const Offer = mongoose.model('Offer', offerSchema);

module.exports = Offer;                                                       