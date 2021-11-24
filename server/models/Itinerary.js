const { Schema } = require('mongoose');

const itinerarySchema = new Schema({
    creator: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    Price: {
        type: Number,
        required: true,
    },
    days: [
        {
            day_number: Number,
            activities: [{
                where: String,
                what: String,
                cost: Number,
            }],
            city: String
        }
    ],

    purchasers: [id],
});

module.exports = itinerarySchema;
