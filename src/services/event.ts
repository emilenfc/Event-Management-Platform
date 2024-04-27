import express from "express";
import EventModel  from "../db/events";


export const findEventbyId= async ( id: string) => {
   
    const event = await EventModel.findById(id);

    return event
}