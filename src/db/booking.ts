import mongoose from "mongoose";
import { IUser } from "./users";

export interface IBooking extends Document {
  event: mongoose.Types.ObjectId;
  user: IUser // Ensure this is the correct reference to the User model
  numberOfTickets: number;
}

const bookingSchema = new mongoose.Schema({
    event: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Event',
        required: true

    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    numberOfTickets: {
        type: Number,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});
const BookingModel = mongoose.model<IBooking>('Booking', bookingSchema);
export default BookingModel