import express from "express";
import EventModel from "../db/events";
import { IEvent, IUser } from "interfaces";
import { get } from "lodash";
import {findEventbyId} from "../services/event";
import BookingModel from "../db/booking";


export const createEvent = async (req: express.Request, res: express.Response) => {
    const currentUserId = get(req, "identity._id") as string;

    try {
        const newEvent = req.body as IEvent;
  
console.log(newEvent)
        const event = await EventModel.create({
            ...newEvent,
            creator: currentUserId
        });

        return res.status(201).json({ message: "event created successfully", event:event });
    } catch (error) {

        if(error.code === 11000) {
            return (res.status(409)).json({ message: "event already with the same name exists", status: 409 });
        }
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
        const event = await findEventbyId(id);
        if (!event) {    
            return (res.status(404)).json({ message: "event not found", status: 404 });
        }
    return res.status(200).json({message: "event fetched successfully", event: event});
    } catch {
        return (res.status(500)).json({ message: "Server error", status: 500 });
    }
}

export const deleteEvent = async (req: express.Request, res: express.Response) => {
    try {
        const { id } = req.params;
        
           const event = await findEventbyId(id);
        if (!event) {    
            return (res.status(404)).json({ message: "This event not found", status: 404 });
        }

        const data = await EventModel.deleteOne({ _id: id });

        return res.status(200).json({message: "event deleted successfully", data: data});
    } catch {
        return (res.status(500)).json({ message: "Server error", status: 500 });
    }
}

export const updateEvent = async (req: express.Request, res: express.Response) => {
    try {
        const { id } = req.params;
                const event = await findEventbyId(id);
        if (!event) {    
            return (res.status(404)).json({ message: "This event not found", status: 404 });
        }
        const data = await EventModel.updateOne({ _id: id, ...req.body });
        return res.status(200).json({message: "event updated successfully", event: data});
    } catch (error) {
         if(error.code === 11000) {
            return (res.status(409)).json({ message: "event already with the same name exists", status: 409 });
        }
        return (res.status(500)).json({ message: "Server error", status: 500, error: error });
    }
}

export const getEventWithBookings = async (req: express.Request, res: express.Response) => {
  try {
      const eventId = req.params.eventId;
      const event = await EventModel.findById(eventId);
      if (!event) {
        console.log(res)
        return res.status(404).json({ message: 'Event not found' });
        
    }
    const bookings = await BookingModel.find({ event:eventId });
    return res.json({ event, bookings });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const getAttendeeDetails = async (req: express.Request, res: express.Response) => {
  try {
    const eventId = req.params.eventId;
    const event = await EventModel.findById(eventId);
    if (!event) {
      return res.status(404).json({ message: 'Event not found' });
    }
    const bookings = await BookingModel.find({ event:eventId }).populate('user');
    const attendees = bookings.map((booking) => ({
        userId: booking.user._id,
        Firstname: booking.user.firstName,
        Secondname: booking.user.secondName,
        email: booking.user.email,
       quantity: booking.numberOfTickets
    }));
    return res.json({ event, attendees });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};