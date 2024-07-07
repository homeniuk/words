"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const userController_1 = require("../controllers/userController");
const wordController_1 = require("../controllers/wordController");
const router = express_1.default.Router();
router.post('/registration', userController_1.register);
router.post('/login', userController_1.login);
router.post('/downloadWords', wordController_1.downloadWords);
router.post('/getWord', wordController_1.getWord);
exports.default = router;
//# sourceMappingURL=index.js.map