import express from "express";

import { getUsers, deleteUserById, updateUserById, getUserById} from "../db/users";


export const getAllUsers = async (req: express.Request, res: express.Response) => {
    try {
           const users = await getUsers();
    return res.status(200).json({message: "users fetched successfully", users: users }); 
    } catch(error) {
        console.log(error)
        return (res.status(500)).json({ message: "Server error", status: 500 });
    }

}   

export const deleteUser = async (req: express.Request, res: express.Response) => {
    try {
        const { id } = req.params;
        const user = await deleteUserById(id);
        return res.status(200).json({message: "user deleted successfully", user: user }); 
    } catch(error) {
        console.log(error)
       return (res.status(500)).json({ message: "Server error", status: 500 });
    }
}

export const updateUser = async (req: express.Request, res: express.Response) => {
    try {
        const { id } = req.params;
        const updatedUser = await updateUserById(id, req.body);
        await updatedUser.save();
        return res.status(200).json({message: "user updated successfully", user: updatedUser }); 
    } catch(error) {
        console.log(error)
         return (res.status(500)).json({ message: "Server error", status: 500 });
    }
}