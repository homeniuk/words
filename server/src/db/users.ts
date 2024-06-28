import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    username: {type: String, required: true},
    email:    {type: String, required: true, unique: true},
    password: {type: String, required: true}
});

export const UserModel =  mongoose.model('User', UserSchema);

export const getUsers               = ()                    => UserModel.find();
export const getUserById            = (id:string)           => UserModel.findById(id);
export const deleteUserById         = (id:string)           => UserModel.findByIdAndDelete({_id: id});
export const getUserByEmail         = (email: string)       => UserModel.findOne({email});
export const getUserBySessionToken  = (sessionToken: string)=> UserModel.findOne({sessionToken});

export const createUser = (data: Record<string, any>) => {
    const user = UserModel.create(data);
    return user;
};
export const updateUserById = (id: string, data: Record<string, any>) => {
    const user = UserModel.findByIdAndUpdate(id, data);
    return user;
}