import express from "express";
import { getEvents, createEvent, getEnentById, deleteEvent, updateEvent } from "../controllers/events";

import { isAuthenticated, isOwner } from "../middlewares";


export default (router: express.Router) => {
    router.get('/events',  getEvents); 
    router.post('/events', isAuthenticated, createEvent);
    router.get('/events/:id', getEnentById);
    router.delete('/events/:id', deleteEvent);
    router.patch('/events/:id', updateEvent);
    
}   