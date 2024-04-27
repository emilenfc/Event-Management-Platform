import express from "express";
import BookingModel from "../db/booking";
import { get } from "lodash";


export const createBooking = async (req: express.Request, res: express.Response) => {
    try {
        const currentUserId = get(req, "identity._id") as string;
        const eventId = req.params.eventId;
        const { numberOfTickets } = req.body;
        
        const booking = await BookingModel.create({
            event: eventId,
            user: currentUserId,
            numberOfTickets
        });
        return res.status(201).json({ message: "booking created successfully", booking: booking });
    } catch (error) {
        console.log(error)
        return (res.status(500)).json({ message: "Server error", status: 500 });
    }
}
export const getBookings = async (req: express.Request, res: express.Response) => {
    try {
          const currentUserId = get(req, "identity._id") as string;
         const bookings = await BookingModel.find({user: currentUserId});
    return res.status(200).json({message: "bookings fetched successfully", bookings: bookings});
    } catch(error) {
        console.log(error)
        return (res.status(500)).json({ message: "Server error", status: 500 });
    }   
}   

export const getBookingById = async (req: express.Request, res: express.Response) => {
    try {
            const { id } = req.params;
        const booking = await BookingModel.findById(id);
        if(!booking) {
            return res.status(404).json({message: "booking not found", status: 404});
        }
    return res.status(200).json({message: "booking fetched successfully", booking: booking});
    } catch {
        return (res.status(500)).json({ message: "Server error", status: 500 });
    }
}

export const deleteBooking = async (req: express.Request, res: express.Response) => {
    try {
        const { id } = req.params;
        const currentUserId = get(req, "identity._id") as string;
        const booking = await BookingModel.findById(id);
        if(!booking) {
            return res.status(404).json({message: "booking not found"});
        }
        
        if (currentUserId !== booking.user._id.toString()) {
            return (res.status(403)).json({ message: "Not authorized", status: 403 });
        }
        const data = await BookingModel.findByIdAndDelete(id);
        return res.status(200).json({message: "booking deleted successfully", booking: data});
    } catch {
        return (res.status(500)).json({ message: "Server error", status: 500 });
    }
}

export const updateBooking = async (req: express.Request, res: express.Response) => {
    try {
        const { id } = req.params;
        const booking = await BookingModel.findByIdAndUpdate(id, req.body);
        return res.status(200).json({message: "booking updated successfully", booking: booking});
    } catch {
        return (res.status(500)).json({ message: "Server error", status: 500 });
    }
}
