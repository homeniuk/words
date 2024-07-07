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
const express_1 = __importDefault(require("express"));
require("dotenv/config");
const cors_1 = __importDefault(require("cors"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const body_parser_1 = __importDefault(require("body-parser"));
const mongoose_1 = __importDefault(require("mongoose"));
const router_1 = __importDefault(require("./router"));
const ErrorHandler_1 = require("./middlewares/ErrorHandler");
const PORT = process.env.PORT;
const DB_URL = String(process.env.DB_URL);
const corsOptions = {
    credentials: true,
    origin: "http://localhost:3000"
};
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use((0, cookie_parser_1.default)());
app.use(body_parser_1.default.json());
app.use((0, cors_1.default)(corsOptions));
app.use('/', router_1.default);
app.get('/', (req, res) => {
    res.send('Hello, World!');
});
app.all('*', () => { throw new Error('new error'); });
app.use(ErrorHandler_1.errorHandler);
const start = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (DB_URL === "")
            throw "DB_URL is empty";
        yield mongoose_1.default.connect(DB_URL);
        app.listen(PORT, () => console.log(`Server started on PORT = ${PORT}`));
    }
    catch (e) {
        console.log(e);
    }
});
start();
//cd server
//npm run dev
//# sourceMappingURL=index.js.map