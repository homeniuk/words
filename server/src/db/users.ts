import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    username: {type: String, required: true},
    email:    {type: String, required: true, unique: true},
    password: {type: String, required: true}
});

export const UserModel =  mongoose.model('User', UserSchema);

export const getUsers               = async ()                    => UserModel.find();
export const getUserById            = async (id:string)           => UserModel.findById(id);
export const deleteUserById         = async (id:string)           => UserModel.findByIdAndDelete({_id: id});
export const getUserByEmail         = async (email: string)       => UserModel.findOne({email});
export const getUserBySessionToken  = async (sessionToken: string)=> UserModel.findOne({sessionToken});

export const createUser = async (data: Record<string, any>) => {
    const user = UserModel.create(data);
    return user;
};
export const updateUserById = async (id: string, data: Record<string, any>) => {
    const user = UserModel.findByIdAndUpdate(id, data);
    return user;
}