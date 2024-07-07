"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandler = exports.UnauthorizedError = exports.ServerError = exports.BadRequestError = exports.CustomError = void 0;
class CustomError extends Error {
    constructor(message) {
        super(message);
        this.message = message;
    }
}
exports.CustomError = CustomError;
class BadRequestError extends CustomError {
    constructor(message) {
        super(message);
        this.message = message;
        this.statusCode = 400;
        Object.setPrototypeOf(this, BadRequestError.prototype);
    }
    serialize() {
        return { message: this.message };
    }
}
exports.BadRequestError = BadRequestError;
class ServerError extends CustomError {
    constructor(message) {
        super(message);
        this.message = message;
        this.statusCode = 500;
        Object.setPrototypeOf(this, BadRequestError.prototype);
    }
    serialize() {
        return { message: this.message };
    }
}
exports.ServerError = ServerError;
class UnauthorizedError extends CustomError {
    constructor(message) {
        super(message);
        this.message = message;
        this.statusCode = 401;
        Object.setPrototypeOf(this, BadRequestError.prototype);
    }
    serialize() {
        return { message: this.message };
    }
}
exports.UnauthorizedError = UnauthorizedError;
const errorHandler = (error, req, res, next) => {
    if (error instanceof CustomError) {
        const mes = error.serialize();
        console.log(mes);
        return res.status(error.statusCode).json(mes);
    }
    return res.status(500).json({ message: 'new server error' });
};
exports.errorHandler = errorHandler;
//# sourceMappingURL=ErrorHandler.js.map