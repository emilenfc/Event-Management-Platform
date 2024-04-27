import mongoose from "mongoose";

export interface IUser {
    _id: mongoose.Types.ObjectId;
  username: string;
  firstName: string;
  secondName: string;
    email: string;
    authentication: {
        password: string;
        salt: string;
        sessionToken?: string;
    };
    isAdmin?: boolean;
}

const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true
    },
    secondName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },

    authentication: {
        password: {
            type:
                String, required: true
        },
        salt: {
            type: String,
            required: true
        },
        sessionToken: {type: String}
    },
    isAdmin: {
        type: Boolean,
        default: false
    }, 
});
const UserModel = mongoose.model<IUser>('User', userSchema);
export default UserModel

export const getUsers = () => UserModel.find();
export const getUserByEmail = (email: string) => UserModel.findOne({ email });
export const getUserBySessionToken = (sessionToken: string) => UserModel.findOne({ "authentication.sessionToken": sessionToken });
export const getUserById = (id: string) => UserModel.findById(id);
export const createUser = (values: Record<string, any>) => new UserModel(values).save().then((user) => user.toObject());
export const deleteUserById = (id: string) => UserModel.findOneAndDelete({ _id: id })
export const updateUserById = (id: string, values: Record<string, any>) => UserModel.findByIdAndUpdate({ _id: id }, values)