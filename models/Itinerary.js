const { Schema, model } = require('mongoose');

const ItinerarySchema = new Schema({
    creator: {
        type: String,
        required: true,
    },
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    image: {
        type: String,
        required: false,
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

    purchaser_ids:[],
    ratings: [
        {
            // itinerary: {
            //     type: String,
            //     required: true,
            // },
            rating: {
                type: Number,
                required: true,
            } 
        }
    ]
});

const Itinerary = model('Itinerary', ItinerarySchema);

module.exports = Itinerary;
