import express from "express";
import { getEvents, createEvent, getEnentById, deleteEvent, updateEvent,getEventWithBookings,getAttendeeDetails } from "../controllers/events";

import { isAuthenticated, isAdmin } from "../middlewares";


export default (router: express.Router) => {
    router.get('/events',  getEvents); 
    router.post('/events', isAuthenticated,isAdmin, createEvent);
    router.get('/events/:id', getEnentById);
    router.delete('/events/:id', isAuthenticated, isAdmin,deleteEvent);
    router.patch('/events/:id', isAuthenticated,isAdmin, updateEvent);
    router.get('/events/booking/:eventId', isAuthenticated,isAdmin, getEventWithBookings);
    router.get('/events/attendee/:eventId', isAuthenticated, isAdmin, getAttendeeDetails);
}   