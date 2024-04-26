import express from "express";
import {get,merge} from "lodash";
import { getUserBySessionToken } from "../db/users";

export const isAuthenticated = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
    try {
        
        const sessionToken = req.cookies["user"];
        if (!sessionToken) {
            return (res.status(403)).json({ message: "Not authenticated", status: 403 }).end()
        }
    const existingUser = await getUserBySessionToken(sessionToken);
    if (!existingUser) {
        return (res.status(403)).json({ message: "Not authenticated", status: 403 }).end() ;
    }
    merge(req, { identity: existingUser });
        return next();
        
    } catch (error) {
        return (res.status(500)).json({ message: "Server error", status: 500 }).end()
    }
}

export const isOwner = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
    try {
        const { id } = req.params;
        const currentUserId = get(req, "identity._id") as string;
        if(!currentUserId) {
            return (res.status(403)).json({ message: "not allowed", status: 403 }).end()
        }

        if (currentUserId.toString() !== id) {
            
            return (res.status(403)).json({ message: "Not authorized", status: 403 }).end() 
        }
        return next();
    } catch (error) {
        return (res.status(500)).json({ message: "Server error", status: 500 }).end()
    }

}