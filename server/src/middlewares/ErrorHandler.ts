import { ErrorRequestHandler, NextFunction, Request, Response } from "express";

export abstract class CustomError extends Error {
    constructor(public message: string){
        super(message);
    }
    abstract statusCode:number;
    abstract serialize(): {message: string}
}

export class BadRequestError extends CustomError{
    statusCode = 400;
    constructor(public message: string){
        super(message);
        Object.setPrototypeOf(this, BadRequestError.prototype);
    }
    serialize(): {message: string}{
        return {message: this.message};
    }
}
export class ServerError extends CustomError{
    statusCode = 500;
    constructor(public message: string){
        super(message);
        Object.setPrototypeOf(this, BadRequestError.prototype);
    }
    serialize(): {message: string}{
        return {message: this.message};
    }
}

export class UnauthorizedError extends CustomError{
    statusCode = 401;
    constructor(public message: string){
        super(message);
        Object.setPrototypeOf(this, BadRequestError.prototype);
    }
    serialize(): {message: string}{
        return {message: this.message};
    }
}



export const errorHandler: ErrorRequestHandler = (
    error: Error,
    req: Request,
    res: Response,
    next: NextFunction
    )=>{

        if (error instanceof CustomError){
            const mes = error.serialize();
            console.log(mes);
            return res.status(error.statusCode).json(mes);
        } 
        return res.status(500).json({message: 'new server error'})
}