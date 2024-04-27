import mongoose from "mongoose";

const eventSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
    },
    date: {
        type: Date,
        required: true
    },
    location: {
        type: String,
        required: true
    },
    creator: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },

    price: {
        type: Number,
    },
    tiketsAvailable: {
        type: Number,
        required: true
    },
    image: {
        type: String
    },
    bookings: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Booking'
        }
    ],
    createdAt: {
        type: Date,
        default: Date.now
    }
});
const EventModel = mongoose.model('Event', eventSchema);
export default EventModel

