import express from "express";

import { createUser, getUserByEmail } from "../db/users";
import { authentication, random } from "../helpers";

export const login = async(req: express.Request, res: express.Response) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return (res.status(400)).json({ message: "All fields are required", status: 400 })
        }
        const user = await getUserByEmail(email).select('+authentication.salt +authentication.password');

        if (!user) {
            return (res.status(404)).json({ message: "User not found", status: 404 })
        }
        const expectedHash = authentication(user.authentication.salt, password);
        if (expectedHash !== user.authentication.password) {
            return (res.status(403)).json({ message: "Wrong password", status: 403 })
        }
        const salt = random();
        user.authentication.sessionToken = authentication(salt, user._id.toString());
        await user.save();
        res.cookie('user', user.authentication.sessionToken, { domain: 'localhost', path: '/' });
        return res.status(200).json({ message: "login successfully",status: 200, user }).end()  
    } catch (error) {
        console.log(error)
        return (res.status(500)).json({ message: "Server error", status: 500 })
    }   
}

export const register = async(req: express.Request, res: express.Response) => { 
    try {
        const { firstName, secondName, email, password } = req.body;
        if (!firstName || !secondName || !email || !password) {
            return (res.status(400)).json({ message: "All fields are required", status: 400 })
        }
        const existingUser = await getUserByEmail(email);
        if (existingUser) {
            return (res.status(409)).json({ message: "User already exists", status: 409} )
    
        }

        const salt = random();
        const user = await createUser({
            firstName,
            secondName,
            email,
            authentication: {
                salt,
                password: authentication(salt, password)
            }
        });

        return res.status(200).json({message: "Account created successfully",status: 200,user}).end()
    } catch (error) {
        console.log("error during registration", error)
        return (res.status(400)).json({ message: "Something went wrong", status: 400 }).end()
    }
}