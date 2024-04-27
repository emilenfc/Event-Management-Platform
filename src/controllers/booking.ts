import express from "express";
import BookingModel from "../db/booking";


export const createBooking = async (req: express.Request, res: express.Response) => {
    try {
        const { event, user, numberOfTickets } = req.body;
        
        const booking = await BookingModel.create({
            event,
            user,
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
         const bookings = await BookingModel.find();
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
    return res.status(200).json({message: "booking fetched successfully", booking: booking});
    } catch {
        return (res.status(500)).json({ message: "Server error", status: 500 });
    }
}

export const deleteBooking = async (req: express.Request, res: express.Response) => {
    try {
        const { id } = req.params;
        const booking = await BookingModel.findByIdAndDelete(id);
        return res.status(200).json({message: "booking deleted successfully", booking: booking});
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
