"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateUserById = exports.createUser = exports.getUserBySessionToken = exports.getUserByEmail = exports.deleteUserById = exports.getUserById = exports.getUsers = exports.UserModel = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const UserSchema = new mongoose_1.default.Schema({
    username: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true }
});
exports.UserModel = mongoose_1.default.model('User', UserSchema);
const getUsers = () => exports.UserModel.find();
exports.getUsers = getUsers;
const getUserById = (id) => exports.UserModel.findById(id);
exports.getUserById = getUserById;
const deleteUserById = (id) => exports.UserModel.findByIdAndDelete({ _id: id });
exports.deleteUserById = deleteUserById;
const getUserByEmail = (email) => exports.UserModel.findOne({ email });
exports.getUserByEmail = getUserByEmail;
const getUserBySessionToken = (sessionToken) => exports.UserModel.findOne({ sessionToken });
exports.getUserBySessionToken = getUserBySessionToken;
const createUser = (data) => {
    const user = exports.UserModel.create(data);
    return user;
};
exports.createUser = createUser;
const updateUserById = (id, data) => {
    const user = exports.UserModel.findByIdAndUpdate(id, data);
    return user;
};
exports.updateUserById = updateUserById;
//# sourceMappingURL=users.js.map