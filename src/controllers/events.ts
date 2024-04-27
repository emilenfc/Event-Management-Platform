import express from "express";
import EventModel from "../db/events";

export const createEvent = async (req: express.Request, res: express.Response) => {
    try {
        const { title, description, date, location, price, tiketsAvailable, image } = req.body;
        
        const event = await EventModel.create({
            title,
            description,
            date,
            location,
            price,
            tiketsAvailable,
            image
        });
        return res.status(201).json({ message: "event created successfully", event:event });
    } catch (error) {
        console.log(error)
        return (res.status(500)).json({ message: "Server error", status: 500 });
    }
}
export const getEvents = async (req: express.Request, res: express.Response) => {
    try {
         const events = await EventModel.find();
    return res.status(200).json({message: "events fetched successfully", events: events});
    } catch(error) {
        console.log(error)
        return (res.status(500)).json({ message: "Server error", status: 500 });
    }
   
}

export const getEnentById = async (req: express.Request, res: express.Response) => {
    try {
            const { id } = req.params;
    const event = await EventModel.findById(id);
    return res.status(200).json({message: "event fetched successfully", event: event});
    } catch {
        return (res.status(500)).json({ message: "Server error", status: 500 });
    }
}

export const deleteEvent = async (req: express.Request, res: express.Response) => {
    try {
        const { id } = req.params;
        const event = await EventModel.findByIdAndDelete(id);
        return res.status(200).json({message: "event deleted successfully", event: event});
    } catch {
        return (res.status(500)).json({ message: "Server error", status: 500 });
    }
}

export const updateEvent = async (req: express.Request, res: express.Response) => {
    try {
        const { id } = req.params;
        const event = await EventModel.findByIdAndUpdate(id, req.body);
        return res.status(200).json({message: "event updated successfully", event: event});
    } catch {
        return (res.status(500)).json({ message: "Server error", status: 500 });
    }
}