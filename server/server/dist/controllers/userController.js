"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.login = exports.register = void 0;
const users_1 = require("../db/users");
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const ErrorHandler_1 = require("../middlewares/ErrorHandler");
const register = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { username, email, password } = req.body;
        if (!username || !email || !password) {
            next(new ErrorHandler_1.BadRequestError('You need to fill all fields'));
            return;
        }
        const exUser = yield (0, users_1.getUserByEmail)(email);
        if (exUser) {
            next(new ErrorHandler_1.BadRequestError('User with whis email already exist'));
            return;
        }
        const hashPassword = yield bcrypt_1.default.hash(password, 3);
        const payload = { username, email };
        const token = jsonwebtoken_1.default.sign(payload, String(process.env.JWT_SECRET), { expiresIn: '30d' });
        const user = yield (0, users_1.createUser)({ username, email, password: hashPassword });
        return res.json({ id: user._id, username, email, token });
    }
    catch (error) {
        next(new ErrorHandler_1.ServerError('Server error'));
    }
});
exports.register = register;
const login = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            next(new ErrorHandler_1.BadRequestError('You must enter email and password'));
            return;
        }
        const exUser = yield (0, users_1.getUserByEmail)(email);
        if (!exUser) {
            next(new ErrorHandler_1.BadRequestError('User with this email is not registered'));
            return;
        }
        const isPassEquals = yield bcrypt_1.default.compare(password, exUser.password);
        if (!isPassEquals) {
            next(new ErrorHandler_1.BadRequestError('Email or password is wrong'));
            return;
        }
        const username = exUser.username;
        const payload = { username, email };
        const token = jsonwebtoken_1.default.sign(payload, String(process.env.JWT_SECRET), { expiresIn: '30d' });
        return res.json({ username, email, token });
    }
    catch (error) {
        next(new ErrorHandler_1.ServerError('Server error'));
    }
});
exports.login = login;
//# sourceMappingURL=userController.js.map