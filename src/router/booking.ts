import express from "express";
import { createBooking, getBookings, getBookingById, deleteBooking, updateBooking } from "../controllers/booking";
import {isOwner, isAuthenticated } from "../middlewares";


export default (router: express.Router) => {
    router.post('/bookings/:eventId', isAuthenticated, createBooking);
    router.get('/bookings', isAuthenticated, getBookings);
    router.get('/bookings/:id', isAuthenticated, getBookingById);
    router.delete('/bookings/:id', isAuthenticated, isOwner, deleteBooking);
    router.patch('/bookings/:id', isAuthenticated, isOwner, updateBooking);
    
}